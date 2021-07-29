const express = require('express')
const userRouter = new express.Router()
const { User } = require('../models/user')
const typeOf = require('typeof')
const { auth } = require('../middleware/auth')


userRouter.post('/users', async (req, res) => {
    const user = User(req.body)
    try {

        await user.save()
        const token = await user.generateAuthToken()

        res.status(201).send({ user, token })
    } catch (e) {
        console.log(e)
        if (e.code === 11000) {
            res.status(400).send({ error: `duplicate value "${JSON.stringify(e.keyValue)}"` })
        } else if (e.name === 'ValidationError') {
            res.status(400).send(e.errors)
        } else {
            res.status(500).send(e)
        }
    }
})

userRouter.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
       
        res.send({ user, token })
    } catch (e) {
        if (typeOf(e) === 'error') {
            res.status(400).send(e.toString())
        } else {
            res.status(400).send()
        }
    }
})

userRouter.post('/users/logoutAll', auth, async (req, res) => {
    try{
        req.user.tokens=[]
        await req.user.save()
        res.status(200).send()
    }catch(e){
        res.status(500).send("aaaa")
    }
})

userRouter.post('/users/logout', auth, async (req, res) => {
    try{
        req.user.tokens=req.user.tokens.filter((token)=>token.token!==req.token)
        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send()
    }
})

userRouter.get('/users/me', auth, async (req, res) => {
    res.send(req.user)

    // try {
    //     const users = await User.find({})
    //     res.status(200).send(users)
    // } catch (e) {

    //     res.status(500).send()
    // }
})



userRouter.delete('/users/me',auth ,async (req, res) => {
    const _id = req.params.id

    try {
        // const user = await User.findByIdAndDelete(req.user._id)
        // if (!user) {
        //     res.status(404).send({ error: 'User id not found!' })
        // }

        await req.user.remove()
        res.send(req.user)
    } catch (e) {
        if (e.name === 'CastError') {
            return res.status(400).send({ error: 'not valid id' })
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
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const user = await User.findById(req.params.id)

        updates.forEach((update) => user[update] = req.body[update])

        await user.save()

        // const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        if (!user) {
            return res.status(404).send({ error: 'User id not found' })
        }
        res.send(user)
    } catch (e) {
        if (e.name === 'CastError') {
            return res.status(400).send({ error: 'not valid id' })
        } else if (e.code === 11000) {
            res.status(400).send({ error: `duplicate value "${JSON.stringify(e.keyValue)}"` })
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
