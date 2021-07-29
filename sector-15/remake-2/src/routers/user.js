const { User } = require('../models/user')
const express = require('express')
const router = new express.Router()
const typeOf = require('typeof')
const { auth } = require('../middleware/auth')


const multer = require('multer')
const upload = multer({

    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cp) {
        if (!file.originalname.match(/\.(jpg|png|jpeg)/)) {
            cp(new Error('file must be image type'))
        }
        cp(undefined, true)
    }
})

router.get('/users/:id/avatar', async(req, res) => {
    try {
        const _id = req.params.id
        const user = await User.findById(_id)
        if (!user || !user.avatar) {
            throw new Error()
        }

        res.set('Content-Type', 'image/jpg')
        res.send(user.avatar)

    } catch (e) {
        res.status(404).send()
    }
})


router.post('/users/avatar', auth, upload.single('avatar'), async(req, res) => {
    req.user.avatar = req.file.buffer
        // console.log(req.file.buffer)
    await req.user.save()

    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

router.post('/users', async(req, res) => {
    const user = new User(req.body)
    try {

        await user.save()
        const token = await user.generateToken()

        res.status(201).send({ user, token })
    } catch (e) {
        console.log(e)
        if (e.name === 'ValidationError') {
            res.status(400).send(e)
        } else if (e.code === 11000) {
            res.status(400).send({ error: `Duplicate value/s ${JSON.stringify(e.keyValue).replace(/(\x5c|"|{|})/g,'')}` })
        } else {
            res.status(400).send(e)
        }
    }
})

router.post('/users/login', async(req, res) => {
    try {
        const user = await User.login(req.body.email, req.body.password)
        const token = await user.generateToken()
        res.send({ user, token })
    } catch (e) {
        console.log(e)
        if (typeOf(e) === 'error') {
            res.status(400).send({ error: e.toString() })
        } else {
            res.status(400).send(e)
        }
    }
})

router.get('/users/logout', auth, async(req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token)
        await req.user.save()
        res.send()
    } catch (e) {
        console.log(e)
        res.status(400).send()
    }
})

router.get('/users/logoutall', auth, async(req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(400).send(e)
    }

})

router.delete('/users', auth, async(req, res) => {
    const _id = req.params.id
    try {
        await req.user.remove()
        if (!req.user) {
            return res.status(400).send({ error: 'User id not found!' })
        }
        res.send(req.user)
    } catch (e) {
        if (e.name === 'CastError') {
            res.status(400).send({ error: 'Unvalid id' })
        } else {
            res.status(400).send(e)
        }
    }


})

router.patch('/users', auth, async(req, res) => {
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const updates = Object.keys(req.body)
    const isValid = updates.every((update) => allowedUpdates.includes(update))
    const _id = req.params.id

    if (!isValid) {
        return res.status(400).send({ error: 'Send only valid update/s!' })
    }
    try {
        updates.forEach((update) => {
            req.user[update] = req.body[update]
        })

        await req.user.save()

        res.send(req.user)
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

router.get('/users', auth, async(req, res) => {
    try {

        res.send(req.user)
    } catch (e) {
        res.status(500).send(e)
    }
})

// router.get('/users/:id', async(req, res) => {
//     const _id = req.params.id

//     try {
//         const user = await User.findById(_id)
//         if (!user) {
//             return res.status(400).send({ error: 'User id not found!' })
//         }
//         res.send(user)
//     } catch (e) {
//         if (e.name === 'CastError') {
//             res.status(400).send({ error: 'Unvalid id' })
//         } else {
//             res.status(500).send(e)
//         }
//     }
// })







module.exports = {
    router
}