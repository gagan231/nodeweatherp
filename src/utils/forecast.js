const request = require('request');

const forecast = (long, lat, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=176bd7e33f8ea8404a8633b7ff9cac0d&query="+lat+","+long+"";

    request({url, json: true}, (err, {body} = {}) => {
        if(err){
            // console.log('Unable to connect to the weather service!');
            callback("Unable to connect to the weather service!", undefined);
        }
        else if(body.error){
            // console.log("Unable to find the location");
            callback("Unable to find the location", undefined);
        }
        else{
            const currentData = body.current;
            // console.log(currentData.weather_descriptions[0]+". It is currently "+ currentData.temperature + " degrees out. It feels like "+ currentData.feelslike + " degrees out.");
            callback(undefined, currentData.weather_descriptions[0]+". It is currently "+ currentData.temperature + " degrees out. It feels like "+ currentData.feelslike + " degrees out.");
        }
    });
}


module.exports = forecast