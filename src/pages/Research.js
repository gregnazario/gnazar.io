import React, { Component } from 'react';
import { Image, Jumbotron, Container, Row, Col } from 'react-bootstrap'
import Publications from './research/Publications'
import researchIcon from '../img/research.svg';

class Research extends Component {
  render() {
    return (
      <div>
      <Jumbotron>
      <Container>
        <Row>
          <Col>
            <h1>
              <Image src={researchIcon} alt="Research Beaker" width="50px"/>
              &nbsp;
              Research
            </h1>
          </Col>
        </Row>
        <hr/>
        <Row>
          <Col>
            <p>
              In 2011, I spent a summer working as a research intern at Carnegie
               Mellon University. I worked on networks on chips. From my work
               there, a couple pages were published in the space which are on
               the links on this page.
            </p>
          </Col>
        </Row>
      </Container>
      </Jumbotron>
      <Container>
        <Row>
          <Col>
            <Publications />
          </Col>
        </Row>
      </Container>
      </div>
    );
  }
}

export default Research;
