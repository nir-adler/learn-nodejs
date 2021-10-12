const request = require('supertest')
const { app } = require('../src/app')
const { User } = require('../src/models/user')
const {
    userOne,
    userOneId,
    setUpDatabase
} = require('./db/db')



beforeEach(setUpDatabase)


test('Should signup a new user', async () => {
    const response = await request(app).post('/user')
        .send({
            name: 'Guy Adler',
            email: 'guy@adler.com',
            password: '1234567'
        }).expect(201)

    console.log(response.body)
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    expect(response.body).toMatchObject({
        user: {
            name: 'Guy Adler',
            email: 'guy@adler.com'
        },
        token: user.tokens[0].token
    })

})

test('Should login existing user', async () => {
    const response = await request(app).post('/user/login')
        .send({
            email: 'nir@adler.com',
            password: '1234567'
        }).expect(200)

    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()
    expect(response.body.token).toBe(user.tokens[1].token)

})

test('Should not login nonexisting users', async () => {
    const response = await request(app).post('/user/login')
        .send({
            email: 'guy@adler.com',
            password: '1234567'
        }).expect(422)
})



test('Should get profile for user', async () => {
    const response = await request(app).get('/user')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})


test('Should delete account for user', async () => {
    const response = await request(app).delete('/user')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user).toBeNull()
})


test('Should save new token', async () => {
    const response = await request(app).post('/user/login')
        .send({
            email: 'nir@adler.com',
            password: '1234567'
        })
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user.tokens.find(({ token }) => token === token)).not.toBeNull()

})

test('Should not delete unauthenticated user', async () => {
    const resposne = await request(app).delete('/user')
        // .set('password', `Bearer ${userOne.tokens[0].token}1`)
        .send()
        .expect(422)
})


test('Should upload avatar image', async () => {
    const response = await request(app).post('/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', './tests/images/fall.jpg')
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer))

})


test('Should update valid user fields', async () => {
    const response = await request(app).patch('/user')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name:'benji adler',
        })
        .expect(200)

    const user=await User.findById(userOneId)
    expect(user.name).toEqual('benji adler')
})


test('Should not update unvalid field/s!',async()=>{
    const response = await request(app).patch('/user')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            aaaa:'benji adler',
        })
        .expect(422)

})