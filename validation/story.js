const Validator = require('validator');
const isEmpty = require('./is-empty');
const categories = require('../utils/categories');

module.exports = function validateStoryInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  data.category = !isEmpty(data.category) ? data.category : '';
  data.subcategory = !isEmpty(data.subcategory) ? data.subcategory : '';
  data.description = !isEmpty(data.description) ? data.description : '';

  if (Validator.isEmpty(data.title)) {
    errors.title = 'Event title field is required';
  }
  if (Validator.isEmpty(data.category)) {
    errors.category = 'Category is required';
  }
  if (Validator.isEmpty(data.subcategory)) {
    errors.subcategory = "Subcategory is required";
  }
 
 

  return {
    errors,
    isValid: isEmpty(errors)
  };
};


