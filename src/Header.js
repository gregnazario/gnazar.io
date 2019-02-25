import React from 'react';
import { Button, Nav, Navbar, NavItem } from 'react-bootstrap';
import Home from './Home'
function Header() {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">Greg Nazario</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link eventKey="1" href="/">Home</Nav.Link>
          <Nav.Link eventKey="2" href="/research">Research</Nav.Link>
          <Nav.Link eventKey="3" href="/projects">Projects</Nav.Link>
          <Nav.Link eventKey="4" href="/contact">Contact</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default Header;
