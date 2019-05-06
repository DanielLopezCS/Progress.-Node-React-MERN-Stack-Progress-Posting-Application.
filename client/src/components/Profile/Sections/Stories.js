import React, { Component } from 'react'
import { Grid, Image, Label, Segment, Container, Card,Menu, Divider } from 'semantic-ui-react'



class Stories extends Component {
   
      selectStory = id =>{
    
        this.props.history.push(`/story/detail/${id}`);
    
      }

  render() {
    return (
      <React.Fragment>
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
            <Menu.Item style = {{color:'gray'}}  name='24'  icon='heart'/>
            <Menu.Item style = {{color:'gray'}} name='12'  icon='comment'/>
            <Menu.Item style = {{color:'gray'}}name='120'  icon='eye'/>
    
          </Menu>
    
        
      </Card>

        )
        : null}
      </React.Fragment>
    )
  }
}


  
  
  export default Stories;
  