const mongoose = require('mongoose')

const Task = new mongoose.model('Task', {
    description: {
        type: String,
        unique: true,
        required: true,
    },
    completed: {
        type: Boolean,
        default: () => false,
    }
})

module.exports = {
    Task
}