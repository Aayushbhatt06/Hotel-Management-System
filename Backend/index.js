const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT;
require('./Models/db')
const QRCode = require('qrcode');
const bodyParser = require('body-parser')
const cors = require('cors')
const AuthRouter = require('./Routes/AuthRouter')
const ApiRouter = require('./Routes/ApiRouter')
const QRRouter = require('./Routes/QRRouter');

app.use(express.json());
app.use(bodyParser.json());
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/qr', async (req, res) => {
  try {
    const buffer = await QRCode.toBuffer('https://example.com');
    res.setHeader('Content-Type', 'image/png');
    res.send(buffer);
  } catch (err) {
    res.status(500).send('Error generating QR');
  }
});


app.use('/auth', AuthRouter);
app.use("/api", ApiRouter);
app.use('/qr', QRRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})