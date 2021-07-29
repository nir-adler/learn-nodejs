const path=require('path')
const express = require('express')

console.log(__dirname)
console.log(path.join(__dirname,'..','public'))

const app = express()

app.set('view engine','hbs')

app.use(express.static(path.join(__dirname,'../public')))

app.get('', (req, res) => {
    res.render('index',{
        title:'Weather App',
        name:'Nir Adler'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Nir Adler'
    })
})

app.get('/help', (req, res) => {
    res.send([{
        name:'Andrew'
    },{
        name:'Sara'
    }])
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})