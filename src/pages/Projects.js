import React, { Component } from 'react';
import { Image, Jumbotron, Container, Row, Col } from 'react-bootstrap'
import ReactWebsiteProject from './projects/ReactWebsiteProject'
import RubyToolsProject from './projects/RubyToolsProject'
import ideaIcon from '../img/idea-bulb.svg';

class Projects extends Component {
  render() {
    return (
      <div>
        <Jumbotron>
          <Container>
            <Row>
              <Col>
                <h1>
                  <Image src={ideaIcon} alt="Idea bulb" width="50px"/>
                  &nbsp;
                  Projects
                </h1>
              </Col>
            </Row>
            <hr/>
            <Row>
              <Col>
                <p>
                  This is a collection of projects I've been working on the side.
                  Most should be available via GitHub.
                </p>
              </Col>
            </Row>
          </Container>
        </Jumbotron>
        <Container>
          <Row>
            <Col>
              <ReactWebsiteProject/>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Projects;
