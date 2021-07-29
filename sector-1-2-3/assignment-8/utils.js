const fs = require('fs')
const chalk = require('chalk')

const getNotes = function () {
    return 'Your notes.js'
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('./notes.json')
        const dataJson = dataBuffer.toString()

        return JSON.parse(dataJson)
    } catch (e) {
        return []
    }
}

const saveNotes = (notes) => {
    try {
        fs.writeFileSync('./notes.json', JSON.stringify(notes))
    } catch (e) {
        console.log(chalk.red('Error saving data on file notes.json'))
    }
}

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNotes = notes.filter((note) => note.title === title)

    if (duplicateNotes.length === 0) {
        data.push({
            title,
            body
        })
        saveNotes(data)
        console.log(chalk.green('Note had been added to notes.js'))
    } else {
        console.log(chalk.inverse.red('Note exist in notes.json!'))
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const filterNotes = notes.filter((note) => note.title !== title)

    if (filterNotes.length !== notes.length) {
        saveNotes(filterNotes)
        console.log(chalk.green(`Note: ${title} had been remove`))
    } else {
        console.log(chalk.red('Note not found!'))
    }


}

// console.log(loadData())

module.exports = {
    getNotes,
    addNote,
    removeNote
}