const express = require('express');
const router = express.Router();
const walletController = require('../controllers/walletController');

router.post('/', walletController.create);
router.get('/', walletController.findAll);
router.get('/:id', walletController.findOne);
router.put('/:id', walletController.update);
router.delete('/:id', walletController.delete);

module.exports = router;