const mongoose = require('mongoose')
const { User } = require('../../src/models/user')
const { Task } = require('../../src/models/task')
const jwt = require('jsonwebtoken')

const userOneId = mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: 'Nir Adler',
    email: 'nir@adler.com',
    password: '1234567',
    tokens: [
        { token: jwt.sign({ _id: userOneId }, process.env.JWT_STRING) }
    ]
}


const userTwoId = mongoose.Types.ObjectId()
const userTwo = {
    _id: userTwoId,
    name: 'Benji Adler',
    email: 'benji@adler.com',
    password: '1234567',
    tokens: [
        { token: jwt.sign({ _id: userTwoId }, process.env.JWT_STRING) }
    ]
}

const taskOne={
    description:'first',
    completed:false,
    owner:userOneId
}

const taskTwo={
    description:'two',
    completed:true,
    owner:userOneId
}
const taskThree={
    description:'third',
    completed:false,
    owner:userOneId
}
const taskFour={
    description:'fourth',
    completed:true,
    owner:userTwoId
}

const startDb = async () => {
    await User.deleteMany({})
    await Task.deleteMany({})
    await new User(userOne).save()
    await new User(userTwo).save()
    await new Task(taskOne).save()
    await new Task(taskTwo).save()
    await new Task(taskThree).save()
    await new Task(taskFour).save()
}



module.exports = {
    startDb,
    userOneId,
    userOne
}