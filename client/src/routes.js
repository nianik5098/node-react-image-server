import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LandingPage from './Components/LandingPage';
import About from './Components/About/About';
import NotFound from './Components/NotFound/NotFound';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={LandingPage}/>
      <Route path='/about' component={About}/>
      <Route path='*' component={NotFound}/>

    </Switch>
  </main>
)

export default Main