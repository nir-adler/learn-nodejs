require('../src/db/mongoose')
const {Task} = require('../src/models/task')

//ObjectId("ObjectId("60f06560a730a83947dfa90c")")

// Task.findOneAndRemove("60f06560a730a83947dfa90c").then(task=>{
//     console.log(task)
//     return Task.countDocuments({completed:false})
// }).then(result=>{
//     console.log(result)
// }).catch(e=>{
//     console.log(e)
// })
//ObjectId("60f06567a730a83947dfa91a")

const deleteAndCountCompletedTask=async (id,flag)=>{
    const task=await Task.findByIdAndDelete(id)
    const count=await Task.countDocuments({completed:flag})
    return count
}

deleteAndCountCompletedTask("60f06567a730a83947dfa91a",true).then((count)=>{
    console.log(count)
}).catch((e)=>{
    console.log(e)
})