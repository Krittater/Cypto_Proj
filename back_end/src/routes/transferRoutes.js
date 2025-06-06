const express = require('express');
const router = express.Router();
const transferController = require('../controllers/transferController');

router.post('/', transferController.create);
router.get('/', transferController.findAll);
router.get('/:id', transferController.findOne);
router.put('/:id', transferController.update);
router.delete('/:id', transferController.delete);

module.exports = router;
