require('dotenv').config()
require('express-async-errors')
const connectDB = require('./config/connectDB')
const errorHandler = require('./middleware/errorHandler')
const express = require('express')
const cors = require('cors')
const app = express()


app.use(cors())
require('./middleware/routes')(app)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    connectDB()
    console.log("Server is running on port 5000");
})

process
  .on('unhandledRejection', (reason, p) => {
    console.error(reason, 'Unhandled Rejection at Promise', p);
  })
  .on('uncaughtException', err => {
    console.error(err, 'Uncaught Exception thrown');
    process.exit(1);
  });