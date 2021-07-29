const validator = require('validator')
const mongoose = require('mongoose')
const bcrypt=require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contin "password"')
            }
        }
    },
    email: {
        type: String,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email not valid')
            }
        }
    },
    age: {
        type: Number,
        defualt: () => 1
    }
})

userSchema.pre('save', async function (next) {
    const user = this

    if(user.isModified('password')){
        user.password=await bcrypt.hash(user.password,8)
    }
    console.log('just before saving')
    next()
})
// userSchema.post

const User = mongoose.model('Users', userSchema)

module.exports = {
    User
}