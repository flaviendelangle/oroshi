import MoviesAPI from 'services/TheMovieDatabaseJS/movies'
import { movie } from 'services/titles/api'

export const loadMovie = tmdbId => {
  const options = {
    append_to_response: ['credits', 'images', 'recommendations']
  };
  return {
    type: movie.load,
    payload: MoviesAPI.details(tmdbId, options)
  }
};