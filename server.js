const express = require("./express");

const app = express()

app.get('/', (req, res) => {
  res.end('end')
})

app.get('/1', (req, res) => {
  res.end('end 1')
})

app.listen(3003)