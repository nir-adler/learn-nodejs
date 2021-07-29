const express = require('express')
require('./db/mongoose')
const chalk = require('chalk')
const { router: userRouter } = require('./routers/user')
const { router: taskRouter } = require('./routers/task')


const app = express()



app.use(express.json())
app.use(taskRouter)
app.use(userRouter)

module.exports = { app }