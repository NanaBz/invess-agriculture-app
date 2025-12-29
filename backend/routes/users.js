
const express = require('express');
const router = express.Router();
const User = require('../models/User'); // adjust path to your model file if needed
const { authMiddleware, requireRole } = require('../middleware/auth');

// Protect all /api/users routes by default
router.use(authMiddleware);

/**
 * DELETE /api/users/:id
 * Admin-only: delete a user
 */
router.delete('/:id', requireRole(['Admin/Manager', 'Admin']), async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * POST /api/users/push-token
 * Save Expo push token for a user
 */
router.post('/push-token', async (req, res) => {
  const { userId, token } = req.body;
  if (!userId || !token) return res.status(400).json({ message: 'Missing userId or token' });
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.pushToken = token;
    await user.save();
    res.json({ message: 'Push token saved' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * GET /api/users
 * Admin-only: returns list of users (password excluded)
 */
router.get('/', requireRole(['Admin/Manager', 'Admin']), async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * GET /api/users/me
 * Any authenticated user can fetch own profile
 */
router.get('/me', async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
