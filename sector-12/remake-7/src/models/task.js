const mongoose = require('mongoose')

schema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    completed: {
        type: Boolean,
        default: () => false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    }
})

const Task = new mongoose.model('task', schema)

module.exports = {
    Task
}