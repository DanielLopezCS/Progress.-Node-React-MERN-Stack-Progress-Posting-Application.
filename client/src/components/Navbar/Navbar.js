import React, { Component } from 'react'
import { Menu, Label, Button, Icon, Dropdown } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { getCategories, getStoriesBySubcategories, getStories } from '../../actions/storyActions';
import {logoutUser} from '../../actions/authActions';


import {Link} from 'react-router-dom';



class MenuExampleInverted extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  
  componentWillMount()
  {
    this.props.getCategories();
  }

  onLogoutClick = () =>{
    
    this.props.logoutUser();
    this.props.history.push('/');
    //reseting state
    window.location.reload();
  }
  onAllCick=()=>{
    this.props.getStories();
    this.props.history.push('/');
  }

  handleSubcategoryClick= (subcategory)=>{
    this.props.getStoriesBySubcategories(subcategory);
    this.props.history.push('/');

  }

  render() {
    const { activeItem } = this.state

    return (
      <Menu inverted size='large' stackable > 



        <Menu.Item  icon='lightbulb outline' name='progress' active={activeItem === 'progress'} onClick={this.handleItemClick} 
         as={Link}
         to='/'
        />
        <Menu.Item 
          
        >
        <Dropdown text='Categories' color='teal' scrolling>
        <Dropdown.Menu>
        {
            this.props.categories? 
            
            this.props.categories.map((category)=>{
                return(
                <React.Fragment>
                    
                <Dropdown.Header>{category.title}</Dropdown.Header>

                {
                    category.subcategories.map((subcategory)=>{
                    return(
                        <Dropdown.Item text={subcategory}  onClick={()=>{this.handleSubcategoryClick(subcategory)}}/>
                    );
                })
                }

               
            
                <Dropdown.Divider />
              
                

                </React.Fragment>
                );
              })
              : null

        }
        <Dropdown.Divider />
        <Dropdown.Header>Other</Dropdown.Header>
        <Dropdown.Item text="All"  onClick={()=>{this.onAllCick()}}/>


       
       </Dropdown.Menu>

  

        

   

    
  </Dropdown>
        </Menu.Item>
        <Menu.Item
          style={{backgroundColor:'green', border: "2px solid lightgreen",
          borderRadius: "15px"}}
          name='Upload Story'
          active={activeItem === 'Upload Story'}
          onClick={this.handleItemClick}
          color='olive'
          icon='plus'
          as={Link}
          to='/story/upload'
          
        />

   
        { !this.props.auth.isAuthenticated ?
          <React.Fragment>
          <Menu.Item
          name='login'
          active={activeItem === 'login'}
          onClick={this.handleItemClick}
          color='blue'
          position='right'
          as={Link}
          to='/login'
        />
        <Menu.Item
          
          name='register'
          active={activeItem === 'register'}
          onClick={this.handleItemClick}
          color='red'
          as={Link}
           to='/register'

        />
        </React.Fragment>
        :<React.Fragment>
        <Menu.Item
        name='profile'
        active={activeItem === 'profile'}
        onClick={this.handleItemClick}
        color='blue'
        position='right'
        as={Link}
        to='/profile'
      />
      <Menu.Item
        
        name='logout'
        active={activeItem === 'logout'}
        onClick={()=>this.onLogoutClick()}
        color='red'
    

      />
  </React.Fragment>
        }
      </Menu>
    )
  }
}

const mapStateToProps = state => ({
    auth: state.auth,
    categories: state.stories.categories,
  });
  
  
  
  export default connect(mapStateToProps, {getCategories, logoutUser, getStoriesBySubcategories, getStories})(MenuExampleInverted);