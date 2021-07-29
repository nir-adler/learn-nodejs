const https = require('https')
const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/Beit Zayit.json?access_token=pk.eyJ1IjoiZG9nbGl5IiwiYSI6ImNrcjF2d3ZiNjFyMmcydHBsbzdpcGdtMHAifQ.6wMgJOBmieFWZ-InTNwzXg&limit=1`
// const url = `https://www.ynet.co.il`

const request = https.request(url, (response) => {
    let data = ''

    response.on('data', (chunk) => {
        data = data + chunk.toString()
    })

    response.on('end', () => {
        const body = JSON.parse(data)
        console.log(body)
    })
})

request.on('error',(error)=>{
    console.log('An error',error)
})

request.end()