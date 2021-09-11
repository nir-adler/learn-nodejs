const { getGeolocation, getForcast } = require('./api')

getGeolocation('russia', (error, { placeName, latitude, longitude } = {}) => {
    if (error) {
        return console.log(error)
    }
    getForcast(latitude, longitude, (error, forcast) => {
        if (error) {
            return console.log(error)
        }
        console.log(placeName)
        console.log(forcast)
    })
})