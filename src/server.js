const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')

const app = express()
const port = 4545
app.use(bodyParser.json())


let lineup


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/lineup', (req, res) => {
  console.log(req.body.path)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
