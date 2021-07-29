const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    description: {
        type: String,
        unique: true,
        required: true,
    },
    completed: {
        type: Boolean,
        default: () => false,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,

    }
}, { timestamps: true })

const Task = new mongoose.model('Task', schema)

module.exports = {
    Task
}