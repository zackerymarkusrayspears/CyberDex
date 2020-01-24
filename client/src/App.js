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
import { 
    TextField,
    Button
} from '@material-ui/core';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      display: 'main',
      logInUsername: '',
      logInPassword: '',
      account: {
        id: 1,
        spreadId: 1,
        name: 'Daniel Moffitt',
        username: 'cyberdexbc',
        password: 'bchs!!',
        type: 'admin',
        auth: ['full']
      },
      dbId: [],
      dbSpread: {
        id: '',
        title: '',
        sheet: []
      },
      dbAccount: {
        id: [],
        account: []
      },
      dbRecord: []
    }
    this.handleDisplay = this.handleDisplay.bind(this);
    this.postLogIn = this.postLogIn.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
    this.postSpread = this.postSpread.bind(this);
    this.putAccount = this.putAccount.bind(this);
  }
  // id: '',
  // spreadId: 1,
  // name: '',
  // username: '',
  // password: '',
  // type: '',
  // auth: []

  handleDisplay(event) { this.setState({ display: event }); }

  postLogIn() {

    const { logInUsername, logInPassword } = this.state,
      display = [];
    if (logInUsername === '' || logInPassword === '') return
    this.setState({ loading: true });

    axios({
      url: 'http://localhost:3001/api/postLogIn',
      method: 'POST',
      data: {
        username: logInUsername,
        password: logInPassword
      }
    }).then(response => {
      if (!response.data.success) {
        this.setState({ loading: false });
        return alert(response.data.message);
      }
      response.data.data.account.forEach(acc => {
        if (response.data.data.client.id === acc.id) return
        if (acc.type === 'admin') display.unshift(acc);
        if (acc.type === 'user') display.push(acc);
      });
      console.log(response.data);
      display.unshift(response.data.data.client);
      this.setState({ 
        loading: false,
        display: 'main',
        logInUsername: '',
        logInPassword: '',
        account: response.data.data.client,
        dbAccount: {
          id: response.data.data.accId,
          account: display
        },
        dbRecord: response.data.data.record
      });
    }).catch(error => {
      console.log(error);
      this.setState({ loading: false });
    });
  }

  handleLogOut() {
    this.setState({ 
      display: 'login',
      account: {
        id: '',
        spreadId: 1,
        name: '',
        username: '',
        password: '',
        type: '',
        auth: []
      },
    });
  }

  postSpread() {
    const { account } = this.state,
      display = [];

    this.setState({ loading: true });
    
    axios({
      url: 'http://localhost:3001/api/postSpread',
      method: 'POST',
      data: { 
        id: account.spreadId,
        username: account.username,
        password: account.password
      }
    }).then(response => {
      if (!response.data.success) {
        if (response.data.message === 'Account is locked.') {
          this.setState({ loading: false });
          this.handleLogOut();
        } else this.setState({ loading: false });
        return alert(response.data.message);
      }
      console.log(response.data);
      response.data.data.account.forEach(acc => {
        if (account.id === acc.id) return
        if (acc.type === 'admin') display.unshift(acc);
        if (acc.type === 'user') display.push(acc);
      });
      display.unshift(account);
      this.setState({ 
        loading: false,
        dbId: response.data.data.spreadId,
        dbSpread: response.data.data.spread,
        dbAccount: {
          id: response.data.data.accId,
          account: display
        },
        dbRecord: response.data.data.record
      });
    }).catch(error => {
      console.log(error);
      this.setState({ loading: false });
    });
  }

  putAccount(accountData, title, titleStr, lockStr, unlockStr, deleteStr, addStr, usernameStr, nameStr) {

    const { account, dbSpread } = this.state;
    let newLog = 'Account ';
    
    if (account.name === '' || account.name === null) return alert('Account does not have a name.');

    if (titleStr !== '') newLog += titleStr;
    if (lockStr !== '') {
      if (newLog !== 'Account ') newLog += '  Account ';
      newLog += `locked ${lockStr} account(s).`;
    }
    if (unlockStr !== '') {
      if (newLog !== 'Account ') newLog += '  Account ';
      newLog += `unlocked ${unlockStr} account(s).`;
    }
    if (addStr !== '') {
      if (newLog !== 'Account ') newLog += '  Account ';
      newLog += `added ${addStr} account(s).`;
    }
    if (deleteStr !== '') {
      if (newLog !== 'Account ') newLog += '  Account ';
      newLog += `deleted ${deleteStr} account(s).`;
    }
    if (usernameStr !== '') {
      if (newLog !== 'Account ') newLog += '  Account ';
      newLog += usernameStr;
    }
    if (nameStr !== '') {
      if (newLog !== 'Account ') newLog += '  Account ';
      newLog += nameStr;
    }

    const newRecord = {
      id: account.id,
      name: account.name,
      log: newLog,
      type: 'account',
      timestamp: Date()
    }
    this.setState({ loading: true });

    axios({

      url: 'http://localhost:3001/api/putAccount',
      method: 'PUT',
      data: {
        id: account.spreadId,
        username: account.username,
        password: account.password,
        title: title,
        account: accountData,
        record: newRecord
      }

    }).then((response) => {
      if (!response.data.success) {
        if (response.data.message === 'Account is locked.') {
          this.setState({ loading: false });
          this.handleLogOut();
        } else this.setState({ loading: false });
        return alert(response.data.message);
      }
      console.log(response.data);
      this.setState({ loading: false });
      this.postSpread();
    }).catch((error) => {
      this.setState({ loading: false });
      console.log(error);
    });
  }

  componentDidMount = () => {
    this.postSpread();
  }

  render() {

    const { loading, display, logInUsername, logInPassword, account, dbId, dbSpread, dbAccount, dbRecord } = this.state;

    return <div className='app'>
      <Router>
          {/* Header - Navbar to navigate between Searching Database and Adding Data to Database(Index) */}
          <Header 
            account={account}
            handleDisplay={this.handleDisplay}
            handleLogOut={this.handleLogOut}
          />
          {/* Switch to determine the path followed by clicked Link */}
          <Switch>
              <Route exact path='/'>
                  {(account.username === '' && display === 'login') ? (
                    <div className='account-login'>
                        <TextField
                            value={logInUsername}
                            onChange={event => this.setState({ logInUsername: event.target.value })}
                            label='Username'
                            onKeyPress={event => {
                                if(event.key === 'Enter') {
                                    event.preventDefault();
                                    this.postLogIn();
                                }
                            }}
                        />
                        <TextField
                            value={logInPassword}
                            onChange={event => this.setState({ logInPassword: event.target.value }) }
                            label='Password'
                            onKeyPress={event => {
                                if(event.key === 'Enter') {
                                    event.preventDefault();
                                    this.postLogIn();
                                }
                            }}
                        />
                        <Button
                            onClick={() => {
                                this.postLogIn();
                            }}
                        >Log in</Button>
                    </div>
                  ) : (
                    (!loading) ? (
                      <Main 
                        account={account}
                        dbSpread={dbSpread}
                        postSpread={this.postSpread}
                      />
                    ) : null
                  )}
              </Route>
              <Route path='/account'>
                {(!loading && account.username !== '') ? (
                  <Account
                    account={account}
                    dbSpread={dbSpread}
                    dbAccId={dbAccount.id}
                    dbAccount={dbAccount.account}
                    postLogIn={this.postLogIn}
                    postSpread={this.postSpread}
                    putAccount={this.putAccount}
                  />
                ) : null }
              </Route>
              <Route path='/edit'>
                {(!loading && account.type === 'admin' && account.username !== '') ? (
                  <Edit
                    account={account}
                    dbId={dbId}
                    dbSpread={dbSpread}
                    dbAccount={dbAccount.account}
                    postSpread={this.postSpread} 
                  />
                ) : null }
              </Route>
              <Route path='/history'>
                {(!loading && account.type === 'admin' && account.username !== '') ? (
                  <History 
                    account={account}
                    dbAccount={dbAccount.account}
                    dbRecord={dbRecord}
                  />
                ) : null }
              </Route>
          </Switch>
      </Router>
    </div>
  }
}