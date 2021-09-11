const { User } = require('../models/user')
const express = require('express')
const router = new express.Router()


router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.send(user)
    } catch (e) {
        console.log(e)
        if (e.message === 'ValidationError') {
            res.status(400).send({ error: e.erros })
        } else if (e.code === 11000) {
            res.status(400).send({ error: `Duplicate values ${JSON.stringify(e.keyValue).replace(/(\x5c|"|{|})/g, '')}` })
        } else {
            res.status(400).send(e)
        }
    }

})

router.delete('/users/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const user = await User.findByIdAndDelete(_id)
        if (!user) {
            return res.status(404).send({ error: 'Id not found!' })
        }
        res.send(user)
    } catch (e) {
        if (e.name === 'CastError') {
            return res.status(400).send({ error: 'Invalid id ' })
        } else {
            res.status(400).send(e)
        }
    }
})

router.patch('/users/:id', async (req, res) => {
    const _id = req.params.id
    const allowedUpdates = ['name', 'email', 'age', 'password']
    const updates = Object.keys(req.body)
    const validUpdate = updates.every((update) => allowedUpdates.includes(update))

    if (!validUpdate) {
        return res.status(405).send({ error: 'Update/s not valid' })
    }
    try {
        const user = await User.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })
        if (!user) {
            return res.status(404).send({ error: 'Id not found' })
        }
        res.send(user)

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


router.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/users/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findById(_id)
        if (!user) {
            return res.status(404).send({ error: 'User id not found!' })
        }
        res.send(user)

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