import React, { Component } from 'react';
import gitHubIcon from '../img/github.png';
import twitterIcon from '../img/twitterLogo.svg';
import linkedInIcon from '../img/linkedInLogo.png';
import headshot from '../img/headshot.jpg';

import PictureLink from '../links/PictureLink'

import { Jumbotron, Container, Row, Col, Image, ListGroup } from 'react-bootstrap'

class Home extends Component {
  render() {
    return (
        <div>
          <Jumbotron>
            <Container>
              <Row>
                <Col>
                  <Contact />
                </Col>
                <Col>
                  <Image src={headshot} width="500px" />
                </Col>
              </Row>
            </Container>
          </Jumbotron>
        </div>
    );
  }
}

export default Home;

class Contact extends Component {
  render() {
    return (
      <div>
        <h1>Greg Nazario</h1>
        <hr/>
        <ListGroup>
          <ListGroup.Item variant="info">
            Software Dev Engineer at Amazon Web Services
          </ListGroup.Item>
          <ListGroup.Item variant="dark">
            <Container>
              <Row>
                Carnegie Mellon University
              </Row>
              <Row>
                B.S. & M.S. Electrical and Computer Engineering
              </Row>
            </Container>
          </ListGroup.Item>
          <ListGroup.Item variant="light">
            <Container>
              <Row>
                <Col>
                  <center>
                    <PictureLink
                      href="https://linkedin.com/in/gnazario"
                      text=""
                      img={linkedInIcon}
                      alt="LinkedIn"
                      />
                  </center>
                </Col>
                <Col>
                  <center>
                    <PictureLink
                      href="https://github.com/gregnazario"
                      text=""
                      img={gitHubIcon}
                      alt="GitHub"
                      />
                  </center>
                </Col>
                <Col>
                  <center>
                    <PictureLink
                      href="https://twitter.com/greg_nazario"
                      text=""
                      img={twitterIcon}
                      alt="Twitter"
                      />
                  </center>
                </Col>
              </Row>
            </Container>
          </ListGroup.Item>
        </ListGroup>
      </div>
    )
  }
}
