const request = require('request')

const geoLocation = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?proximity=-74.70850,40.78375&access_token=pk.eyJ1IjoiZG9nbGl5IiwiYSI6ImNrcjF2d3ZiNjFyMmcydHBsbzdpcGdtMHAifQ.6wMgJOBmieFWZ-InTNwzXg&limit=1`
    request.get(url, { json: true }, (error, { body }) => {
        // console.log(body)
        if (error) {
            callback(error, undefined)
        } else if (body.features.length === 0) {
            callback('Address not found', undefined)
        } else {

            const latitude = body.features[0].center[0]
            const longitude = body.features[0].center[1]
            const placeName = body.features[0].place_name
            callback(undefined, { latitude, longitude, placeName })
        }
    })
}

const getForcast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=c7dea350358f745d2cd805aa521688e8&query=${latitude},${longitude}`

    request(url, { json: true }, (error, { body }) => {
        if (error) {
            callback(error, undefined)
        } else if (body.error && body.error.code) {
            callback(body.error.info)
        } else {
            // console.log(body)
            const forcast = `current temperature: ${body.current.temperature}, Chance of rain is ${body.current.precip}`
            callback(undefined, forcast)
        }
    })

}




module.exports = {
    geoLocation,
    getForcast
}