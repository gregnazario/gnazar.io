import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
import './bootstrap.min.css';
import './new_theme.css';
//import './flatly.css';
import Header from './Header';
import MainRouter from './MainRouter';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';

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
