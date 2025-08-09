const router = require('express').Router();
const {addItem, getItems, getItem} = require('../Controllers/AddItem')

router.post('/additem',addItem);
router.get('/items', getItems);
router.get('/item/:id', getItem);

module.exports = router