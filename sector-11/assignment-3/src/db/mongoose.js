const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
})






// const payBills = new Task({
//     task: 'Pay bills',
//     completed: false
// })
//
// payBills.save().then(()=>{
//     console.log(payBills)
// }).catch(error=>{
//     console.log(error)
// })


// const me = new User({
//     name: '   Nir Adler   ',
//     email: 'MY@MEAD.IO',
//     password: '1234'
// })
//
// me.save().then(() => {
//     console.log(me)
// }).catch((error) => {
//     console.log(error)
// })