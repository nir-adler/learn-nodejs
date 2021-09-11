const { User } = require('../models/user')
const express = require('express')
const router = new express.Router()
const typeOf = require('typeof')
const { auth } = require('../middleware/auth')
const multer = require('multer')
const sharp = require('sharp')

const upload = multer({
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jepg|jpg)/g)) {
            cb(new Error('file need to be image'), undefined)
        }
        cb(undefined, true)
    }

})

router.get('/users/:id/avatar', async (req, res) => {
    try {
        const _id = req.params.id
        const user = await User.findById(_id)

        if (!user || !user.avatar) {
            return res.status(400).send()
        }

        res.set('Content-Type', 'image/jpg')
        res.send(user.avatar)


    } catch (e) {

    }


})

router.get('/users/avatar', auth, upload.single('avatar'), async (req, res) => {
    const imageBuffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()

    req.user.avatar = imageBuffer
    await req.user.save()
    res.send()
})


router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateToken()
        res.status(201).send({ user, token })
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

router.delete('/users', auth, async (req, res) => {
    try {
        await req.user.remove()

        res.send(req.user)
    } catch (e) {
        if (e.name === 'CastError') {
            return res.status(400).send({ error: 'Invalid id ' })
        } else {
            res.status(400).send(e)
        }
    }
})

router.patch('/users', auth, async (req, res) => {
    const _id = req.params.id
    const allowedUpdates = ['name', 'email', 'age', 'password']
    const updates = Object.keys(req.body)
    const validUpdate = updates.every((update) => allowedUpdates.includes(update))

    if (!validUpdate) {
        return res.status(405).send({ error: 'Update/s not valid' })
    }
    try {
        // const user = await User.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })
        // const user = await User.findById(_id)
        // if (!user) {
        //     return res.status(404).send({ error: 'Id not found' })
        // }
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)

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

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.logIn(req.body.email, req.body.password)
        const token = await user.generateToken()
        res.send({ user, token })
    } catch (e) {
        if (typeOf(e) === 'error') {
            res.status(400).send({ error: e.toString() })
        } else {
            res.status(400).send()
        }
        // console.log(typeOf(e))
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

router.get('/users', auth, async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/users/', auth, async (req, res) => {
    // const _id = req.params.id

    try {
        // const user = await User.findById(_id)
        // if (!user) {
        //     return res.status(404).send({ error: 'User id not found!' })
        // }
        res.send(req.user)

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