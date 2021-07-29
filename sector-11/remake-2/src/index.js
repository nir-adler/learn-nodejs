require('./db/mongoose')
const {Task} = require('./models/task')
const {User} = require('./models/user')
const express = require('express')
const chalk = require('chalk')
const {taskRouter}=require('./routers/task')
const {userRouter}=require('./routers/user')
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(taskRouter)
app.use(userRouter)







app.listen(port, () => {
    console.log(chalk.inverse.green(`Server up on port:${port}`))
})