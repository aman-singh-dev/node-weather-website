const request = require('request')
 
const temperature = (address, callback) => {
    const url = 'http://api.weatherapi.com/v1/current.json?key=40aa0b21edc84d41b6554704201111&q=' + address;
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Service not found!', undefined)
        }
        else if (body.error) {
            callback(body.error.message, undefined)
        }
        else {
            callback(undefined, {
                location: body.location.name,
                region: body.location.region,
                temp: body.current.temp_c + 'c',
                rain: body.current.precip_mm + '%'
            })
        }
    })
}
module.exports = temperature


