import React, { Component } from 'react'
import { Feed, Icon, Segment, Form, Input, TextArea, Label, Button } from 'semantic-ui-react'

import {postComment } from '../../../../actions/storyActions';


import {connect} from 'react-redux';


class Comments extends Component {

  state = {text:'',

 
}

handleChange = event =>{
  this.setState({[event.target.name]:event.target.value});
}


  onSubmit=()=>{

    const commentData = {
      text:this.state.text
    };

    this.props.postComment(this.props.story._id,commentData)

    this.setState({text:'',})

  }

 

  handleProfileClick = (handle) =>{
   
    this.props.history.push(`/profile/user/${handle}`);

  
  }


  render() {
    const {text} = this.state;

    return (
      <Segment>
   

  {this.props.story &&

      this.props.story.comments.map(comment=>
        <div>
        <Feed >
    <Feed.Event>
      <Feed.Label>
        <img src={comment.avatar}/>
      </Feed.Label>
      <Feed.Content>
        <Feed.Summary>
          <Feed.User onClick={()=>{this.handleProfileClick(comment.name)}}>{comment.name? comment.name : 'Anonynomous'}</Feed.User> commented
          <Feed.Date>{comment.date}</Feed.Date>
          <Feed.Extra text>{comment.text}</Feed.Extra>
        </Feed.Summary>
       
      </Feed.Content>
    </Feed.Event>

    
  </Feed>

  </div>
      )}


          
<Form>

<Label>Post Your Comment!
<TextArea maxLength="300" name='text' placeholder='Tell us what you think'   value={text} onChange={this.handleChange}/>
<Button floated='right' positive onClick = {()=>{this.onSubmit()}}> Post </Button>
</Label>
</Form>
  </Segment>    
          
  
  )
  }
}
const mapStateToProps = state => ({

  story:  state.stories.story,
});


export default connect(mapStateToProps, {postComment})(Comments);
