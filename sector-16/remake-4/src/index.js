const {app}=require('./app')

const port = process.env.PORT 

app.listen(port, () => {
    console.log(chalk.inverse.green(`Server up on port:${port}`))
})



