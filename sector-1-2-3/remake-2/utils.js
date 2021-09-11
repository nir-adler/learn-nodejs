const fs = require('fs')

const getNotes = () => {
    const data = fs.readFileSync('notes.txt')
    console.log(data.toString())
}



module.exports = {
    getNotes
}