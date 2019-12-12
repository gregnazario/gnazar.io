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
                  <Contact />
                </Col>
                <Col>
                  <Image src={headshot} width="500px" />
                </Col>
              </Row>
            </Container>
          </Jumbotron>

          <Container>
            <Row>
              <Col>
                <ProjectCard />
              </Col>
            &nbsp;
            </Row>
            &nbsp;
            <Row>
              <Col>
                <ResearchCard />
              </Col>
            </Row>
          </Container>
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

class ResearchCard extends Component {
  render() {
    return (<Card>
      <Card.Body>
        <Card.Title>
          <Image src={researchIcon} alt="Research Beaker" width="20px"/>
          &nbsp;
          <Link to="/research">
            Research
          </Link>
        </Card.Title>
        <Card.Text>
          <hr/>
          <Container>
            <Row>
              <Col>
                Network on Chip (NoC) research at Carnegie Mellon University
              </Col>
            </Row>
          </Container>
        </Card.Text>
      </Card.Body>
    </Card>)
  }
}

class ProjectCard extends Component {
  render() {
    return (<Card>
      <Card.Body>
      <Card.Title>
        <Image src={ideaIcon} alt="Idea bulb" width="20px"/>
        &nbsp;
        <Link to="/projects">
          Projects
        </Link>
      </Card.Title>
      <Card.Text>
        <hr/>
        <Container>
          <Row>
            <Col>
              A collection of side projects I've worked on
            </Col>
          </Row>
        </Container>
      </Card.Text>
    </Card.Body>
  </Card>)
  }
}
