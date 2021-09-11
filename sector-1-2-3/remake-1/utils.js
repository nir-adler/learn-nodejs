const fs = require('fs')
const chalk = require('chalk')
const typeOf = require('typeof')


const readNote=(title)=>{
    const notes=loadNotes()
    const searchNote=notes.find((note)=>note.title===title)

    if(searchNote){
        console.log(searchNote.title,searchNote.body)
    }else{
        console.log(chalk.red(`Title ${title} not exist in notes.json`))
    }

}


const removeNote = (title) => {
    const notes = loadNotes()
    const filterNotes = notes.filter((note) => note.title !== title)

    if (filterNotes.length !== notes.length) {
        saveNotes(filterNotes)
        console.log(chalk.green(`Title ${title} removed`))
    } else {
        console.log(chalk.red(`Title ${title} not exist on notes.json`))
    }
}


const addNote = (title, body) => {
    const notes = loadNotes()

    const searchDuplicate = notes.find((note) => note.title === title)
    // console.log(typeof(notes))

    if (!searchDuplicate) {
        notes.push({ title, body })
        saveNotes(notes)
        // console.log(notes)
        console.log(chalk.green('Title added to notes.json'))
    } else {
        console.log(chalk.red(`Title ${title} exist on notes.json`))
    }

}

const loadNotes = () => {
    try {
        const notes = fs.readFileSync('./notes.json').toString()
        return JSON.parse(notes)
    } catch (e) {
        return []
    }
}

const saveNotes = (notes) => {
    try {
        fs.writeFileSync('./notes.json', JSON.stringify(notes))
    } catch (e) {
        console.log(e)
    }
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.green.inverse('Your notes'))
    notes.forEach((note) => {
        console.log(note.title)
    })
}


module.exports = {
    addNote,
    removeNote,
    listNotes,
    readNote
}