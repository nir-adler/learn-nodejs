const express=require('express')
const path=require('path')
const app=express()
const hbs=require('hbs')

const publicPath=path.join(__dirname,'../','./public')
const viewPath=path.join(__dirname,'../','./templates/views')
const partialsPath=path.join(__dirname,'../','./templates/partials')

const {
    geoLocation,
    getForcast
}=require('./api')

app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicPath))

app.get('/weather',(req,res)=>{
    const {address}=req.query
    if(!address){
        return res.status(422).send({error:'Need to provide address'})
    }
    

    geoLocation(address,(error,{latitude,longitude,placeName}={})=>{
        if(error){
            return res.status(400).send({error})
        }
    
        getForcast(latitude,longitude,(error,forcast)=>{
            if(error){
                return res.status(400).send({error})
            }
            // console.log(placeName)
            // console.log(forcast)
            res.send({placeName,forcast})
        })
    })

})

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