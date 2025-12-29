const mongoose = require('mongoose');

const WarehouseSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  stock: { type: Number, default: 0 },
}, { timestamps: true });

// Indexes for performance
WarehouseSchema.index({ name: 1 });

module.exports = mongoose.model('Warehouse', WarehouseSchema);
