import React, { Component } from 'react'
import {Divider,List,Image,Container,Segment} from 'semantic-ui-react'

export default class Footer extends Component {
  render() {
    return (
      <div>
         <Divider inverted section />
        <List horizontal inverted divided link size='small'>
        <List.Item as='a' href='https://github.com/daniellopezcs'>
            Daniel Lopez
          </List.Item>
       
          <List.Item as='a' href='https://github.com/daniellopezcs'>
            Github
          </List.Item>
          
        </List>
     
   
      </div>
    )
  }
}
