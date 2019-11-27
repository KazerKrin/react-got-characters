import axios from 'axios';

import { GET_ACTOR, API_ERROR } from '../types';

export const getActor = actorId => {
  return dispatch => {
    axios.get(`https://api.themoviedb.org/3/person/${ actorId }?api_key=d4d7fb6827f9a0080085a4d24371c115&append_to_response=combined_credits`)
    .then(res => {
      if (res.data) {
        dispatch({
          type: GET_ACTOR,
          actor: res.data,
        });
      }
    }).catch(err => {
      dispatch({
        type: API_ERROR,
        error: 'An error has occured',
      });
    })
  }
};
