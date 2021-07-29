require('../src/db/mongoose')
const {Task}=require('../src/models/task')


const deleteAndCount=async (_id)=>{
    const task=await Task.findByIdAndDelete(_id)
    const count=await Task.countDocuments({completed:false})

    return count
}

const count=deleteAndCount("60f54ec81ec290b53b685e1f")

count.then((task)=>{
    console.log(task)
}).catch((e)=>{
    console.log(e)
})