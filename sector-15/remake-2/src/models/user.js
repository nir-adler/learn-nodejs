const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { Task } = require('./task')


const schema = new mongoose.Schema({
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

    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer
    }
}, { timestamps: true })


schema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})



schema.methods.generateToken = async function() {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

schema.statics.login = async function(email, password) {

    const user = await User.findOne({ email })
    if (!user) {
        throw new Error('Unvalid login!')
    }
    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
        throw new Error('Unvalid login!')
    }
    return user
}

schema.methods.toJSON = function() {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}

schema.pre('remove', async function(next) {
    const user = this
    await Task.deleteMany({ owner: user._id })


    next()
})

schema.pre('save', async function(next) {


    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
        user.tokens = []

    }
    next()
})

const User = new mongoose.model('User', schema)



module.exports = {
    User
}