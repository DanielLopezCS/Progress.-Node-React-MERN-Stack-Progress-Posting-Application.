import isEmpty from '../validation/is-empty';

import { SET_CURRENT_USER, CREATE_PROFILE, GET_CURRENT_PROFILE, PROFILE_LOADING, } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case CREATE_PROFILE:
      return {
        ...state,
        profile: action.payload,

      };

      case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_CURRENT_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
