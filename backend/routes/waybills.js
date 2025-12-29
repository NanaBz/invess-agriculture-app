const express = require('express');
const router = express.Router();
const Waybill = require('../models/Waybill');
const { authMiddleware, requireRole } = require('../middleware/auth');
const { body, param, validationResult } = require('express-validator');

const validate = (rules) => [
  ...rules,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
];

router.use(authMiddleware);

// GET /api/waybills - list with pagination
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 20, status } = req.query;
    const filter = status ? { status } : {};
    const waybills = await Waybill.find(filter)
      .sort({ date: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    res.json(waybills);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/waybills - create
router.post(
  '/',
  requireRole(['Warehouse Officer', 'Admin/Manager']),
  validate([
    body('waybillNumber').notEmpty(),
    body('sourceWarehouse').notEmpty(),
    body('destinationWarehouse').notEmpty(),
    body('driverName').notEmpty(),
    body('driverPhone').notEmpty(),
    body('items').isArray({ min: 1 }),
  ]),
  async (req, res) => {
    try {
      const waybill = new Waybill({ ...req.body });
      await waybill.save();
      res.status(201).json(waybill);
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// PATCH /api/waybills/:id/status - update status
router.patch(
  '/:id/status',
  requireRole(['Warehouse Officer', 'Admin/Manager']),
  validate([
    param('id').isMongoId(),
    body('status').isIn(['Pending', 'In Transit', 'Delivered', 'Cancelled']),
  ]),
  async (req, res) => {
    try {
      const waybill = await Waybill.findById(req.params.id);
      if (!waybill) return res.status(404).json({ message: 'Waybill not found' });
      waybill.status = req.body.status;
      await waybill.save();
      res.json(waybill);
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

module.exports = router;
