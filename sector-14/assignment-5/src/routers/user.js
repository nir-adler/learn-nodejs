const express = require('express')
const { User } = require('../models/user')
const sharp = require('sharp')
const router = new express.Router()
const typeOf = require('typeof')
const { auth } = require('../middleware/auth')
const multer = require('multer')

const upload = multer({

    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cp) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            cp(new Error('file must be image type'))
        }
        cp(undefined, true)
    }
})


router.delete('/users/me/avatar', auth, async (req, res) => {
    try {
        req.user.avatar = undefined
        await req.user.save()
        res.send()
    } catch (e) {
        console.log(e)
        res.status(500).send()
    }
})

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()

    req.user.avatar = buffer
    await req.user.save()

    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        const token = await user.generateToken()

        await user.save()
        res.status(201).send({ user, token })

    } catch (e) {
        console.log(e)
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
    try {
        const user = await User.authUser(req.body.email, req.body.password)
        const token = await user.generateToken()

        res.send({ user, token })

    } catch (e) {
        console.log(e)
        if (typeOf(e) === 'error') {
            res.status(400).send(e.toString())
        } else {
            res.status(500).send()
        }
    }
})


router.get('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token)
        await req.user.save()

        res.send()
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
})

router.get('/users/logoutall', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/users', auth, async (req, res) => {
    const allowedUpdates = ['name', 'age', 'password', 'email']
    const updates = Object.keys(req.body)
    const isValid = updates.every((update) => allowedUpdates.includes(update))
    // const _id = req.params.id
    // console.log(req.user)
    if (!isValid) {
        res.status(400).send({ error: 'Not valid update option/s!' })
    }

    try {
        // const user = await User.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })
        // const user = await User.findById(_id)



        // if (!user) {
        //     return res.status(400).send({ error: 'User id not found!' })
        // }

        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()

        res.send(res.user)
    } catch (e) {
        console.log(e)
        if (e.name === 'CastError') {
            res.status(400).send({ error: 'Not valid id!' })
        } else if (e.name === 'ValidationError') {
            res.status(400).send(e.errors)
        } else {
            res.status(500).send(e)
        }
    }

})

router.get('/users', auth, async (req, res) => {

    try {
        const users = await User.find({})
        res.send(users)

    } catch (e) {

        res.status(500).send()
    }
})

router.get('/users/me', auth, async (req, res) => {


    try {

        res.send(req.user)
    } catch (e) {
        if (e.name === 'CastError') {
            res.status(400).send({ error: 'Not valid id!' })
        } else {
            res.status(500).send(e)
        }
    }
})

router.delete('/users/me', auth, async (req, res) => {
    try {
        // const user = await User.findByIdAndDelete(_id)
        const user = await req.user.remove()

        res.send(req.user)
    } catch (e) {
        console.log(e)
        if (e.name === 'CastError') {
            res.status(400).send({ error: 'Not valid id!' })
        } else {
            res.status(500).send(e)
        }
    }
})

router.get('/users/:id/avatar', async (req, res) => {
    try {
        const _id = req.params.id
        const user = await User.findById(_id)

        if (!user || !user.avatar) {
            throw new Error()
        }

        res.set('Content-Type', 'image/png')
        res.send(user.avatar)
    } catch (e) {
        res.status(404).send()
    }
})


module.exports = {
    router
}
