'use strict';

console.log('our first server');
// REQUIRE
const express = require('express');

require('dotenv').config();

let data = require('./data/weather.json');
const cors = require('cors');

// USE
const app = express();

const PORT = process.env.PORT || 3002;

app.use(cors());

// ROUTES
app.get('/weather', (request, response, next) => {
  try {
    let cityData = request.query.city;

    let selectedCity = data.find(city => city.city_name.toLowerCase() === cityData.toLowerCase());

    let dataToSend = selectedCity.data.map(city => new Forecast(city));
    response.send(dataToSend);
    console.log(dataToSend);
  } catch (error) {
    next(error);
  }
});

app.get('*', (request, response) => {
  response.send('does not exist');
});

// ERRORS

app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

// CLASSES
class Forecast {
  constructor(weatherObject) {
    this.date = weatherObject.datetime;
    this.description = weatherObject.weather.description;
  }
}

// LISTEN
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
