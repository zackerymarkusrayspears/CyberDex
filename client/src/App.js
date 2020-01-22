import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import {  
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import Header from './Components/Header/Header';
import Main from './Components/Main/Main';
import Account from './Components/Account/Account';
import Edit from './Components/Edit/Edit';
import History from './Components/History/History';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: {
        id: 0,
        name: 'Daniel Moffitt',
        username: 'cyberdexbc',
        password: 'bchs!!',
        type: 'admin',
        auth: ['full']
      },
      dbData: [],
      usedIds: []
    }
    this.renderAccount = this.renderAccount.bind(this);
  }

  componentDidMount = () => {
    this.getDataFromDB();
  }

  getDataFromDB = () => {

    const { dbData } = this.state;
    let currentIds = [];
    
    axios({
      url: 'http://localhost:3001/api/getData',
      method: 'GET'
    }).then((response) => {
      // console.log(response);
      response.data.data.forEach(data => {
        currentIds.push(data.id);
      });
      this.setState({ 
        dbData: response.data.data[0],
        usedIds: currentIds
      });
    }).catch((error) => {
      console.log(error);
    });
  }

  renderAccount(username, password) {

    const { dbData } = this.state;

    if (username === '' || password === '') return this.setState({ account: '' });

    let loggedIn = false;

    dbData.account.forEach(account => {
      if (username === account.username && password === account.password) {
        if (account.auth.includes('lock')) return alert('Account has been locked by an Admin.');
        this.setState({ account: account });
        loggedIn = true;
      }
    })
    if (!loggedIn) return alert('Failed to log in.');
  }

  render() {

    const { account, dbData, usedIds } = this.state;
    console.log(dbData);

    return <div className='app'>
      <Router>
          {/* Header - Navbar to navigate between Searching Database and Adding Data to Database(Index) */}
          <Header 
            account={account}
            renderAccount={this.renderAccount}
          />
          {/* Switch to determine the path followed by clicked Link */}
          <Switch>
              <Route exact path='/'>
                  <Main 
                    account={account}
                    dbData={dbData}
                    getDataFromDB={this.getDataFromDB}
                  />
              </Route>
              {dbData.length !== 0 ? (
                <>
                  <Route path='/account'>
                      <Account
                        account={account}
                        dbData={dbData}
                        getDataFromDB={this.getDataFromDB}
                        renderAccount={this.renderAccount}
                      />
                  </Route>
                  {account.type === 'admin' ? (
                    <>
                      <Route path='/edit'>
                        <Edit
                            account={account}
                            usedIds={usedIds}
                            dbData={dbData}
                            getDataFromDB={this.getDataFromDB} 
                        />
                      </Route>
                      <Route path='/history'>
                        <History dbData={dbData}/>
                      </Route>
                    </>
                  ) : null }
                </>
              ) : null }
          </Switch>
      </Router>
    </div>
  }
}