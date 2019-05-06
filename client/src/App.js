import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Landing from './components/Landing/Landing';
import Navbar from './components/Navbar/Navbar';
import NewStory from './components/NewStory/NewStory';
import StoryDetail from './components/StoryDetail/StoryDetail';

import Profile from './components/Profile/Profile';
import ProfileCreation from './components/Profile/ProfileCreation/ProfileCreation';

import Footer from './components/Footer/Footer';

import { Provider, connect } from "react-redux";
import store from './store';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import ProfileViewer from './components/Profile/ProfileViewer';




// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = '/login';
  }
}



class App extends Component {
  //set background color to black 
  componentDidMount(){
    document.body.style.background = "#282c34";
   }
   
  render() {


    return (

      <Provider store={store}>
        <Router>
        <div className="App"> 
              <Route exact path='/' component={Landing}/>
              <Route exact path='/story/detail/:id' component={StoryDetail}/>
              <Route exact path='/story/upload' component={NewStory}/>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path ='/profile' component={Profile}/>
              <Route exact path ='/profile/user/:handle' component={ProfileViewer}/>
              <Route exact path ='/profile/creation' component={ProfileCreation}/>
              <Footer/>
            </div>

        </Router>
      </Provider>
    );
  }
}



export default App;