const { Task } = require('../src/models/task')
const request = require('supertest')
const { app } = require('../src/app')
const { startDb, userOne, userTwo, userOneId } = require('./fixtures/db')
const { User } = require('../src/models/user')
const typeOf = require('typeof')

beforeEach(startDb)

test('Should create task for user', async () => {
    const resposne = await request(app)
        .post('/tasks')
        .set('authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: 'five',
            owner: userTwo._id
        })
        .expect(201)
    const task = await Task.findById(resposne.body._id)
    expect(task).not.toBeNull()
    expect(task.completed).toBe(false)
})


test('Should get all tasks for userOne', async () => {
    const response = await request(app)
        .get('/tasks')
        .set('authorization', `Bearer ${userOne.tokens[0].token}`)
        .expect(200)
    expect(response.body.length).toBe(3)
})

test('Should not allowed userOne delete tasks of user two', async () => {
    const tasks = await Task.find({ owner: userTwo._id })
    const reposne = await request(app)
        .delete(`/tasks/${tasks[0]._id}`)
        .set('authorization', `Bearer ${userOne.tokens[0].token}`)
        .expect(400)
    const task = await Task.findById(tasks[0]._id)
    expect(task).not.toBeNull()
})


test('Should delete user task', async () => {
    const user = await User.findById(userOneId).populate('tasks')
    // console.log(user.tasks)
    const response = await request(app)
        .delete(`/tasks/${user.tasks[0]._id}`)
        .set('authorization', `Bearer ${userOne.tokens[0].token}`)
        .expect(200)
    const task = await Task.findById(response.body._id)
    expect(task).toBeNull()
    // console.log(response.body)

})

test('Should not delete task if unauthenticated', async () => {
    const user = await User.findById(userOneId).populate('tasks')
    const response = await request(app)
        .delete(`/tasks/${user.tasks[0]._id}`)
        // .set('authorization', `Bearer ${userOne.tokens[0].token}`)
        .expect(401)
    const task = await Task.findById(user.tasks[0]._id)
    expect(task).not.toBeNull()
})

test('Should not update other users tasks', async () => {
    const tasks = await Task.find({ owner: userTwo._id })

    const resposne = await request(app)
        .patch(`/tasks/${tasks[0]._id}`)
        .set('authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            completed: true
        })
        .expect(404)

    expect(tasks[0].completed).toBe(false)

})

test('Should fetch user task by id', async () => {
    const user = await User.findById(userOneId).populate('tasks')
    const response = await request(app)
        .get(`/tasks/${user.tasks[0]._id}`)
        .set('authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    expect(response.body._id).toBe(user.tasks[0]._id.toString())
})


test('Should not fetch user task by id if unauthenticated', async () => {
    const user = await User.findById(userOneId).populate('tasks')
    const response = await request(app)
        .get(`/tasks/${user.tasks[0]._id}`)
        // .set('authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(401)

    // expect(response.body._id).toBe(user.tasks[0]._id.toString())
})

test('Should not fetch user task by id if unauthenticated', async () => {
    const user = await User.findById(userTwo._id).populate('tasks')
    const response = await request(app)
        .get(`/tasks/${user.tasks[0]._id}`)
        .set('authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(404)

    // expect(response.body._id).toBe(user.tasks[0]._id.toString())
})

test('Should fetch only completed tasks', async () => {
    const response = await request(app)
        .get('/tasks?completed=true')
        .set('authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    expect(response.body.every((task) => task.completed === true)).toBe(true)

})

test('Should fetch only incompleted tasks', async () => {
    const response = await request(app)
        .get('/tasks?completed=false')
        .set('authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    expect(response.body.every((task) => task.completed === false)).toBe(true)

})


test('Should sort tasks by createdAt', async () => {
    const response=await request(app)
        .get('/tasks?sortBy=createdAt:desc')
        .set('authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    // console.log(response.body)
    const date1=new Date(response.body[0].createdAt)
    const date2=new Date(response.body[1].createdAt)
    const date3=new Date(response.body[2].createdAt)
    expect(date1>date2).toBe(true)
    expect(date2>date3).toBe(true)

})

test('Should fetch page of tasks',async()=>{
    const response=await request(app)
    .get('/tasks?limit=1')
    .set('authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)

    expect(response.body.length).toBe(1)
})

