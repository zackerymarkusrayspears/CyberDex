import React, { Component } from 'react';
import './App.css';
import './Components/Search/Search'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

class App extends Component{
  render() {
    return(
      <Router>
      <nav>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/'></Link>
          </li>
        </ul>
      </nav>

      {/* The Switch component looks through the Route components inside of it and renders the first one that matches the current URL */}
      <Switch>
        <Route exact path='/'>
          <Search />                                                                        
        </Route>
        <Route path='/SearchForm'>
          <SearchForm />
        </Route>
      </Switch>
    </Router>
    );
  }
}

export default App;

  
