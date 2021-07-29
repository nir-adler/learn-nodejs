require('../src/db/mongoose')
const {User} = require('../src/models/user')

User.findByIdAndUpdate("60f0507e8bbffc276409f164", {age: 1}).then(user => {
    console.log(user)
    return User.countDocuments({age:1})
}).then(result=>{
    console.log(result)
}).catch(e=>{
    console.log(e)
})





