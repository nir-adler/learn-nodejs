const request = require('supertest')
const { app } = require('../src/app')
const { User } = require('../src/models/user')
const mongoose = require('mongoose')
const { startDb, userOne, userOneId } = require('./fixtures/db')



beforeEach(startDb)


test('Should not delete user if unauthorized', async () => {
    const response=await request(app)
        .delete('/users')
        .set('authorization', `Bearer ${userOne.tokens[0].token}1`)
        .send()
        .expect(401)

    const user=await User.findById(userOneId)
    expect(user).not.toBeNull()
})


test('Should not update user with invalid email/password', async () => {
    let response = await request(app)
        .patch('/users')
        .set('authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            email: 'naama@adler.com'
        }).expect(400)

    const user = await User.findById(userOneId)
    expect(user).not.toBeNull()
    expect(user.email).toBe('nir@adler.com')

    response = await request(app)
        .patch('/users')
        .set('authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            password: '12'
        }).expect(400)

    response = await request(app)
        .patch('/users')
        .set('authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            password: 'password'
        }).expect(400)

})

test('Should not update user if unauthorized', async () => {
    const response = await request(app)
        .patch('/users')
        .set('authorization', `Bearer ${userOne.tokens[0].token}1`)
        .send({
            name: 'shani'
        })
        .expect(401)
    const user = await User.findById(userOneId)
    expect(user).not.toBeNull()
    expect(user.name).toBe('Nir Adler')
})

test('Should not signup user with invalid name/email/password', async () => {
    let response = await request(app)
        .post('/users')
        .send({
            name: 'ziv adler',
            email: 'ziv@adler',
            password: '1234567'
        })
        .expect(400)

    response = await request(app)
        .post('/users')
        .send({
            name: 'ziv adler',
            email: 'ziv@adler.com',
            password: '12'
        })
        .expect(400)

    response = await request(app)
        .post('/users')
        .send({
            name: 'ziv adler',
            email: 'ziv@adler.com',
            password: 'password'
        })
        .expect(400)

})


test('Should signup new user', async () => {
    const response = await request(app)
        .post('/users')
        .send({
            name: 'dorit@adler',
            email: 'dorit@adler.com',
            password: '1234567'
        })
        .expect(201)


    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    expect(response.body).toMatchObject({
        user: {
            name: 'dorit@adler',
            email: 'dorit@adler.com'
        },
        token: user.tokens[0].token
    })
    expect(user.password).not.toBe('1234567')
})

test('Should login exist user', async () => {
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

test('Should not login nonexist user', async () => {
    await request(app)
        .post('/users/login')
        .send({
            email: 'r@adler.com',
            password: '1234567'
        })
        .expect(404)
})

test('Should get profile for user', async () => {

    await request(app)
        .get('/users')
        .set('authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should not get profile for unauthorized user', async () => {
    await request(app)
        .get('/users')
        .set('authorization', `Bearer ${userOne.tokens[0].token}1`)
        .send()
        .expect(401)
})

test('Should delete account for user', async () => {
    const response = await request(app)
        .delete('/users')
        .set('authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    const user = await User.findById(userOneId)
    expect(user).toBeNull()
})

test('Should not delete unauthorized user', async () => {
    await request(app)
        .delete('/users')
        .set('authorization', `Bearer ${userOne.tokens[0].token}1`)
        .send()
        .expect(401)
})

test('Should upload avatar image', async () => {
    const response = await request(app)
        .post('/users/avatar')
        .set('authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/profile-pic.jpg')
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer))

})

test('Should update valid user fields', async () => {
    const response = await request(app)
        .patch('/users')
        .set('authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: 'Noa Adler',
            age: 20
        }).expect(200)
    const user = await User.findById(userOneId)
    expect(user.name).toBe('Noa Adler')

})

test('Should not update unvalid fields', async () => {
    const response = await request(app)
        .patch('/users')
        .set('authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            nae: 'Noa Adler',
        }).expect(400)
})

