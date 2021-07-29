const express=require('express')
const path=require('path')
const hbs = require('hbs')

const app = express()

const viewsPath=path.join(__dirname,'../template/views')
const partialsPath=path.join(__dirname,'../template/partials')

app.use(express.static(path.join(__dirname,'../public')))

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)


app.get('/',(req,res)=>{
    res.render('index',{
        pageName:'Weather'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        pageName:'About'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        pageName:'Help'
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        error:'Help article not found.',
        pageName:'404'
    })
})

app.get('/*',(req,res)=>{
    res.render('404',{
        error:'Page not fnoud',
        pageName:'404'
    })
})



app.listen(3000,()=>{
    console.log('Server is up on port 3000')
})