const validator = require('validator')
const mongoose = require('mongoose')


const User = mongoose.model('Users', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        defualt: 1,
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

            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"!')
            }
        }
    }
})

module.exports = {
    User
}