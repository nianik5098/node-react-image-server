import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LandingPage from './Components/LandingPage';
import About from './Components/About/About';
import NotFound from './Components/NotFound/NotFound';
import ImagePage from './Components/ImagePage/ImagePage';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={LandingPage}/>
      <Route path='/about' component={About}/>
      <Route path='/images' component={ImagePage}/>
      <Route path='*' component={NotFound}/>

    </Switch>
  </main>
)

export default Main
