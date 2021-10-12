const express = require('express')
const router = express.Router()
const { User } = require('../models/user')
const { validate } = require('../middlewares/jwt')
var kindOf = require('kind-of')
const sharp = require('sharp')
const multer = require('multer')


const upload = multer({
    // dest: './avatar',
    fileFilter(req, file, cp) {
        if (!file.originalname.match(/\.(png|jpg)/)) {
            return cp(new Error('Please upload image file'))
        }
        cp(undefined, true)
    }

})

router.get('/user/avatar/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const user = await User.findById(_id)
        if (!user) {
            return res.status(422).send({ error: 'User id not found' })
        }
        if (!user.avatar) {
            return res.status(422).send({ error: 'User dont have avatar image' })
        }
        console.log(kindOf(user.avatar.toString()))
        const text = user.avatar.toString("base64")
        console.log(text)
        res.set('Content-Type', 'text/html')
        res.send(`<img src="data:image/jpeg;base64,${text}">`)
    } catch (e) {
        res.status(500).send(e.message)
    }

})

router.post('/avatar', validate, upload.single('avatar'), async (req, res) => {
    try {

        const buffer = await sharp(req.file.buffer).resize(320, 240).png().toBuffer()

        console.log(buffer)

        req.user.avatar = buffer
        await req.user.save()


        res.send()
    } catch (e) {
        res.status(500).send(e.message)
    }
}, (error, req, res, next) => {
    res.status(500).send(error.message)
})



router.post('/user', async (req, res) => {
    try {
        const user = new User({ ...req.body })
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })

    } catch (e) {
        console.log(e.name)
        console.log(e)
        if (e.name === 'MongoServerError') {
            res.status(422).send(e.message)
        } else {
            res.status(400).send(e.message)
        }
    }
})

router.post('/user/login', async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(422).send({ error: 'Please provide email and password' })
    }
    try {
        const user = await User.validatePassword(email, password)
        // console.log(user)
        if (!user) {
            return res.status(422).send({ error: 'Unable login!' })
        }
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        console.log(e.name)
        console.log(e)
        if (e.name === 'Error') {
            res.status(422).send(e.message)
        } else {
            res.status(500).send(e.message)
        }
    }

})

router.patch('/user', validate, async (req, res) => {

    const allowedUpdate = ['name', 'password', 'age']
    const keys = Object.keys(req.body)
    const filterKeys = keys.find((key) => !allowedUpdate.includes(key))

    if (filterKeys) {
        return res.status(422).send({ error: 'invalid update value' })
    }
    try {
        // const user = await User.findByIdAndUpdate(_id, { ...req.body }, { new: true, runValidators: true })
        const user = await User.findById(req.user._id)
        if (!user) {
            return res.status(422).send({ error: 'User id not found' })
        }
        keys.forEach((key) => user[key] = req.body[key])
        await user.save()
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

router.delete('/user', validate, async (req, res) => {
  
    try {
        await req.user.remove()
        if (!req.user) {
            return res.status(422).send({ error: 'User id not found' })
        }
        res.send(req.user)
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


router.get('/user/logoffall', validate, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()

    } catch (e) {
        console.log(e.name)
        console.log(e)
        res.status(500).send(e.message)
    }
})


router.get('/user', validate, async (req, res) => {
    try {
        const users = await User.find({})
        // console.log(users)
        res.send(users)
    } catch (e) {
        res.status(500).send({ error: e.message })
    }
})

router.get('/user/', validate, async (req, res) => {
    // const _id = req.params.id
    try {
        const user = await User.findById(req.user._id)
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