const express = require('express')
const port = process.env.PORT || 3000
const chalk = require('chalk')
require('./db/mongoose')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const { User } = require('./models/user')
const { Task } = require('./models/task')
const {router:taskRouter}=require('../src/routers/task')
const {router:userRouter}=require('../src/routers/user')

const app = express()

app.use(express.json())
app.use(taskRouter)
app.use(userRouter)




app.listen(port, () => {
    console.log(chalk.green.inverse(`Server is up on port: ${port}`))
})








const func=async()=>{
    // const hash=await bcrypt.hash('ride2021',8)
    // console.log(hash)
    // const match=await bcrypt.compare('ride2021',hash)
    // console.log(match)

    const token=jwt.sign({_id:'12345'},'thisismyname')
    console.log(token)
    const data=jwt.verify(token,'thisismyname')
    console.log(data)

}


// func()

