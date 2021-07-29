require('./db/mongoose')
const chalk = require('chalk')
const {Task} = require('./models/task')
const {User} = require('./models/user')
const {ObjectId} = require('mongoose')

const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/users', async (req, res) => {
    const user = User(req.body)
    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        if (e.code === 11000) {
            res.status(400).send({error: `duplicate value "${JSON.stringify(e.keyValue)}"`})
        } else if (e.name === 'ValidationError') {
            res.status(400).send(e.errors)
        } else {
            res.status(500).send()
        }
    }
})

app.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.status(200).send(users)
    } catch (e) {
        res.status(500).send()
    }
})

app.get('/users/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findById(_id)
        if (!user) {
            return res.status(400).send({error: 'User _id not exist'})
        }
        res.status(200).send(user)
    } catch (e) {
        if (e.name === 'CastError') {
            return res.status(500).send({error: 'not valid id'})
        }
        res.status(500).send()
    }
})

app.delete('/users/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findByIdAndDelete(_id)
        if(!user){
            res.status(404).send({error:'User id not found!'})
        }
        res.send(user)
    } catch (e) {
        if (e.name === 'CastError') {
            return res.status(400).send({error: 'not valid id'})
        }else{
            res.status(500).send()
        }

    }
})


app.patch('/users/:id', async (req, res) => {

    const allowedUpdates = ['name', 'password', 'age']
    const updates = Object.keys(req.body)
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({error: 'Invalid updates!'})
    }

    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        if (!user) {
            return res.status(404).send({error: 'User id not found'})
        }
        res.send(user)
    } catch (e) {
        if (e.name === 'CastError') {
            return res.status(400).send({error: 'not valid id'})
        } else if (e.code === 11000) {
            res.status(400).send({error: `duplicate value "${JSON.stringify(e.keyValue)}"`})
        } else if (e.errors.description.kind === 'required') {
            res.status(400).send(e.errors.description.message)
        } else {
            res.status(500).send()
        }
    }
})

app.patch('/tasks/:id', async (req, res) => {
    const _id = req.params.id
    const allowedUPdate = ['description', 'completed']
    const updates = Object.keys(req.body)
    const isValidOpartions = updates.every((task) => allowedUPdate.includes(task))

    if (!isValidOpartions) {
        res.status(400).send({error: 'Not valid fileds!'})
    }

    try {
        const task = await Task.findByIdAndUpdate(_id, req.body, {new: true, runValidators: true})
        if (!task) {
            return res.status(400).send({error: `Task id not found!`})
        }
        res.send(task)
    } catch (e) {
        if (e.name === 'CastError') {
            return res.status(400).send({error: 'not valid id'})
        } else if (e.code === 11000) {
            res.status(400).send({error: `duplicate value "${JSON.stringify(e.keyValue)}"`})
        } else if (e.errors.description.kind === 'required') {
            res.status(400).send(e.errors.description.message)
        } else {
            res.status(500).send()
        }

    }


})


app.post('/tasks', async (req, res) => {
    const task = new Task(req.body)

    try {
        await task.save()
        res.status(201).send(task)

    } catch (e) {
        if (e.code === 11000) {
            res.status(400).send({error: `duplicate value "${JSON.stringify(e.keyValue)}"`})
        } else if (e.errors.description.kind === 'required') {
            res.status(400).send(e.errors.description.message)
        } else {
            res.status(500).send()
        }
    }
})

app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.status(200).send(tasks)
    } catch (e) {
        res.status(500).send()
    }
})

app.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id


    try {
        const task = await Task.findById(_id)
        if (!task) {
            return res.status(400).send({error: 'task id not exist'})
        }
        res.status(200).send(task)
    } catch (e) {
        if (e.name === 'CastError') {
            return res.status(500).send({error: 'not valid id'})
        }
        res.status(500).send()
    }
})


app.listen(port, () => {
    console.log(chalk.inverse.green('Server is up on port ' + port))
})