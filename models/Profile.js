const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  website: {
    type: String
  },
  bio: {
    type: String
  },
  
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
 
    linkedin: {
      type: String
    },
 
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
