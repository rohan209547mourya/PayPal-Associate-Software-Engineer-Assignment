const mongoose = require('mongoose')
const Joi = require('joi')

const taskSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    type: { 
        type: String, 
        enum: ['bug', 'feature', 'story'], 
        required: true 
    },
    description: { 
        type: String 
    },
    status: { 
        type: String, 
        enum: ['todo', 'inprogress', 'completed'], 
        default: 'todo' 
    },
    assignee: { 
        type: mongoose.Schema.Types.ObjectId ,
        ref: 'User',
    }
});
  

function validateTask(task) {
    const schema = Joi.object({
        title: Joi.string().required(),
        type: Joi.string().required(),
        description: Joi.string(),
        status: Joi.string(),
        assignee: Joi.string(),
    })
    return schema.validate(task)
}

const Task = mongoose.model('Task', taskSchema)

module.exports = {
    Task,
    validateTask
}
