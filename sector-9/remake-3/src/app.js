const express = require('express')
const path = require('path')
const hbs = require('hbs')
const app = express()
const { getGeolocation, getForcast } = require('./geoLocation')
const port = process.env.PORT || 3000

const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

app.use(express.static(path.join(__dirname, '../public')))

app.get('/weather', (req, res) => {
    const { address } = req.query
    if (!address) {
        return res.status(422).send({ error: 'Provide address.' })
    }
    getGeolocation(address, (error, { placeName, latitude, longitude } = {}) => {
        if (error) {
            return res.status(404).send({ error })
        }
        getForcast(latitude, longitude, (error, forcast) => {
            if (error) {
                return res.status(404).send({ error })
            }
            res.send({ placeName, forcast })
        })
    })
})

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Nir Adler'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Nir Adler'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'Nir Adler'
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
    console.log('Server up on port 3000')
})