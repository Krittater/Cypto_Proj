const { Wallet } = require('../models/user');

// Create
exports.create = async (req, res) => {
  try {
    const wallet = await Wallet.create(req.body);
    res.json(wallet);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Read all
exports.findAll = async (req, res) => {
  try {
    const wallets = await Wallet.findAll();
    res.json(wallets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Read one
exports.findOne = async (req, res) => {
  try {
    const wallet = await Wallet.findByPk(req.params.id);
    if (!wallet) return res.status(404).json({ error: 'Wallet not found' });
    res.json(wallet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update
exports.update = async (req, res) => {
  try {
    const wallet = await Wallet.findByPk(req.params.id);
    if (!wallet) return res.status(404).json({ error: 'Wallet not found' });
    await wallet.update(req.body);
    res.json(wallet);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete
exports.delete = async (req, res) => {
  try {
    const wallet = await Wallet.findByPk(req.params.id);
    if (!wallet) return res.status(404).json({ error: 'Wallet not found' });
    await wallet.destroy();
    res.json({ message: 'Wallet deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
