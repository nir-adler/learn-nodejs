const {Task}=require('../src/models/task')
require('../src/db/mongoose')

const deleteAndCount= async(_id)=>{
    const task= await Task.findByIdAndDelete(_id)
    console.log(task)
    const count=await Task.countDocuments({completed:false})
    return count
}

deleteAndCount('60f3fbc516edd026d60e0ca4').then((count)=>{
    console.log(count)
}).catch((e)=>{
    console.log(e)
})