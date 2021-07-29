const mongoose=require('mongoose')

const Task = mongoose.model('tasks', {
    description: {
        type: String,
        unique: true,
        required: true
    },
    completed: {
        type: Boolean,
        default: () => false
    }
})


module.exports={
    Task
}