const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
})

const User = mongoose.model('Users', {
    name: {
        type: String
    },
    age: {
        type: Number
    }
})



// const me = new User({
//     name: 'Nir Adler',
//     age: 'sssss'
// })
//
// me.save().then(() => {
//     console.log(me)
// }).catch((error) => {
//     console.log(error)
// })