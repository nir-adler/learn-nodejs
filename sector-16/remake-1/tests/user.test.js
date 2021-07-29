const request = require('supertest')
const { app } = require('../src/app')
const { User } = require('../src/models/user')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const userOneId = mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: 'Dorit Adler',
    email: 'dorit@adler.com',
    password: '1234567',
    tokens: [{ token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET) }]
}

beforeEach(async() => {
    await User.deleteMany({})
    const user = new User(userOne)

    await user.save()
})


test('Should signup new user', async() => {
    await request(app).post('/users').send({
        name: 'Guy Adler',
        email: 'guy@adler.com',
        password: '1234567'
    }).expect(201)
})

test('Should login existing user', async() => {
    await request(app).post('/users/login').send({
        email: 'dorit@adler.com',
        password: '1234567'
    }).expect(200)
})

test('Should not login non existing user', async() => {
    await request(app).post('/users/login').send({
        email: 'dani@adler.com',
        password: '1234567'
    }).expect(400)
})


test('Sholud get profile for user', async() => {
    await request(app)
        .get('/users')
        .set('authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})