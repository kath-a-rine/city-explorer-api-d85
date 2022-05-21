
'use strict';
console.log('lab 10 server');

// REQUIRE
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const getWeather = require('./modules/weather.js');
const getMovies =require('./modules/movies');

const app = express();
const PORT = process.env.PORT || 3002;
app.use(cors());

// ROUTES
app.get('/', (request, response) => response.send('I am ready!'));

app.get('/movies', getMovies);
app.get('/weather', weatherHandler);

app.get('*', (request, response) => {
  response.status(404).send('Not found');
});


function weatherHandler(request, response) {
  const { lat, lon } = request.query;
  getWeather(lat, lon)
    .then(summaries => response.send(summaries))
    .catch((error) => {
      console.error(error);
      response.status(200).send('Sorry. Something went wrong!');
    });
}

app.listen(PORT, () => console.log(`Server up on ${PORT}`));
