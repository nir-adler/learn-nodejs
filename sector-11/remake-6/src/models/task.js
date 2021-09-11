const mongoose = require('mongoose')

const Task = new mongoose.model('task', {
    description: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    completed: {
        type: Boolean,
        default: () => false
    }
})

module.exports = {
    Task
}