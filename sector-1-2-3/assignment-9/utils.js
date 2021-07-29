const fs = require('fs')
const chalk = require('chalk')

const getNotes = function () {
    return 'Your notes.js'
}

const listNotes = () => {
    const notes = loadNotes()
    notes.forEach((note) => {
        console.log(note.title)
    })

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
    const duplicateNotes = notes.find((note) => note.title === title)

    if (!duplicateNotes) {
        notes.push({
            title,
            body
        })
        saveNotes(notes)
        console.log(chalk.green('Note had been added to notes.js'))
    } else {
        console.log(chalk.red('Note exist in notes.json!'))
    }
}

const ReadNote = (title) => {
    const notes = loadNotes()
    const searchNote = notes.find((note) => note.title === title)

    if (searchNote) {
        console.log(chalk.green(searchNote.title,searchNote.body))
    } else {
        console.log(chalk.red('Note not found!'))
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
    removeNote,
    listNotes,
    ReadNote
}