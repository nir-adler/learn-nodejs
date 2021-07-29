//find user by id update age and cound users with age of 1

require('../src/db/mongoose')
const { User } = require('../src/models/user')


User.findByIdAndUpdate("60fc04d97d59c197c8a93c22", { age: 2 }).then((user) => {
    console.log(user)
    return User.countDocuments({ age: 1 })
}).then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})