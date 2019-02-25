import React, { Component } from 'react';
import { Jumbotron, Container, Row, Col, Media } from 'react-bootstrap'
import logo from './logo.svg';
import './App.css'

class NotFound extends Component {
  render() {
    return (
      <header className="App-header">
        <Jumbotron>
        <Container>
          <Row>
            <Col>
              <h1>Page Not Found</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <Media>
                <img src={logo} className="App-logo" alt="logo" />
              </Media>
            </Col>
          </Row>
        </Container>
        </Jumbotron>
      </header>
    );
  }
}

export default NotFound;
