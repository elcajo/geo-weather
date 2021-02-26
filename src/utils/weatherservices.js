const request = require('postman-request')

const weatherSvs = (lat, lon, callback) => {
    const coord = `http://api.weatherstack.com/current?access_key=a3eb77f8426be7943af41576e3ef544e&query=${lat},${lon}&units=m`

    request({ url: coord, json: true }, (error, response) => {
        const { temperature, feelslike, weather_descriptions } = response.body.current
        const weather= weather_descriptions[0]
        const temp= temperature
        const feels= feelslike

        if (error) {
            callback(` --Unable to connect to weather services-- `, undefined)
        } else if (response.body.error) {
            callback(` --Location Error, Check Location Entry-- `, undefined)
        } else {
            callback(undefined, `Currently having ${weather} weather with a temperature of ${temp} degree celcius. It feels like ${feels} degree celcius`)
        }

    } )
}

module.exports = weatherSvs