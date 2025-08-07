const express = require('express');
const app = express();
const port = 4000;
const user = require('./Models/db');
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const QRRouter = require('./Routes/QRRouter');

// ✅ Apply middleware BEFORE the routes
app.use(express.json());          // parses JSON from Postman
app.use(bodyParser.json());       // optional: if you use body-parser
app.use(cors());                  // enables CORS

// ✅ Now register your routes
app.use('/qr', QRRouter);
app.use('/auth', AuthRouter);

// Test route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
