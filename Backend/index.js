const express = require('express')
const app = express()
const port = 4000
require('./Models/db')
const bodyParser = require('body-parser')
const cors = require('cors')
const AuthRouter = require('./Routes/AuthRouter')
const ApiRouter = require('./Routes/ApiRouter')

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use(bodyParser.json());
app.use(cors())
app.use('/auth', AuthRouter);
app.use("/api", ApiRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})