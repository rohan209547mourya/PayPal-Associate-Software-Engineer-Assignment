const mongoose = require('mongoose')
const Joi = require('joi')

const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    sprints: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sprint'
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createAt: {
        type: Date,
        default: Date.now
    }
});


function validateTeam(team) {
    const schema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string(),
        members: Joi.array(),
        sprints: Joi.array(),
        createdBy: Joi.string()
    })
    return schema.validate(team)
}

const Team = mongoose.model('Team', teamSchema)

module.exports = {
    Team,
    validateTeam
}