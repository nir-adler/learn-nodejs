const { Task } = require('../../src/models/task')
const { User } = require('../../src/models/user')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const userOneId = new mongoose.Types.ObjectId()
const userOne = new User({
    _id: userOneId,
    name: 'Nir Adler',
    email: 'nir@adler.com',
    password: '123456',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_WORD)
    }]
})
const userTwoId = new mongoose.Types.ObjectId()
const userTwo = new User({
    _id: userTwoId,
    name: 'Naama Adler',
    email: 'naama@adler.com',
    password: '123456',
    tokens: [{
        token: jwt.sign({ _id: userTwoId }, process.env.JWT_WORD)
    }]
})

const taskOne = {
    description: 'first',
    completed: false,
    owner: userOneId
}
const taskTwo = {
    description: 'second',
    completed: true,
    owner: userOneId
}
const taskThree = {
    description: 'third',
    completed: true,
    owner: userOneId
}
const taskFour = {
    description: 'fourth',
    completed: false,
    owner: userTwoId
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


module.exports={
    startDb,
    userOne,
    userTwo,
    userOneId
}