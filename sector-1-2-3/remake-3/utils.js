const fs = require('fs')
const chalk = require('chalk')


const readNote=(title)=>{
    const notes=readNotes()
    const note=notes.find((note)=>note.title===title)

    if(note){
    console.log(`Title: ${note.title}, Body: ${note.body}`) 
    }else{
        console.log(chalk.red(`Title ${title} not exist on file.`))
    }

}

const listNotes=()=>{
    const notes=readNotes()

    notes.forEach((note)=>{
        console.log(chalk.inverse(`Title: ${note.title}`))
    })

}

const removeNote = (title) => {
    const notes = readNotes()
    const filterNotes = notes.filter((note) => note.title !== title)

    if (filterNotes.length !== notes.length) {
        saveNotes(filterNotes)
        console.log(chalk.green.inverse(`Title ${title} had been remove from file.`))
    } else {
        console.log(chalk.red(`Title ${title} not found in file.`))
    }

}

const addNote = (title, body) => {
    const notes = readNotes()
    const searchForNote = notes.find((note) => note.title === title)

    if (searchForNote) {
        console.log(chalk.red.inverse('Title exist in note.json'))
    } else {
        saveNotes([...notes, { title, body }])
        console.log(chalk.green.inverse('Note added to notes.json'))
    }
}

const readNotes = () => {
    try {
        const data = fs.readFileSync('notes.json')
        return JSON.parse(data.toString())
    } catch (e) {
        return []
    }
}
// typeof notes = Object
const saveNotes = (notes) => {
    try {
        fs.writeFileSync('notes.json', JSON.stringify(notes))
    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    addNote,
    removeNote,
    listNotes,
    readNote
}