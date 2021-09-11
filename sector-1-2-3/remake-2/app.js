const { getNotes } = require('./utils')
const chalk = require('chalk')
const argv = require('yargs/yargs')(process.argv.slice(2))

argv.command(
    'list',
    'List all Notes',
    (argv)=>{
        console.log('list notes')
    }
).help().argv