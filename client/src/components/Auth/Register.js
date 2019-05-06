import React from 'react';
import {Grid, Form, Segment, Button, Header, Message, Icon} from 'semantic-ui-react';
import PropTypes from 'prop-types';

import {Link, withRouter} from 'react-router-dom';

import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import Navbar from '../Navbar/Navbar';

class Register extends React.Component
{
    state = {
        name:'',
        email:'',
        password:'',
        password2:'',
        errors:{},
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
          this.props.history.push('/');
        }
      }
    
      componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
          this.setState({ errors: nextProps.errors });
        }
      }

    handleChange = event =>{
        this.setState({[event.target.name]:event.target.value});
    }
    
    handleSubmit = event =>
    {   

        event.preventDefault();
     
        const newUser = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        password2: this.state.password2
      };
  
      this.props.registerUser(newUser, this.props.history);
        
    }
    render()
    {
    const { errors } = this.state;
        return(
            <div style={{height:'100vh'}}>  
            <Navbar history={this.props.history}/>
       
            <Grid textAlign = 'center' verticalAlign ='middle' className='app'>
                <Grid.Column style = {{maxWidth:450}}>
                    <Header as='h2' icon color ='olive' textAlign = 'center'>
                        <Icon name = 'lightbulb outline' color = 'olive'/>
                        Register for Progress!
                    </Header>
                    <Form onSubmit = {this.handleSubmit}>
                        <Segment stacked >
                            <Form.Input fluid name='name' icon='user' iconPosition='left' 
                            placeholder ='Username' onChange = {this.handleChange} type = 'text'
                            value = {this.state.name} />

                             <Form.Input fluid name='email' icon='mail' iconPosition='left' 
                            placeholder ='Email Address' onChange = {this.handleChange} type = 'email'
                            value = {this.state.email}/>

                             <Form.Input fluid name='password' icon='lock' iconPosition='left' 
                            placeholder ='Password' onChange = {this.handleChange} type = 'password'
                            value = {this.state.password}/>
                            
                            <Form.Input fluid name='password2' icon='repeat' iconPosition='left' 
                            placeholder ='Password Confirmation' onChange = {this.handleChange} type = 'password'
                            value = {this.state.password2}/>
                            <Button color = 'olive' fluid size = 'large'>Submit</Button>
                        </Segment>

                    </Form>
                    <Message color='olive'>Already a User? <Link to='/Login'>Login</Link></Message>
                </Grid.Column>
            </Grid>
        </div>
        )
    }

}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
  });
  
  export default connect(mapStateToProps, { registerUser })(withRouter(Register));
  