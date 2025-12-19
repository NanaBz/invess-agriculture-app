const express = require('express');
const router = express.Router();
const User = require('../models/User'); // adjust path to your model file if needed
const { authMiddleware, requireRole } = require('../middleware/auth');

// Protect all /api/users routes by default
router.use(authMiddleware);

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
