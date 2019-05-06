import React, { Component } from 'react'
import {   Header,Image, Button, Divider, } from 'semantic-ui-react'

import { connect } from 'react-redux';

import { postFavorite, postUnfavorite, uploadStoryImage } from '../../../../actions/storyActions';


class Description extends Component {
    state = {
        owner:true,
        selectedFile:null,
    }
    fileSelectedHandler= event =>{
  
        this.setState({
          selectedFile: event.target.files[0]
    
        })
    
        alert("File Detected: " + event.target.files[0].name + ", Please Press Upload To Confirm.");
      }
      fileUploadHandler=(event)=>{
          
          const fd = new FormData();
          fd.append('image',this.state.selectedFile);
    
          this.props.uploadStoryImage(this.props.story._id, fd);
         
        }

  render() {
      const {owner}= this.state;
    return (
      <div>

         <Header as='h2'>
           <Header.Content style ={{color:'white'}}>{this.props.story.title}</Header.Content>
           <br/>
         <Image 
    style={{height:'250px', width:'250px'}}  circular src={this.props.story.image} />
              <br/>
              <br/>
         {owner&&<React.Fragment>
        <input             
        type='file'
        style={{display:'none'}}

        onChange = {this.fileSelectedHandler}
        ref={fileInput=>{this.fileInput = fileInput}}
        >
           </input>

        <Button
            
           floated='left'
           positive
           icon='arrow alternate circle up outline'
           content="Pick A File"
           size='small'
           onClick={()=>this.fileInput.click()}
           />
        <Button
          onClick={this.fileUploadHandler} 
          content="Upload"
          floated='right'
          size='small'
        
        />
        <br/>
        <br/>
        </React.Fragment>
        
    }
    <Divider horizontal style ={{color:'white'}}> About </Divider>
  
    <Header.Subheader style={{color:'white'}}>{this.props.story.description}</Header.Subheader>
  </Header>
      </div>
    )
  }
}

const mapStateToProps = state => ({
    auth: state.auth,
    story:  state.stories.story,
    isLoading: state.stories.isLoading,
  });
  
  export default connect(mapStateToProps, {postFavorite, postUnfavorite, uploadStoryImage})(Description);
  