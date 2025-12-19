const Invoice = require('../models/Invoice');

exports.getInvoices = async (req, res) => {
  const invoices = await Invoice.find();
  res.json(invoices);
};

exports.createInvoice = async (req, res) => {
  const invoice = new Invoice(req.body);
  await invoice.save();
  res.status(201).json(invoice);
};

exports.updateInvoice = async (req, res) => {
  const invoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!invoice) return res.status(404).json({ error: 'Invoice not found' });
  res.json(invoice);
};

exports.deleteInvoice = async (req, res) => {
  await Invoice.findByIdAndDelete(req.params.id);
  res.json({ message: 'Invoice deleted' });
};
