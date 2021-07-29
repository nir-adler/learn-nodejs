const { app } = require('./app')
const port = process.env.PORT || 3000



app.listen(port, () => {
    console.log(chalk.green.inverse(`Server is up on port: ${port}`))
})



