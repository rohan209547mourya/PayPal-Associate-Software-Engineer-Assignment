const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Joi = require('joi')
require('dotenv').config()

// User Schema
const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 1024
    },
    teams:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Team'
        }
    ],
    tasks:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Task'
        }
    ],
});


userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this._id, name: this.name}, process.env.JWT_SECERT)
    return token
}


// Validate Method for User Schema
function validate(user) {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(16).required()
    })
    return schema.validate(user)
}


const User = mongoose.model('User', userSchema)

module.exports = {
    User,
    validate
}



