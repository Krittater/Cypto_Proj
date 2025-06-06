const { TradeOffer } = require('../models/user');

// Create
exports.create = async (req, res) => {
  try {
    const offer = await TradeOffer.create(req.body);
    res.json(offer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Read all
exports.findAll = async (req, res) => {
  try {
    const offers = await TradeOffer.findAll();
    res.json(offers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Read one
exports.findOne = async (req, res) => {
  try {
    const offer = await TradeOffer.findByPk(req.params.id);
    if (!offer) return res.status(404).json({ error: 'TradeOffer not found' });
    res.json(offer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update
exports.update = async (req, res) => {
  try {
    const offer = await TradeOffer.findByPk(req.params.id);
    if (!offer) return res.status(404).json({ error: 'TradeOffer not found' });
    await offer.update(req.body);
    res.json(offer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete
exports.delete = async (req, res) => {
  try {
    const offer = await TradeOffer.findByPk(req.params.id);
    if (!offer) return res.status(404).json({ error: 'TradeOffer not found' });
    await offer.destroy();
    res.json({ message: 'TradeOffer deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
