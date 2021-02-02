import React, { Component } from 'react';
import { Image } from 'react-bootstrap'

// Makes a picture link for uses like github links
class PictureLink extends Component {
  render() {
    return (
      <a href={this.props.href}>
        <Image src={this.props.img} width="20px" alt={this.props.alt}/>
      </a>
    );
  }
}

export default PictureLink;
