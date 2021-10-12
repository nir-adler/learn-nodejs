const {
    geoLocation,
    getForcast
}=require('./api')


geoLocation('tel aviv israel',(error,{latitude,longitude,placeName}={})=>{
    if(error){
        return console.log(error)
    }

    getForcast(latitude,longitude,(error,forcast)=>{
        if(error){
            return console.log(error)
        }
        console.log(placeName)
        console.log(forcast)
    })
})