const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiZG9nbGl5IiwiYSI6ImNrcjF2d3ZiNjFyMmcydHBsbzdpcGdtMHAifQ.6wMgJOBmieFWZ-InTNwzXg&limit=1`
    request({ url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location', undefined)
        } else {
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
        // callback(undefined, {
        //     temperature: 31.6,
        //     rain: 10
        // })
        if (body.success===false) {
            callback(body.error.info, undefined)

        } else {
            callback(undefined, {
                temperature:body.current.temperature,
                rain:body.current.precip
            })
        }
    })
}

module.exports = {
    geocode: geocode,
    weather: weather
}