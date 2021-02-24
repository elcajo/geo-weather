const chalk = require('chalk')
const request = require('postman-request')

const geoCode = (address, callback) => {
    const loc = `http://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiY3JvbW1lbGciLCJhIjoiY2treTh5OTYwMjhlZjJvcnRtaWJ6cm45NCJ9.VumLR6GCZM34T5iOSSv47A&limit=1`
    
    request ({ url: loc, json: true }, (error, response) => {
        // const { center, place_name } = response.body.features[0]
        
        if(error){
            callback(` --Unable to connect to location services-- `, undefined)
        } else if (response.body.features.length===0) {
            callback(` --No Results, Try Again-- `, undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })

}

module.exports = geoCode
