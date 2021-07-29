const validator = require('validator')
const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
})

const User = mongoose.model('Users', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        defualt: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Cannot enter nagtive number')
            }
        }
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
        email: String,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 7,
        validate(value) {
            if (!value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"!')
            }
        }
    }
})

const Task = mongoose.model('Tasks', {
    task: {
        type: String,
        required: true,
        trim: true

    },
    completed: {
        type: Boolean,
        defualt: false
    }
})


// const payBills = new Task({
//     task: 'Pay bills',
//     completed: false
// })
//
// payBills.save().then(()=>{
//     console.log(payBills)
// }).catch(error=>{
//     console.log(error)
// })


const me = new User({
    name: '   Nir Adler   ',
    email: 'MY@MEAD.IO',
    password: '1234'
})

me.save().then(() => {
    console.log(me)
}).catch((error) => {
    console.log(error)
})