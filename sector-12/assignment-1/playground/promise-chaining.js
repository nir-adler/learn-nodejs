require('../src/db/mongoose')
const {User} = require('../src/models/user')

const updateByIdAndCount = async (id, age) => {

    await User.findByIdAndUpdate(id, {age: 1})
    const count = await User.countDocuments({age:age})
    return count
}

updateByIdAndCount("60f17b6888b24988f487b7d2",1).then((result)=>{
    console.log(result)
}).catch((e)=>{
    console.log(e)
})