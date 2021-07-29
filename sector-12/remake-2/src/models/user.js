const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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
            required: true
        }
    }]
})

userSchema.statics.findByCredentials=async(email,password)=>{
    const user=await User.findOne({email})
    if(!user){
        throw new Error('Unable to login')
    }

    const isMatch=await bcrypt.compare(password,user.password)

    if(!isMatch){
        throw new Error('Unable to login')
    }

    return user
}

userSchema.methods.generateAuthentication = async function () {
    const user = this

    const token = jwt.sign({ _id: this._id.toString() }, 'mynameisniradler')

    user.tokens.concat({ token })
    await user.save()

    return token
}


userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified("password")) {
        user.password = await bcrypt.hash(this.password, 8)
    }


    console.log('before saving')
    next()
})

const User = mongoose.model('User', userSchema)


module.exports = {
    User
}