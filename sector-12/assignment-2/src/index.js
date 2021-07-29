require('./db/mongoose')
const chalk = require('chalk')
const { Task } = require('./models/task')
const { User } = require('./models/user')
const { ObjectId } = require('mongoose')
const { userRouter } = require('./routers/user')
const { taskRouter } = require('./routers/task')
const express = require('express')


const app = express()
const port = process.env.PORT || 3000


app.use((req, res, next) => {
    if (req.method === 'GET') {
        res.send({ error: 'GET requests are disabled' })
    } else {
        next()
    }
})


app.use(express.json())
app.use(userRouter)
app.use(taskRouter)





app.listen(port, () => {
    console.log(chalk.inverse.green('Server is up on port ' + port))
})

const jwt = require('jsonwebtoken')

const myFunction = async () => {
    const token = jwt.sign({ _id: 'abc123' }, 'thisismynewcourse', { expiresIn: '7 days' })
    console.log(token)

    const data = jwt.verify(token, 'thisismynewcourse')
    console.log(data)
}

myFunction()

// const bcrypt = require('bcryptjs')
//
// const myFunction = async () => {
//     const password = 'Red12345!'
//
//     const hashedPassword = await bcrypt.hash(password, 8)
//     console.log(password)
//     console.log(hashedPassword)
//
//     const isMatch = await bcrypt.compare('Red12345!',hashedPassword)
//     console.log(isMatch)
// }

// myFunction()