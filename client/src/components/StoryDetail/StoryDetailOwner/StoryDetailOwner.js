import React, { Component } from 'react'
import { Container,  Divider, Icon, Button, Message} from 'semantic-ui-react'
import Events from '../Sections/Events/Events';
import AddEvent from '../Sections/AddEvent/AddEvent';
import Comments from '../Sections/Comments/Comments';
import Statistics from '../Sections/Statistics/Statistics';
import Description from '../Sections/Description/Description';
import Spinner from '../../Utils/Spinner';
import { connect } from 'react-redux';

import { postFavorite, postUnfavorite, deleteStory } from '../../../actions/storyActions';



class StoryDetailOwner extends Component {

  state={
    events:[],
    comments:[],
    favorites:0,
    views: 0,
    favorited: false,
    storyID:'',

    //for adding a new event
    title:'',
    date: '',
    description:'',


  }

  componentWillReceiveProps(nextProps){

    if(nextProps.story.favorites){
    this.setState({
      events:nextProps.story.events,
      comments: nextProps.story.comments,
      favorites: nextProps.story.favorites.length,
      views: nextProps.story.views,
      storyID: nextProps.story._id,
    });
    this.findUserFavorite(nextProps.story.favorites);

  }




  }

  findUserFavorite(favorites) {
    const { auth } = this.props;

    if (favorites.filter(favorite => favorite.user === auth.user.id).length > 0) {
      this.setState({favorited:true});
      return true;
    } else {
      this.setState({favorited:false});
      return false;
    }

 
 
  }
  handleDelete =()=>{
    this.props.deleteStory(this.props.story._id);
    this.props.history.push('/');

  }
  

  render() {
    const{events, comments, favorites, views, favorited} = this.state;

    return (
      <React.Fragment>
      {!this.props.story? <Spinner/>:
    <Container>
  
      {this.props.story &&<Message color='teal'>You published this story on {this.props.story.date}</Message>
      }

      <Description image = {this.props.story.image}/>


<Divider style={{color:'white'}} horizontal color='white'> Events ({this.props.story&& <span>{this.props.story.events.length}</span>})</Divider>
        <Events events = {events}/>
        <Statistics views = {views} comments = {comments.length} favorites = {favorites} />
        <br/>

       

        {!favorited?
        <Button color='teal' onClick={()=>{this.props.postFavorite(this.props.story._id)}}> Favorite </Button>
        :
        <Button color='red' onClick={()=>{this.props.postUnfavorite(this.props.story._id)}}> Unfavorite </Button>

      }

        <Divider style={{color:'white'}} horizontal color='white'> Add Event? </Divider>
        <AddEvent storyID ={this.state.storyID} />
        <br/><br/>
        <Button fluid icon='cross' color='red' size='huge' onClick={()=>this.handleDelete()}> Delete Story? </Button>
     

        <Divider  style={{color:'white'}} horizontal color='white'> Comments   ( {this.props.story&& <span>{this.props.story.comments.length}</span>}  ) </Divider>
        <Comments history={this.props.history} />



    
    </Container>
      }
  </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  story:  state.stories.story,
  isLoading: state.stories.isLoading,
});

export default connect(mapStateToProps, {postFavorite, postUnfavorite, deleteStory})(StoryDetailOwner);
