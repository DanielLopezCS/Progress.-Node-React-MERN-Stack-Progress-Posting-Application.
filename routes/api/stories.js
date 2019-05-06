const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');


// Post model
const Story = require('../../models/Story');
// Profile model
const Profile = require('../../models/Profile');

// Validation
const validateStoryInput = require('../../validation/story');
const validateEventInput = require('../../validation/event');
const validateCommentInput = require('../../validation/comment');


const multer = require('multer');
const categories = require('../../utils/categories');


// Set The Storage Engine
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function(req, file, cb){
    cb(null, new Date().getTime() + file.originalname);
  }
});

// Init Upload
const upload = multer({
  storage: storage,
  limits:{fileSize: 100000000},
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).single('image');


// Check File Type
function checkFileType(file, cb){
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: Images Only!');
  }
}






// @route   POST api/stories/upload/:id
// @desc    Posts image to story
// @access  Public
router.post('/upload/:id',  passport.authenticate('jwt', { session: false }),
(req, res) => {
  

  Profile.findOne({ user: req.user.id }).then(profile => {
    Story.findById(req.params.id)
      .then(story => {
        // Check for post owner
        if (story.user.toString() !== req.user.id) {
          return res
            .status(401)
            .json({ notauthorized: 'User not authorized' });
        }

      
        // confirmed user is owner so upload image
        upload(req, res, (err) => {
          if(err){
            console.log(err);
            res.json({err:"Not a proper image format, please use (JPG/JPEG/PNG)"})
          } else {
            if(req.file == undefined){
              res.json({})
            } else {


              const imageURL = ("http://localhost:5000/images/" + req.file.filename);

              story.image = imageURL;
              story.save();


              
              
                res.json({
              
                msg: 'File Uploaded Successfully!'
            });
            }
          }
        });    
          
      })
      .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
  });  
});



// @route   POST api/stories/upload/event/:story_id/:event_id/
// @desc    Posts image to story
// @access  Public
router.post('/upload/event/:story_id/:event_id',  passport.authenticate('jwt', { session: false }),
(req, res) => {

  Profile.findOne({ user: req.user.id }).then(profile => {
    Story.findById(req.params.story_id)
      .then(story => {
        // Check for post owner
        if (story.user.toString() !== req.user.id) {
          return res
            .status(401)
            .json({ notauthorized: 'User not authorized' });
        }

      
          // confirmed user is owner so upload image

          upload(req, res, (err) => {
          if(err){
            console.log(err);
            res.json({err:"Not a proper image format, please use (JPG/JPEG/PNG)"})
          } else {
            if(req.file == undefined){
              res.json({})
            } else {
              console.log("REQUEST PATH: " + req.file.path);

              const event = story.events.find((event)=>{return event._id == req.params.event_id });
              console.log("EVENT ID: " + event._id);
              const imageURL = ("http://localhost:5000/images/" + req.file.filename);

              
              event.image = imageURL;

              story.save();


                res.json({
                msg: 'File Uploaded Successfully!'
            });
            }
          }
        });    
          
      })
      .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
   
  
    
});
});




// @route   DELETE api/stories/event/:story_id/:event_id/
// @desc    Deletes an event
// @access  Private
router.delete('/event/:story_id/:event_id',  passport.authenticate('jwt', { session: false }),
(req, res) => {

  Profile.findOne({ user: req.user.id }).then(profile => {
    Story.findById(req.params.story_id)
      .then(story => {
        // Check for post owner
        if (story.user.toString() !== req.user.id) {
          return res
            .status(401)
            .json({ notauthorized: 'User not authorized' });
        }else{


            // Get remove index
        const removeIndex = story.events
        .map(item => item._id.toString())
        .indexOf(req.params.event_id);

      // Splice event out of array
      story.events.splice(removeIndex, 1);

      story.save().then(story => res.json(story));

        }

        

          
          
      })
      .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
   
  
    
});
});



// @route   GET api/posts/test
// @desc    Tests post route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Posts Works' }));

// @route   GET api
// @desc    Get stories
// @access  Public
router.get('/', (req, res) => {
  Story.find()
    .sort({ date: -1 })
    .then(stories => res.json(stories))
    .catch(err => res.status(404).json({ nopostsfound: 'No posts found' }));
});

// @route   GET api/stories/:id
// @desc    Get post by id
// @access  Public
router.get('/:id', (req, res) => {
  Story.findById(req.params.id)
    .then(story =>{
      story.views += 1;
      story.save();
      res.json(story)})
    .catch(err =>
      res.status(404).json({ nopostfound: 'No post found with that ID' })
    );
});





// @route   POST api/stories
// @desc    Create story
// @access  Private
  router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      const { errors, isValid } = validateStoryInput(req.body);

      // Check Validation
      if (!isValid) {
        // If any errors, send 400 with errors object
        return res.status(400).json(errors);
      }

      
      const newStory = new Story({
        category: req.body.category,
        subcategory: req.body.subcategory,
        description: req.body.description,
        title: req.body.title,
        avatar: req.user.avatar,
        user: req.user.id

      });

      newStory.save().then(story => res.json(story));
    }
  );



// @route   GET api/stories/profile/:handle
// @desc    Get stories from user
// @access  Public

