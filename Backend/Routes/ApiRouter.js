const router = require('express').Router();
const addItem = require('../Controllers/AddItem')

router.post('/additem',addItem);

module.exports = router