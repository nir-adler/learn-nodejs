const fs=require('fs')
const {getNotes}=require('./utils')
const chalk=require('chalk')
const yargs = require('yargs')
var argv = require('yargs/yargs')(process.argv.slice(2))

// console.log(getNotes())
// console.log(chalk.green('Success!'))

yargs.command(
    'list',
    'List all notes',
    (argv)=>{
        console.log('list all notes')
    }
).help()

yargs.command(
    'read',
    'Read one note',
    (argv)=>{
        console.log('read one note')
    }
).help()

yargs.command(
    'add',
    'add a note',
    (argv)=>argv.option('title',{
        alias:'t',
        demandOption:true,
        describe: 'add title to note',
        type:'string'
    }).option('body',{
        alias:'b',
        demandOption:true,
        describe: 'add body to note',
        type:'string'
    }),
    (argv)=>{
        console.log('add note to file')
    }
).help().argv