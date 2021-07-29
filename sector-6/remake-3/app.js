const {getForcast, geoLocation} = require('./geolocation')

geoLocation('Los Angeles', (error, {location, latitude, longitude} = {}) => {
    if (error) {
        return console.log(error)
    }
    getForcast(latitude, longitude, (error, forcast) => {
        if(error){
            return console.log(error)
        }
        console.log(location)
        console.log(forcast)
    })
})