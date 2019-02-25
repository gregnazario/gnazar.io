import React from 'react';
import { Switch, Route } from 'react-router-dom'
import Home from './Home';
import Contact from './Contact';
import Research from './Research';
import Projects from './Projects';
import NotFound from './NotFound';
function MainRouter() {
  return (
    <main>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/contact' component={Contact}/>
        <Route exact path='/projects' component={Projects}/>
        <Route exact path='/research' component={Research}/>
        <Route path='*' component={NotFound} />
      </Switch>
    </main>
  );
}

export default MainRouter;
