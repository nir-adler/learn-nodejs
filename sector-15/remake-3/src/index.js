const express = require('express')
require('./db/mongoose')
const chalk = require('chalk')
const { router: userRouter } = require('./routers/user')
const { router: taskRouter } = require('./routers/task')


const port = process.env.PORT 
const app = express()



app.use(express.json())
app.use(taskRouter)
app.use(userRouter)

app.listen(port, () => {
    console.log(chalk.inverse(`Server is up on port:${port}`))
})