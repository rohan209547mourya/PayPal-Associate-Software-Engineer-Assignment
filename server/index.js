require('dotenv').config()
require('express-async-errors')
const connectDB = require('./config/connectDB')
const express = require('express')
const app = express()
const errorHandler = require('./middleware/errorHandler')

require('./middleware/routes')(app)
require('./middleware/cors')(app)


app.listen(5000, () => {
    connectDB()
    console.log("Server is running on port 5000");
})