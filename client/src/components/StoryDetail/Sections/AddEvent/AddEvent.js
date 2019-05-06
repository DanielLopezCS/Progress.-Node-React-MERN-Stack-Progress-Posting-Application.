import React, { Component } from 'react'
import {  Form, Grid, Segment, Button} from 'semantic-ui-react'

import {postEvent} from '../../../../actions/storyActions';
import {connect} from 'react-redux'


 class AddEvent extends Component {
    state = {
        title:'',
        description:'',
        date:'',

}
onSubmit = () =>{
  
  const eventData = {
    title:this.state.title,
    description:this.state.description,
    date:this.state.date,
  }
  if(this.isValid()){


  this.props.postEvent(this.props.story._id,eventData);
  this.clearFields();
    

  }
  else{
    alert("Please Make Sure To Fill In All Fields");
  }

  
}
clearFields=()=>{
  this.setState({
    title:'',
    description:'',
    date:'',
  });
}

isValid= ()=>{
  if(this.state.title==''||this.state.description==''||this.state.date=='') return false;
  return true;
}

handleChange = event =>{
  this.setState({[event.target.name]:event.target.value});
}
  render() {

    return (
      <div>
        <Grid textAlign = 'center' verticalAlign ='middle' className='app'>
<Grid.Column style = {{maxWidth:450}}>
    
    <Form onSubmit = {this.handleSubmit}>
        <Segment stacked >
            <Form.Input fluid name='title' icon='user' iconPosition='left' 
            placeholder ='Title' onChange = {this.handleChange} type = 'text'
            value = {this.state.title}   maxLength="30"
            />
        <Form.Input fluid name='date' icon='calendar' iconPosition='left' 
            placeholder ='Date' onChange = {this.handleChange} type = 'text'
            value = {this.state.date}   maxLength="30"
            />
             <Form.TextArea fluid name='description' icon='mail' iconPosition='left' 
            placeholder ='Description' onChange = {this.handleChange} type = 'text'
            value = {this.state.description} maxLength="300"/>

            
            
    
            

            <Button color = 'olive' fluid size = 'large' onClick={()=>this.onSubmit()}>Submit</Button>
        </Segment>

    </Form>
</Grid.Column>
</Grid>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  story:  state.stories.story,
  isLoading: state.stories.isLoading,
 
});

export default connect(mapStateToProps, {postEvent})(AddEvent);


