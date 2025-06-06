const e = require('express');
const bcrypt = require('bcrypt');
const { User, Wallet } = require('../models/user');

// Create
exports.create = async (req, res) => {
  try {
    const { password, email, ...rest } = req.body;
    const exists = await User.findOne({ where: { email } });
    if (exists) {
      return res.status(400).json({ error: 'Email is already in use' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ ...rest, email, password: hashedPassword });

    // สร้าง wallet อัตโนมัติ (ตัวอย่าง: BTC, ETH, XRP, DOGE)
    const cryptoList = ['BTC', 'ETH', 'XRP', 'DOGE'];
    const wallets = [];
    for (const currency of cryptoList) {
      const wallet = await Wallet.create({
        user_id: user.user_id,
        currency,
        balance: 0
      });
      wallets.push(wallet);
    }

    res.json({ user, wallets });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Read all
exports.findAll = async (_, res) => {
  try {
    const users = await User.findAll();
    if(!users || users.length === 0){
        return res.status(404).json({ error: 'No users found' });
    }
    else{
        res.json(users);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Read one
exports.findOne = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update
exports.update = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    await user.update(req.body);
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete
exports.delete = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    await user.destroy();
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
