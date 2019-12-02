import React, { Component } from 'react';
import { ListGroup, Container, Row, Card } from 'react-bootstrap'
import PictureLink from '../../links/PictureLink'
import codingIcon from '../../img/coding.svg';

class ReactWebsiteProject extends Component {
  render() {
    return (
      <Card>
        <Card.Body>
          <Card.Title>React Website</Card.Title>
          <Container>
            <Row>
              <p>
                For 2019, I decided to rewrite this entire website from raw HTML that I wrote in college
                in order to learn React and be better acquainted with JavaScript.
              </p>
            </Row>
            <Row>
              <ListGroup>
                <ListGroup.Item variant="light">
                  <PictureLink
                    href="https://github.com/gregnazario/personal-website"
                    text="Personal Website Source"
                    img={codingIcon}
                    alt="Coding icon"
                    />
                </ListGroup.Item>
              </ListGroup>
            </Row>
          </Container>
        </Card.Body>
      </Card>
    );
  }
}

export default ReactWebsiteProject;
