'use strict';

const axios = require('axios');
let cache = require('./cache.js');

async function getMovies(request, response, next) {
  try {
    let citySearch = request.query.citySearch;
    let key = citySearch + 'Data';

    let timeToCache = 1000 * 60 * 60 * 24 * 30;

    if (cache[key] && (Date.now() - cache[key].timestamp < timeToCache)) {
      console.log('You have already made this request');
      response.status(200).send(cache[key].data);
    } else {
      console.log('Cache miss');

      let movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&include_adult=false&total_results=10&query=${citySearch}`;

      let movieData = await axios.get(movieUrl);
      console.log(movieData);

      let movieDataToSend = movieData.data.results.map(movie => new Movie(movie));

      cache[key] = {
        data: movieDataToSend,
        timestamp: Date.now()
      };
      response.status(200).send(movieDataToSend);
    }

  } catch (error) {
    next(error);
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

module.exports = getMovies;

