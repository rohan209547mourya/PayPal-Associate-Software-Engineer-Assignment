const mongoose = require('mongoose')
const Joi = require('joi')

const sprintSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    startDate: { 
        type: Date, 
        required: true,
        default: Date.now
    },
    endDate: { 
        type: Date,  
    },
    description: {
        type: String
    },
    tasks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Task'
        }
    ]
});
  
const Sprint = mongoose.model('Sprint', sprintSchema);

function validate(sprint) {
    const schema = Joi.object({
        title: Joi.string().required(),
        description: Joi.string(),
    })
    return schema.validate(sprint)
}

module.exports = {
    Sprint,
    validate
}


  