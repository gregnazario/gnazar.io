import React, { Component } from 'react';
import logo from './logo.svg';
import githubLogo from './github.png';
import twitterLogo from './twitterLogo.png';
import linkedInLogo from './linkedInLogo.png';
import headshot from './headshot.jpg';
//import './App.css';
import { Card, Jumbotron, Button, Container, Row, Col, Media, Image, ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Footer from './Footer'

class Home extends Component {
  render() {
    return (
          <Container>
            <Jumbotron>
              <Row>
                <Col>
                  <h1>Greg Nazario</h1>
                  <hr/>
                  <ListGroup>
                    <ListGroup.Item variant="info">SDE at Amazon Web Services</ListGroup.Item>
                    <ListGroup.Item variant="dark">
                      <Container>
                        <Row>
                          Carnegie Mellon University
                        </Row>
                        <Row>
                          M.S. Electrical and Computer Engineering
                        </Row>
                      </Container>
                    </ListGroup.Item>
                    <ListGroup.Item variant="light">
                    <Container>
                    <Row>
                      <Col>
                        <a href="https://linkedin.com/in/gnazario">
                          <Image src={linkedInLogo} width="20px" alt="Twitter Logo"/>
                          LinkedIn
                        </a>
                      </Col>
                      <Col>
                        <a href="https://github.com/gregnazario">
                          <Image src={githubLogo} width="20px" alt="Github Logo"/>
                          Github
                        </a>
                      </Col>
                      <Col>
                        <a href="https://twitter.com/gregnazario1">
                          <Image src={twitterLogo} width="20px" alt="Twitter Logo"/>
                          Twitter
                        </a>
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
            </Jumbotron>
            <Row>
              <Col>
                <Card>
                  <Card.Body>
                    <Card.Title>Research</Card.Title>
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
                  <Card.Title>Projects</Card.Title>
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
    );
  }
}

export default Home;
