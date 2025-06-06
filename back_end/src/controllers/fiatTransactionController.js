const { FiatTransaction } = require('../models/user');

// Create
exports.create = async (req, res) => {
  try {
    const fiatTx = await FiatTransaction.create(req.body);
    res.json(fiatTx);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Read all
exports.findAll = async (req, res) => {
  try {
    const fiatTxs = await FiatTransaction.findAll();
    res.json(fiatTxs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Read one
exports.findOne = async (req, res) => {
  try {
    const fiatTx = await FiatTransaction.findByPk(req.params.id);
    if (!fiatTx) return res.status(404).json({ error: 'FiatTransaction not found' });
    res.json(fiatTx);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update
exports.update = async (req, res) => {
  try {
    const fiatTx = await FiatTransaction.findByPk(req.params.id);
    if (!fiatTx) return res.status(404).json({ error: 'FiatTransaction not found' });
    await fiatTx.update(req.body);
    res.json(fiatTx);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete
exports.delete = async (req, res) => {
  try {
    const fiatTx = await FiatTransaction.findByPk(req.params.id);
    if (!fiatTx) return res.status(404).json({ error: 'FiatTransaction not found' });
    await fiatTx.destroy();
    res.json({ message: 'FiatTransaction deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
