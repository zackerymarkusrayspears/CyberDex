import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {  
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import Header from './Components/Header/Header';
import Main from './Components/Main/Main';
import Account from './Components/Account/Account';
import Edit from './Components/Edit/Edit';
import Record from './Components/Record/Record';
import { 
  withStyles,
  TextField,
  Button,
  Container
} from '@material-ui/core';

const styles = theme => ({

  // General Styles
  input: {
    width: '100%',
  },
  btn: {
    '&:hover': {
      color: theme.palette.grey[900],
      backgroundColor: theme.palette.secondary.main
    }
  },
  container: {
    padding: '15px',
    display: 'flex',
    backgroundColor: theme.palette.background.paper,
    borderRadius: `${theme.shape.borderRadius}px`,
    boxShadow: theme.shadows[24]
  },
  searchBtn: {
    marginLeft: '10px !important',
    backgroundColor: theme.palette.grey[600],
    '&:hover': {
      color: theme.palette.grey[900],
      backgroundColor: theme.palette.secondary.main
    }
  },
  outline: {
    '&$focused $notchedOutline': {
      borderColor: `${theme.palette.secondary.main} !important`
    }
  },
  focused: {
    color: `${theme.palette.text.primary} !important`
  },
  notchedOutline: {},

  // Table Styles
  table: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: `${theme.shape.borderRadius}px`,
    boxShadow: theme.shadows[24]
  },
  headColumnCell: {
    fontSize: '12pt',
    fontWeight: 'bold'
  },
  defaultCell: {
    padding: theme.props.MuiTableCell.padding,
  },
  nameCell: {
    width: '200px',
    padding: theme.props.MuiTableCell.padding,
  },
  tagCell: {
    width: '250px',
    padding: theme.props.MuiTableCell.padding,
  },
  extCell: {
    width: '150px',
    padding: theme.props.MuiTableCell.padding,
  },
  roomCell: {
    width: '100px',
    padding: theme.props.MuiTableCell.padding,
  },
  authCell: {
    width: '185px',
    padding: theme.props.MuiTableCell.padding,
  },
  typeCell: {
    width: '93px',
    padding: theme.props.MuiTableCell.padding,
  },
  entriesCell: {
    width: '150px',
    padding: theme.props.MuiTableCell.padding,
  },
  timeCell: {
    width: '130px',
    textAlign: 'center',
  },
  btnCell: {
    width: '64px',
    padding: theme.props.MuiTableCell.padding,
  },

  // App Styles
  app: {
    minWidth: '550px',
  },

  // Main, Account, Edit, Record return
  route: {
    margin: '2% 8% 0',
    paddingBottom: '2%'
  },

  // Header Styles
  appBar: {
    background: `linear-gradient(${theme.palette.grey[900]}, ${theme.palette.grey[800]})`,
    borderBottom: `2px solid ${theme.palette.secondary.main}`,
  },
  toolBar: {
    padding: '0 10%',
  },
  homeLink: {
    padding: '2px 4px 6px 4px',
    display: 'flex',
    fontSize: '10pt',
    textDecoration: 'none',
    backgroundColor: theme.palette.primary.main,
    borderRadius: `4px`
  },
  cyber: {
    margin: '0',
    color: 'white',
  },
  dex: {
    margin: '0',
    color: theme.palette.secondary.main,
  },
  acc: { 
    width: 'unset',
    padding: '0',
    marginLeft: '10px',
    display: 'flex', 
    alignItems: 'center'
  },
  accLink: {
    marginLeft: '5px',
    color: 'white',
    textDecoration: 'none'
  },


  

  left: {
    width: 'unset',
    padding: '0',
    margin: '0',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  right: {
    width: 'unset',
    padding: '0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightLink: {
    padding: '6px 10px',
    margin: '0 5px',
    color: 'white',
    fontSize: '1.15em',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textDecoration: 'none',
    transition: '200ms',
    '&:hover': {
      color: theme.palette.primary.main,
      transition: '200ms',
      cursor: 'pointer',
    }
  },

  // Sheet Styles
  sheet: {
    marginTop: `${theme.spacing(4)}px`,
  },

  // PersonTable Styles
  person: {
    marginBottom: `${theme.spacing(1)}px`,
  },

  // Edit Styles
  help: {
    padding: '0',
    marginTop: `${theme.spacing(4)}px`,
    display: 'flex',
    justifyContent: 'space-between',
  },
  helpPage: {
    padding: '3%',
    width: '43%',
    fontSize: '10pt',
    borderRadius: `${theme.shape.borderRadius}px`,
    boxShadow: theme.shadows[24]
  },

  // Record Styles
  filter: {
    padding: '15px',
    marginBottom: `${theme.spacing(4)}px`,
    backgroundColor: theme.palette.background.paper,
    borderRadius: `${theme.shape.borderRadius}px`,
    boxShadow: theme.shadows[24]
  },
  filterSelect: {
    minWidth: '200px',
    marginRight: `${theme.spacing(1)}px`
  },
  filterSelectSm: {
    minWidth: '100px'
  },
  filterRight: {
    float: 'right',
  },
  pagination: {
    padding: '15px',
    marginTop: `${theme.spacing(4)}px`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.palette.background.paper,
    borderRadius: `${theme.shape.borderRadius}px`,
    boxShadow: theme.shadows[24]
  },
  paginationPage: {
    margin: '0',
    color: theme.palette.text.primary,
    fontSize: '20pt',
  },
});


class App extends Component {
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
        username: 'Headstrong54',
        password: '!amC0acHD16E',
        type: 'master',
        auth: ['full']
    },
      dbSpread: {
        id: '',
        title: '',
        sheet: []
      },
      dbAccount: [],
      dbRecord: []
    }
    this.handleDisplay = this.handleDisplay.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
    this.postLogIn = this.postLogIn.bind(this);
    this.postSpread = this.postSpread.bind(this);
    this.putSheet = this.putSheet.bind(this);
    this.putAccount = this.putAccount.bind(this);
  }

  componentDidMount = () => {
    this.postSpread();
  }

  handleDisplay(event) { this.setState({ display: event }); }

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
        auth: [],
      },
      dbAccount: [],
      dbRecord: []
    });
  }

  postLogIn() {

    const { logInUsername, logInPassword } = this.state;
    this.setState({ loading: true });

    axios({
      url: 'http://localhost:3001/api/postLogIn',
      method: 'POST',
      data: {
        username: logInUsername,
        password: logInPassword
      }
    }).then(response => {
      // Success false.
      if (!response.data.success) {
        this.setState({ loading: false });
        return alert(response.data.message);
      }
      console.log(response.data);
      console.log('^ postLogIn');
      // Success true.
      this.setState({ 
        loading: false,
        display: 'main',
        logInUsername: '',
        logInPassword: '',
        account: response.data.data.client,
        dbAccount: response.data.data.account,
        dbRecord: response.data.data.record
      });
    }).catch(error => {
      this.setState({ 
        loading: false ,
        logInPassword: ''
      });
      console.log(error);
    });
  }

  postSpread() {

    const { account } = this.state;
    this.setState({ loading: true });
    
    axios({
      url: 'http://localhost:3001/api/postSpread',
      method: 'POST',
      data: { 
        id: account.spreadId,
        username: account.username,
      }
    }).then(response => {
      // Success false.
      if (!response.data.success) {
        if (response.data.message === 'Account is locked.') {
          this.setState({ loading: false });
          this.handleLogOut();
        } else this.setState({ loading: false });
        return alert(response.data.message);
      }
      console.log(response.data);
      console.log('^ postSpread');
      // Success true.
      this.setState({ 
        loading: false,
        dbSpread: response.data.data.spread,
        dbAccount: response.data.data.account,
        dbRecord: response.data.data.record
      });
    }).catch(error => {
      this.setState({ loading: false });
      console.log(error);
    });
  }

  putSheet(newTitle, newSheet) {

    const { account } = this.state;
    this.setState({ loading: true });

    axios({

      url: 'http://localhost:3001/api/putSheet',
      method: 'PUT',
      data: {
        id: account.spreadId,
        username: account.username,
        password: account.password,
        title: newTitle,
        sheet: newSheet,
      }

    }).then(response => {
      // Success false.
      if (!response.data.success) {
        if (response.data.message === 'Account is locked.') {
          this.setState({ loading: false });
          this.handleLogOut();
        } else this.setState({ loading: false });
        return alert(response.data.message);
      }
      console.log(response.data);
      console.log('^ putSheet');
      // Success true.
      this.setState({ 
        loading: false,
        dbSpread: response.data.data.spread,
        dbAccount: response.data.data.account,
        dbRecord: response.data.data.record
      });
    }).catch(error => {
      this.setState({ loading: false });
      console.log(error);
    });
  }

  putAccount(newAccount) {

    const { account } = this.state;

    this.setState({ loading: true });

    axios({

      url: 'http://localhost:3001/api/putAccount',
      method: 'PUT',
      data: {
        id: account.spreadId,
        username: account.username,
        password: account.password,
        account: newAccount
      }

    }).then(response => {
      // Success false.
      if (!response.data.success) {
        if (response.data.message === 'Account is locked.') {
          this.setState({ loading: false });
          this.handleLogOut();
        } else this.setState({ loading: false });
        return alert(response.data.message);
      }
      console.log(response.data);
      console.log('^ putAccount');
      // Success true.
      this.setState({ 
        loading: false,
        account: response.data.data.client,
        dbAccount: response.data.data.account,
        dbRecord: response.data.data.record
      });
    }).catch(error => {
      this.setState({ loading: false });
      console.log(error);
    });
  }

  render() {

    const {
      classes
    } = this.props, { 
      loading, 
      display, 
      logInUsername, 
      logInPassword, 
      account, 
      dbSpread, 
      dbAccount, 
      dbRecord 
    } = this.state;

    return <div className={classes.app}>
      <Router>
        {/* Header - Navbar to navigate between Searching Database and Adding Data to Database(Index) */}
          <Header 
            classes={classes}
            account={account}
            handleDisplay={this.handleDisplay}
            handleLogOut={this.handleLogOut}
          />
        {/* Switch to determine the path followed by clicked Link */}
        <Switch>
          <Route exact path='/'>
            {account.username === '' && display === 'login' ? (
              <div className={classes.route}>
                <Container className={classes.container}>
                  <TextField
                    className={classes.input}
                    InputLabelProps={{
                        classes: {
                            focused: classes.focused
                        },
                    }}
                    InputProps={{
                        classes: {
                            root: classes.outline,
                            focused: classes.focused,
                            notchedOutline: classes.notchedOutline
                        },
                    }}
                    label={'Username'}
                    value={logInUsername}
                    onChange={event => this.setState({ logInUsername: event.target.value })}
                    variant='outlined'
                    onKeyPress={event => {
                      if (logInUsername === '' || logInPassword === '') return
                      if(event.key === 'Enter') {
                        event.preventDefault();
                        this.postLogIn();
                      }
                    }}
                  />
                  <TextField
                    className={classes.input}
                    style={{ marginLeft: '10px' }}
                    type='password'
                    InputLabelProps={{
                        classes: {
                            focused: classes.focused
                        },
                    }}
                    InputProps={{
                        classes: {
                            root: classes.outline,
                            focused: classes.focused,
                            notchedOutline: classes.notchedOutline
                        },
                    }}
                    label={'Password'}
                    value={logInPassword}
                    onChange={event => this.setState({ logInPassword: event.target.value }) }
                    variant='outlined'
                    onKeyPress={event => {
                      if (logInUsername === '' || logInPassword === '') return
                      if(event.key === 'Enter') {
                        event.preventDefault();
                        this.postLogIn();
                      }
                    }}
                  />
                  <Button
                    className={classes.btn}
                    style={{ marginLeft: '10px' }}
                    onClick={() => {
                      if (logInUsername === '' || logInPassword === '') return
                      this.postLogIn()
                    }}
                  >Log in</Button>
                </Container>
              </div>
            ) : (
              !loading ? (
                <Main 
                  classes={classes}
                  account={account}
                  dbSpread={dbSpread}
                  postSpread={this.postSpread}
                  putSheet={this.putSheet}
                />
              ) : null
            )}
          </Route>
          <Route path='/account'>
            {!loading && account.username !== '' ? (
              <Account
                classes={classes}
                account={account}
                dbSpread={dbSpread}
                dbAccount={dbAccount}
                putAccount={this.putAccount}
              />
            ) : null }
          </Route>
          <Route path='/edit'>
            {!loading && (account.type === 'admin' || account.type === 'master') && account.username !== '' ? (
              <Edit
                classes={classes}
                account={account}
                dbSpread={dbSpread}
                putSheet={this.putSheet} 
              />
            ) : null }
          </Route>
          <Route path='/history'>
            {!loading && (account.type === 'admin' || account.type === 'master') && account.username !== '' ? (
              <Record 
                classes={classes}
                account={account}
                dbAccount={dbAccount}
                dbRecord={dbRecord}
              />
            ) : null }
          </Route>
        </Switch>
      </Router>
    </div>
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(App)