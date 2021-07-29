var argv = require('yargs/yargs')(process.argv.slice(2))
const {weatherForcast, geoLocation} = require('./api')
const chalk = require('chalk')

argv.command(
    'weather',
    'Weather forcast',
    (argv) => argv.option('address', {
        alias: 'a',
        describe: 'address',
        demandOption: true,
        type: 'string'
    }),
    (argv) => {
        geoLocation(argv.address, (error, {location, latitude, longitude} = {}) => {
            if (error) {
                return console.log(chalk.red(error))
            }

            weatherForcast(latitude, longitude, (error, forcast) => {
                if (error) {
                    return console.log(chalk.red(error))
                }

                console.log(location)
                console.log(forcast)
            })

        })
    }
).help().argv


