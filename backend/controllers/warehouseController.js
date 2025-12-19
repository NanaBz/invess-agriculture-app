const Warehouse = require('../models/Warehouse');

exports.getWarehouses = async (req, res) => {
  const warehouses = await Warehouse.find();
  res.json(warehouses);
};

exports.createWarehouse = async (req, res) => {
  const warehouse = new Warehouse(req.body);
  await warehouse.save();
  res.status(201).json(warehouse);
};

exports.updateWarehouse = async (req, res) => {
  const warehouse = await Warehouse.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!warehouse) return res.status(404).json({ error: 'Warehouse not found' });
  res.json(warehouse);
};

exports.deleteWarehouse = async (req, res) => {
  await Warehouse.findByIdAndDelete(req.params.id);
  res.json({ message: 'Warehouse deleted' });
};
