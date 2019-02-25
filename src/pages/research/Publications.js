import React, { Component } from 'react';
import { ListGroup, Container, Row, Card } from 'react-bootstrap'
import PictureLink from '../../links/PictureLink'
import contentIcon from '../../img/content.svg';

class Publications extends Component {
  render() {
    return (
      <Card>
        <Card.Body>
          <Card.Title>Publications</Card.Title>
          <Container>
            <Row>
              <p>
                These publications focus around Networks on Chips (NoCs).
                MinBD has now been published in the conference NOCS and in a book chapter as well.
              </p>
            </Row>
            <Row>
              <ListGroup>
                <ListGroup.Item variant="light">
                  <PictureLink
                    href="http://www.pdl.cmu.edu/PDL-FTP/associated/nocs2012_minbd.pdf"
                    text="MinBD: Minimally-Buffered Deflection Routing for Energy-Efficient Interconnect"
                    img={contentIcon}
                    alt="Content Icon"
                    />
                </ListGroup.Item>
                <ListGroup.Item variant="light">
                  <PictureLink
                    href="https://www.archive.ece.cmu.edu/~safari/tr/tr-2014-002.pdf"
                    text="Improving Energy Efficiency of Hierarchical Rings via Deflection Routing"
                    img={contentIcon}
                    alt="Content Icon"
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

export default Publications;
