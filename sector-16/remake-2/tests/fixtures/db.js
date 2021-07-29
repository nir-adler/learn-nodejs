const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const { User } = require('../../src/models/user')
const { Task } = require('../../src/models/task')


const userOneId = mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: 'Nir Adler',
    email: 'nir@adler.com',
    password: '1234567',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_STRING)
    }]
}

const userTwoId = mongoose.Types.ObjectId()
const userTwo = {
    _id: userTwoId,
    name: 'Naama Adler',
    email: 'naama@adler.com',
    password: '1234567'
}

const taskOne = {
    description: 'task one',
    completed: true,
    owner: userOneId
}
const taskTwo = {
    description: 'task two',
    completed: false,
    owner: userOneId
}
const taskThree = {
    description: 'task three',
    completed: true,
    owner: userOneId
}
const taskFour = {
    description: 'task four',
    completed: true,
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

module.exports = {
    startDb,
    userOne,
    userOneId
}