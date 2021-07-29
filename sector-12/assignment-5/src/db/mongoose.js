const validator = require('validator')
const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-apt', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify:false
}).then().catch((e)=>{
    console.log(e)
})





//
// const user = new User({
//     name: 'Nir Adler',
//     email: 'nir@n.com',
//     password: '12passwor3d123'
// })
//
// user.save().then(() => {
//     console.log(user)
// }).catch((e) => {
//     console.log(e)
// })
//
// const task = new Task({
//     description: 'call mom'
// })

// task.save().then(() => {
//     console.log(task)
// }).catch((e) => {
//     console.log(e)
// })