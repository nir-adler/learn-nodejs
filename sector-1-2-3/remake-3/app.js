var argv = require('yargs/yargs')(process.argv.slice(2))
const { addNote, removeNote, listNotes, readNote } = require('./utils')


argv.command(
    'add',
    'Add note',
    (argv) => argv.option('title', {
        alias: 't',
        describe: 'Title of note',
        demandOption: true,
        type: 'string'
    }).option('body', {
        alias: 'b',
        describe: 'Body of note',
        demandOption: true,
        type: 'string'
    }),
    (argv) => {
        addNote(argv.title, argv.body)
    }
)

argv.command(
    'remove',
    'Remove note',
    (argv) => argv.option('title', {
        alias: 't',
        describe: 'Title of note',
        demandOption: true,
        type: 'string'
    }),
    (argv) => {
        removeNote(argv.title)
    }
)

argv.command(
    'list',
    'list all notes',
    (argv) => {
        listNotes()
    }
).help()

argv.command(
    'read',
    'read single note',
    (argv) => argv.option('title', {
        alias: 't',
        describe: 'Title of note',
        demandOption: true,
        type: 'string'
    }),
    (argv) => {
        readNote(argv.title)
    }
).help().argv