const mongoose = require('mongoose')
const validator=require('validator')

const url = 'mongodb://127.0.0.1:27017/manager-api'

mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).catch((e) => {
    console.log(e)
})



// const user=new User({
//     name:'Nir Adler',
//     password:'1234567',
//     email:'nir@n.com'
// })

// user.save().then(()=>{
//     console.log(user)
// }).catch((e)=>{
//     console.log(e)
// })




// const task=new Task({
//     description:'Fix ac'
// })

// task.save().then(()=>{
//     console.log(task)
// }).catch((e)=>{
//     console.log(e)
// })