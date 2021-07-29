const fs = require('fs')

const getNotes = function () {
    return 'Your notes.js'
}

const loadData = () => {
    try {
        const dataBuffer = fs.readFileSync('./notes.json')
        const dataJson=dataBuffer.toString()

        return JSON.parse(dataJson)
    } catch (e) {
        return []
    }
}

console.log(loadData())

module.exports = {
    getNotes
}