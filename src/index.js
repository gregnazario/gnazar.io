import React from 'react';
import ReactDOM from 'react-dom';
import './css/bootstrap.min.css';
//import './css/new_theme.css';
import './css/flatly.css';
import Header from './router/Header';
import Footer from './pages/Footer';
import MainRouter from './router/MainRouter';
import * as serviceWorker from './worker/serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

ReactDOM.render(
  <BrowserRouter>
    <div>
      <Container>
        <Row>
          <Header />
        </Row>
        &nbsp;
        <Row>
          <Col>
            <MainRouter />
          </Col>
        </Row>
        &nbsp;
        <Row>
          <Col>
            <Footer />
          </Col>
        </Row>
      </Container>
    </div>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
