require('../src/db/mongoose')
const {Task} = require('../src/models/task')

//ObjectId("ObjectId("60f06560a730a83947dfa90c")")

Task.findOneAndRemove("60f06560a730a83947dfa90c").then(task=>{
    console.log(task)
    return Task.countDocuments({completed:false})
}).then(result=>{
    console.log(result)
}).catch(e=>{
    console.log(e)
})