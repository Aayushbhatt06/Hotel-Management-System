const express = require("express");
const router = express.Router();
const {
  generateMultipleQRCodes,
  generateQR,
  fetchQR,
} = require("../Controllers/QRController");

router.post("/generate-multiple", generateMultipleQRCodes);
router.post("/generate", generateQR);
router.get("/:restaurantId/:tableNumber", fetchQR);

module.exports = router;
