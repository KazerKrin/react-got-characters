import { API_ERROR } from '../types';

export default function error(state = {}, action = {}) {
  switch (action.type) {
    case API_ERROR:
      return action.error;
    default:
      return state;
  }
}
