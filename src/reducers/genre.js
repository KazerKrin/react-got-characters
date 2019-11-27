import { GET_GENRES } from '../types';

export default function genre(state = [], action = {}) {
  switch (action.type) {
    case GET_GENRES:
      return action.genre;
    default:
      return state;
  }
}
