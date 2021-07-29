const path=require('path')
const express = require('express')

console.log(__dirname)
console.log(path.join(__dirname,'..','public'))

const app = express()

app.use(express.static(path.join(__dirname,'../public')))

app.get('', (req, res) => {
    res.send('<h1>Weather</h1>')
})

app.get('/help', (req, res) => {
    res.send([{
        name:'Andrew'
    },{
        name:'Sara'
    }])
})

app.get('/about', (req, res) => {
    res.send('<h1>About page</h1>')
})

app.get('/weather', (req, res) => {
    res.send({
        page:'Weather'
    })
})

// app.com
// app.com/help
// app.com/about

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})