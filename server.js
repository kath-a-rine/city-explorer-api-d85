'use strict';

console.log('our first server');
// REQUIRE
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const axios = require('axios');

// USE
const app = express();

const PORT = process.env.PORT || 3002;

app.use(cors());

// ROUTES
app.get('/weather', (request, response, next) => {
  try {
    // let cityData = request.query.city;

    // let selectedCity = data.find(city => city.city_name.toLowerCase() === cityData.toLowerCase());

    // let dataToSend = selectedCity.data.map(city => new Forecast(city));
    // response.send(dataToSend);
    // console.log(dataToSend);

    let search = request.query.searchQuery;

    let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${search}&units=I&days=7&key=${process.env.WEATHER_API_KEY}`;

    let results = await axios.get(url);

    //let latLon = data.find

  } catch (error) {
    next(error);
  }
});

app.get('*', (request, response) => {
  response.status(404).send('Not found');
});

// ERRORS

app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

// CLASSES
class Forecast {
  constructor(weatherObject) {
    // this.date = weatherObject.datetime;
    // this.description = weatherObject.weather.description;
    this.lat=weatherObject.lat;
    this.lon=weatherObject.lon;
  }
}

// LISTEN
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
