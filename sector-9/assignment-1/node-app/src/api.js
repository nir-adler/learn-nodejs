const request = require('request')
const chalk = require('chalk')



const weatherForcast = (latitude,longitude,callback) => {
    const url = `http://api.weatherstack.com/current?access_key=c7dea350358f745d2cd805aa521688e8&query=${latitude},${longitude}`
    request({url, json: true}, (error, {body} = {}) => {
        console.log(body)
        if (error) {
            console.log(error)
            callback(error,undefined)
        }else if(body.success===false){
            callback(body.error.info,undefined)
        } else {
            const forcast = `It is currently ${body.current.temperature} degreed out. There is a ${body.current.precip}% chance of rain. new data`
            callback(undefined,forcast)
        }
    })
}

const geoLocation = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZG9nbGl5IiwiYSI6ImNrcjF2d3ZiNjFyMmcydHBsbzdpcGdtMHAifQ.6wMgJOBmieFWZ-InTNwzXg&limit=1`

    request({url, json: true}, (error, {body} = {}) => {
        if (error) {
            callback(error,undefined)
        } else if (body.features.length === 0) {
            callback(`Location: ${address} not found!`,undefined)
        } else {
            const location = body.features[0].place_name
            const latitude = body.features[0].center[0]
            const longitude = body.features[0].center[1]
            callback(undefined,{location,latitude,longitude})
        }
    })

}


module.exports = {
    weatherForcast,
    geoLocation
}