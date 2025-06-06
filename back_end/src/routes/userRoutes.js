const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyToken = require('../middleware/authMiddleware');

router.post('/', userController.create);
router.get('/', verifyToken, userController.findAll);
router.get('/:id', verifyToken, userController.findOne);
router.put('/:id', verifyToken, userController.update);
router.delete('/:id', verifyToken, userController.delete);

module.exports = router;
