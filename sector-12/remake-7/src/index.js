require('./db/mongoose')
const express = require('express')
const chalk = require('chalk')
// const { User } = require('./models/user')
// const { Task } = require('./models/task')
const {router:taskRouter}=require('./routers/task')
const {router:userRouter}=require('./routers/user')
const app = express()
const port = process.env.PORT || 3000


app.use(express.json())
app.use(taskRouter)
app.use(userRouter)







app.listen(port, () => {
    console.log(chalk.inverse.green(`Server up on port:${port}`))
})



