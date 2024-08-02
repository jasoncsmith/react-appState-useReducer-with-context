const express = require('express')
const path = require('path')

const BUILD_DIR = '../build'
const PORT = 8080
const app = express()

app.use(express.static(path.join(__dirname, BUILD_DIR)))

app.route('/*').get((req, res) => {
  res.sendFile(path.join(__dirname, BUILD_DIR, '/index.html'))
})

app.listen(PORT, () => console.log('server running on ' + PORT))
