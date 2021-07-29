const request = require('supertest')
const { app } = require('../src/app')
const { User } = require('../src/models/user')
const { Task } = require('../src/models/task')
const mongoose = require('mongoose')
const { startDb, userOne, userOneId } = require('./fixtures/db')


beforeEach(startDb)


test('Should create task for user', async () => {
    const response = await request(app)
        .post('/tasks')
        .set('authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: 'task five',
            completed: false
        }).expect(201)
    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
    expect(task.completed).toBe(false)
})

test('Should get all tasks for userOne', async () => {
    const response=await request(app)
        .get('/tasks')
        .set('authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    expect(response.body.length).toBe(3)
})

test('Should not allow user one deleted tasks of user two',async()=>{
    const userTwo=await User.findOne({email:'naama@adler.com'})
    await userTwo.populate('tasks').execPopulate()
    const response=await request(app)
        .delete(`/tasks/${encodeURIComponent(userTwo.tasks[0]._id)}`)
        .send()
        .expect(401)

    const task=await Task.findById(userTwo.tasks[0]._id)
    expect(task).not.toBeNull()
})