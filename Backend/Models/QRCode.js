const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const qrCodeSchema = new Schema({
    restaurantId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    tableNumber: {
        type: Number,
        required: true
    },
    qrCodeUrl: {
        type: String,
        required: true
    }
});

const QRCode = mongoose.model('QRCode', qrCodeSchema);
module.exports = QRCode;
