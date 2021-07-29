//findByIdAndUpdate find by id update age to 1 and find by id update

require('../src/db/mongoose')
const {User}=require('../src/models/user')

// const findAndCount=(_id,age)=>{
//     User.findByIdAndUpdate(_id,{age}).then((user)=>{
//         if(!user){
//             return console.log('User id not found');
//         }
//         console.log(user)
//         User.countDocuments({age}).then(())
//     })


// }

User.findByIdAndUpdate("60f3f2ae8b3b591e9390d776",{age:1}).then((user)=>{
    console.log(user)
    return User.countDocuments({age:1})
}).then((count)=>{
    console.log(count)
}).catch((e)=>{
    console.log(e)
})