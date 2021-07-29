const express = require('express')
const userRouter = new express.Router()
const {User}=require('../models/user')



userRouter.post('/users', async (req, res) => {
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

userRouter.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.status(200).send(users)
    } catch (e) {
        res.status(500).send()
    }
})

userRouter.get('/users/:id', async (req, res) => {
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

userRouter.delete('/users/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findByIdAndDelete(_id)
        if (!user) {
            res.status(404).send({error: 'User id not found!'})
        }
        res.send(user)
    } catch (e) {
        if (e.name === 'CastError') {
            return res.status(400).send({error: 'not valid id'})
        } else {
            res.status(500).send()
        }

    }
})

userRouter.patch('/users/:id', async (req, res) => {

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



module.exports = {
    userRouter
}
