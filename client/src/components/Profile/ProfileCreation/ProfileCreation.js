import React, { Component } from 'react'
import {Grid, Form, Segment, Button, Header, Message, Icon, List, Divider, Input} from 'semantic-ui-react';
import Navbar from '../../Navbar/Navbar';
import { connect } from 'react-redux';
import { postProfile } from '../../../actions/profileActions';

class ProfileCreation extends Component {

    state = {
        handle:'',
        bio:'',
        website:'',
        youtube:'',
        twitter:'',
        linkedin:'',
        errors:{},
        error:{},
    }


    handleChange = event =>{
        this.setState({[event.target.name]:event.target.value});
    }

    handleSubmit = ()=>{


      const profileData = {
        handle:this.state.handle,
        bio: this.state.bio,
        website: this.state.website,
        youtube: this.state.youtube,
        twitter: this.state.twitter,
        linkedin: this.state.linkedin

      }
        alert(JSON.stringify(profileData));

      this.props.postProfile(profileData);
      this.props.history.push(`/profile/user/${this.state.handle}`);
    }

  render() {
    return (
      <div style={{height:'100vh'}}>
     <Navbar history={this.props.history}/>

     <Grid textAlign = 'center' verticalAlign ='middle' className='app'>
                <Grid.Column style = {{maxWidth:450}}>
                
                    <Header as='h2' icon color ='olive' textAlign = 'center'>
                        <Icon name = 'lightbulb outline' color = 'olive'/>
                        Profile Creation
                    </Header>
                    <Form onSubmit = {this.onSubmit}>
                        <Segment stacked>

                    
                             <Form.Input fluid name='handle' icon='mail' iconPosition='left' 
                            placeholder ='Handle' onChange = {this.handleChange} type = 'handle'
                            value = {this.state.handle}/>

                       
                            
                            <Divider horizontal> optional </Divider>

                            <Form.TextArea fluid name='bio' icon='lock' iconPosition='left' 
                            placeholder ='Bio' onChange = {this.handleChange} type = 'text'
                            value = {this.state.bio}/>
                            
                            <Input name ='website' fluid label='http://' placeholder='website url' value={this.state.website} onChange={this.handleChange} />
                            <br/>
                            <Input name='youtube' fluid label='http://' placeholder='youtube url' value={this.state.youtube} onChange={this.handleChange}/>
                            <br/>
                            <Input name='twitter' fluid label='http://' placeholder='twitter url' value={this.state.twitter} onChange={this.handleChange}/>
                            <br/>
                            <Input name='linkedin' fluid label='http://' placeholder='linkedin url' value={this.state.linkedin} onChange={this.handleChange}/>
                            <br/>

                           

                            <Button color = 'olive' fluid size = 'large' onClick={()=>this.handleSubmit()}>Submit</Button>
                        </Segment>

                    </Form>
                </Grid.Column>
            </Grid>
      </div>
    )
  }
}

const mapStateToProps = state => ({

  profile: state.profile,
});



export default connect(mapStateToProps, {postProfile})(ProfileCreation);