const Validator = require('validator');
const isEmpty = require('./is-empty');


module.exports = function validateStoryInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  data.date = !isEmpty(data.date) ? data.date : '';
  data.description = !isEmpty(data.description) ? data.description : '';

  if (Validator.isEmpty(data.title)) {
    errors.title = 'Event title field is required';
  }
  if (Validator.isEmpty(data.date)) {
    errors.date = 'Date is required';
  }
 

  return {
    errors,
    isValid: isEmpty(errors)
  };
};


