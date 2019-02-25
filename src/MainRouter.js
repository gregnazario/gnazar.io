import React from 'react';
import { Switch, Route } from 'react-router-dom'
import App from './App';
import Contact from './Contact';
import Research from './Research';
import Projects from './Projects';
import NotFound from './NotFound';
function MainRouter() {
  return (
    <main>
      <Switch>
        <Route exact path='/' component={App}/>
        <Route exact path='/contact' component={Contact}/>
        <Route exact path='/projects' component={Projects}/>
        <Route exact path='/research' component={Research}/>
        <Route path='*' exact={true} component={NotFound} />
      </Switch>
    </main>
  );
}

export default MainRouter;
