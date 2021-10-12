const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const validator = require('validator')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        default: () => 10
    },
    password: {
        type: String,
        required: true,
        minLength: 7,
        validate: function (value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('password cannot include "password"')
            }
        },
        trim: true
    },
    email: {
        type: String,
        validate: function (value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email not valid')
            }
        },
        required: true,
        unique: true,
        lowercase: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

userSchema.virtual('tasks', {
    ref: 'task',
    localField: '_id',
    foreignField: 'owner'
})




userSchema.pre('save', async function (next) {
    const user = this
    try {
        if (user.isModified('password')) {
            user.password = await bcrypt.hash(user.password, 8)
        }
        next()
    } catch (e) {
        console.log('pre save')
        console.log(e)
    }
})

userSchema.methods.generateAuthToken = async function (next) {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'israel')

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}



userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}

userSchema.statics.validatePassword = async (email, password) => {

    const user = await User.findOne({ email })
    if (!user) {
        throw new Error('Unable login!')
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        throw new Error('Unable login!')
    }
    return user

}

const User = mongoose.model('user', userSchema)





module.exports = {
    User
}