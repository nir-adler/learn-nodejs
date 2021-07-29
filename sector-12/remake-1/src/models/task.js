const mongoose = require('mongoose')

const taskSchema=new mongoose.Schema({
    
    description: {
        type: String,
        required: true,
        index: true,
        unique: true,
    },
    completed: {
        type: Boolean,
        default: () => false
    }
})

const Task = mongoose.model('Tasks',taskSchema)

module.exports = {
    Task
}