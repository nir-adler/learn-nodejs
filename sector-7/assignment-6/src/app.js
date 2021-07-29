const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

// Define paths for express config
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlers engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Nir Adler'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Nir Adler'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'Nir Adler'
    })

})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        errorText:'Help article not found'
    })
})

app.get('*', (req,res) => {
    res.render('404',{
        errorText:'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})