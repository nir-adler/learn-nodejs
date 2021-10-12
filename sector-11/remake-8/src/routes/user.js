const express = require('express')
const router = express.Router()
const { User } = require('../models/user')

router.post('/user', async (req, res) => {
    try {
        const user = new User({ ...req.body })
        await user.save()
        res.status(201).send(user)

    } catch (e) {
        console.log(e)
        res.status(400).send({ error: e.message })
    }
})

router.patch('/user/:id', async (req, res) => {
    const _id = req.params.id
    const allowedUpdate = ['name', 'password', 'age']
    const keys = Object.keys(req.body)
    const filterKeys = keys.find((key) => !allowedUpdate.includes(key))

    if (filterKeys) {
        return res.status(422).send({ error: 'invalid update value' })
    }
    try {
        const user = await User.findByIdAndUpdate(_id, { ...req.body }, { new: true, runValidators: true })
        if (!user) {
            return res.status(422).send({ error: 'User id not found' })
        }
        res.send(user)
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

router.delete('/user/:id', async (req, res) => {
    const _id = req.params.id
    if (!_id) {
        return res.status(422).send({ error: 'Unvalid user id' })
    }
    try {
        const user = await User.findByIdAndDelete(_id)
        if (!user) {
            return res.status(422).send({ error: 'User id not found' })
        }
        res.send(user)
    } catch (e) {
        console.log(e.name)
        console.log(e)
        if (e.name === 'CastError') {
            res.status(422).send({ error: 'Unvalid user id!' })
        } else {
            res.status(500).send({ error: e.message })
        }
    }

})


router.get('/user', async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (e) {
        res.status(500).send({ error: e.message })
    }
})

router.get('/user/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const user = await User.findById(_id)
        if (!user) {
            return res.status(422).send({ error: 'User id not found' })
        }
        res.send(user)
    } catch (e) {
        if (e.name === 'CastError') {
            return res.status(422).send({ error: 'Unvalid id' })
        } else {
            console.log(e.name)
            console.log(e)

            res.status(500).send(e)
        }
    }
})


module.exports = {
    router
}