const mongoose = require('mongoose')
const validator = require('validator')

const User = new mongoose.model('User', {
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        default: () => 1
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email not valid!')
            }
        },
        unique: true
    },
    password: {
        type: String,
        minLength: 7,
        required: true,
        validate(value) {
            if (value.toLocaleLowerCase().includes('password')) {
                throw new Error('passowrd cannot contain "password"!')
            }
        }

    }
})



module.exports = {
    User
}