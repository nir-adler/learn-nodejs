const { app } = require('../src/app')
const request = require('supertest')
const { User } = require('../src/models/user')
const mongoose = require('mongoose')
const {  startDb,userOneId,userOne}=require('./fixtures/db')


beforeEach(startDb)

test('Should signup new user', async () => {
    const response = await request(app)
        .post('/users')
        .send({
            name: 'Guy Adler',
            email: 'guy@adler.com',
            password: '1234567'
        })
        .expect(201)
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    expect(response.body).toMatchObject({
        user: {
            name: 'Guy Adler',
            email: 'guy@adler.com',
        },
        token: user.tokens[0].token
    })
    expect(user.password).not.toBe('1234567')
})

test('Should login existing user', async () => {
    const response = await request(app)
        .post('/users/login')
        .send({
            email: 'nir@adler.com',
            password: '1234567'
        })
        .expect(200)
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()
    expect(response.body.token).toBe(user.tokens[1].token)
})

test('Should not login non exisiting user', async () => {
    await request(app)
        .post('/users/login')
        .send({
            email: 'dani',
            password: '1234567'
        })
        .expect(400)
})



test('Should get profile for user', async () => {

    await request(app)
        .get('/users')
        .set('authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
    expect(200)
})



test('Should not get profile for non existing user', async () => {
    await request(app)
        .get('/users')
        .set('authorization', `Bearer ${userOne.tokens[0].token.slice(0, userOne.tokens[0].token.length - 1)}z`)
        .send()
        .expect(401)
})

test('Should delete account for user', async () => {
    var response = await request(app)
        .delete('/users')
        .set('authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user).toBeNull()

    await request(app)
        .delete('/users')
        .set('authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(401)
})

test('Should not delete unauthorized user', async () => {
    await request(app)
        .delete('/users')
        .send()
        .expect(401)
})

test('Should upload avatar for user', async () => {
    await request(app)
        .post('/users/avatar')
        .set('authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', './tests/fixtures/profile-pic.jpg')
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user.avatar).not.toBeNull()
    expect(user.avatar).toEqual(expect.any(Buffer))
})

