require('./db/mongoose')
const chalk = require('chalk')
const {Task} = require('./models/task')
const {User} = require('./models/user')
const {ObjectId} = require('mongoose')
const {userRouter}=require('./routers/user')
const {taskRouter}=require('./routers/task')
const bcrypt=require('bcryptjs')



const express = require('express')
const app = express()
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

const port = process.env.PORT || 3000





app.listen(port, () => {
    console.log(chalk.inverse.green('Server is up on port ' + port))
})



// const hashfunc=async()=>{
//     const h=await bcrypt.hash('aaa',8)
//     console.log(h)

//     const isMatch=await bcrypt.compare('aaaa',h)
//     console.log(isMatch)


// }

// hashfunc()