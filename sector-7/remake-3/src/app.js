const express = require('express')
const chalk = require('chalk')
const path = require('path')
const hbs = require('hbs')
const app = express()

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

app.get('/help/*', (req, res) => {
    res.render('404', {
        pageName:'404',
        error: 'Help article not found.'
    })
})

app.get('/*', (req, res) => {
    res.render('404',{
        pageName:'404',
        error:'Page not found.'
    })
})


app.listen(3000, () => {
    console.log(chalk.inverse.green('Server up on port 3000!'))
})