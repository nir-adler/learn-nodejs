const express = require('express')
const path = require('path')
const hbs = require('hbs')
const {geocode, weather} = require('./geolocation')


const app = express()
const port = process.env.PORT || 3000

const viewPath = path.join(__dirname, '../templates/views')
const partielsPath = path.join(__dirname, '../templates/partiels')

// console.log(__dirname)
app.use(express.static(path.join(__dirname, '../public')))

app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partielsPath)

app.get('/', (req, res) => {
    res.render('index', {
        pageName: 'Weather',
        name: 'Nir Adler'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({error: 'Address was not provide'})
    }

    geocode(req.query.address, (error, {latitude, longitude, location}={}) => {
        if (error) {
            return res.send({error})
        }

        weather(latitude, longitude, (error, {temperature,rain}={}) => {
            if (error) {
                return res.send({error})
            }

            res.send({
                temperature,
                rain,
                location
            })
        })
    })


})

app.get('/about', (req, res) => {
    res.render('about', {
        pageName: 'About',
        name: 'Nir Adler'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        pageName: 'help',
        name: 'Nir Adler'
    })
})


app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        error: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        error: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port: '+port)
})

