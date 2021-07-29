const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { Task } = require('../models/task')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        default: () => 1
    },
    email: {
        type: String,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is not valid!')
            }
        },
        unique: true,
        required: true,
    },
    password: {
        type: String,
        minLength: 6,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contin "password" string')
            }
        },
        required: true,
    },
    tokens: [{
        token: {
            type: String,
            required: true,
        }
    }]
})



userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'

})

userSchema.methods.toJSON = function () {
    const user = this
    userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}


userSchema.statics.authUser = async function (email, password) {
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error('Unable login!')
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('Unable login!')
    }

    return user

}

userSchema.methods.generateToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'israel')

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}

userSchema.pre('remove', async function (next) {
    const user = this

    await Task.deleteMany({ owner: user_id })

    next()
})

userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
        user.tokens = []
    }

    next()
})

const User = mongoose.model('User', userSchema)




module.exports = {
    User
}