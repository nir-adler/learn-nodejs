const express = require('express')
const chalk = require('chalk')
require('./db/mongoose')
const { router: taskRouter } = require('../src/routers/task')
const { router: userRouter } = require('../src/routers/user')


const app = express()


app.use(express.json())
app.use(taskRouter)
app.use(userRouter)


module.exports = {
    app
}