const QRCodeLib = require('qrcode');
const QRModel = require('../Models/QRCode');

// ✅ Generate and store multiple QRs
const generateMultipleQRCodes = async (req, res) => {
  try {
    const { restaurantId, tableCount } = req.body;

    if (!restaurantId || !tableCount) {
      return res.status(400).json({ error: "restaurantId and tableCount are required" });
    }

    const qrList = [];

    for (let i = 1; i <= tableCount; i++) {
      const qrData = `https://yourapp.com/restaurant/${restaurantId}/table/${i}`;
      const qrImage = await QRCodeLib.toDataURL(qrData);

      const newQR = new QRModel({
        restaurantId,
        tableNumber: i,
        qrCodeUrl: qrImage
      });

      await newQR.save();
      qrList.push({ tableNumber: i, qrImage });
    }

    res.status(201).json({ message: "QRs generated and saved", qrList });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

// ✅ Generate single QR (no save)
const generateQR = async (req, res) => {
  try {
    const { restaurantId, tableNumber } = req.body;
    const qrData = `https://yourapp.com/restaurant/${restaurantId}/table/${tableNumber}`;
    const qrImage = await QRCodeLib.toDataURL(qrData);

    res.status(200).json({ success: true, qrImage });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to generate QR', error: err.message });
  }
};

// ✅ Fetch QR dynamically (no DB hit)
const fetchQR = async (req, res) => {
  try {
    const { restaurantId, tableNumber } = req.params;
    const qrData = `https://yourapp.com/restaurant/${restaurantId}/table/${tableNumber}`;
    const qrImage = await QRCodeLib.toDataURL(qrData);

    res.status(200).json({ success: true, qrImage });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch QR', error: err.message });
  }
};

module.exports = {
  generateMultipleQRCodes,
  generateQR,
  fetchQR
};
