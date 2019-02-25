import React, { Component } from 'react';
import logo from './logo.svg';
//import './App.css';
import { Button, Container, Row, Col, Media } from 'react-bootstrap'
import { Link } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        <Container>
          <Row>
            <Col>
              <h1>Greg Nazario</h1>
              <hr/>
              <p><br/>Software Development Engineer at Amazon Web Services<br/>
                      Carnegie Mellon University<br/>
                      B.S. & M.S. Electrical and Computer Engineering<br/>
              </p>
            </Col>
            <Col>
              <Media>
                <img src="https://gregorynazario.com/img/headshot_garden.jpg" width="500px"/>
              </Media>
            </Col>
          </Row>
          <Row>
            <Col>
              <h2>Research</h2>
              <p>Network-on-Chip research at CMU</p>
              <Link to="/research">
                <Button>More Info &raquo;</Button>
              </Link>
            </Col>
            <Col>
              <h2>Projects</h2>
              <p>Coming soon</p>
              <Link to="/projects">
                <Button>More Info &raquo;</Button>
              </Link>
            </Col>
          </Row>
      </Container>
      </header>
    </div>
    );
  }
}

export default App;
