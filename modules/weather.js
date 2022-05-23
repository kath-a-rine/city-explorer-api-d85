'use strict';

const axios = require('axios');

let cache = require('./cache.js');

async function getWeather(lat, lon) {
  let key = 'weather-' + lat + lon;
  let url = `http://api.weatherbit.io/v2.0/forecast/daily/?key=${process.env.WEATHER_API_KEY}&lang=en&lat=${lat}&lon=${lon}&days=5`;

  let timeToCache = 1000 * 60 * 60 * 24 * 30;

  if (cache[key] && (Date.now() - cache[key].timestamp < timeToCache)) {
    console.log('Cache hit');
  } else {
    console.log('Cache miss');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = await axios.get(url)
      .then(response => parseWeather(response.data));
  }
  return cache[key].data;
}

function parseWeather(weatherData) {
  try {
    const weatherSummaries = weatherData.data.map(day => {
      return new Weather(day);
    });
    return Promise.resolve(weatherSummaries);
  } catch (e) {
    return Promise.reject(e);
  }
}

class Weather {
  constructor(weatherObject) {
    this.date = weatherObject.valid_date;
    this.description = weatherObject.weather.description;
    this.high_temp = weatherObject.high_temp;
  }
}

module.exports = getWeather;
