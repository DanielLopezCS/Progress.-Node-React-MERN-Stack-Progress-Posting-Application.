import React, { Component } from 'react'
import {   Container, Card, Header } from 'semantic-ui-react'

class Bio extends Component {
   state = {
       profile:Object,

   }

   componentWillReceiveProps(nextProps){
        if(nextProps.profile){
            this.setState({profile:nextProps.profile});
        }
   }

  render() {
    const {profile} = this.state;
    return (
        <Container>
            <Card fluid>
                <Card.Header>Welcome to my page. </Card.Header>
                <Card.Meta>joined  {profile && profile.date}
 </Card.Meta>
                <Card.Content>
                {profile.bio ? profile.bio: <span>User Has Not Submitted A Biography</span>}
                </Card.Content>
            </Card>
           <Card.Group itemsPerRow='2'>
           <Card>
      <Card.Content>
        <Card.Header content='Website' />
        <Card.Meta content='personal' />
        <Card.Content content=  {profile.website ? profile.website: <span>User Has Not Submitted A Website</span>}
 />
      </Card.Content>
    </Card>

           <Card>
      <Card.Content>
        <Card.Header content='Youtube' />
        <Card.Meta content='social' />
        <Card.Content content=                {profile.youtube ? profile.youtube: <span>User Has Not Submitted A Youtube page</span>}
 />
      </Card.Content>
    </Card>



    <Card>
      <Card.Content>
        <Card.Header content='Twitter' />
        <Card.Meta content='social' />
        <Card.Content content=                {profile.twitter ? profile.twitter: <span>User Has Not Submitted A Twitter</span>}
 />
      </Card.Content>
    </Card>

    <Card>
      <Card.Content>
        <Card.Header content='Linkedin' />
        <Card.Meta content='career' />
        <Card.Content content=                {profile.linkedin ? profile.linkedin: <span>User Has Not Submitted A Linkedin</span>}
 />
      </Card.Content>
    </Card>
  </Card.Group>


</Container>
    )
  }
}
export default Bio;
