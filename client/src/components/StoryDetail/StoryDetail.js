import React, { Component } from 'react'
import StoryDetailOwner from './StoryDetailOwner/StoryDetailOwner';
import StoryDetailViewer from './StoryDetailViewer/StoryDetailViewer';
import Spinner from '../Utils/Spinner';
import { connect } from 'react-redux';
import {  Message } from 'semantic-ui-react'

import { getStory } from '../../actions/storyActions';

import Navbar from '../Navbar/Navbar';



class StoryDetail extends Component {

  state = {
    isLoading:true,
  

  }

  componentWillMount(){

    this.props.getStory(this.props.match.params.id);  
  }



  render() {
              //if user is owner they see extra stuff like ability to add more events
    return (
      <div>
          <Navbar history={this.props.history}/>

            {(this.props.auth&&this.props.story)&& (this.props.auth.user.id===this.props.story.user)? <StoryDetailOwner history={this.props.history} />: <StoryDetailViewer history={this.props.history}  />
            }
         <div>

         
          
       
    {/*<StoryDetailOwner />*/}
          </div>
          
      

      </div>
    ) 
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  story: state.stories.story,
  isLoading: state.stories.isLoading,
});


export default connect(mapStateToProps, {getStory})(StoryDetail);