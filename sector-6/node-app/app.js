const notes = require('./notes')
var yargs = require('yargs/yargs')(process.argv.slice(2))

yargs.command(
    'add',
    'Add new note',
    function (argv) {
        return argv.option('title', {
            describe: 'Note title',
            demandOption:true,
            type:'string',
            alias:'t'
        }).options('body',{
            describe: 'Note body',
            demandOption:true,
            type:'string',
            alias:'b'
        })
    },
    function (argv){
        notes.addNote(argv.title,argv.body)
    }
).argv




