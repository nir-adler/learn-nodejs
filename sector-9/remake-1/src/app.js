const express = require('express')
const chalk = require('chalk')
const path = require('path')
const hbs = require('hbs')
const {getForcast, geoLocation} = require('./geolocation')

const app = express()

const port = process.env.PORT || 3000

const viewsPath = path.join(__dirname, '../template/views')
const partialsPath = path.join(__dirname, '../template/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(path.join(__dirname, '../public')))

app.get('/', (req, res) => {
    res.render('index', {
        pageName: 'Weather'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        pageName: 'About'
    })
})

app.get('/help', (req, res) => {
    res.render('index', {
        pageName: 'Help'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({error: 'Address not provided!'})
    }
    geoLocation(req.query.address, (error, {location, latitude, longitude} = {}) => {
        if (error) {
            return res.status(500).send({error})
        }
        getForcast(latitude, longitude, (error, forcast) => {
            if (error) {
                return res.status(500).send({error})
            }
            res.send({location, forcast})
        })
    })

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        pageName: '404',
        error: 'Help article not found.'
    })
})

app.get('/*', (req, res) => {
    res.render('404', {
        pageName: '404',
        error: 'Page not found.'
    })
})


app.listen(port, () => {
    console.log(chalk.inverse.green('Server up on port ' + port))
})