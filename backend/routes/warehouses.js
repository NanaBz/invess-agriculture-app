const express = require('express');
const router = express.Router();
const Warehouse = require('../models/Warehouse');
const { authMiddleware, requireRole } = require('../middleware/auth');
const { body, validationResult, param } = require('express-validator');

const validate = (rules) => [
  ...rules,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
];

router.use(authMiddleware);

/**
 * GET /api/warehouses
 * Any authenticated user can view warehouse list
 */
router.get('/', async (req, res) => {
  try {
    const items = await Warehouse.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * POST /api/warehouses/stock
 * Warehouse Officer or Admin can add/release stock
 */
router.post(
  '/stock',
  requireRole(['Warehouse Officer', 'Admin/Manager']),
  validate([
    body('warehouseId').isMongoId().withMessage('warehouseId is required'),
    body('quantity').isInt({ gt: 0 }).withMessage('quantity must be a positive integer'),
    body('type').isIn(['add', 'release']).withMessage("type must be 'add' or 'release'"),
    body('note').optional().isString(),
  ]),
  async (req, res) => {
    try {
      const { warehouseId, quantity, type, note } = req.body;
      const wh = await Warehouse.findById(warehouseId);
      if (!wh) return res.status(404).json({ message: 'Warehouse not found' });
      if (type === 'add') {
        wh.stock = (wh.stock || 0) + Number(quantity);
      } else {
        const newQty = (wh.stock || 0) - Number(quantity);
        wh.stock = newQty < 0 ? 0 : newQty;
      }
      await wh.save();
      res.json({ message: 'Stock updated', warehouse: wh });
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

module.exports = router;
