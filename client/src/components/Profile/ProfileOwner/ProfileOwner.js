import React, { Component } from 'react'

export default class ProfileOwner extends Component {
  render() {
    return (
      <div>
          {this.props.profile.handle}
        </div>
    )
  }
}
