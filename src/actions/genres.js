import axios from 'axios';

import { GET_GENRES, API_ERROR } from '../types';

export const getGenres = () => dispatch => {
  axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=d4d7fb6827f9a0080085a4d24371c115')
  .then(res => {
    if (res.data) {
      dispatch({
        type: GET_GENRES,
        genre: res.data.genres,
      });
    }
  }).catch(() => dispatch({
    type: API_ERROR,
    error: 'An error has occured',
  }));
};
