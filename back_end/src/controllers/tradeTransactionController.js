const { TradeTransaction } = require('../models/user');

// Create
exports.create = async (req, res) => {
  try {
    const tx = await TradeTransaction.create(req.body);
    res.json(tx);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Read all
exports.findAll = async (req, res) => {
  try {
    const txs = await TradeTransaction.findAll();
    res.json(txs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Read one
exports.findOne = async (req, res) => {
  try {
    const tx = await TradeTransaction.findByPk(req.params.id);
    if (!tx) return res.status(404).json({ error: 'TradeTransaction not found' });
    res.json(tx);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update
exports.update = async (req, res) => {
  try {
    const tx = await TradeTransaction.findByPk(req.params.id);
    if (!tx) return res.status(404).json({ error: 'TradeTransaction not found' });
    await tx.update(req.body);
    res.json(tx);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete
exports.delete = async (req, res) => {
  try {
    const tx = await TradeTransaction.findByPk(req.params.id);
    if (!tx) return res.status(404).json({ error: 'TradeTransaction not found' });
    await tx.destroy();
    res.json({ message: 'TradeTransaction deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
