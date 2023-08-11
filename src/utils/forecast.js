const request = require('request')

// const geocode = (address, callback) => {
//     const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiYW5kcmV3bWVhZDEiLCJhIjoiY2pvOG8ybW90MDFhazNxcnJ4OTYydzJlOSJ9.njY7HvaalLEVhEOIghPTlw&limit=1'

//     request({ url: url, json: true }, (error, response) => {
//         if (error) {
//             callback('Unable to connect to location services!', undefined)
//         } else if (response.body.features.length === 0) {
//             callback('Unable to find location. Try another search.', undefined)
//         } else {
//             callback(undefined, {
//                 latitude: response.body.features[0].center[0],
//                 longitude: response.body.features[0].center[1],
//                 location: response.body.features[0].place_name
//             })
//         }
//     })
// }

// module.exports = geocode



const forecast = (address,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=ca2aaab44e6fd29cec4c7894ab4051f8&query='+address+'&units=m'

    request({url,json:true},(error,{body}) =>{
    // const data = JSON.parse(response.body)
    // console.log(response.body.current)
    if(error){
        // console.log('Unable to connect to weather app!')
        callback(('Unable to connect to weather app!'))
    }
    else if(body.error){
        // console.log('Unable to find location!')
        callback(('Unable to find location!'))
    }
    else{
        // const loc = body.location.country
        // const region = body.location.region
        // console.log(body.current.weather_descriptions[0] +'. It is currently ' + body.current.temperature +' degress out.  It feels like ' + body.current.feelslike + ' degress out.')
        // const latitude = body.location.lat
        // const longitude = body.location.lon
        // console.log(latitude, longitude)
        // console.log(loc)
        // console.log(region)
        // console.log(body.current)
        callback(undefined,{
           location: body.location.country,
           region  :body.location.region,
           forecast:'Current observation time is '+body.current.observation_time +"." + 'Weather_descriptions is : ' +body.current.weather_descriptions[0] +'. Current Temperature is ' + body.current.temperature +' degress out.  It feels like ' + body.current.feelslike + ' degress out.'+ 'The humidity is : '+body.current.humidity + "%" + '. wind_speed is : '+body.current.wind_speed + '.wind direction: ' + body.current.wind_dir + ". Currently is_day: " +body.current.is_day,
           longitude:body.location.lon,
           latitude:body.location.lat
        
        })
    }
    
})
}

module.exports = forecast