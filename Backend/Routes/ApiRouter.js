const router = require('express').Router();
const {addItem, getItems, getItem} = require('../Controllers/AddItem');
const { getAllSignups } = require('../Controllers/AuthRestController');

router.post('/additem',addItem);
// just to get all signups for getting out ids 
router.get("/Signups", getAllSignups);
router.get('/items/:resId', getItems);
router.get('/item/:resId/:id', getItem);

module.exports = router