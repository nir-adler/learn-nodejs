const express = require('express')
const path = require('path')
const hbs = require('hbs')
const chalk = require('chalk')

const app = express()
const port = process.env.PORT || 3000

const publicPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../template/views')
const partialsPath = path.join(__dirname, '../template/partials')

app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)


app.use(express.static(publicPath))


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
        pageName: '404',
        error: 'Help article not found!'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        pageName: '404',
        error: 'Page not found!'
    })
})



app.listen(port, () => {
    console.log(chalk.inverse(`Server is up on port${port}`))
})