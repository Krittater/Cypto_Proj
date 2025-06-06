const { Transfer } = require('../models/user');

// Create
exports.create = async (req, res) => {
  try {
    const transfer = await Transfer.create(req.body);
    res.json(transfer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Read all
exports.findAll = async (req, res) => {
  try {
    const transfers = await Transfer.findAll();
    res.json(transfers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Read one
exports.findOne = async (req, res) => {
  try {
    const transfer = await Transfer.findByPk(req.params.id);
    if (!transfer) return res.status(404).json({ error: 'Transfer not found' });
    res.json(transfer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update
exports.update = async (req, res) => {
  try {
    const transfer = await Transfer.findByPk(req.params.id);
    if (!transfer) return res.status(404).json({ error: 'Transfer not found' });
    await transfer.update(req.body);
    res.json(transfer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete
exports.delete = async (req, res) => {
  try {
    const transfer = await Transfer.findByPk(req.params.id);
    if (!transfer) return res.status(404).json({ error: 'Transfer not found' });
    await transfer.destroy();
    res.json({ message: 'Transfer deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
