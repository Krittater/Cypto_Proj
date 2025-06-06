const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const verifyToken = require('../middleware/authMiddleware');

// Register
router.post('/register', authController.register);

// Login
router.post('/login', authController.login);

// Logout (stateless)
router.post('/logout', verifyToken, authController.logout);

module.exports = router;
