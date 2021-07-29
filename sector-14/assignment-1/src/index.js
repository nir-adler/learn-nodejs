const express = require('express')
const port = process.env.PORT || 3000
const chalk = require('chalk')
require('./db/mongoose')
const { User } = require('./models/user')
const { Task } = require('./models/task')
const { router: taskRouter } = require('../src/routers/task')
const { router: userRouter } = require('../src/routers/user')
const bcrypt = require('bcryptjs')

const app = express()

const multer = require('multer')
const upload = multer({
    dest: 'images'
})

app.post('/upload', upload.single('upload'), (req, res) => {
    res.send()
})






app.use(express.json())
app.use(taskRouter)
app.use(userRouter)


app.listen(port, () => {
    console.log(chalk.green.inverse(`Server is up on port: ${port}`))
})


const func = async () => {
    const hash = await bcrypt.hash('302909866', 8)

    const match = await bcrypt.compare(hash, '302909866')

    console.log(match)

    console.log(hash)
}

// func()



