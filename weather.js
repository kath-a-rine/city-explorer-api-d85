'use strict';
const axios = require('axios');


async function getWeather (request, response, next){
  let city = request.query.city;
  console.log(city);

  try {
    let lat = request.query.lat;
    let lon = request.query.lon;

    let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&lat=${lat}&lon=${lon}&units=I&key=${process.env.WEATHER_API_KEY}`;

    let weatherData = await axios.get(url);
    let dataToSend = weatherData.data.data.map(city => new Forecast(city));

    response.send(dataToSend);

  } catch (error) {
    next(error);
  }
}

class Forecast {
  constructor(weatherObject) {
    this.date = weatherObject.valid_date;
    this.description = weatherObject.weather.description;
    this.high_temp = weatherObject.high_temp;
  }
}

module.exports = getWeather;
