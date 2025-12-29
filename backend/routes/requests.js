const express = require('express');
const router = express.Router();
const Request = require('../models/Request');
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

// protect routes
router.use(authMiddleware);

// GET /api/requests - list
router.get('/', async (req, res) => {
  try {
    const filter = (req.user.role === 'Admin/Manager' || req.user.role === 'Compliance Officer')
      ? {}
      : { createdBy: req.user.id };
    const items = await Request.find(filter).sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * POST /api/requests
 * Sales Agent, Warehouse Officer, Admin/Manager can create requests
 */
router.post(
  '/',
  requireRole(['Sales Agent', 'Warehouse Officer', 'Admin/Manager']),
  validate([
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),
  ]),
  async (req, res) => {
    try {
      const { title, description } = req.body;
      const newReq = new Request({ title, description, createdBy: req.user.id, status: 'Pending' });
      await newReq.save();

      // Send push notification to all users with pushToken
      const User = require('../models/User');

      // Send push notifications in background
      setImmediate(async () => {
        try {
          const sendPushNotification = require('../utils/sendPushNotification');
          const users = await User.find({ pushToken: { $exists: true, $ne: null } });
          const promises = users.map(u =>
            sendPushNotification(
              u.pushToken,
              'New Request',
              `${req.user.name} created a new request: ${title}`,
              { requestId: newReq._id }
            )
          );
          await Promise.all(promises);
        } catch (e) {
          console.error('Push notification error:', e);
        }
      });

      res.status(201).json(newReq);
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

/**
 * PATCH /api/requests/:id/approve
 * Only Admin/Manager or Compliance Officer can approve
 */
router.patch(
  '/:id/approve',
  requireRole(['Admin/Manager', 'Compliance Officer']),
  validate([param('id').isMongoId().withMessage('Invalid request id')]),
  async (req, res) => {
    try {
      const reqDoc = await Request.findById(req.params.id);
      if (!reqDoc) return res.status(404).json({ message: 'Request not found' });
      reqDoc.status = 'Approved';
      reqDoc.approvedBy = req.user.id;
      await reqDoc.save();
      res.json(reqDoc);
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

router.patch(
  '/:id/reject',
  requireRole(['Admin/Manager', 'Compliance Officer']),
  validate([param('id').isMongoId().withMessage('Invalid request id')]),
  async (req, res) => {
    try {
      const reqDoc = await Request.findById(req.params.id);
      if (!reqDoc) return res.status(404).json({ message: 'Request not found' });
      reqDoc.status = 'Rejected';
      reqDoc.rejectedBy = req.user.id;
      await reqDoc.save();
      res.json(reqDoc);
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

router.delete(
  '/:id',
  requireRole(['Admin/Manager']),
  validate([param('id').isMongoId().withMessage('Invalid request id')]),
  async (req, res) => {
    try {
      const found = await Request.findByIdAndDelete(req.params.id);
      if (!found) return res.status(404).json({ message: 'Request not found' });
      res.json({ message: 'Request deleted' });
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

module.exports = router;
