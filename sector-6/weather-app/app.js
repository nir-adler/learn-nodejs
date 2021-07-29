var yargs = require('yargs/yargs')(process.argv.slice(2))

const {geocode, weather} = require('./geolocation')


yargs.command(
    'geo',
    'Enter address and get latitude and longitude',
    (argv) => argv.options('address', {
        alias: 'a',
        describe: 'Enter Address',
        demandOption: true,
        type: 'string',
    }),
    (argv) => {
        geocode(argv.address, (error, data) => {
            if (error) {
                return console.log(error)
            }
            weather(data, (error, data) => {
                if (error) {
                    return console.log(error)
                }
                console.log(data)
            })
        })
    }
).help().argv



