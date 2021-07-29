const {app}=require('./app')

const port = process.env.PORT 


app.listen(port, () => {
    console.log(chalk.inverse(`Server is up on port:${port}`))
})