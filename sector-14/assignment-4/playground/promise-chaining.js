// find user by id and updtae his age, count all users woth age of 1
require('../src/db/mongoose')

const { User } = require('../src/models/user')

const updateAndCount=async(_id)=>{
    const user=await User.findByIdAndUpdate({_id},{age:2})
    const count=await User.countDocuments({age:1})

    return count
}


const count=updateAndCount("60f54e49adca9cb4e2ce339e")

count.then((sum)=>{
    console.log(sum)
}).catch((e)=>{
    conslog.log(e)
})