const request = require('request')
var yargs = require('yargs/yargs')(process.argv.slice(2))
const { geoLocation, getForcast } = require('./utils')

yargs.command(
    'weather',
    'Forcast for location',
    (argv) => argv.option('address', {
        alias: 'a',
        demandOption: true,
        describe: 'address for location',
        type: 'string'
    }),
    (argv) => {
        geoLocation(argv.address, (error, { location, latitude, longitude } = {}) => {
            if (error) {
                return console.log(error)
            }
            getForcast(latitude, longitude, (error, forcast) => {
                if (error) {
                    return console.log(error)
                }
                console.log(location, forcast)
            })
        })
    }
).help().argv