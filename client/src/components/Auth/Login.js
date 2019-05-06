import React from 'react';
import {Grid, Form, Segment, Button, Header, Message, Icon, List} from 'semantic-ui-react';
import PropTypes from 'prop-types';

import {Link} from 'react-router-dom';
import { loginUser } from '../../actions/authActions';
import { connect } from 'react-redux';
import Navbar from '../Navbar/Navbar';

class Login extends React.Component
{
    state = {
        email:'',
        password:'',
        errors:{},
        error:{},
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
          this.props.history.push('/');
        }
      }
      
    componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/');
    }

    if (nextProps.errors) {
    
      this.setState({ errors: nextProps.errors });
    }
    if(nextProps.error.email){
        this.setState({ errors: nextProps.errors });
    }
  }
      
    handleChange = event =>{
        this.setState({[event.target.name]:event.target.value});
    }
    
    onSubmit =(e)=> {
    e.preventDefault();
  
    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
    
  }
    render()
    {
        const { error } = this.state;

        return(
        <div style={{height:'100vh'}}>
                <Navbar history={this.props.history}/>

        
            <Grid textAlign = 'center' verticalAlign ='middle' className='app'>
                <Grid.Column style = {{maxWidth:450}}>
                
                    <Header as='h2' icon color ='olive' textAlign = 'center'>
                        <Icon name = 'lightbulb outline' color = 'olive'/>
                        Login for Progress!
                    </Header>
                    <Form onSubmit = {this.onSubmit}>
                        <Segment stacked>

                        {this.props.error.email && (
                    <Message color='red'>{this.props.error.email}</Message>
                  )}
                  {this.props.error.password && (
                    <Message color='red' >{this.props.error.password}</Message>
                    )}
                             <Form.Input fluid name='email' icon='mail' iconPosition='left' 
                            placeholder ='Email Address' onChange = {this.handleChange} type = 'email'
                            value = {this.state.email}/>

                             <Form.Input fluid name='password' icon='lock' iconPosition='left' 
                            placeholder ='Password' onChange = {this.handleChange} type = 'password'
                            value = {this.state.password}/>
                            
                           
                            <Button color = 'olive' fluid size = 'large'>Submit</Button>
                        </Segment>

                    </Form>
                    <Message color='olive'> Don't have an account? <Link to='/Register'>Register</Link></Message>
                </Grid.Column>
            </Grid>
        
        </div>
        )
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };
  
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    error: state.error,
  });

  
export default connect(mapStateToProps, { loginUser })(Login);
