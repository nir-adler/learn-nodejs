const mongoose = require('mongoose')
const validator = require('validator')


const User = mongoose.model('users', {
    name: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contin "passowrd"!')
            }
        }
    },
    age: {
        type: Number,
        default: () => 1
    }
})

module.exports = {
    User
}