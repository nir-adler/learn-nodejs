const request = require('supertest')
const { Task } = require('../src/models/task')
const { app } = require('../src/app')
const { User } = require('../src/models/user')
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

test('Should get all tasks for userOne', async() => {
    const response = await request(app)
        .get('/tasks')
        .set('authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    expect(response.body.length).toBe(2)
})


test('Should not allowed user one delete task of user two', async() => {
    const user = await User.findOne({ email: 'naama@adler.com' })
    await user.populate('tasks').execPopulate()

    const response = await request(app)
        .delete(`/tasks/${encodeURIComponent(user.tasks[0]._id)}`)
        .set('authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(400)
    const task = await Task.findById(user.tasks[0]._id)
    expect(task).not.toBeNull()
})