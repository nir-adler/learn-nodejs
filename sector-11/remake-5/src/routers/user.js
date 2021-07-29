const { User } = require('../models/user')
const express = require('express')
const router = new express.Router()


router.post('/users', async(req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        if (e.name === 'ValidationError') {
            res.status(400).send(e)
        } else if (e.code === 11000) {
            res.status(400).send({ error: `Duplicate value/s ${JSON.stringify(e.keyValue).replace(/(\x5c|"|{|})/g,'')}` })
        } else {
            res.status(400).send(e)
        }
    }
})

router.delete('/users/:id', async(req, res) => {
    const _id = req.params.id
    try {
        const user = await User.findByIdAndDelete(_id)
        if (!user) {
            return res.status(400).send({ error: 'User id not found!' })
        }
        res.send(user)
    } catch (e) {
        if (e.name === 'CastError') {
            res.status(400).send({ error: 'Unvalid id' })
        } else {
            res.status(400).send(e)
        }
    }


})

router.patch('/users/:id', async(req, res) => {
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const updates = Object.keys(req.body)
    const isValid = updates.every((update) => allowedUpdates.includes(update))
    const _id = req.params.id

    if (!isValid) {
        return res.status(400).send({ error: 'Send only valid update/s!' })
    }

    try {
        const user = await User.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })
        if (!user) {
            return res.status(400).send({ error: 'User is not found!' })
        }
        res.send(user)
    } catch (e) {
        if (e.name === 'ValidationError') {
            res.status(400).send(e)
        } else if (e.code === 11000) {
            res.status(400).send({ error: `Duplicate value/s ${JSON.stringify(e.keyValue).replace(/(\x5c|"|{|})/g,'')}` })
        } else if (e.name === 'CastError') {
            res.status(400).send({ error: 'Unvalid id' })
        } else {
            res.status(400).send(e)
        }

    }


})

router.get('/users', async(req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/users/:id', async(req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findById(_id)
        if (!user) {
            return res.status(400).send({ error: 'User id not found!' })
        }
        res.send(user)
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