router.get('/profile/:handle', (req, res) => {
  const errors = {};

  Profile.findOne({ handle: req.params.handle })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        res.status(404).json(errors);
      }

      //found profile, looking for stories
      Story.find({user:profile.user})
     .sort({ date: -1 })
     .then(stories=>{
        res.json(stories);
     }).catch(err=> res.status(404).json(err));
   
    })
    .catch(err => res.status(404).json(err));
});



  
// @route   DELETE api/stories/:id
// @desc    Delete story
// @access  Private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Story.findById(req.params.id)
        .then(post => {
          // Check for post owner
          if (post.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: 'User not authorized' });
          }

          // Delete
          post.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
    });
  }
);

// @route   POST api/stories/favorite/:id
// @desc    Favorite post
// @access  Private
router.post(
  '/favorite/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Story.findById(req.params.id)
        .then(story => {

          if (
            story.favorites.filter(favorite => favorite.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyfavorited: 'User already favorited this post' });
          }

          // Add user id to favorited array
          story.favorites .unshift({ user: req.user.id });

          story.save().then(story => res.json(story));
        })
        .catch(err => res.status(404).json({ storynotfound: 'No story found' }));
    });
  }
);

// @route   POST api/stories/unfavorite/:id
// @desc    Unfavorite post
// @access  Private
router.post(
  '/unfavorite/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Story.findById(req.params.id)
        .then(story => {
          if (
            story.favorites.filter(favorite => favorite.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ notfavorited: 'You have not yet favorited this post' });
          }

          // Get remove index
          const removeIndex = story.favorites
            .map(item => item.user.toString())
            .indexOf(req.user.id);

          // Splice out of array
          story.favorites.splice(removeIndex, 1);

          // Save
          story.save().then(story => res.json(story));
        })
        .catch(err => res.status(404).json({ storynotfound: 'No story found' }));
    });
  }
);


// @route   POST api/stories/event/:id
// @desc    Add event to story
// @access  Private
router.post(
  '/event/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEventInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }
  
    Profile.findOne({ user: req.user.id }).then(profile => {
      Story.findById(req.params.id)
        .then(story => {
          // Check for story owner
          if (story.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: 'User not authorized' });
          }

        // User is story owner from now on.


        // Get fields
        const profileFields = {};
        if (req.body.description) profileFields.description = req.body.description;
        if (req.body.image) profileFields.image = req.body.image;
        profileFields.title = req.body.title;
        profileFields.date = req.body.date;

        // Update
       story.events.unshift(profileFields);

            // Save
            story.save().then(story => res.json(story));
      }
      
      )
        .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
    });
  }
);


// @route   POST api/stories/event/:id
// @desc    Add event to story
// @access  Private
router.post(
  '/event/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEventInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }
  
    Profile.findOne({ user: req.user.id }).then(profile => {
      Story.findById(req.params.id)
        .then(story => {
          // Check for story owner
          if (story.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: 'User not authorized' });
          }

        // User is story owner from now on.


        // Get fields
        const profileFields = {};
        if (req.body.description) profileFields.description = req.body.description;
        if (req.body.image) profileFields.image = req.body.image;
        profileFields.title = req.body.title;
        profileFields.date = req.body.date;
        // Update
       story.events.unshift(profileFields);

            // Save
            story.save().then(story => res.json(story));
      }
      
      )
        .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
    });
  }
);



// @route   POST api/posts/comment/:id
// @desc    Add comment to post
// @access  Private
router.post(
  '/comment/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCommentInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    Story.findById(req.params.id)
      .then(story => {

        //looking for profile of commenter, if none will be anonymous
        Profile.findOne({
          user:req.user
        }).then(profile=>{
       
          const newComment = {
            text: req.body.text,
            name: profile.handle,
            avatar: req.user.avatar,
            user: req.user.id
          };
  
          // Add to comments array
          story.comments.unshift(newComment);
  
          // Save
          story.save().then(story => res.json(story));
         

        }).catch(err=>{
      
          const newComment = {
            text: req.body.text,
            name: req.body.name,
            avatar: req.user.avatar,
            user: req.user.id
          };
  
          // Add to comments array
          story.comments.unshift(newComment);
  
          // Save
          story.save().then(story => res.json(story));
        })
      

      })
      .catch(err => res.status(404).json({ postnotfound: 'No story found' }));
  }
);



// @route   DELETE api/posts/comment/:id/
// @desc    Remove comment from post
// @access  Private
router.delete(
  '/comment/:id/:comment_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Story.findById(req.params.id)
      .then(story => {
        // Check to see if comment exists
        if (
          story.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexists: 'Comment does not exist' });
        }

        // Get remove index
        const removeIndex = story.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);

        // Splice comment out of array
        story.comments.splice(removeIndex, 1);

        story.save().then(story => res.json(story));
      })
      .catch(err => res.status(404).json({ storynotfound: 'No story found' }));
  }
);


// @route   GET api/stories/lookup/:subcategory
// @desc    Get posts with subcategory
// @access  Public
router.get('/lookup/:subcategory', (req, res) => {

  Story.find({subcategory:req.params.subcategory})
  .sort({ date: -1 })
  .then(stories =>{

    res.json(stories)})

  .catch(err => res.status(404).json({ nopostsfound: 'No posts found' }));

});

// @route   GET api/stories/utils/categories
// @desc    Get categories
// @access  Public
router.get('/utils/categories', (req, res) => {

  res.json(categories.categories);

});







module.exports = router;