import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';

class App extends Component {

  render() {
    return(
      <div className='App'>
        <Router>
            {/* Header - Navbar to navigate between Searching Database and Adding Data to Database(Index) */}
            <Header>
                <nav className='Header-navBar'>
                    <ul className='Header-navLinks'>
                    <li className='Header-link'>
                        <Link to='/search'>Search</Link>
                    </li>
                    <li className='Header-link'>
                        <Link to='/index'>Index</Link>
                    </li>
                    </ul>
                </nav>
            </Header>
            {/* Switch to determine the path followed by clicked Link */}
            <Switch>
                <Route exact path='/search'>
                    {/* Search Component */}
                </Route>
                <Route path='/index'>
                    {/* Index Component */}
                </Route>
            </Switch>
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;

  
