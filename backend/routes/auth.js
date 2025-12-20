const express = require('express');
const router = express.Router();

const { register, login } = require('../controllers/authController');
const User = require('../models/User');
const Warehouse = require('../models/Warehouse');
const Request = require('../models/Request');
const Invoice = require('../models/Invoice');

router.post('/register', register);
router.post('/login', login);

// Temporary seed endpoint - DELETE AFTER USE
router.post('/seed-production', async (req, res) => {
  try {
    // Security check
    if (req.body.secret !== 'invess-seed-2025') {
      return res.status(403).json({ message: 'Forbidden' });
    }
    
    // Clear all data
    await User.deleteMany({});
    await Warehouse.deleteMany({});
    await Request.deleteMany({});
    await Invoice.deleteMany({});
    
    // Create 4 locations with 0 stock
    await Warehouse.create([
      { name: 'Teachermante', stock: 0 },
      { name: 'Teikwame', stock: 0 },
      { name: 'Tamale', stock: 0 },
      { name: 'Tema', stock: 0 },
    ]);
    
    res.json({ 
      message: 'Production database seeded successfully',
      locations: ['Teachermante', 'Teikwame', 'Tamale', 'Tema'],
      stock: 0
    });
  } catch (error) {
    console.error('Seed error:', error);
    res.status(500).json({ message: 'Seed failed', error: error.message });
  }
});

module.exports = router;
