const express = require('express')
const router = express.Router()
const { Task } = require('../models/task')

router.post('/task', async (req, res) => {
    try {
        const task = new Task({ ...req.body })
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        console.log(e)
        res.status(400).send({ error: e.message })
    }
})

router.delete('/task/:id', async (req, res) => {
    const _id = req.params.id
    if (!_id) {
        return res.status(422).send({ error: 'Please provide use id!' })
    }

    try {
        const task = await Task.findByIdAndDelete(_id)
        if (!task) {
            return res.status(422).send({ error: 'User id not found' })
        }
        res.send(task)
    } catch (e) {
        console.log(e.name)
        console.log(e)
        if (e.name === 'CastError') {
            res.status(422).send({ error: 'Unvalid task id number!' })
        } else {
            res.status(500).send({ error: e.name })
        }

    }

})


router.patch('/task/:id', async (req, res) => {
    const _id = req.params.id
    const allowedUpdates = ['description', 'completed']
    const keys = Object.keys(req.body)
    const filterKeys = keys.find((key) => !allowedUpdates.includes(key))

    if (filterKeys) {
        return res.status(422).send({ error: 'invalid update fields' })
    }

    try {
        const task = await Task.findByIdAndUpdate(_id, { ...req.body }, { new: true, runValidators: true })
        if (!task) {
            return res.status(422).send({ error: 'Task id not exists' })
        }

        res.send(task)
    } catch (e) {
        console.log(e.name)
        console.log(e)
        if (e.name === 'CastError') {
            return res.status(422).send({ error: 'Invalid id' })
        } else if (e.name === 'ValidationError') {
            return res.status(422).send(e.message)
        } else {
            res.status(500).send({ e })
        }
    }
})

router.get('/task', async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (e) {
        console.log(e)
        res.status(500).send({ error: e.message })
    }
})

router.get('/task/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findById(_id)
        if (!task) {
            return res.status(500).send({ error: 'Task id not exists' })
        }
        res.send(task)
    } catch (e) {
        if (e.name === 'CastError') {
            res.status(422).send({ error: 'Unvalid id' })
        } else {
            console.log(e.name)
            console.log(e)
            res.status(500).send({ error: e.message })
        }
    }
})




module.exports = {
    router
}