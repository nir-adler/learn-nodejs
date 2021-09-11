require('./db/mongoose')
const express = require('express')
const chalk = require('chalk')
const { router: taskRouter } = require('./routers/task')
const { router: userRouter } = require('./routers/user')

const app = express()

app.use(express.json())
app.use(taskRouter)
app.use(userRouter)

module.exports = {
    app
}



