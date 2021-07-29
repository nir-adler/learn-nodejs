const express = require('express')
const port = process.env.PORT || 3000
const chalk = require('chalk')
require('./db/mongoose')
const { User } = require('./models/user')
const { Task } = require('./models/task')
const {router:taskRouter}=require('../src/routers/task')
const {router:userRouter}=require('../src/routers/user')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')


const app = express()

app.use(express.json())
app.use(taskRouter)
app.use(userRouter)




app.listen(port, () => {
    console.log(chalk.green.inverse(`Server is up on port: ${port}`))
})


// const func=async()=>{
//     const token=await bcrypt.hash('niradler',8)
//     const isMatch=await bcrypt.compare('niradler',token)

//     console.log(isMatch)

//     console.log(token)

// }

// const func=async()=>{
//     const token=jwt.sign({_id:'302909866'},'niradler')

//     console.log(jwt.verify(token,'niradler'))

//     console.log(token)

// }

// func()




