import React, { Component } from 'react'
import {  Icon, Segment,Label } from 'semantic-ui-react'


export default class Statistics extends Component {
  render() {
    return (
        <div >
            <br/>
            <Label>{this.props.favorites} <Icon name ='heart'/></Label>
          
            <Label> {this.props.comments} <Icon name ='comment'/></Label>
          
            <Label> {this.props.views}<Icon name ='eye'/></Label>

        </div>
    )
  }
}
