const express = require('express')
const { User } = require('../models/user')
const router = new express.Router()
const { auth } = require('../middleware/auth')
const typeOf=require('typeof')


router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {

        await user.save()
        const token = await user.generateAuthentication()
        res.status(201).send({ user, token })

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

router.post('/users/login', async (req, res) => {
    try{
        const user=await User.findByCredentials(req.body.email,req.body.password)
        const token=await user.generateAuthentication()

        res.send({user,token})

    }catch(e){
        // console.log(typeOf(e))
        if(typeOf(e)==='error'){
            // console.log(e.toString())
            res.status(400).send(e.toString())
        }else{
            res.status(400).send(e)
        }
    }
})

router.patch('/users/:id', async (req, res) => {
    const allowedUpdates = ['name', 'age', 'password', 'email']
    const updates = Object.keys(req.body)
    const isValid = updates.every((update) => allowedUpdates.includes(update))
    const _id = req.params.id

    if (!isValid) {
        res.status(400).send({ error: 'Not valid update option/s!' })
    }

    try {
        // const user = await User.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })
        const user = await User.findById(_id)

        if (!user) {
            return res.status(400).send({ error: 'User id not found!' })
        }

        updates.forEach((update) => user[update] = req.body[update])

        await user.save()

        res.send(user)
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

router.get('/users', async (req, res) => {

    try {
        const users = await User.find({})
        res.send(users)

    } catch (e) {

        res.status(500).send()
    }
})

router.get('/users/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findById(_id)
        if (!user) {
            return res.status(400).send({ error: 'User id not found!' })
        }
        res.send(user)
    } catch (e) {
        if (e.name === 'CastError') {
            res.status(400).send({ error: 'Not valid id!' })
        } else {
            res.status(500).send(e)
        }
    }
})

router.delete('/users/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findByIdAndDelete(_id)
        if (!user) {
            return res.status(400).send({ error: 'User id not found!' })
        }
        res.send(user)
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
