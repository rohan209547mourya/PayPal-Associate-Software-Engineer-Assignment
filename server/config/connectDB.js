const mongoose = require('mongoose')
require('dotenv').config()

module.exports = async function() {
    try {
        await mongoose.connect(`mongodb+srv://rohanmourya671:${process.env.DB_PASSWORD}@taskplannerclustor.3mryuzl.mongodb.net/task-planner-db?retryWrites=true&w=majority`)
        // mongodb+srv://rohanmourya671:${process.env.DB_PASSWORD}@taskplannerclustor.3mryuzl.mongodb.net/?retryWrites=true&w=majority

        console.log("Connected to MongoDB");
    } 
    catch (error) {
        console.log(error);    
    }
}