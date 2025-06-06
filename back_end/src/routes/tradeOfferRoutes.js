const express = require('express');
const router = express.Router();
const tradeOfferController = require('../controllers/tradeOfferController');

router.post('/', tradeOfferController.create);
router.get('/', tradeOfferController.findAll);
router.get('/:id', tradeOfferController.findOne);
router.put('/:id', tradeOfferController.update);
router.delete('/:id', tradeOfferController.delete);

module.exports = router;
