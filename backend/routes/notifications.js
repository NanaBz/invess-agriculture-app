const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');
const { authMiddleware, requireRole } = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

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
 * GET /api/notifications
 * Any authenticated user can fetch their notifications
 */
router.get('/', async (req, res) => {
  try {
    const notes = await Notification.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * POST /api/notifications/send
 * Admin/Manager or System role can create/send notifications
 */
router.post(
  '/send',
  requireRole(['Admin/Manager']),
  validate([
    body('userId').isMongoId().withMessage('userId is required'),
    body('title').trim().notEmpty().withMessage('title is required'),
    body('body').trim().notEmpty().withMessage('body is required'),
  ]),
  async (req, res) => {
    try {
      const { userId, title, body } = req.body;
      const note = new Notification({ user: userId, title, message: body });
      await note.save();
      res.status(201).json(note);
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

module.exports = router;
