const { app } = require('../src/app')
const request = require('supertest')
const { User } = require('../src/models/user')
const { Task } = require('../src/models/task')
const mongoose = require('mongoose')
const { startDb, userOneId, userOne } = require('./fixtures/db')


beforeEach(startDb)


test('Should create task for user', async () => {
    var response = await request(app)
        .post('/tasks')
        .set('authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: 'pay bills',
        })
        .expect(201)

    const tasks = await Task.find({})

    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
    expect(task).toMatchObject({
        description: 'pay bills'
    })

})



test('Should get all tasks for a user', async () => {
    response = await request(app)
        .get('/tasks')
        .set('authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
   
    expect(response.body.length).toBe(3)

})


test('Should not allow user one delete tasks of user two',async()=>{
    const user=await User.findOne({email:'benji@adler.com'}).populate('tasks')
  
    const response=await request(app)
        .delete(`/tasks/${encodeURIComponent(user.tasks[0]._id)}`)
        .set('authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(400)
    const task=await Task.findById(user.tasks[0])
    expect(task).not.toBeNull()
      
})


test('Should not create task with unvalid completed Boolean value',async()=>{
    const response=await request(app)
        .post('/tasks')
        .set('authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description:'call mom',
            completed:'aaaa'
        })
        .expect(400)
        
})


test('Should not update task with invalid completed',async()=>{
    const user=await User.findById(userOneId).populate('tasks')
    const response=await request(app)
        .patch(`/tasks/${user.tasks[0]._id}`)
        .send({
            completed:'aaaa'
        })
        .expect(401)
})

