const express=require('express')
const {User}=require('../models/user')
const userRouter=new express.Router()

userRouter.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        if (e.name === 'ValidationError') {
            res.status(400).send(e.errors)
        } else if (e.code === 11000) {
            res.status(400).send({error: `duplicate value ${JSON.stringify(e.keyValue)}`})
        } else {
            res.status(500).send(e)
        }
    }

})

userRouter.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (e) {
        res.status(500).send()
    }
})

userRouter.get('/users/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findById(_id)
        if (!user) {
            return res.status(400).send({error: 'User id not exist'})
        }
        res.send(user)
    } catch (e) {
        if (e.name === "CastError") {
            res.status(400).send({error: 'Invalid id'})
        } else {
            res.status(500).send(e)
        }
    }
})



module.exports={
    userRouter
}