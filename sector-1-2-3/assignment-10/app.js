const fs = require('fs')
const { getNotes, addNote, removeNote, listNotes, ReadNote } = require('./utils')
const chalk = require('chalk')
const yargs = require('yargs')
var argv = require('yargs/yargs')(process.argv.slice(2))



yargs.command(
    'list',
    'List all notes',
    (argv) => {
        listNotes()
    }
).help()

yargs.command(
    'read',
    'Read one note',
    (argv) => argv.option('title', {
        alias: 't',
        demandOption: true,
        describe: 'add title to note',
        type: 'string'
    }),
    (argv) => {
        ReadNote(argv.title)
    }
).help()

yargs.command(
    'add',
    'add a note',
    (argv) => argv.option('title', {
        alias: 't',
        demandOption: true,
        describe: 'add title to note',
        type: 'string'
    }).option('body', {
        alias: 'b',
        demandOption: true,
        describe: 'add body to note',
        type: 'string'
    }),
    (argv) => {
        addNote(argv.title, argv.body)
    }
).help()

yargs.command(
    'remove',
    'Remove a note',
    (argv) => argv.option('title', {
        alias: 't',
        demandOption: true,
        describe: 'add title to note',
        type: 'string'
    }),
    (argv) => {
        removeNote(argv.title)
    }
).help().argv