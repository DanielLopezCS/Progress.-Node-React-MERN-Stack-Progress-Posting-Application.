import React, { Component } from 'react'
import { Card, Label, Image, Button,Modal,Header, Form, Input} from 'semantic-ui-react'


import {uploadEventImage, deleteEvent} from '../../../../actions/storyActions';
import {connect} from 'react-redux'



 class Events extends Component {
  state = { open: false,
  selectedImage:'',
  selectedFile:null,
  selectedEventID:0,
}
  


  show = (dimmer,eventID, eventImage) => () => {
    this.setState({ dimmer, open: true, selectedImage:eventImage, selectedEventID: eventID});
}



  close = () => this.setState({ open: false })

  handleUpload = (event)=>{

      
  }
  


  handleDelete = () =>{
    this.props.deleteEvent(this.props.story._id,this.state.selectedEventID);

    this.close();

    
  }
  componentWillReceiveProps(nextProps){
    //reset props
    if(nextProps.msg)
      window.location.reload();
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

      this.props.uploadEventImage(this.props.story._id, this.state.selectedEventID, fd);
     
    }

 
  render() {
    const { open, dimmer, selectedImage } = this.state

    return (
      <div>
           <Card.Group itemsPerRow={5} stackable>

           {
             this.props.story &&

             this.props.story.events.map(event=>

              <Card  onClick={this.show('basic',event._id, event.image)} fluid style = {{  backgroundColor: "#4c4c4c", boxShadow:"none",  borderRadius: '25px'}} raised >  
              <Image src= {event.image} width={'100%'} height={200}/>
              
              <Card.Content  fluid   >
                
                <Card.Header style = {{color:'white'}}> {event.title}</Card.Header>
                <Card.Meta>
                  
                  <Label >{event.date}</Label>
          
                </Card.Meta>
                
                <Card.Description  style = {{color:'#7a7a7a '}} >{event.description}</Card.Description>
              </Card.Content>
                
            </Card>
             )}


              {/* Modal For Editing Event */}
  
          <Modal dimmer={dimmer} open={open} onClose={this.close} basic >
            <Modal.Header>Select a Photo</Modal.Header>
            <Modal.Content image>
              <Image wrapped size='medium' src={selectedImage} />
              <Modal.Description>
                <Header style ={{color:'white'}}>Editing Event (Click Outside Or Press Esc To Exit)</Header>
                <p> Here you can either upload a new image or delete this event.</p>
      
              </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
              <input
                
                type='file'
                style={{display:'none'}}

                onChange = {this.fileSelectedHandler}
                ref={fileInput=>{this.fileInput = fileInput}}
                >
                   </input>

                <Button
                  
                   floated='left'
                   type='file'
                   positive
                   icon='arrow alternate circle up outline'
                   labelPosition='right'
                   content="Pick A File"
                   size='large'
                   onClick={()=>this.fileInput.click()}
                   />
                <Button
                  onClick={this.fileUploadHandler} 
                  content="Upload"
                  floated='left'
                  size='large'
                
                />
                
             
          
              

              <Button
                floated='right'
                negative
                size='huge'
                icon='delete'
                labelPosition='right'
                content="Delete This Event"
                onClick={()=>{this.handleDelete()}}
              />
            </Modal.Actions>
          </Modal>
    
           


  </Card.Group>
       
      </div>
    )
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  story:  state.stories.story,
  msg: state.stories.msg,
});

export default connect(mapStateToProps, {uploadEventImage, deleteEvent})(Events);


