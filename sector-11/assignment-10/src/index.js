require('./db/mongoose')
const chalk = require('chalk')
const {Task} = require('./models/task')
const {User} = require('./models/user')
const {ObjectId} = require('mongoose')
const {userRouter}=require('./routers/user')
const {taskRouter}=require('./routers/task')



const express = require('express')
const app = express()
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

const port = process.env.PORT || 3000





app.listen(port, () => {
    console.log(chalk.inverse.green('Server is up on port ' + port))
})