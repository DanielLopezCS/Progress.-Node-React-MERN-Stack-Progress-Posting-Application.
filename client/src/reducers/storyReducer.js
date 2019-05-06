import isEmpty from '../validation/is-empty';

import { GET_STORIES, GET_CATEGORIES, POST_STORY, GET_STORY, POST_FAVORITE, 
  POST_UNFAVORITE, POST_COMMENT,  GET_STORIES_PROFILE, POST_EVENT,
  UPLOAD_EVENT_IMAGE, UPLOAD_STORY_IMAGE, GET_STORIES_SUBCATEGORIES,
  DELETE_EVENT, DELETE_STORY

} from '../actions/types';

const initialState = {
 
  isLoading:true,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_STORIES:
      return {
        ...state,
        stories: action.payload,
        isLoading: false,

      };
    case GET_CATEGORIES:
      return{
        ...state,
        categories: action.payload,
      };
    case POST_STORY:
      return{
        ...state,
        story: action.payload,
        isLoading:false,
        
      }
      case GET_STORY:
      return{
        ...state,
        story: action.payload,
        isLoading:false,
        
      }
      case POST_FAVORITE:
      return{
        ...state,
        story: action.payload,
        
      }
      case POST_UNFAVORITE:
      return{
        ...state,
        story: action.payload,
      }
      case POST_COMMENT:
      return{
        ...state,
        story: action.payload,
      }
      case GET_STORIES_PROFILE:
      return{
        ...state,
        profileStories:action.payload,
      }
      case POST_EVENT:
      return {
        ...state,
        story: action.payload,
      }
      case UPLOAD_EVENT_IMAGE:
      return{
        ...state,
        msg:  action.payload,
      }
      case UPLOAD_STORY_IMAGE:
      return{
        ...state,
        msg:  action.payload,
      }
      case GET_STORIES_SUBCATEGORIES:
      return{
        ...state,
        stories: action.payload,
      }
      case DELETE_EVENT:
      return{
        ...state,
        story: action.payload,
      }
      case DELETE_STORY:
      return{
        ...state,
        success: action.payload,

      }
    default:
      return state;
  }
}
