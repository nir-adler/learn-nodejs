const express = require('express')
const chalk = require('chalk')
require('./db/mongoose')
const { User } = require('./models/user')
const { Task } = require('./models/task')
const {taskRouter}=require('./routers/task')
const port = process.env.PORT || 3000
const app = express()

app.use(express.json())
app.use(taskRouter)





app.listen(port, () => {
    console.log(chalk.inverse.green(`Server up on port ${port}`))
})





