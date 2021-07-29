const express = require('express')
const path = require('path')
const hbs = require('hbs')
const {geocode, weather} = require('./geolocation')

const app = express()

const viewPath = path.join(__dirname, '../templates/views')
const partielsPath = path.join(__dirname, '../templates/partiels')

// console.log(__dirname)
app.use(express.static(path.join(__dirname, '../public')))

app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partielsPath)

app.get('/', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'No address been provided!'
        })
    }

    geocode(argv.address, (error, data) => {
        if (error) {
            return console.log(error)
        }
        weather(data, (error, data) => {
            if (error) {
                return console.log(error)
            }
            console.log(data)
        })
    })


    res.render('index', {
        pageName: 'Weather',
        name: 'Nir Adler',
        address: req.query.address
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

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})

