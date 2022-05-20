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
app.get('/weather', async (request, response, next) => {
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
});

app.get('/movies', async (request, response, next) => {

  let city = request.query.city;


  try {
    let movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&include_adult=false&query=${city}`;

    let movieData = await axios.get(movieUrl);
    console.log(movieData);
    let movieDataToSend = movieData.data.results.map(movie => new Movie(movie));
    console.log(movieDataToSend);
    response.send(movieDataToSend);

  } catch (error) {
    next(error);
  }
});

app.get('*', (request, response) => {
  response.status(404).send('Not found');
});

// ERRORS

app.use((error, request, response) => {
  response.status(500).send(error.message);
});

// CLASSES
class Forecast {
  constructor(weatherObject) {
    this.date = weatherObject.valid_date;
    this.description = weatherObject.weather.description;
    this.high_temp = weatherObject.high_temp;
  }
}

class Movie {
  constructor(movieObject) {
    this.title = movieObject.title;
    this.overview = movieObject.overview;
    this.release_date = movieObject.release_date;
    this.poster_path = `https://www.themoviedb.org/t/p/w440_and_h660_face` + `${movieObject.poster_path}`;
  }
}

// LISTEN
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
