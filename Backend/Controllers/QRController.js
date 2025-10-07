const QRCodeLib = require('qrcode');
const QRModel = require('../Models/QRCode');

// ✅ Generate and store multiple QRs dynamically
const generateMultipleQRCodes = async (req, res) => {
  try {
    const { restaurantId, tableCount } = req.body;

    if (!restaurantId || !tableCount) {
      return res.status(400).json({ error: "restaurantId and tableCount are required" });
    }

    const qrList = [];

    for (let i = 1; i <= tableCount; i++) {
      const qrData = `https://yourapp.com/restaurant/${restaurantId}/table/${i}`;
      const qrBuffer = await QRCodeLib.toBuffer(qrData);

      const newQR = new QRModel({
        restaurantId,
        tableNumber: i,
        qrCodeUrl: `data:image/png;base64,${qrBuffer.toString('base64')}`
      });

      await newQR.save();
      qrList.push({ tableNumber: i, qrCodeUrl: newQR.qrCodeUrl });
    }

    res.status(201).json({ message: "QRs generated and saved", qrList });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

// ✅ Generate single QR and return as PNG
const generateQR = async (req, res) => {
  try {
    const { restaurantId, tableNumber } = req.body;

    if (!restaurantId || !tableNumber) {
      return res.status(400).json({ error: "restaurantId and tableNumber are required" });
    }

    const qrData = `https://yourapp.com/restaurant/${restaurantId}/table/${tableNumber}`;
    const qrBuffer = await QRCodeLib.toBuffer(qrData);

    res.setHeader('Content-Type', 'image/png');
    res.send(qrBuffer);
  } catch (err) {
    res.status(500).json({ error: "Failed to generate QR", details: err.message });
  }
};

// ✅ Fetch QR dynamically from params and return as PNG
const fetchQR = async (req, res) => {
  try {
    const { restaurantId, tableNumber } = req.params;

    if (!restaurantId || !tableNumber) {
      return res.status(400).json({ error: "restaurantId and tableNumber are required" });
    }

    const qrData = `https://yourapp.com/restaurant/${restaurantId}/table/${tableNumber}`;
    const qrBuffer = await QRCodeLib.toBuffer(qrData);

    res.setHeader('Content-Type', 'image/png');
    res.send(qrBuffer);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch QR", details: err.message });
  }
};

module.exports = {
  generateMultipleQRCodes,
  generateQR,
  fetchQR
};
