import React, { Component } from 'react';
import { Jumbotron, Container, Row, Col } from 'react-bootstrap'

class Research extends Component {
  render() {
    return (
      <Jumbotron>
      <Container>
        <Row>
          <Col>
            <h1>Research</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>
              In 2011, I spent a summer working as a research intern at Carnegie Mellon University. I worked on networks on chips. From my work there, a couple pages were published in the space which are on the links on this page.
            </p>
          </Col>
        </Row>
      </Container>
      </Jumbotron>
    );
  }
}

export default Research;
