import React, { Component } from 'react';
import axios from 'axios';
import './Account.css';
import AccountTable from '../AccountTable/AccountTable';
import { 
    TextField,
    Button
} from '@material-ui/core';

export default class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            editMode: false,
            accountData: [],
            deleteAccount: [],
            lockAccount: [],
            unlockAccount: [],
            title: this.props.dbData.title,
            editTitle: '',
            editAccount: '',
            editUsername: '',
            editName: '',
            editAuth: [],
            editType: '',
            newUsername: '',
            newName: '',
            newAuth: 'none',
            newType: 'user'
        }
        this.renderRowAuth = this.renderRowAuth.bind(this);
        this.toggleLock = this.toggleLock.bind(this);
        this.editSpreadTitle = this.editSpreadTitle.bind(this);
        this.handleSpreadTitle = this.handleSpreadTitle.bind(this);
        this.replaceSpreadTitle = this.replaceSpreadTitle.bind(this);
        this.editAccountRow = this.editAccountRow.bind(this);
        this.removeAccountRow = this.removeAccountRow.bind(this);
        this.handleEditUsername = this.handleEditUsername.bind(this);
        this.handleEditName = this.handleEditName.bind(this);
        this.handleEditAuth = this.handleEditAuth.bind(this);
        this.replaceAccountRow = this.replaceAccountRow.bind(this);
        this.returnAccountRow = this.returnAccountRow.bind(this);
        this.handleNewUsername = this.handleNewUsername.bind(this);
        this.handleNewName = this.handleNewName.bind(this);
        this.handleNewAuth = this.handleNewAuth.bind(this);
        this.handleNewType = this.handleNewType.bind(this);
        this.addAccountRow = this.addAccountRow.bind(this);
        this.clearAccountRow = this.clearAccountRow.bind(this);
    }

    componentDidMount() {
        this.renderAccountData();
    }

    renderAccountData() {
        const { account, dbData } = this.props;
        const array = [];
        dbData.account.forEach(acc => {
            if (account.id === acc.id) return
            if (acc.type === 'admin') array.unshift(acc);
            if (acc.type === 'user') array.push(acc);
        });
        array.unshift(account);
        this.setState({ accountData: array });
    }

    renderRowAuth(array) {
        const { dbData } = this.props;
        let titleStr = '';
        if (array.includes('lock')) return 'Locked'
        if (dbData.length === 0 || array.includes('none')) return 'None'
        if (array.includes('full')) return 'Full'
        dbData.sheet.forEach(sheet => {
            array.forEach(num => {
                if (num === sheet.id) {
                    titleStr = sheet.title
                }
            });
        });
        return titleStr;
    }

    toggleLock(row, acc) {
        const array = this.state.accountData,
            lockArray = this.state.lockAccount,
            unlockArray = this.state.unlockAccount,
            dataAuth = acc.auth;

        if (!dataAuth.includes('lock')) {
            dataAuth.push('lock');
            lockArray.push(acc.username);
            unlockArray.splice(unlockArray.indexOf(acc.username), 1);
        } else {
            dataAuth.splice(dataAuth.indexOf('lock'), 1);
            lockArray.splice(lockArray.indexOf(acc.username), 1);
            unlockArray.push(acc.username);

        }

        let newData = {
            id: acc.id,
            username: acc.username,
            password: acc.password,
            name: acc.name,
            auth: dataAuth,
            type: acc.type
        };
        array.splice(row, 1, newData);

        this.setState({ 
            accountData: array,
            lockAccount: lockArray,
            unlockAccount: unlockArray
        });
    }

    editSpreadTitle() {
        this.setState({
            editAccount: 'title',
            editTitle: this.state.title
        })
    }
    
    handleSpreadTitle(event) { this.setState({ editTitle: event }) }

    replaceSpreadTitle() {
        this.setState({ 
            title: this.state.editTitle.trim(),
            editAccount: ''
        });
    }
    
    editAccountRow(row, username, name, auth, type) {
        this.setState({ 
            editAccount: row,
            editUsername: username,
            editName: name,
            editAuth: auth,
            editType: type
        });
    }

    removeAccountRow(row, username) {
        const display = this.state.accountData;
        const array = this.state.deleteAccount;
        display.splice(row, 1);
        array.push(username);
        this.setState({ 
            accountData: display,
            deleteAccount: array 
        });
    }

    handleEditUsername(event) { this.setState({ editUsername: event }); }
    handleEditName(event) { this.setState({ editName: event }); }
    handleEditAuth(event) { this.setState({ editAuth: event }); }

    replaceAccountRow(row, acc) {
        const array = this.state.accountData, { editUsername, editName, editAuth, editType } = this.state;

        let dataName = null;

        if (editName.trim() !== '') dataName = editName.trim();

        let newData = {
            id: acc.id,
            username: editUsername.trim(),
            password: acc.password,
            name: dataName,
            auth: editAuth,
            type: editType
        };
        array.splice(row, 1, newData);

        this.setState({ 
            accountData: array,
            editAccount: ''
        });
    }
    
    returnAccountRow() { this.setState({ editAccount: '' }); }

    handleNewUsername(event) { this.setState({ newUsername: event }); }
    handleNewName(event) { this.setState({ newName: event }); }
    handleNewAuth(event) { this.setState({ newAuth: event }); }
    handleNewType(event) { this.setState({ newType: event }); }

    addAccountRow() {
        const { dbData } = this.props,
            { newUsername, newName, newAuth, newType } = this.state,
            array = this.state.accountData;

        let idArray = [],
            dataId = 1,
            dataName = null;

        if (newName.trim() !== '') dataName = newName.trim();

        dbData.account.forEach(account => idArray.push(account.id));

        array.forEach(account => {
            if (!idArray.includes(account.id)) idArray.push(account.id);
        });

        while (idArray.includes(dataId)) dataId++;

        const newData = {
            id: dataId,
            username: newUsername.trim(),
            password: newUsername.trim(),
            name: dataName,
            auth: [newAuth],
            type: newType
        }

        if (newType === 'admin') {
            array.splice(1, 0, newData);
        } else {
            array.push(newData);
        }

        this.setState({ 
            metaData: array, 
            newUsername: '',
            newName: '',
            newAuth: 'none',
            newType: 'user'
        });
    }

    clearAccountRow() {
        this.setState({
            newUsername: '',
            newName: '',
            newAuth: 'none',
            newType: 'user'
        });
    }

    checkModification() {
        const { account, dbData } = this.props,
            { accountData, deleteAccount, lockAccount, unlockAccount, title } = this.state,
            idArray = [];

        let titleStr = '',
            lockStr = '',
            unlockStr = '',
            usernameStr = '',
            nameStr = '',
            deleteStr = '',
            addStr = '';

        if (dbData.title !== title) titleStr = `changed Title from "${dbData.title}" to "${title}".`
        if (account.username !== accountData[0].username) usernameStr = `changed Username from "${account.username}" to "${accountData[0].username}".`;
        if (account.name !== accountData[0].name) nameStr = `changed Name from "${account.name}" to "${accountData[0].name}".`;

        dbData.account.forEach((acc, i) => {
            if (!deleteAccount.includes(acc.username)) {
                accountData.forEach(res => {
                    if (acc.id === res.id) {
                        idArray.push(acc.id);
                    }
                });
            } 
        });
        accountData.forEach((acc, i) => {
            if (!idArray.includes(acc.id)) {
                switch (i) {
                    case (accountData.length - idArray.length):
                        addStr += `"${acc.username}"`;
                        break;
                    case ((accountData.length - idArray.length) - 1):
                        addStr += `"${acc.username}", and `;
                        break;
                    case 1:
                        if ((accountData.length - idArray.length) === 2) addStr += `"${acc.username}" and `;
                        if ((accountData.length - idArray.length) > 2) addStr += `"${acc.username}", `;
                        break;
                    default:
                        addStr += `"${acc.username}", `;
                }
            }
        });
        deleteAccount.forEach((username, i) => {
            switch (i) {
                case (deleteAccount.length - 1):
                    deleteStr += `"${username}"`;
                    break;
                case (deleteAccount.length - 2):
                    deleteStr += `"${username}", and `;
                    break;
                case 1:
                    if (deleteAccount.length === 2) deleteStr += `"${username}" and `;
                    if (deleteAccount.length > 2) deleteStr += `"${username}", `;
                    break;
                default:
                    deleteStr += `"${username}", `;
            }
        });
        lockAccount.forEach((username, i) => {
            switch (i) {
                case (lockAccount.length - 1):
                    lockStr += `"${username}"`;
                    break;
                case (lockAccount.length - 2):
                    lockStr += `"${username}", and `;
                    break;
                case 1:
                    if (lockAccount.length === 2) lockStr += `"${username}" and `;
                    if (lockAccount.length > 2) lockStr += `"${username}", `;
                    break;
                default:
                    lockStr += `"${username}", `;
            }
        });
        unlockAccount.forEach((username, i) => {
            switch (i) {
                case (unlockAccount.length - 1):
                    unlockStr += `"${username}"`;
                    break;
                case (unlockAccount.length - 2):
                    unlockStr += `"${username}", and `;
                    break;
                case 1:
                    if (unlockAccount.length === 2) unlockStr += `"${username}" and `;
                    if (unlockAccount.length > 2) unlockStr += `"${username}", `;
                    break;
                default:
                    unlockStr += `"${username}", `;
            }
        });


        if (titleStr === '' && lockStr === '' && unlockStr === '' && usernameStr === '' && nameStr === '' && deleteStr === '' && addStr === '') {
            this.renderAccountData();
            return alert('No modifications were made to CyberDex.');
        }
        this.modifyAccount(titleStr, lockStr, unlockStr, usernameStr, nameStr, deleteStr, addStr);
    }

    modifyAccount(titleStr, lockStr, unlockStr, usernameStr, nameStr, deleteStr, addStr) {
        // console.log(titleStr);
        // console.log(lockStr);
        // console.log(usernameStr);
        // console.log(nameStr);
        // console.log(deleteStr);
        // console.log(addStr);

        const { account, dbData, getDataFromDB } = this.props,
            { accountData, title } = this.state,
            recordArray = dbData.record;
        
        let newLog = 'Account ';
        
        if (account.name === '') return alert('Account does not have a name.');

        if (titleStr !== '') newLog += titleStr;
        if (lockStr !== '') {
            if (newLog !== 'Account ') newLog += '  Account ';
            newLog += `locked ${lockStr} account(s).`;
        }
        if (unlockStr !== '') {
            if (newLog !== 'Account ') newLog += '  Account ';
            newLog += `unlocked ${unlockStr} account(s).`;
        }
        if (deleteStr !== '') {
            if (newLog !== 'Account ') newLog += '  Account ';
            newLog += `deleted ${deleteStr} account(s).`;
        }
        if (addStr !== '') {
            if (newLog !== 'Account ') newLog += '  Account ';
            newLog += `added ${addStr} account(s).`;
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

        console.log(newRecord);

        recordArray.unshift(newRecord);

        axios({

            url: 'http://localhost:3001/api/updateData',
            method: 'PUT',
            data: {
                id: dbData.id,
                title: title,
                sheet: dbData.sheet,
                account: accountData,
                record: recordArray
            }

        }).then((reponse) => {
            console.log(reponse);
            getDataFromDB();
            this.setState({ editMode: false });
        }).catch((error) => {
            console.log(error);
        });
    }

    render() {

        const { account, dbData, renderAccount } = this.props;
        const { 
            username, 
            password, 
            editMode, 
            accountData, 
            title, 
            editTitle, 
            editAccount,
            editUsername,
            editName,
            editAuth,
            editType,
            newUsername,
            newName,
            newAuth,
            newType
        } = this.state;

        return account === '' ? (
            <div className='account-login'>
                <TextField
                    value={username}
                    onChange={event => this.setState({ username: event.target.value })}
                    label='Username'
                    onKeyPress={event => {
                        if(event.key === 'Enter') {
                            event.preventDefault();
                            renderAccount(username, password);
                        }
                    }}
                />
                <TextField
                    value={password}
                    onChange={event => {
                        this.setState({ password: event.target.value })
                    }}
                    label='Password'
                    onKeyPress={event => {
                        if(event.key === 'Enter') {
                            event.preventDefault();
                            renderAccount(username, password);
                            this.renderAccountData();
                        }
                    }}
                />
                <Button
                    onClick={() => {
                        renderAccount(username, password);
                        this.renderAccountData();
                    }}
                >Log in</Button>
            </div>
        ) : (
            <div className='account'>
                <div className='account-modify'>
                    {!editMode ? (
                        <Button
                            onClick={() => this.setState({ editMode: true })}
                        >Edit</Button>
                    ) : (
                        <>
                            <Button
                                onClick={() => {
                                    this.checkModification();
                                    this.setState({ editMode: false });
                                }}
                            >Save</Button>
                            <Button
                                onClick={() => {
                                    this.renderAccountData();
                                    this.setState({ editMode: false });
                            }}
                            >Return</Button>
                        </>
                    )}
                </div>
                <AccountTable
                    dbData={dbData}
                    account={account}
                    editMode={editMode}
                    accountData={accountData}
                    title={title}
                    editTitle={editTitle}
                    editAccount={editAccount}
                    editUsername={editUsername}
                    editName={editName}
                    editAuth={editAuth}
                    editType={editType}
                    newUsername={newUsername}
                    newName={newName}
                    newAuth={newAuth}
                    newType={newType}
                    renderRowAuth={this.renderRowAuth}
                    toggleLock={this.toggleLock}
                    editSpreadTitle={this.editSpreadTitle}
                    handleSpreadTitle={this.handleSpreadTitle}
                    replaceSpreadTitle={this.replaceSpreadTitle}
                    editAccountRow={this.editAccountRow}
                    removeAccountRow={this.removeAccountRow}
                    handleEditUsername={this.handleEditUsername}
                    handleEditName={this.handleEditName}
                    handleEditAuth={this.handleEditAuth}
                    replaceAccountRow={this.replaceAccountRow}
                    returnAccountRow={this.returnAccountRow}
                    handleNewUsername={this.handleNewUsername}
                    handleNewName={this.handleNewName}
                    handleNewAuth={this.handleNewAuth}
                    handleNewType={this.handleNewType}
                    addAccountRow={this.addAccountRow}
                    clearAccountRow={this.clearAccountRow}
                />
            </div>
        )
    }
}