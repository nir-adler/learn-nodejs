const mongoose = require('mongoose')



mongoose.connect('mongodb://127.0.0.1:27017/manager', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    autoIndex: true,
})
    .then((r) => console.log('mongoose connected successfully'))
    .catch((e) => console.log(e))

mongoose.connection.on('error', (e) => {
    console.log(e)
})




