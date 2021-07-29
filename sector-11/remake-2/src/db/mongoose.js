const mongoose = require('mongoose')

const url = 'mongodb://127.0.0.1:27017/task-manager-api-1'

mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).catch((e) => {
    console.log(e)
})


