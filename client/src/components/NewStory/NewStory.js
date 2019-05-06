import React, { Component } from 'react'
import {  Dropdown, Segment,Header,Button, Grid, Form, Icon, Label } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { getCategories, postStory } from '../../actions/storyActions';
import Navbar from '../Navbar/Navbar';

class NewStory extends Component {
  state = { 
    title:'',
    description:'',
    activeItem: 'home',
    categorySelected:'',
    subcategorySelected:'Please Choose A Category',
    color:'red',
}

  handleItemClick = (e, { name }) => 
  

  
  {
      this.setState({ activeItem: name });

}
    
handleChange = event =>{
    this.setState({[event.target.name]:event.target.value});
}
  componentWillMount()
  {
    this.props.getCategories();

  }

  handleCategorySelect = (subcategory,category) =>{
        this.setState({subcategorySelected:subcategory,color:'olive',categorySelected:category});
      }
    
  onSubmit = () =>{
      const postData = {
          title:this.state.title,
          description: this.state.description,
          category: this.state.categorySelected,
          subcategory: this.state.subcategorySelected,
      }
      this.props.postStory(postData);
      
      this.props.history.push('/');

      
  }
  render() {
    const { activeItem, subcategorySelected, color, title,description } = this.state

    return (
        <div style={{height:'100vh'}}>        
        <Navbar history={this.props.history}/> 
        <Grid textAlign = 'center' verticalAlign ='middle' className='app'>
            <Grid.Column style = {{maxWidth:450}}>
                <Header as='h2' icon color ='olive' textAlign = 'center'>
                    <Icon name = 'lightbulb outline' color = 'olive'/>
                    Upload Your Story!
                </Header>
                <Form onSubmit = {this.handleSubmit}>
                    <Segment stacked >
                        <Form.Input fluid name='title' icon='user' iconPosition='left' 
                        placeholder ='Title' onChange = {this.handleChange} type = 'text'
                        value = {this.state.title}   maxLength="30"
                        />
            
                         <Form.TextArea fluid name='description' icon='mail' iconPosition='left' 
                        placeholder ='Description' onChange = {this.handleChange} type = 'text'
                        value = {this.state.description} maxLength="300"/>

                        
                        
                        <Form.Input ><Dropdown text='Category' scrolling selection>
                        
                        <Dropdown.Menu >
                        {
                            this.props.categories? 
                            
                            this.props.categories.map((category)=>{
                                return(
                                <React.Fragment>
                                    
                                <Dropdown.Header>{category.title}</Dropdown.Header>
                
                                {
                                    category.subcategories.map((subcategory)=>{
                                    return(
                                        <Dropdown.Item onClick={()=>this.handleCategorySelect(subcategory,category.title)} text={subcategory} />
                                    );
                                })
                                }
                
                               
                            
                                <Dropdown.Divider />
                              
                                
                
                                </React.Fragment>
                                );
                              })
                              : null
                
                        }
                      
                       </Dropdown.Menu>  
                       
                  </Dropdown>
                  <Label color={color} style={{marginLeft:'15px'}}>{subcategorySelected}</Label>

</Form.Input>
                        

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
    categories: state.stories.categories,
    story: state.stories.story,
  });
  
  
  
  export default connect(mapStateToProps, {getCategories, postStory})(NewStory);