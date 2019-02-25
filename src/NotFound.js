import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class NotFound extends Component {
  render() {
    return (
      <div className="Contact">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Page Not Found.
          </p>
        </header>
      </div>
    );
  }
}

export default NotFound;
