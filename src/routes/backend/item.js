const express = require('express');
const router = express.Router();
const ItemController = require('../../controllers/item_controler');


router.route('/').post(ItemController.saveItem)

module.exports = router;