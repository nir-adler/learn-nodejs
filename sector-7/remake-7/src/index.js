const express=require('express')
const path=require('path')
const app=express()
const hbs=require('hbs')

const publicPath=path.join(__dirname,'../','./public')
const viewPath=path.join(__dirname,'../','./templates/views')
const partialsPath=path.join(__dirname,'../','./templates/partials')

app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicPath))


app.get('/',(req,res)=>{
    res.render('weather',{
        pageName:'Weather',
        publishName:'Nir Adler'

    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        pageName:'About',
        publishName:'Nir Adler'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        pageName:'help',
        publishName:'Nir Adler'
    })
})


app.get('/help/*',(req,res)=>{
    res.render('404',{
        pageName:'Error',
        error:'Help article not found.',
        publishName:'Nir Adler'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        pageName:'Error',
        error:'Page Not Found.',
        publishName:'Nir Adler'
    })
})

app.listen(3000,()=>{
    console.log('Server up on port 3000')
})