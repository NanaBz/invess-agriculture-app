const mongoose = require('mongoose');

const WaybillSchema = new mongoose.Schema({
  waybillNumber: { type: String, required: true, unique: true },
  date: { type: Date, default: Date.now },
  sourceWarehouse: { type: String, required: true },
  destinationWarehouse: { type: String, required: true },
  items: [{
    fertilizer: String,
    bagSize: { type: String, enum: ['1kg', '25kg', '50kg'] },
    quantity: Number,
  }],
  driverName: { type: String, required: true },
  driverPhone: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'In Transit', 'Delivered', 'Cancelled'], default: 'Pending' },
  relatedRequestId: { type: mongoose.Schema.Types.ObjectId, ref: 'Request' },
}, { timestamps: true });

// Indexes for performance
WaybillSchema.index({ status: 1 });
WaybillSchema.index({ sourceWarehouse: 1 });
WaybillSchema.index({ destinationWarehouse: 1 });
WaybillSchema.index({ date: -1 });

module.exports = mongoose.model('Waybill', WaybillSchema);
