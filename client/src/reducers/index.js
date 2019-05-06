import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import storyReducer from './storyReducer';
import profileReducer from './profileReducer';

export default combineReducers({
  auth: authReducer,
  error: errorReducer,
  stories: storyReducer,
  profile: profileReducer,
});