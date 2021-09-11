const mongoose=require('mongoose')
const validator = require('validator')


const User = new mongoose.model('user', {
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email not valid!')
            }
        },
        unique: true
    },
    age: {
        type: Number,
        default: () => 1
    },
    password: {
        type: String,
        validate(value) {
            if (value.toLocaleLowerCase().includes('password')) {
                throw new Error('Paaword cannot contain "password"')
            }
        },
        minLength: 6,
        required: true,
    }
})


module.exports={
    User
}