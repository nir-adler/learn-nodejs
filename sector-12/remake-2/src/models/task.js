const mongoose=require('mongoose')

const taskSchema=new mongoose.Schema({
    description:{
        type:String,
        required:true,
        unique:true
    },
    completed:{
        type:Boolean,
        default:()=>false
    }
})


// taskSchema.pre('save',async function(next){
//     // const task=this




//     next()
// })

const Task=mongoose.model('Task',taskSchema)



module.exports={
    Task
}