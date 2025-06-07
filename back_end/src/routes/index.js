const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const walletRoutes = require('./walletRoutes');
const tradeOfferRoutes = require('./tradeOfferRoutes');
const tradeTransactionRoutes = require('./tradeTransactionRoutes');
const transferRoutes = require('./transferRoutes');
const fiatTransactionRoutes = require('./fiatTransactionRoutes');
const authRoutes = require('./authRoutes');
const verifyToken = require('../middleware/authMiddleware');

// Root
router.get('/', (req, res) => {
  res.send('Hello from Node.js Backend!');
});

// Use each model's routes
router.use('/users', userRoutes);
router.use('/wallets',verifyToken, walletRoutes);
router.use('/trade-offers',verifyToken, tradeOfferRoutes);
router.use('/trade-transactions',verifyToken, tradeTransactionRoutes);
router.use('/transfers',verifyToken, transferRoutes);
router.use('/fiat-transactions',verifyToken, fiatTransactionRoutes);
router.use('/api/auth', authRoutes);

module.exports = router;