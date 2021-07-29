const mongoose = require('mongoose')

const Task = mongoose.model('Tasks', {
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

module.exports = {
    Task
}