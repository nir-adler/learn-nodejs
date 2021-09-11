const {Task}=require('../models/task')
const express=require('express')
const router=new express.Router()


router.post('/tasks', async (req, res) => {
    const task = new Task(req.body)


    try {
        await task.save()
        res.send(task)
    } catch (e) {
        if (e.message === 'ValidationError') {
            res.status(400).send({ error: e.erros })
        } else if (e.code === 11000) {
            res.status(400).send({ error: `Duplicate values ${JSON.stringify(e.keyValue).replace(/(\x5c|"|{|})/g, '')}` })
        } else {
            res.status(400).send(e)
        }
    }
})

router.delete('/tasks/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findByIdAndDelete(_id)

        if (!task) {
            return res.status(400).send({ error: 'Id not found!' })
        }
        res.send(task)
    } catch (e) {
        if (e.name === 'CastError') {
            return res.status(400).send({ error: 'Invalid id ' })
        } else {
            res.status(400).send(e)
        }
    }
})


router.patch('/tasks/:id', async (req, res) => {
    const _id = req.params.id
    const allowedUpdates = ['description', 'completed']
    const updates = Object.keys(req.body)
    const validUpdates = updates.every((update) => allowedUpdates.includes(update))

    if (!validUpdates) {
        return res.status(400).send({ error: 'Unvalid update/s!' })
    }

    try {
        const task = await Task.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })
        if (!task) {
            return res.status(404).send({ error: 'Id not found!' })
        }
        res.send(task)
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

router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id
    // Task.findById(_id).then((task) => {
    //     if (!task) {
    //         return res.status(404).send({ error: 'Task id not found!' })
    //     }
    //     res.send(task)
    // }).catch((e) => {
    //     if (e.name === 'CastError') {
    //         return res.status(400).send({ error: 'Invalid id ' })
    //     } else {
    //         res.status(400).send(e)
    //     }
    // })

    try {
        const task = await Task.findById(_id)
        if (!task) {
            return res.status(404).send({ error: 'Task id not found!' })
        }
        res.send(task)

    } catch (e) {
        if (e.name === 'CastError') {
            return res.status(400).send({ error: 'Invalid id ' })
        } else {
            res.status(400).send(e)
        }
    }
})


module.exports={
    router
}