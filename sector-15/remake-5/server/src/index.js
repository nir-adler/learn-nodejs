const express = require('express')
const mongoose = require('mongoose')
const app = express()

const url='mongodb+srv://taskapp:Ride2021up2022@cluster0.ezxmq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

mongoose.connect(url,{
    
})

app.listen(3000, () => {
    console.log('Server up on port 3000')
})




