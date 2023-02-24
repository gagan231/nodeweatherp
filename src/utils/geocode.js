const request = require('request');

const geocode = (place, callback) =>{
    const mpApiKey = "pk.eyJ1IjoiY3J1emVkdXgyMzEiLCJhIjoiY2p5YmdsdXp0MDhkeDNia284MXpreTFkOSJ9.LWeCgFxiziTZvMcl207B0w";
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(place)+".json?access_token="+mpApiKey;

    request({url, json: true}, (err, { body } = {}) =>{
        if(err){
            // console.log("Unable to connect to mapbox server");
            callback("Unable to connect to mapbox server", undefined);
        }
        else if(body.features.length === 0){
            // console.log("Unable to find the location, try to search different location");
            callback("Unable to find the location, try to search different location", undefined);
        }
        else{
            const currentData = body.features[0];
            const longData = currentData.center[0];
            const latData = currentData.center[1];
            callback(undefined, {
                latitude: latData,
                longitude: longData,
                location: body.features[0].place_name
            });
            // console.log("Lat -- "+ latData + ", Long -- "+longData);
        }
    })
}

module.exports = geocode