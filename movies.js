'use strict';

const axios = require('axios');

async function getMovies (request, response, next) {

  let city = request.query.city;

  try {
    let movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&include_adult=false&total_results=10&query=${city}`;
    console.log(movieUrl);
    let movieData = await axios.get(movieUrl);
    console.log(movieData);
    let movieDataToSend = movieData.data.results.map(movie => new Movie(movie));
    console.log(movieDataToSend);
    response.send(movieDataToSend);
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
