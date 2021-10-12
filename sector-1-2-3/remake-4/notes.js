const fs = require('fs')
const chalk = require('chalk')

const readNotes = () => {
    try {
        const buffer = fs.readFileSync('notes.txt')

        return JSON.parse(buffer.toString())
    } catch (e) {
        return []
    }

}


const saveNotes = (notes) => {
    try {
        fs.writeFileSync('notes.txt', JSON.stringify(notes))
    } catch (e) {
        console.log(e)
    }
}


const addNote = (title, body) => {
    const notes = readNotes()
    const find = notes.find((notes) => notes.title === title)

    if (find) {
        return console.log(chalk.red(`Title ${title} already exists!`))
    }
    saveNotes([...notes, { title, body }])
    console.log(chalk.green('title add to notes file.'))
}


const readNote=(title)=>{
    const notes = readNotes()
    const note = notes.find((notes) => notes.title === title)

    if (!note) {
        return console.log(chalk.red(`Title ${title} not exists!`))
    }
    console.log(`Title ${title}, Body ${note.body}`)
}

const listNotes = () => {
    const notes = readNotes()
    notes.forEach((note) => console.log(`${note.title}, ${note.body}`))
}

const removeNote = (title) => {
    const notes = readNotes()
    const filterNotes = notes.filter((notes) => notes.title !== title)

    if (filterNotes.length === notes.length) {
        return console.log(chalk.red(`Title ${title} not exists!`))
    }
    saveNotes(filterNotes)
    console.log(`Title ${title} had been removed from notes.txt`)
}

module.exports = {
    addNote,
    listNotes,
    removeNote,
    readNote
}