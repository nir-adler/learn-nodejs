const {Task}=require('../src/models/task')
require('../src/db/mongoose')


Task.findByIdAndDelete('610672c653312d7301262d6e').then((user)=>{
    console.log(user)

    return Task.countDocuments({completed:false})
}).then((count)=>{
    console.log(count)
}).catch((e)=>{
    console.log(e)
})