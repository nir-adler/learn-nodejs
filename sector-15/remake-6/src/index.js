require('./db/mongoose')
const express = require('express')
const { router: userRouter } = require('./routes/user')
const { router: taskRoute } = require('./routes/task')
const { validate } = require('./middlewares/jwt')
const multer = require('multer')
const upload = multer({
    dest: './images',
    fileFilter: function (req, file, cb) {
        if (!file.originalname.match(/\.(.png|jpg)/)) {
            return cb(new Error('Please upload a image file!'))
        }
        cb(undefined, true)
    }
})
// console.log(upload)


const app = express()


app.use(express.json())
// app.use(validate)
app.use(userRouter)
app.use(taskRoute)






app.get('*', (req, res) => {
    res.send('*******')
})


app.listen(3000, () => {
    console.log('Server up on port 3000')
})