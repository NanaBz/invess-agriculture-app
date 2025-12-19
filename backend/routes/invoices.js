const express = require('express');
const router = express.Router();
const Invoice = require('../models/Invoice');
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

// GET /api/invoices
router.get('/', async (req, res) => {
  try {
    const items = await Invoice.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * POST /api/invoices
 * Admin/Manager or Warehouse Officer can create invoices
 */
router.post(
  '/',
  requireRole(['Admin/Manager', 'Warehouse Officer']),
  validate([
    body('warehouse').isMongoId().withMessage('warehouse id is required'),
    body('amount').isFloat({ gt: 0 }).withMessage('amount must be a positive number'),
    body('details').optional().isString(),
  ]),
  async (req, res) => {
    try {
      const invoice = new Invoice({ ...req.body });
      await invoice.save();
      res.status(201).json(invoice);
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

/**
 * PATCH /api/invoices/:id/mark-paid
 * Admin/Manager or Finance role can mark paid
 */
router.patch(
  '/:id/mark-paid',
  requireRole(['Admin/Manager']),
  validate([param('id').isMongoId().withMessage('Invalid invoice id')]),
  async (req, res) => {
    try {
      const inv = await Invoice.findById(req.params.id);
      if (!inv) return res.status(404).json({ message: 'Invoice not found' });
      inv.status = 'Paid';
      await inv.save();
      res.json(inv);
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

module.exports = router;
