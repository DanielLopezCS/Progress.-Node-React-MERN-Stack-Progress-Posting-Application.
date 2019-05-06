import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import { GET_ERRORS, GET_STORIES, GET_CATEGORIES, POST_STORY, POST_EVENT, 
  GET_STORY, POST_FAVORITE, POST_UNFAVORITE, POST_COMMENT, GET_STORIES_PROFILE, 
  UPLOAD_EVENT_IMAGE, UPLOAD_STORY_IMAGE, GET_STORIES_SUBCATEGORIES, DELETE_EVENT, DELETE_STORY
} from './types';

// GET Stories
export const getStories = () => dispatch => {
  axios
    .get('/api/stories')
    .then(res => 
        dispatch({
        type:GET_STORIES,
        payload: res.data,
        }))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};


// GET Stories
export const getCategories = () => dispatch => {
  axios
    .get('/api/stories/utils/categories')
    .then(res => 
        dispatch({
        type:GET_CATEGORIES,
        payload: res.data,
        }))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};


// POST a story
export const postStory = (postData) => dispatch => {
  axios
    .post('/api/stories',postData)
    .then(res => 
        dispatch({
        type:POST_STORY,
        payload: res.data,
        }))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// POST a story
export const postComment = (storyID,commentData) => dispatch => {

  axios
    .post(`/api/stories/comment/${storyID}`,commentData)
    .then(res => 
        dispatch({
        type:POST_COMMENT,
        payload: res.data,
        }))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// GET a story by id
export const getStory = (storyID) => dispatch => {
  axios
    .get(`/api/stories/${storyID}`)
    .then(res => {
        dispatch({
        type:GET_STORY,
        payload: res.data,

        })})
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};


// POST a favorite to a post
export const postFavorite = (postID) => dispatch => {
  axios
    .post(`/api/stories/favorite/${postID}`)
    .then(res => 
        dispatch({
        type:POST_FAVORITE,
        payload: res.data,
        }))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};


// POST a favorite to a post
export const postUnfavorite = (postID) => dispatch => {
  axios
    .post(`/api/stories/unfavorite/${postID}`)
    .then(res => 
        dispatch({
        type:POST_UNFAVORITE,
        payload: res.data,
        }))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};


// GET a stories by user profile handle

export const getStoriesByProfile = (handle) => dispatch => {
  axios
    .get(`/api/stories/profile/${handle}`)
    .then(res => {
        dispatch({
        type:GET_STORIES_PROFILE,
        payload: res.data,

        })})
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//POST an event to a story by id
export const postEvent = (storyID, eventData) => dispatch => {
  axios
    .post(`/api/stories/event/${storyID}`, eventData)
    .then(res => 
        dispatch({
        type:POST_EVENT,
        payload: res.data,
        }))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//route api/stories/upload/event/:story_id/:event_id/
//POST upload image to event 
export const uploadEventImage = (storyID, eventID, image) => dispatch => {

  axios(`/api/stories/upload/event/${storyID}/${eventID}`,{
   method: 'POST',
   data : image,
   headers: {
    'Content-Type': 'application/json'
  }
}).then(
  res=> dispatch({
    type:UPLOAD_EVENT_IMAGE,
    payload: res.data,
    })).catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: 'Cannot Get Image'
      })
    );
    }



    

//POST an image to Story
export const uploadStoryImage = (id,image) => dispatch => {

  axios(`/api/stories/upload/${id}`,{
   method: 'POST',
   data : image,
   headers: {
    'Content-Type': 'application/json'
  }
}).then(
  res=> dispatch({
    type:UPLOAD_STORY_IMAGE,
    payload: res.data,
    })).catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: 'Cannot Get Image'
      })
    );
    }


// GET Stories By Subcategories
export const getStoriesBySubcategories = (subcategory) => dispatch => {
  axios
    .get(`/api/stories/lookup/${subcategory}`)
    .then(res => 
        dispatch({
        type:GET_STORIES_SUBCATEGORIES,
        payload: res.data,
        }))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

 

// GET Event
export const deleteEvent = (storyID,eventID) => dispatch => {
  axios
    .delete(`/api/stories/event/${storyID}/${eventID}`)
    .then(res => 
        dispatch({
        type:DELETE_EVENT,
        payload: res.data,
        }))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

 


// DELETE story
export const deleteStory = (storyID) => dispatch => {

  axios
    .delete(`/api/stories/${storyID}/`)
    .then(res => 
        dispatch({
        type:DELETE_STORY,
        payload: res.data,
        }))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

 