const express = require('express')
const app = express()
const port = 4000
const user = require('./Models/db')
const bodyParser = require('body-parser')
const cors = require('cors')
const AuthRouter = require('./Routes/AuthRouter')

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use(bodyParser.json());
app.use(cors())
app.use('/auth', AuthRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})