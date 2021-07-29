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
        res.status(201).send(task)
    } catch (e) {
        if (e.name === 'ValidationError') {
            res.status(400).send(e)
        } else if (e.code === 11000) {
            res.status(400).send({ error: `Duplicate value/s ${JSON.stringify(e.keyValue).replace(/(\x5c|"|{|})/g, '')}` })
        } else {
            res.status(400).send(e)
        }
    }

})

router.delete('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
        // const task = await Task.findByIdAndDelete(_id)
        const task = await Task.findOne({ _id, owner: req.user._id })
        if (!task) {
            return res.status(400).send({ error: 'Task id not found!' })
        }
        await task.remove()
        res.send(task)

    } catch (e) {
        if (e.name === 'CastError') {
            res.status(400).send({ error: 'Unvalid id' })
        } else {
            res.status(400).send(e)
        }
    }
})

router.patch('/tasks/:id', auth, async (req, res) => {
    const allowedUpdates = ['completed', 'description']
    const updates = Object.keys(req.body)
    const isValid = updates.every((update => allowedUpdates.includes(update)))
    const _id = req.params.id

    if (!isValid) {
        return res.status(400).send({ error: 'Send only valid update/s' })
    }

    try {
        // const task = await Task.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })
        const task = await Task.findOne({ _id, owner: req.user._id })
        if (!task) {
            return res.status(400).send({ error: 'Task id not found!' })
        }
        updates.forEach((update) => {
            task[update] = req.body[update]
        })
        await task.save()
        res.send(task)
    } catch (e) {
        if (e.name === 'ValidationError') {
            res.status(400).send(e)
        } else if (e.code === 11000) {
            res.status(400).send({ error: `Duplicate value/s ${JSON.stringify(e.keyValue).replace(/(\x5c|"|{|})/g, '')}` })
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

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    if (req.query.completed) {
        match.completed = req.query.completed === "true"
    }
    console.log(match)

    try {
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.send(req.user.tasks)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findOne({ _id, owner: req.user._id })
        if (!task) {
            return res.status(400).send({ error: 'Task id not found!' })
        }
        res.send(task)
    } catch (e) {

        if (e.name === 'CastError') {
            res.status(400).send({ error: 'Unvalid id' })
        } else {
            res.status(500).send(e)
        }
    }
})


module.exports = {
    router
}