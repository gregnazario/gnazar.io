import React from 'react';
import ReactDOM from 'react-dom';
import LinkContainer from 'react-router-bootstrap';
import './index.css';
import './bootstrap.min.css';
import './new_theme.css';
import App from './App';
import Contact from './Contact';
import Header from './Header';
import MainRouter from './MainRouter';
import * as serviceWorker from './serviceWorker';
import { Button, Nav, Navbar, NavItem, NavDropdown } from 'react-bootstrap';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

const BasicExample = () => (
  <BrowserRouter>
    <div>
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">React-Bootstrap</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <LinkContainer to="/about">
            <NavItem eventKey={1}>About</NavItem>
          </LinkContainer>
          <NavItem eventKey={2} href="#">Link</NavItem>
          <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">

          </NavDropdown>
        </Nav>
      </Navbar>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/topics">Topics</Link></li>
      </ul>

      <hr/>

    </div>
  </BrowserRouter>
)

const MyRouter = <BrowserRouter>
    <div>
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">That's me</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <LinkContainer to="/about">
            <NavItem eventKey={1}>About</NavItem>
          </LinkContainer>
          <LinkContainer to="/projects">
            <NavItem eventKey={2}>Projects</NavItem>
          </LinkContainer>
          <LinkContainer to="/contact">
            <NavItem eventKey={3}>Contact</NavItem>
          </LinkContainer>
        </Nav>
      </Navbar>
      <Switch>
        <Route exact path='/' component={App}/>
        <Route path='/roster' component={App}/>
        <Route path='/contact' component={Contact}/>
      </Switch>
    </div>


  </BrowserRouter>


ReactDOM.render(
  <BrowserRouter>
    <div>
      <Header />
      <MainRouter />
    </div>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
