import React, { Component } from 'react';
import gitHubIcon from '../img/github.png';
import twitterIcon from '../img/twitterLogo.svg';
import linkedInIcon from '../img/linkedInLogo.png';
import emailIcon from '../img/email.svg';
import headshot from '../img/headshot.jpg';

import ideaIcon from '../img/idea-bulb.svg';
import researchIcon from '../img/research.svg';
import PictureLink from '../links/PictureLink'

//import './App.css';
import { Card, Jumbotron, Button, Container, Row, Col, Media, Image, ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'

class Home extends Component {
  render() {
    return (
        <div>
          <Jumbotron>
            <Container>
              <Row>
                <Col>
                  <h1>Greg Nazario</h1>
                  <hr/>
                  <ListGroup>
                    <ListGroup.Item variant="info">Software Dev Engineer at Amazon Web Services</ListGroup.Item>
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
                        <PictureLink
                          href="mailto:gnazario@ieee.org"
                          text="Email"
                          img={emailIcon}
                          alt="Email"
                          />
                      </Col>
                      <Col>
                        <PictureLink
                          href="https://linkedin.com/in/gnazario"
                          text="LinkedIn"
                          img={linkedInIcon}
                          alt="LinkedIn Logo"
                          />
                      </Col>
                      <Col>
                        <PictureLink
                          href="https://github.com/gregnazario"
                          text="Github"
                          img={gitHubIcon}
                          alt="GitHub Logo"
                          />
                      </Col>
                      <Col>
                        <PictureLink
                          href="https://twitter.com/gregnazario1"
                          text="Twitter"
                          img={twitterIcon}
                          alt="Twitter Logo"
                          />
                      </Col>
                    </Row>
                    </Container>
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
                <Col>
                  <Media>
                    <Image src={headshot} width="500px"/>
                  </Media>
                </Col>
              </Row>
            </Container>
          </Jumbotron>

          <Container>
            <Row>
              <Col>
                <Card>
                  <Card.Body>
                    <Card.Title>
                      <Image src={researchIcon} alt="Research Beaker" width="20px"/>
                      &nbsp;
                      Research
                    </Card.Title>
                    <Card.Text>
                      <Link to="/research">
                        <Button size="small">More Info &raquo;</Button>
                      </Link>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card>
                  <Card.Body>
                  <Card.Title>
                    <Image src={ideaIcon} alt="Idea bulb" width="20px"/>
                    &nbsp;
                    Projects
                  </Card.Title>
                  <Card.Text>
                    <Link to="/projects">
                      <Button size="small">More Info &raquo;</Button>
                    </Link>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Home;
