const request = require('request');

var getWeather = (lat, lng, callback) => {

	request({
		url: `https://api.forecast.io/forecast/b35142b1b42529b126e94493a158a3d0/${lat},${lng}`,
		json: true
	}, (error, response, body) => {
		if(error){
			callback('Unable to connect to Forecast.io server.');
		}else if(response.statusCode === 400){
			callback('Unable to fetch weather.');
		} else if(!error && response.statusCode === 200){
			callback(undefined, {
				temperature: body.currently.temperature,
				apparentTemperature: body.currently.apparentTemperature
			});
		}
	});

}

module.exports.getWeather = getWeather;