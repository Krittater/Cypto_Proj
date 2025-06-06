const express = require('express');
const router = express.Router();
const fiatTransactionController = require('../controllers/fiatTransactionController');

router.post('/', fiatTransactionController.create);
router.get('/', fiatTransactionController.findAll);
router.get('/:id', fiatTransactionController.findOne);
router.put('/:id', fiatTransactionController.update);
router.delete('/:id', fiatTransactionController.delete);

module.exports = router;
