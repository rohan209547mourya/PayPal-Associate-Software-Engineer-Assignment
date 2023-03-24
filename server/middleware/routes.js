const express = require('express')
const errorHandler = require('./errorHandler')
const userRoutes = require('../src/routes/userRoutes')
const authenticationRoute = require('../src/routes/authenticationRoute')
const teamRoutes = require('../src/routes/teamRoutes')
const sprintRoutes = require('../src/routes/sprintRoutes')
const taskRoutes = require('../src/routes/taskRoutes')

module.exports = function(app) {

    app.use(express.json())
    app.use('/api/users', userRoutes)
    app.use('/api/auth', authenticationRoute)
    app.use('/api/teams', teamRoutes)
    app.use('/api/sprints', sprintRoutes)
    app.use('/api/tasks', taskRoutes)
    app.use(errorHandler)
}