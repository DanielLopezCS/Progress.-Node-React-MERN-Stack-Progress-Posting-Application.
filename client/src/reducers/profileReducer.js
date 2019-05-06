import isEmpty from '../validation/is-empty';

import { GET_PROFILE, GET_PROFILE_HANDLE, POST_PROFILE } from '../actions/types';

const initialState = {
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        
      };
    case GET_PROFILE_HANDLE:
      return{
        ...state,
        profile: action.payload,
      }
    case POST_PROFILE:
      return{
        ...state,
        profile:action.payload,
      }

    default:
      return state;
  }
}
