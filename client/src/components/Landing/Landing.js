import React, { Component }  from 'react'
import { Grid, Image, Label, Card, Icon, Menu, Segment, Container, Button } from 'semantic-ui-react'
import "typeface-roboto";
import "./Landing.css"
import { connect } from 'react-redux';
import { getStories} from '../../actions/storyActions';
import {Link} from 'react-router-dom';

import Navbar from '../Navbar/Navbar';




 class Landing extends Component {
   
  state = {
    stories:[]
  };


  selectStory = id =>{

    this.props.history.push(`/story/detail/${id}`);


  }

  componentWillMount()
  {
    
      this.props.getStories();
    
  }



  render() {

    return (
      <div style={{height:'100vh'}}>
                  <Navbar history={this.props.history}/>

        <Container  >

        <Card.Group itemsPerRow={4} stackable>
  


      {
        this.props.stories? this.props.stories.map (story=>
        <Card  onClick={()=>this.selectStory(story._id)} fluid style = {{  backgroundColor: "#4c4c4c", boxShadow:"none"}} raised >  
        <Image src= {story.image} width={'100%'} height={200}/>
    
        <Card.Content  fluid   >
          
          <Card.Header style = {{color:'white'}}> {story.title}</Card.Header>
          <Card.Meta>
            
            <Label color='olive'>{story.category}</Label>
            <Label >{story.subcategory}</Label>
    
          </Card.Meta>
          
          <Card.Description  style = {{color:'#7a7a7a '}} >{story.description}</Card.Description>
        </Card.Content>
     
        <Menu  fluid widths={3} text>
            <Menu.Item style = {{color:'gray'}}  name={story.favorites.length}icon='heart'/>
            <Menu.Item style = {{color:'gray'}} name={story.comments.length}icon='comment'/>
            <Menu.Item style = {{color:'gray'}}name={story.views}icon='eye'/>
    
          </Menu>
    
        
      </Card>

        )
        : null}
    
 



</Card.Group>



</Container>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  stories: state.stories.stories,
  
});



export default connect(mapStateToProps, {getStories})(Landing);
