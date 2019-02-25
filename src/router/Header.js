import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import indexIcon from '../img/index.svg';
import { Link } from 'react-router-dom'

function Header() {
  return (
    <Navbar bg="light" expand="lg">
      <Link to="/">
        <Navbar.Brand href="/">
          <img src={indexIcon} alt="Index Icon" width="50px" />
          &nbsp;
          Greg Nazario
        </Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link to="/"><Nav.Link eventKey="1" href="/">Home</Nav.Link></Link>
          <Link to="/research"><Nav.Link eventKey="2" href="/research">Research</Nav.Link></Link>
          <Link to="/projects"><Nav.Link eventKey="3" href="/projects">Projects</Nav.Link></Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default Header;
