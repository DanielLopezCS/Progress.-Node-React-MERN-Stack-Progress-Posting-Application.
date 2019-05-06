const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');
const profile= require('./routes/api/profile');
const stories= require('./routes/api/stories');

const path= require('path');
const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;


console.log(__dirname);

//Allowing static file hosting
app.use('/images', express.static(__dirname + '/public/uploads'));

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);


// Use Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/stories', stories);

if(process.env.NODE_ENV==='production'){
  //set static folder
  app.use(express.static('client/build'));

  app.get('*',(req, res)=>{
    res.sendFile(path.join(__dirname,'client','build','index.html'));


  });
}



const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));