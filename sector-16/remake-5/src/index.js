const app = require('./app')


app.get('*', (req, res) => {
    res.send('*******')
})


app.listen(3000, () => {
    console.log('Server up on port 3000')
})