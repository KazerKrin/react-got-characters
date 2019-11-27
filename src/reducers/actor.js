import { GET_ACTOR, API_ERROR } from '../types';

export default function actor(state = [], action = {}) {
  switch (action.type) {
    case GET_ACTOR:
      return [...state, action.actor];
    default:
      return state;
  }
}
