//Shows Profile by handle.

import React, { Component } from 'react'
import {  Container, Card,Menu, Divider, Header, Message } from 'semantic-ui-react'


import { connect } from 'react-redux';
import { getStoriesByProfile} from '../../actions/storyActions';
import { getProfileByHandle} from '../../actions/profileActions';

import Stories from './Sections/Stories';
import Bio from './Sections/Bio';

import Navbar from '../Navbar/Navbar';

 class ProfileViewer extends Component {

  
  componentWillMount(){
    this.props.getStoriesByProfile(this.props.match.params.handle);  
    this.props.getProfileByHandle(this.props.match.params.handle);
  }
  selectStory = id =>{

    this.props.history.push(`/story/detail/${id}`);

  }
  render() {
    
    return (
      <div>
      
      <Navbar history={this.props.history}/>


      <Container  >
        {this.props.error.noprofile&& <Message color='teal'>Error: Taken Handle or Invalid URLs.</Message>}

        <Header color='olive' size='huge'> {this.props.profile ? <span>{this.props.profile.handle}'s profile page</span>:<span>Unavailable</span> } </Header>
        <Divider horizontal style={{color:'white'}}>Bio </Divider>
        <Bio profile={this.props.profile}
        />

        <Divider horizontal style={{color:'white'}}>Stories </Divider>
      <Card.Group itemsPerRow={4} stackable>
      
       <Stories stories={this.props.profileStories} history={this.props.history} />
        
      </Card.Group>
      </Container>
      </div>
    )
  }
}


const mapStateToProps = state => ({

  profileStories: state.stories.profileStories,
  profile :state.profile.profile,
  error: state.error,
});



export default connect(mapStateToProps, {getStoriesByProfile,getProfileByHandle})(ProfileViewer);
