const request = require('request')
const chalk = require('chalk')
const getWeather = (address) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZG9nbGl5IiwiYSI6ImNrcjF2d3ZiNjFyMmcydHBsbzdpcGdtMHAifQ.6wMgJOBmieFWZ-InTNwzXg&limit=1`

    request({url, json: true}, (error, {body}) => {
        if (error) {
            console.log('Unable to connect service!')
        }else if(body.features.length===0){
          console.log(chalk.red('Location not found!'))
        } else {
            console.log('Latitude is: ' + body.features[0].center[0])
            console.log('Longitude is: ' + body.features[0].center[1])
        }
    })

}

module.exports={
    getWeather
}