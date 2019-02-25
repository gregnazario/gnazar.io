import React, { Component } from 'react';
import { ListGroup, Container, Row, Card } from 'react-bootstrap'
import PictureLink from '../../links/PictureLink'
import codingIcon from '../../img/coding.svg';

class RubyToolsProject extends Component {
  render() {
    return (
      <Card>
        <Card.Body>
          <Card.Title>Ruby Tools</Card.Title>
          <Container>
            <Row>
              <p>
                I was working in the past about automating random tasks in Ruby.
              </p>
            </Row>
            <Row>
              <ListGroup>
                <ListGroup.Item variant="light">
                  <PictureLink
                    href="https://github.com/gregnazario/RubyCodeTools"
                    text="RubyCodeTools"
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

export default RubyToolsProject;
