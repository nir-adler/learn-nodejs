require('../src/db/mongoose')
const mongoose=require('mongoose')
const {Task}=require('../src/models/task')

const deleteTaskAndCount=async (id)=>{
    await Task.findByIdAndDelete(id)
    const count=await Task.countDocuments({completed:false})
    return count
}


deleteTaskAndCount("60f17693210de4827ed7941d").then((result)=>{
    console.log(result)
}).catch((e)=>{
    console.log(e)
})