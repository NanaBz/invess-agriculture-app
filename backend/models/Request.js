const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
  warehouse: { type: String, required: true },
  fertilizers: [{ type: String, required: true }],
  bagSize: { type: String, enum: ['25kg', '50kg'], required: true },
  quantity: { type: Number, required: true },
  customerName: { type: String, required: true },
  customerPhone: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('Request', RequestSchema);
