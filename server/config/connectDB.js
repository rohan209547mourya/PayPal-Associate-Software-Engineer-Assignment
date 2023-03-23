const mongoose = require('mongoose')

module.exports = async function() {
    try {
        await mongoose.connect("mongodb://0.0.0.0:27017/task-planner-db")
        console.log("Connected to MongoDB");
    } 
    catch (error) {
        console.log(error);    
    }
}