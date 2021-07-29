const express = require('express')
require('./db/mongoose')
const chalk = require('chalk')
const { router: userRouter } = require('./routers/user')
const { router: taskRouter } = require('./routers/task')
const multer=require('multer')

const upload=multer({
    dest:'./images/',
    limits:{
        // fileSize:1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(png|jepg|jpg)/)){
            cb(new Error('file need to be image type'),undefined)
        }
        cb(undefined,true)
    }
})


const port = process.env.PORT || 3000
const app = express()



app.use(express.json())
app.use(taskRouter)
app.use(userRouter)

app.listen(port, () => {
    console.log(chalk.inverse(`Server is up on port:${port}`))
})