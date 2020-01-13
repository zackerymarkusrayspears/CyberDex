import React, { Component } from 'react';
import axios from 'axios';
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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dbData: [],
    }
  }

  componentDidMount = () => {
    this.getDataFromDB();
  }

  getDataFromDB = () => {
    
    axios({
      url: 'http://localhost:3001/api/getData',
      method: 'GET'
    }).then((response) => {
      console.log(response);
      this.setState({ dbData: response.data.data });
    }).catch((error) => {
      console.log(error);
    });
  }

  render() {

    const { dbData } = this.state;

    return(
      <div className='App'>
        <Router>
            {/* Header - Navbar to navigate between Searching Database and Adding Data to Database(Index) */}
            <Header/>
            {/* Switch to determine the path followed by clicked Link */}
            <Switch>
                <Route exact path='/'>
                    <Search dbData={dbData} />
                </Route>
                <Route path='/index'>
                    <Index getDataFromDB={this.getDataFromDB} dbData={dbData} />
                </Route>
            </Switch>
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;

  
