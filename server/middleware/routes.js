const express = require('express')
const errorHandler = require('./errorHandler')
const userRoutes = require('../src/routes/userRoutes')
const authenticationRoute = require('../src/routes/authenticationRoute')

module.exports = function(app) {

    app.use(express.json())
    app.use('/api/users', userRoutes)
    app.use('/api/auth', authenticationRoute)
    app.use(errorHandler)
}