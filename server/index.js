require('dotenv').config()
require('express-async-errors')
const connectDB = require('./config/connectDB')
const errorHandler = require('./middleware/errorHandler')
const express = require('express')
const cors = require('cors')
const app = express()


app.use(cors())
require('./middleware/routes')(app)


app.listen(5000, () => {
    connectDB()
    console.log("Server is running on port 5000");
})