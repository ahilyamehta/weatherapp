const request = require('request')
const forecast = (latitude, longitude, callback) => { 
    const url = "https://api.darksky.net/forecast/f0ba5d14d020c9f03ed8d114e3bde425/" + latitude + "," + longitude

    request({ url: url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else {
            callback(undefined, response.body.daily.data[0].summary + 'It is currently' + response.body.currently.temperature + 'degrees out. There is a ' + response.body.currently.percipProbability + '% chance of raining.')
        } 
    })
}
module.exports = forecast