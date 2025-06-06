const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const config = require('../config');

const JWT_SECRET = config.JWT_SECRET;
const JWT_EXPIRES_IN = config.JWT_EXPIRES_IN || '1h';

// Register
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Check if email exists
    const exists = await User.findOne({ where: { email } });
    if (exists) {
      return res.status(400).json({ error: 'Email is already in use' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    const token = jwt.sign({ userId: user.user_id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    res.json({ token, userId: user.user_id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ error: 'Invalid email or password' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: 'Invalid email or password' });
    const token = jwt.sign({ userId: user.user_id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    res.json({ token, userId: user.user_id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Logout (stateless)
exports.logout = async (req, res) => {
  // Stateless JWT: แนะนำให้ client ลบ token ฝั่ง client หรือใช้ blacklist (optional)
  res.json({ message: 'Logout success. Please remove token on client side or wait for token to expire.' });
};