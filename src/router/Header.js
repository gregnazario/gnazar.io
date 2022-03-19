import React from 'react';
import { Row, Col, Nav, Navbar, NavItem, Image} from 'react-bootstrap';
import indexIcon from '../img/index.svg';
import { LinkContainer } from 'react-router-bootstrap'

function Header() {
  return (
    <Navbar expand="lg">
      <Navbar.Brand>
        <Image src={indexIcon} alt="Index Icon" width="50px" />
        &nbsp;
        gnazar.io - HTTPS
        &nbsp;
        -
        &nbsp;
        <a href="https://ipfs.gnazar.io">
        IPFS
        </a>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Row>
        <Nav className="mr-auto">
          <Col>
            <LinkContainer to="/">
              <NavItem>
                Home
              </NavItem>
            </LinkContainer>
          </Col>
        </Nav>
        <Nav className="mr-auto">
          <Col>
            <LinkContainer to="/blog">
              <NavItem>
                Blog
              </NavItem>
            </LinkContainer>
          </Col>
        </Nav>
        </Row>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default Header;
