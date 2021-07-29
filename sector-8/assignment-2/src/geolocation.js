const request = require('request')

const geocode = (address, callback) => {
    let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiZG9nbGl5IiwiYSI6ImNrcjF2d3ZiNjFyMmcydHBsbzdpcGdtMHAifQ.6wMgJOBmieFWZ-InTNwzXg&limit=1`
    request({url: url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location', undefined)
        } else {
            // console.log(body)
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

const weather = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=c7dea350358f745d2cd805aa521688e8&query=${latitude},${longitude}`
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Cannot connect to service', undefined)
            console.log('Cannot connect to mapbox.com')
        } else {
            callback(undefined, body)
        }
    })
}

module.exports = {
    geocode: geocode,
    weather: weather
}