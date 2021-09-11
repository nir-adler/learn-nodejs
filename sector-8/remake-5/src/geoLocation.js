const request = require('request')

const getGeolocation = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZG9nbGl5IiwiYSI6ImNrcjF2d3ZiNjFyMmcydHBsbzdpcGdtMHAifQ.6wMgJOBmieFWZ-InTNwzXg&limit=1`

    request({ url: url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback(error, undefined)
        } else if (body.features.length < 1) {
            callback('Location not found', undefined)

        } else {

            const placeName = body.features[0].place_name
            const latitude = body.features[0].center[0]
            const longitude = body.features[0].center[1]
            callback(undefined, { placeName, latitude, longitude })

        }
    })
}

const getForcast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=c7dea350358f745d2cd805aa521688e8&query=${latitude},${longitude}`

    request({ url, json: true }, (error, response) => {
        if (error) {
            callback(error, undefined)
        } else if (response.body.error && response.body.error.code === 615) {
            callback('Request fails', undefined)
        } else {

            callback(undefined, `Current temperature:${response.body.current.temperature}, Chance of rain is ${response.body.current.precip}`)
        }
    })
}

module.exports = {
    getGeolocation,
    getForcast
}