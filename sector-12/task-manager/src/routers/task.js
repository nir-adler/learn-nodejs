const express =require('express')
const taskRouter=new express.Router()
const {Task}=require('../models/task')

taskRouter.delete('/tasks/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findByIdAndDelete(_id)
        if (!task) {
            return res.status(400).send({error: 'Task id not found!'})
        }
        res.send(task)
    } catch (e) {

        if (e.name === 'CastError') {
            return res.status(400).send({error: 'not valid id'})
        } else {

            res.status(500).send()
        }
    }
})



taskRouter.patch('/tasks/:id', async (req, res) => {
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


taskRouter.post('/tasks', async (req, res) => {
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

taskRouter.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.status(200).send(tasks)
    } catch (e) {
        res.status(500).send()
    }
})

taskRouter.get('/tasks/:id', async (req, res) => {
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


module.exports={
    taskRouter
}