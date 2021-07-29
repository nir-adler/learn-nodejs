const {Task}=require('../models/task')
const express=require('express')
const taskRouter=new express.Router()


taskRouter.post('/tasks', async (req, res) => {
    task = new Task(req.body)

    try {
        await task.save()
        res.status(201).send(task)
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

taskRouter.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (e) {
        res.status(500).send()
    }
})

taskRouter.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findById(_id)
        if (!task) {
            return res.status(400).send({error: 'Task id not found!'})
        }
        res.send(task)
    } catch (e) {
        if (e.name === "CastError") {
            res.status(400).send({error: 'Invalid id'})
        } else {
            res.status(500).send(e)
        }
    }
})

taskRouter.patch('/tasks/:id', async (req, res) => {
    const _id = req.params.id
    const allowedupdates = ['description', 'completed']
    const updates = Object.keys(req.body)
    const isValidOperations = updates.every((item) => allowedupdates.includes(item))


    if (!isValidOperations) {
        res.status(400).send({error: 'Not valid oprations'})
    }

    try {
        const task = await Task.findByIdAndUpdate(_id, req.body, {new: true, runValidators: true})
        if(!task){
            return  res.status(400).send({error:'Task id not found!'})
        }
        res.send(task)
    } catch (e) {
        if (e.name === 'ValidationError') {
            res.status(400).send(e.errors)
        }else if (e.name === "CastError") {
            res.status(400).send({error: 'Invalid id'})
        }  else if (e.code === 11000) {
            res.status(400).send({error: `duplicate value ${JSON.stringify(e.keyValue)}`})
        } else {
            res.status(500).send(e)
        }
    }

})

taskRouter.delete('/tasks/:id',async (req,res)=>{
    const _id=req.params.id

    try{
        const task=await Task.findOneAndDelete(_id)
        if(!task){
            return  res.status(400).send({error:'Task id not found'})
        }
        res.send(task)
    }catch (e){
        if (e.name === "CastError") {
            res.status(400).send({error: 'Invalid id'})
        }else{
            res.status(500).send(e)
        }
    }

})


module.exports={
    taskRouter
}