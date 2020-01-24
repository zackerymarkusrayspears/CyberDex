import React, { Component } from 'react';
import './Account.css';
import AccountTable from '../AccountTable/AccountTable';
import { Button } from '@material-ui/core';

export default class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            editMode: false,
            accountId: this.props.dbAccId,
            accountData: this.props.dbAccount,
            addAccount: [],
            deleteAccount: [],
            lockAccount: [],
            unlockAccount: [],
            title: this.props.dbSpread.title,
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
        const { dbAccId, dbAccount } = this.props,
            display = [];
        dbAccount.forEach(acc => display.push(acc));
        this.setState({
            accountId: dbAccId,
            accountData: display
        });
    }

    renderRowAuth(array) {
        const { dbSpread } = this.props;
        let titleStr = '';
        if (array) {
            if (array.includes('lock')) return 'Locked'
            if (array.includes('none')) return 'None'
            if (array.includes('full')) return 'Full'
            dbSpread.sheet.forEach(sheet => {
                array.forEach(num => {
                    if (num === sheet.id) {
                        titleStr = sheet.title
                    }
                });
            });
            return titleStr;
        }
    }

    toggleLock(row, acc) {
        const display = this.state.accountData,
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
            spreadId: acc.spreadId,
            username: acc.username,
            password: acc.password,
            name: acc.name,
            auth: dataAuth,
            type: acc.type
        };
        display.splice(row, 1, newData);

        this.setState({ 
            accountData: display,
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
        let accUsername = '',
            accName = '';
        if (username !== null) accUsername = username;
        if (name !== null) accName = name;
        this.setState({ 
            editAccount: row,
            editUsername: accUsername,
            editName: accName,
            editAuth: auth,
            editType: type
        });
    }

    removeAccountRow(row, username) {
        const { dbAccount } = this.props,
            { accountData, addAccount, deleteAccount } = this.state,
            display = accountData,
            array = deleteAccount;
        let addToArray = false;
        display.splice(row, 1);
        dbAccount.forEach(acc => {
            if (acc.username === username) addToArray = true;
        });
        if (addToArray) array.push(username);
        if (addAccount.includes(username)) addAccount.splice(addAccount.indexOf(username), 1);
        this.setState({ 
            accountData: display,
            deleteAccount: array 
        });
    }

    handleEditUsername(event) { this.setState({ editUsername: event }); }
    handleEditName(event) { this.setState({ editName: event }); }
    handleEditAuth(event) { this.setState({ editAuth: event }); }

    replaceAccountRow(row, acc) {
        const { accountData, editUsername, editName, editAuth, editType } = this.state,
            display = accountData;

        let dataName = null;

        if (editName.trim() !== '') dataName = editName.trim();

        let newData = {
            id: acc.id,
            spreadId: acc.spreadId,
            username: editUsername.trim(),
            password: acc.password,
            name: dataName,
            auth: editAuth,
            type: editType
        };
        display.splice(row, 1, newData);

        this.setState({ 
            accountData: display,
            editAccount: ''
        });
    }
    
    returnAccountRow() { this.setState({ editAccount: '' }); }

    handleNewUsername(event) { this.setState({ newUsername: event }); }
    handleNewName(event) { this.setState({ newName: event }); }
    handleNewAuth(event) { this.setState({ newAuth: event }); }
    handleNewType(event) { this.setState({ newType: event }); }

    addAccountRow() {
        const { dbSpread } = this.props,
            { accountId, accountData, addAccount, newUsername, newName, newAuth, newType } = this.state,
            display = accountData, array = addAccount;

        let idArray = [],
            usernameTaken = false,
            dataId = 1,
            dataName = null;

        if (newName.trim() !== '') dataName = newName.trim();

        accountId.forEach(id => idArray.push(id));

        display.forEach(acc => {
            if (!idArray.includes(acc.id)) idArray.push(acc.id);
            if (newUsername.trim() === acc.username) usernameTaken = true;
        });
        if (usernameTaken) return alert('Username taken.');

        while (idArray.includes(dataId)) dataId++;

        const newData = {
            id: dataId,
            spreadId: dbSpread.id,
            username: newUsername.trim(),
            password: newUsername.trim(),
            name: dataName,
            auth: [newAuth],
            type: newType
        }

        if (newType === 'admin') {
            display.splice(1, 0, newData);
        } else {
            display.push(newData);
        }
        array.push(newUsername.trim());

        this.setState({ 
            accountData: display, 
            addAccount: array,
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
        const { account, dbSpread, putAccount } = this.props,
            { accountData, addAccount, deleteAccount, lockAccount, unlockAccount, title } = this.state;

        let titleStr = '',
            lockStr = '',
            unlockStr = '',
            usernameStr = '',
            nameStr = '',
            deleteStr = '',
            addStr = '';

        if (dbSpread.title !== title) titleStr = `changed Title from "${dbSpread.title}" to "${title}".`

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
        addAccount.forEach((username, i) => {
            switch (i) {
                case (addAccount.length - 1):
                    addStr += `"${username}"`;
                    break;
                case (addAccount.length - 2):
                    addStr += `"${username}", and `;
                    break;
                case 1:
                    if (addAccount.length === 2) addStr += `"${username}" and `;
                    if (addAccount.length > 2) addStr += `"${username}", `;
                    break;
                default:
                    addStr += `"${username}", `;
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

        if (account.username !== accountData[0].username) usernameStr = `changed Username from "${account.username}" to "${accountData[0].username}".`;
        if (account.name !== accountData[0].name) nameStr = `changed Name from "${account.name}" to "${accountData[0].name}".`;

        if (titleStr === '' && lockStr === '' && unlockStr === '' && deleteStr === '' && addStr === '' && usernameStr === '' && nameStr === '' ) return alert('No modifications were made to CyberDex.');

        putAccount(accountData, title, titleStr, lockStr, unlockStr, deleteStr, addStr, usernameStr, nameStr);
    }

    render() {

        const { account, dbSpread, dbAccount } = this.props;
        const { 
            loading,
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

        return <div className='account'>
            {!loading ? (
                <>
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
                                        this.setState({ 
                                            editMode: false,
                                            accountData: dbAccount
                                        });
                                }}
                                >Return</Button>
                            </>
                        )}
                    </div>
                    <AccountTable
                        dbSpread={dbSpread}
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
                </>
            ) : null }
        </div>
    }
}