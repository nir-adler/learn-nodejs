const { Task } = require('../models/task')
const express = require('express')
const router = new express.Router()
const { auth } = require('../middleware/auth')


router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try {
        await task.save()
        res.send(task)
    } catch (e) {
        if (e.message === 'ValidationError') {
            res.status(400).send({ error: e.erros })
        } else if (e.code === 11000) {
            res.status(400).send({ error: `Duplicate values ${JSON.stringify(e.keyValue).replace(/(\x5c|"|{|})/g, '')}` })
        } else {
            res.status(400).send(e)
        }
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findOne({ _id, owner: req.user._id })

        if (!task) {
            return res.status(400).send({ error: 'Id not found!' })
        }
        await task.remove()
        res.send(task)
    } catch (e) {
        if (e.name === 'CastError') {
            return res.status(400).send({ error: 'Invalid id ' })
        } else {
            res.status(400).send(e)
        }
    }
})


router.patch('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id
    const allowedUpdates = ['description', 'completed']
    const updates = Object.keys(req.body)
    const validUpdates = updates.every((update) => allowedUpdates.includes(update))

    if (!validUpdates) {
        return res.status(400).send({ error: 'Unvalid update/s!' })
    }

    try {
        // const task = await Task.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })
        const task = await Task.findOne({ _id, owner: req.user._id })
        if (!task) {
            return res.status(404).send({ error: 'Id not found!' })
        }
        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.send(task)
    } catch (e) {
        console.log(e)
        if (e.message === 'ValidationError') {
            res.status(400).send({ error: e.erros })
        } else if (e.code === 11000) {
            res.status(400).send({ error: `Duplicate values ${JSON.stringify(e.keyValue).replace(/(\x5c|"|{|})/g, '')}` })
        } else if (e.name === 'CastError') {
            res.status(400).send({ error: 'Unvalid id' })
        } else {
            res.status(400).send(e)
        }
    }
})

router.get('/tasks', auth, async (req, res) => {
    const match = {}
    const sort = {}

    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    }

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    try {
        const user = await req.user.populate({
            path: 'tasks',
            match,
            options: {
                skip: parseInt(req.query.skip),
                limit: parseInt(req.query.limit),
                sort
            }
        }).execPopulate()
        // console.log(user.tasks)
        res.send(user.tasks)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findOne({ owner: req.user._id, _id })
        if (!task) {
            return res.status(404).send({ error: 'Task id not found!' })
        }
        res.send(task)

    } catch (e) {
        if (e.name === 'CastError') {
            return res.status(400).send({ error: 'Invalid id ' })
        } else {
            res.status(400).send(e)
        }
    }
})


module.exports = {
    router
}