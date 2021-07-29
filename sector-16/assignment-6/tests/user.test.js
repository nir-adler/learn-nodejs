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
    const response = await request(app).post('/users').send({
        name: 'Guy Adler',
        email: 'guy@adler.com',
        password: '1234567'
    }).expect(201)

    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()


    expect(response.body).toMatchObject({
        user: {
            name: 'Guy Adler',
            email: 'guy@adler.com'
        },
        token: user.tokens[0].token
    })

    expect(user.password).not.toBe('1234567')


})

test('Should login existing user', async() => {
    const response = await request(app).post('/users/login').send({
        email: 'dorit@adler.com',
        password: '1234567'
    }).expect(200)

    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()
    expect(response.body.token).toBe(user.tokens[1].token)

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

test('Should not get profile for unauthenticated user', async() => {
    await request(app)
        .get('/users')
        .send()
        .expect(401)
})

test('Should delete account for user', async() => {
    const response = await request(app)
        .delete('/users')
        .set('authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    const user = await User.findById(userOne._id)
    expect(user).toBeNull()
})

test('Should not delete unauthenticated user', async() => {
    await request(app)
        .delete('/users')
        .send()
        .expect(401)
})

test('Should upload avatar image', async() => {
    await request(app)
        .post('/users/avatar')
        .set('authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/profile-pic.jpg')
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer))
})