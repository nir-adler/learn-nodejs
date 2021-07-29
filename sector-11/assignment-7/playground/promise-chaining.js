require('../src/db/mongoose')
const {User} = require('../src/models/user')

// User.findByIdAndUpdate("60f0507e8bbffc276409f164", {age: 1}).then(user => {
//     console.log(user)
//     return User.countDocuments({age: 1})
// }).then(result => {
//     console.log(result)
// }).catch(e => {
//     console.log(e)
// })
//ObjectId("60f050a033652c27a17d6b6a")
const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, {age: 1})
    const countAge=await User.countDocuments({age: age})
    return countAge
}

updateAgeAndCount('60f050a033652c27a17d6b6a',1).then(count=>{
    console.log(count)
}).catch(e=>{
    console.log(e)
})



