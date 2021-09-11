const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { Task } = require('../models/task')

const schema = new mongoose.Schema({
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
    },
    tokens: [{
        token: {
            type: String,
            required: true,
        }
    }]
})

schema.virtual('tasks', {
    ref: 'task',
    localField: '_id',
    foreignField: 'owner'
})

schema.methods.toJSON = function () {
    const user = this
    userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}

schema.methods.generateToken = async function () {
    const user = this

    const token = jwt.sign({ _id: user._id }, 'israel')
    user.tokens = [...user.tokens, { token: token }]
    await user.save()

    return token
}

schema.statics.logIn = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error('Cannot login')
    }
    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
        throw new Error('Cannot login')
    }
    return user
}

schema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()

})

schema.pre('remove', async function (next) {
    const user = this

    await Task.deleteMany({ owner: user._id })


    next()
})

const User = new mongoose.model('user', schema)


module.exports = {
    User
}