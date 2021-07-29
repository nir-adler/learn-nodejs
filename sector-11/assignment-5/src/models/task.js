const validator = require('validator')
const mongoose = require('mongoose')

const Task = mongoose.model('Tasks', {
    description: {
        type: String,
        required: true,
        trim: true,

    },
    completed: {
        type: Boolean,
        defualt: false,
    },

})

module.exports = {
    Task
}