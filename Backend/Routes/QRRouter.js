const express = require('express');
const router = express.Router();
const QRController = require('../Controllers/QRController');

router.post('/generate-multiple', QRController.generateMultipleQRCodes);
router.post('/generate', QRController.generateQR);
router.get('/:restaurantId/:tableNumber', QRController.fetchQR);

module.exports = router;
