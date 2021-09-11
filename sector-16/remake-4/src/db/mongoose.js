const mongoose = require('mongoose')


// const url = `mongodb://127.0.0.1:27017/task-manager-api`
// console.log(process.env.MONGODB_URL)
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify:false
})
    .catch((e) => {
        console.log(e)
    })


// const user = new User({
//     name: 'Nir Adler',
//     email: 'nir@adler.com',
//     password: '123456'
// })

// user.save().then(() => {
//     console.log(user)
// }).catch((e) => {
//     console.log(e)
// })





// const task = new Task({
//     description: 'call mom',
// })

// task.save().then(() => {
//     console.log(task)
// }).catch((e) => {
//     console.log(e)
// })