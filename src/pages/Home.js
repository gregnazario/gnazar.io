import React, { Component } from 'react';
import gitHubIcon from '../img/github.png';
import twitterIcon from '../img/twitterLogo.svg';
import linkedInIcon from '../img/linkedInLogo.png';
import headshot from '../img/small_square_headshot.jpg';

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
                  <center>
                    <h1>Greg Nazario</h1>
                  </center>
                  <Contact />
                </Col>
                <Col>
                  <center>
                    <Headshot />
                  </center>
                </Col>
              </Row>
            </Container>
          </Jumbotron>
        </div>
    );
  }
}

export default Home;

class Headshot extends Component {

  constructor() {
    super();
    this.state = {
      width:  800
    }
  }

  resize() {
    if(window.innerWidth < 300) {
      this.setState({ width: 200 });
    } else if(window.innerWidth > 500 && window.innerWidth < 768) {
      this.setState({ width: 400 });
    } else if(window.innerWidth >= 768) {
      this.setState({ width: 500 });
    } else {
      let update_width  = window.innerWidth - 100;
      this.setState({ width: update_width});
    }
  }

  componentDidMount() {
    this.resize();
    window.addEventListener("resize", this.resize.bind(this));
  }

  render() {
    return <Image
              src={headshot}
              width={this.state.width}
              roundedCircle
            />
  }
}

class Contact extends Component {
  render() {
    return (
      <div>
        <hr/>
        <ListGroup>
          <ListGroup.Item variant="info">
              Senior Software Engineer
          </ListGroup.Item>
          <ListGroup.Item variant="dark">
            <Container>
              <Row>
                Former Engineer at AWS
              </Row>
              <Row>
                Former Researcher at Carnegie Mellon
              </Row>
            </Container>
          </ListGroup.Item>
          <ListGroup.Item variant="light">
            <Container>
              <Row>
                Carnegie Mellon University
              </Row>
              <Row>
                 M.S. & B.S. Electrical and Computer Engineering
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
