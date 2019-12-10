import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import Header from './Components/Header/Header';
import Search from './Components/Search/Search';
import Index from './Components/Index/Index';
import Footer from './Components/Footer/Footer';
import Search_Form from './Components/Search_Form/Search_Form';

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
                </Route>
                <Route path='/index'>
                    <Index />
                </Route>
            </Switch>
        </Router>
        <Footer />
        <Search_Form />
      </div>
    );
  }
}

export default App;

  
