const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const StorySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      category:{
        type:String,
        required: true
        },
      subcategory:{
        type:String,
        required:true,
      },

        title: {
        type: String,
        required: true
        },
        description:{
          type:String,
          
        },
      avatar: {
        type: String
      },
      views:{
        type: Number,
        default: 0,
      
      },

      image: {
        type: String,
        default: "http://localhost:5000/images/progress.png",
            },
      favorites: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: 'users'
          }
        }
      ],

      events: [
            { 
            title:{type:String, required:true},  
            description: {
            type: String,
            },
            image: {
            type: String,
            default: "http://localhost:5000/images/progress.png",
                },
            date:{type:String, required:true},

              },
              
            ], 
      comments: [
        {
            
          user: {
            type: Schema.Types.ObjectId,
            ref: 'users'
          },
          text: {
            type: String,
            required: true
          },
          name: {
            type: String,
            default: 'Anynmous',
          },
          avatar: {
            type: String
          },
          date: {
            type: Date,
            default: Date.now
          }
        }
      ],
      date: {
        type: Date,
        default: Date.now
      }

    });

module.exports = Story = mongoose.model('story', StorySchema);
