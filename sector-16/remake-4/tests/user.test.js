const { User } = require('../src/models/user')
const request = require('supertest')
const { app } = require('../src/app')
const { startDb, userOne, userTwo, userOneId } = require('./fixtures/db')

beforeEach(startDb)

test('Should signup new user', async () => {
    const response = await request(app)
        .post('/users')
        .send({
            name: 'Guy Adler',
            email: 'guy@adler.com',
            password: '123456'
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
    expect(user.password).not.toBe('123456')
})

test('Should login existing user', async () => {
    const response = await request(app)
        .post('/users/login')
        .send({
            email: 'nir@adler.com',
            password: '123456'
        })
        .expect(200)
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()
    expect(user).toMatchObject({
        _id: userOneId
    })
    expect(response.body.token).toBe(user.tokens[1].token)
})

test('Should not login nonexisting user', async () => {
    await request(app)
        .post('/users/login')
        .send({
            email: 'nir@adler.com',
            password: '123457'
        })
        .expect(400)
})

test('Should get user profile', async () => {
    await request(app)
        .get('/users')
        .set('authorization', `Bearer ${userOne.tokens[0].token}`)
        .expect(200)
})

test('Should not get unauthorization user profile', async () => {
    await request(app)
        .get('/users')
        .set('authorization', `Bearer ${userOne.tokens[0].token.slice(0, userOne.tokens[0].token.length - 1)}a`)
        .expect(401)
})

test('Should delete account for user', async () => {
    const response = await request(app)
        .delete('/users')
        .set('authorization', `Bearer ${userOne.tokens[0].token}`)
        .expect(200)

    const user = await User.findById(response.body._id)
    expect(user).toBeNull()

})


test('Should not delete unauthenticated user', async () => {
    await request(app)
        .delete('/users')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}a`)
        .expect(401)
})

test('Should upload user avatar', async () => {
    const response = await request(app)
        .post('/users/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/profile-pic.jpg')
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user.avatar).not.toBeNull()
    expect(user.avatar).toEqual(expect.any(Buffer))

})


test('Should update valid user fileds', async () => {
    const response = await request(app)
        .patch('/users')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name:'ziv',
            email:'ziv@ziv.com',
        })
        .expect(200)
    const user=await User.findById(response.body._id)
    expect(user).toMatchObject({
        name:'ziv',
        email:'ziv@ziv.com',
    })
})

test('Should not update unvalid fields', async () => {
    const response = await request(app)
        .patch('/users')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            something:'ziv',
            // email:'ziv@ziv.com',
        })
        .expect(405)
 
})

