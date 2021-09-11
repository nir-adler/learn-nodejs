
const chalk = require('chalk')
const argv = require('yargs/yargs')(process.argv.slice(2))
const {addNote,removeNote,listNotes,readNote}=require('./utils')



argv.command(
    'list',
    'List all notes',
    (argv) => {
        listNotes()
    }
).help()

argv.command(
    'read',
    'read one note',
    (argv) =>argv.option('title',{
        alias: 't',
        demandOption: true,
        describe: 'Title of note',
        type: 'string'
    }),
    (argv)=>{
        readNote(argv.title)
    }
).help()

argv.command(
    'add',
    'Add a note',
    (argv) => argv.option('title', {
        alias: 't',
        demandOption: true,
        describe: 'Title of note',
        type: 'string'
    }).option('body', {
        alias: 'b',
        demandOption: true,
        describe: 'Body of note',
        type: 'string'
    }),
    (argv)=>{
        addNote(argv.title,argv.body)
    }
).help()

argv.command(
    'remove',
    'Remove a note',
    (argv) => argv.option('title', {
        alias: 't',
        demandOption: true,
        describe: 'Title of note',
        type: 'string'
    }),
    (argv)=>{
        removeNote(argv.title)
    }
).help().argv