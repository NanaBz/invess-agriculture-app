const Request = require('../models/Request');

exports.getRequests = async (req, res) => {
  const requests = await Request.find();
  res.json(requests);
};

exports.createRequest = async (req, res) => {
  const request = new Request(req.body);
  await request.save();
  res.status(201).json(request);
};

exports.updateRequest = async (req, res) => {
  const request = await Request.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!request) return res.status(404).json({ error: 'Request not found' });
  res.json(request);
};

exports.deleteRequest = async (req, res) => {
  await Request.findByIdAndDelete(req.params.id);
  res.json({ message: 'Request deleted' });
};
