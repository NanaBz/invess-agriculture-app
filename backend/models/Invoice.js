const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
  warehouse: { type: mongoose.Schema.Types.ObjectId, ref: 'Warehouse' },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['Paid', 'Unpaid'], default: 'Unpaid' },
  date: { type: Date, default: Date.now },
  details: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Invoice', InvoiceSchema);
