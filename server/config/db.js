const mongoose = require('mongoose')

module.exports = function() {

    mongoose.connect('mongodb://0.0.0.0:27017/taskplannerdb')
        .then(() => console.info("Connected to database"))

}