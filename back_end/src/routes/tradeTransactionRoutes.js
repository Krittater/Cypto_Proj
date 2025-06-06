const express = require('express');
const router = express.Router();
const tradeTransactionController = require('../controllers/tradeTransactionController');

router.post('/', tradeTransactionController.create);
router.get('/', tradeTransactionController.findAll);
router.get('/:id', tradeTransactionController.findOne);
router.put('/:id', tradeTransactionController.update);
router.delete('/:id', tradeTransactionController.delete);

module.exports = router;
