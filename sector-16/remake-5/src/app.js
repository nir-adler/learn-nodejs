require('./db/mongoose')
const express = require('express')
const { router: userRouter } = require('./routes/user')
const { router: taskRoute } = require('./routes/task')
const { validate } = require('./middlewares/jwt')
const app = express()

app.use(express.json())
app.use(userRouter)
app.use(taskRoute)



module.exports={
    app
}