const request = require('supertest')
const { app } = require('../src/app')
const { User } = require('../src/models/user')
const { Task } = require('../src/models/task')
const {
    userOne,
    userOneId,
    setUpDatabase
} = require('./db/db')



beforeEach(setUpDatabase)


test('Should create task for user', async () => {
    const response = await request(app).post('/task')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: 'new task'
        })
        .expect(201)

    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
    expect(task.completed).toEqual(false)
})

test('Should get tasks for user', async () => {
    const response = await request(app).get('/task')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    expect(response.body.length).toBe(3)

})

test('userone should not be able to delete usertwo task', async () => {
    const users = await User.find({})
    const tasks = await Task.find({ owner: users[0]._id.toString() })

    const response = await request(app).delete(`/task/${tasks[0]._id}`)
        .set('Authorization', `Bearer ${users[1].tokens[0].token}`)
        .send()
        .expect(422)


})