require('../src/db/mongoose')
const {Task}=require('../src/models/task')
//ObjectId("60f2917212736c34a7cf0ed5")
Task.findByIdAndDelete('60f2917212736c34a7cf0ed5').then((result)=>{
    console.log(result)
    return Task.countDocuments({completed:false})
}).then((result)=>{
    console.log(result)
}).catch((e)=>{
    console.log(e)
})


const deleteAndCount=async (_id)=>{
    try{
        await Task.findByIdAndDelete('60f28caf724c3e2faa961614')
        const count=await Task.listenerCount({completed:false})
        return count

    }catch(e){
        return e
    }
}

//ObjectId("60f28caf724c3e2faa961614")
deleteAndCount()