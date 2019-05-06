import React, { Component } from 'react'
import { Card, Container, Header, Label, Image, Divider,  Button} from 'semantic-ui-react'
import Events from '../Sections/Events/Events';
import Comments from '../Sections/Comments/Comments';
import Statistics from '../Sections/Statistics/Statistics';
import { connect } from 'react-redux';

import { postFavorite, postUnfavorite } from '../../../actions/storyActions';


 class StoryDetailViewer extends Component {
  state={
    events:[],
    comments:[],
    favorites:0,
    views: 0,
    favorited: false,
    storyID:'',
   
  }

  componentWillReceiveProps(nextProps){

    if(nextProps.story.favorites.length){
      this.setState({
        events:nextProps.story.events,
        comments: nextProps.story.comments,
        favorites: nextProps.story.favorites.length,
        views: nextProps.story.views,
        storyID: nextProps.story._id,
      });
  
    }
    else{
      this.setState({
        events:nextProps.story.events,
        comments: nextProps.story.comments,
        views: nextProps.story.views,
        storyID: nextProps.story._id,
      });
    }

   
    this.findUserFavorite(nextProps.story.favorites);


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

  
  render() {

    const{events, comments, favorites, views, favorited, storyID} = this.state;

    return (
    <Container>
        <Divider style={{color:'white'}} horizontal color='white'> Events ({events.length})</Divider>
        <Events events = {events} storyID = {storyID}/>
        <Statistics views = {views} comments = {comments.length} favorites = {favorites} />
        <br/>
        {!favorited?
        <Button  color='teal' onClick={()=>{this.props.postFavorite(this.props.story._id)}}> Favorite </Button>
        :
        <Button color='red' onClick={()=>{this.props.postUnfavorite(this.props.story._id)}}> Unfavorite </Button>

      }
        <Divider  style={{color:'white'}} horizontal color='white'> Comments 
        ( {this.props.story&& <span>{this.props.story.comments.length}</span>}  ) </Divider>
        <Comments history={this.props.history} />
    </Container>

    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  story:  state.stories.story,
  isLoading: state.stories.isLoading,
});

export default connect(mapStateToProps, {postFavorite, postUnfavorite})(StoryDetailViewer);
