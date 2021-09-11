const express = require('express')
const app = express()
const chalk = require('chalk')
const port = process.env.PORT || 3000
const path = require('path')
const hbs = require('hbs')
const { geoLocation, getForcast } = require('./geoLocation')

const publicPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicPath))

app.get('/weather', (req, res) => {
    const address = req.query.address
    if (!address) {
        return res.status(400).send({ error: 'Please send address!' })
    }
    geoLocation(req.query.address, (error, { latitude, longitude, placeName } = {}) => {
        if (error) {
            return res.status(400).send({ error })
        }

        getForcast(latitude, longitude, (error, forcast) => {
            if (error) {
                return res.status(400).send({ error })
            }
            res.send({ placeName, forcast })
        })
    })

})

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
    res.render('help', {
        pageName: 'Help'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        error: 'Help article not found',
        pageName: '404'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        error: 'Help article not found',
        pageName: 'Page not found'
    })
})


app.listen(port, () => {
    console.log(chalk.green.inverse(`Server up on port:${port}`))
})




