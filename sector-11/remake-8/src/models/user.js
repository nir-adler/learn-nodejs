const mongoose=require('mongoose')

const User = mongoose.model('user', {
    name: {
        type: String,
        required: true
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
})



module.exports={
    User
}