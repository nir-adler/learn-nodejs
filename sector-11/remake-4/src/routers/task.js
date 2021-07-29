const express = require('express')
const { Task } = require('../models/task')
const router = new express.Router()


router.post('/tasks', async (req, res) => {
    const task = new Task(req.body)
    try {
        await task.save()
        res.send(task)
    } catch (e) {
        if (e.name === 'ValidationError') {
            res.status(400).send(e.errors)
        } else if (e.code === 11000) {
            res.status(400).send({ error: `Duplicate value ${JSON.stringify(e.keyValue)}` })
        } else {
            res.status(500).send(e)
        }
    }
})

router.get('/tasks', async (req, res) => {

    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findById(_id)
        if (!task) {
            return res.status(400).send({ error: 'Task id not found!' })
        }
        res.send(task)
    } catch (e) {
        // console.log(e)
        if (e.name === 'CastError') {
            res.status(400).send({ error: 'Not valid id!' })
        } else {
            res.status(500).send(e)
        }

    }

})

router.patch('/tasks/:id', async (req, res) => {
    const allowedUpdates = ['completed', 'description']
    const updates = Object.keys(req.body)
    const isValid = updates.every((update) => allowedUpdates.includes(update))
    const _id = req.params.id

    if (!isValid) {
        res.status(400).send({ error: 'NOt valid update option/s!' })
    }
    try {
        const task = await Task.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })
        if (!task) {
            res.status(400).send({ error: 'Task id not found!' })
        }
        res.send(task)
    } catch (e) {
        if (e.name === 'CastError') {
            res.status(400).send({ error: 'Not valid id!' })
        } else if (e.name === 'ValidationError') {
            res.status(400).send(e.errors)
        } else {
            res.status(500).send(e)
        }
    }
})


router.delete('/tasks/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findByIdAndDelete(_id)
        if (!task) {
            return res.status(500).send({ error: 'Task id not found!' })
        }
        res.send(task)
    } catch (e) {
        if (e.name === 'CastError') {
            res.status(400).send({ error: 'Not valid id!' })
        } else {
            res.status(500).send(e)
        }
    }
})


module.exports = {
    router
}