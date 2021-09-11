// findByIdAndUpdate update age and ocunt 

require('../src//db/mongoose')
const {User}=require('../src/models/user')

const updateAndCount=async (id,age)=>{
    const user=await User.findByIdAndUpdate(id,{age})
    // console.log(user)
    const count =await User.countDocuments({age:1})
    return count
}

updateAndCount('610673aabed299736c7a9842',3).then((count)=>{
    console.log(count)
})
