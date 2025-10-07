const express = require('express');
const router = express.Router();
const QRController = require('../Controllers/QRController');

// POST - Generate and save multiple QRs
router.post('/generate-multiple', QRController.generateMultipleQRCodes);

// POST - Generate a single QR (returns PNG)
router.post('/generate', QRController.generateQR);

// GET - Fetch a QR dynamically (direct image)
router.get('/:restaurantId/:tableNumber', QRController.fetchQR);

module.exports = router;
