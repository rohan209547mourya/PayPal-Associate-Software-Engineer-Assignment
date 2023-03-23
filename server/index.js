const express = require('express')
const app = express()

require('./config/db')()

app.listen(5000)