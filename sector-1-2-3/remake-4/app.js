const {
    addNote,
    listNotes,
    removeNote,
    readNote
} = require('./notes')
const chalk = require('chalk')
var argv = require('yargs/yargs')(process.argv.slice(2))


argv.command(
    'list',
    'list all notes',
    (argv) => {
        listNotes()
    }
).help()

argv.command(
    'read',
    'read one note',
    (argv) => argv.option('title', {
        alias: 't',
        demandOption: true,
        describe: 'add title to node',
        type: 'string'

    }),
    (argv) => {
        readNote(argv.title)
    }
).help()

argv.command(
    'add',
    'Add note',
    (argv) => argv.option('title', {
        alias: 't',
        demandOption: true,
        describe: 'add title to node',
        type: 'string'

    }).option('body', {
        alias: 'b',
        demandOption: true,
        describe: 'add body to node',
        type: 'string'
    }),
    (argv) => {
        addNote(argv.title, argv.body)
    }
)

argv.command(
    'remove',
    'Remove a note',
    (argv) => argv.option('title', {
        alias: 't',
        demandOption: true,
        describe: 'add title to node',
        type: 'string'
    }),
    (argv) => {
        removeNote(argv.title)
    }
).help().argv
