const express = require('express')
const port = process.env.PORT || 3000
const chalk = require('chalk')
require('./db/mongoose')
const { router: taskRouter } = require('../src/routers/task')
const { router: userRouter } = require('../src/routers/user')


const app = express()


app.use(express.json())
app.use(taskRouter)
app.use(userRouter)


app.listen(port, () => {
    console.log(chalk.green.inverse(`Server is up on port: ${port}`))
})


