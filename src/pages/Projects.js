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
            <Row>
              <Col>
                <p>
                  This is a list of projects that i'm working on the side.
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
          <br/>
          <Row>
            <Col>
              <RubyToolsProject/>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Projects;
