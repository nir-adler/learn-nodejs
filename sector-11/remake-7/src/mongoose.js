const mongoose = require('mongoose')
const validator = require('validator')
const url = 'mongodb://127.0.0.1:27017/manager'

mongoose.connect(url, { useNewUrlParser: true }).then(() => {
    console.log('Mongoose connected Success.')
}).catch((e) => {
    console.log(e)
})

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email not valid.')
            }
        }
    },
    age: {
        type: Number,
        default: () => 1
    },
    password: {
        type: String,
        minLength: 2,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot include "password"')
            }
        }

    }
})

const User = mongoose.model('user', userSchema)


const taskSchema = new mongoose.Schema({
    task: {
        type: String
    },
    completed: {
        type: Boolean,
        default: () => false
    }
})

const Task = mongoose.model('task', taskSchema)

const user = new User({
    name: 'Nir Adler',
    email: 'nir@adler.com',
    password: '12'
})

// user.save()


const task = new Task({
    task: 'call mom'
})

task.save()