const request = require('supertest')
const { Task } = require('../src/models/task')
const { app } = require('../src/app')
const { userOneId, userOne, setupDatabase } = require('./fixtures/db')



beforeEach(setupDatabase)



test('Should create task for user', async() => {
    const response = await request(app)
        .post('/tasks')
        .set('authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: 'call 2'
        })
        .expect(201)

    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
    expect(task.completed).toEqual(false)

})