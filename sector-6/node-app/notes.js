const fs = require('fs')
const getNotes = function () {

}

const addNote = function (title, body) {
    var notes = loadNotes()
    const duplicateNotes = notes.filter(function (note) {
        return note.title === title
    })
    // console.log(duplicateNotes)

    if (duplicateNotes.length === 0) {
        if (notes.title != undefined) {
            notes.push({
                title: title,
                body: body
            })
            writeNotes(JSON.stringify(notes))
            console.log('New note added!')
        }
    }else{
        console.log('Note title taken!')
    }
}

const writeNotes = function (notes) {
    fs.writeFileSync('./notes.json', notes)
}

const loadNotes = function () {
    try {
        const dataBuffer = fs.readFileSync('./notes.json')
        return (JSON.parse(dataBuffer.toString()))
    } catch (e) {
        return []
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote
}