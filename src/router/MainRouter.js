import React from 'react';
import { Switch, Route } from 'react-router-dom'
import Home from '../pages/Home';
import Research from '../pages/Research';
import Projects from '../pages/Projects';
import NotFound from '../pages/NotFound';

function MainRouter() {
  return (
    <main>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/projects' component={Projects}/>
        <Route exact path='/research' component={Research}/>
        <Route exact path='/blog' component={() => { 
          window.location.href = 'https://medium.gnazar.io'
        }}/>
        <Route path='*' component={NotFound} />
      </Switch>
    </main>
  );
}

export default MainRouter;
