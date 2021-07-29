require('../src/db/mongoose')
const {User}=require('../src/models/user')


// User.findByIdAndUpdate("60f28dd7b190ab3070e293fc",{age:1}).then((result)=>{
//     console.log(result)
//     return User.countDocuments({age:1})
// }).then((result)=>{
//     console.log(result)
// }).catch((e)=>{
//     console.log(e)
// })

const updateAndCount=async (_id,age)=>{
    try{
        await User.findByIdAndUpdate(_id,{age:1})
        const count=await User.countDocuments({age:1})
        return count
    }catch (e){
        return e
    }
}

updateAndCount('60f28dd7b190ab3070e293fc',1).then((result)=>{
    console.log(result)
}).catch((e)=>{

    console.log(e)
})

//findByIdAndUpdate
//ObjectId("60f28dd7b190ab3070e293fc")