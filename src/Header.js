import React from 'react';
import { Link } from 'react-router-dom'

import { Button, Nav, Navbar, NavItem } from 'react-bootstrap';
function Header() {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">Greg Nazario</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/research">Research</Nav.Link>
          <Nav.Link href="/projects">Projects</Nav.Link>
          <Nav.Link href="/contact">Contact</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
/*
<header>
  <nav>
    <ul>
      <li><Link to='/'>Home</Link></li>
      <li><Link to='/contact'>Contacts</Link></li>
    </ul>
  </nav>
</header>
*/
export default Header;
