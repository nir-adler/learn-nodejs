const mongoose = require('mongoose')

schema =new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true,
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
}, { timestamps: true })

schema.index({ description: 1, owner: 1 }, { unique: true })

const Task = new mongoose.model('task', schema)

module.exports = {
    Task
}