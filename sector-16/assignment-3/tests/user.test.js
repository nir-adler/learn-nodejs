const request = require('supertest')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const { app } = require('../src/app')
const { User } = require('../src/models/user')


const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: 'Mike',
    email: 'mike@example.com',
    password: '123456',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }]
}

beforeEach(async() => {
    await User.deleteMany()
    await new User(userOne).save()
})

// afterEatch(() => {
//     console.log('afterEatch')
// })


test('Should signup a new user', async() => {
    await request(app).post('/users').send({
        name: 'Dorit Adler',
        email: 'dorit@adler.com',
        password: '123456'
    }).expect(201)
})


test('Should login existing user', async() => {
    await request(app).post('/users/login').send({
        email: 'dorit@adler.com',
        password: '123456'
    }).expect(200)
})


test('Should not login nonexistent user', async() => {
    await request(app).post('/users/login').send({
        email: 'mike@example.com',
        password: '123456'
    })
})

test('Should get profile for user', async() => {

    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})