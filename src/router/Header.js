import React from 'react';
import { Row, Col, Container, Nav, Navbar, NavItem, Image} from 'react-bootstrap';
import indexIcon from '../img/index.svg';
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'

function Header() {
  return (
    <Navbar expand="lg">
      <Navbar.Brand>
        <Image src={indexIcon} alt="Index Icon" width="50px" />
        &nbsp;
        gnazar.io
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
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
            <LinkContainer to="/research">
              <NavItem>
                Research
              </NavItem>
            </LinkContainer>
          </Col>
        </Nav>
        <Nav className="mr-auto">
          <Col>
            <LinkContainer to="/projects">
              <NavItem>
                Projects
              </NavItem>
            </LinkContainer>
          </Col>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default Header;
