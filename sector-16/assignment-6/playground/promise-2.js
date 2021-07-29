// find task by id, remove task, and count tasks with completed=false findOneAndDelete countDocuments

require('../src/db/mongoose')
const { Task } = require('../src/models/task')

const updateAndCount = async(_id) => {
    const task = await Task.findOneAndDelete(_id)
    const count = await Task.countDocuments({ completed: false })

    return count
}


updateAndCount("60fc03957ea04e96606a98e4").then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})