//Shows Profile of requesting user.

import React, { Component } from 'react'
import ProfileViewer from './ProfileViewer';
import ProfileOwner from './ProfileOwner/ProfileOwner';

import { connect } from 'react-redux';
import { getProfile} from '../../actions/profileActions';

import {Link} from 'react-router-dom';

import { Button, Header, Icon, Segment, Message, Container } from 'semantic-ui-react';

import Spinner from '../Utils/Spinner';

import Navbar from '../Navbar/Navbar';



 class Profile extends Component {
    
    componentWillMount(){
        this.props.getProfile();
    }
    componentWillReceiveProps(nextProps){
      
        //found profile so go to handle

        if(nextProps.profile)
          this.props.history.push(`/profile/user/${nextProps.profile.handle}`);
      
    }
  render() {

    return (
      <div style={{height:'100vh'}}>
      {/* If Authenticated and No Profile Ask To Make Profile */}
{ 
    (this.props.auth.isAuthenticated && !this.props.profile)&&
    <div>
    <Navbar history = {this.props.history}/>
<Segment placeholder>
    <Header icon>
      <Icon name='search' />
      You have not created your profile yet...
    </Header>
    <Segment.Inline>
      <Button color='olive' onClick={()=>{this.props.history.push('/profile/creation')}}>Create My Profile</Button>
      
      
      <Button onClick={()=>{this.props.history.push('/')}}>Go Back</Button>
    </Segment.Inline>

  </Segment>
</div>
}      

        {/* If Profile Found Show Profile As Owner View */}
{ 
          this.props.profile&&
          <Spinner/>
}      


{ 
  (!this.props.auth.isAuthenticated)&&
  <Container>
  
    <Message>Please login<Link to='/login' > here</Link></Message>
  
  </Container>

}  




      </div>
    )
  }
}


const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile.profile,
    
  });
  
  
  
  export default connect(mapStateToProps, {getProfile})(Profile);
  