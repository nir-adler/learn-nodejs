const request = require('supertest')
const { app } = require('../src/app')
const { User } = require('../src/models/user')

const userOne = {
    name: 'Mike',
    email: 'mike@example.com',
    password: '123456'
}

beforeEach(async () => {
    await User.deleteMany()
    await new User(userOne).save()
})

// afterEatch(() => {
//     console.log('afterEatch')
// })


test('Should signup a new user', async () => {
    await request(app).post('/users').send({
        name: 'Dorit Adler',
        email: 'dorit@adler.com',
        password: '123456'
    }).expect(201)
})

test('Should login existing user', async () => {
    await request(app).post('/users/login').send({
        email: 'mike@example.com',
        password: '123456'
    }).expect(200)
})
