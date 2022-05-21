'use strict';

console.log('our first server');
// REQUIRE
const express = require('express');
require('dotenv').config();
const cors = require('cors');

const getWeather = require('./weather');
const getMovies =require('./movies');

// USE
const app = express();
const PORT = process.env.PORT || 3002;
app.use(cors());

// ROUTES
app.get('/', (request, response) => response.send('I am ready!'));

app.get('/weather', getWeather);

app.get('/movies', getMovies);

app.get('*', (request, response) => {
  response.status(404).send('Not found');
});

// ERRORS

app.use((error, request, response) => {
  response.status(500).send(error.message);
});


// LISTEN
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
