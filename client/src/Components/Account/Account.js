import React, { Component } from 'react';
import AccountTable from '../AccountTable/AccountTable';

export default class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            display: this.props.dbAccount,
            idAccount: [],
            editAccount: '',
            editUsername: '',
            editPassword: '',
            editName: '',
            editAuth: [],
            editType: '',
            newUsername: '',
            newName: '',
            newAuth: 'none',
            newType: 'user',
            newPassword: '',
            reNewPassword: ''
        }
        this.toggleEditMode = this.toggleEditMode.bind(this);
        this.saveAccount = this.saveAccount.bind(this);
        this.returnAccount = this.returnAccount.bind(this);
        this.renderRowAuth = this.renderRowAuth.bind(this);
        this.toggleLock = this.toggleLock.bind(this);
        this.editAccountRow = this.editAccountRow.bind(this);
        this.removeAccountRow = this.removeAccountRow.bind(this);
        this.handleEditUsername = this.handleEditUsername.bind(this);
        this.handleEditName = this.handleEditName.bind(this);
        this.handleEditAuth = this.handleEditAuth.bind(this);
        this.handleEditType = this.handleEditType.bind(this);
        this.replaceAccountRow = this.replaceAccountRow.bind(this);
        this.returnAccountRow = this.returnAccountRow.bind(this);
        this.handleNewPass = this.handleNewPass.bind(this);
        this.handleReNew = this.handleReNew.bind(this);
        this.savePass = this.savePass.bind(this);
        this.handleNewUsername = this.handleNewUsername.bind(this);
        this.handleNewName = this.handleNewName.bind(this);
        this.handleNewAuth = this.handleNewAuth.bind(this);
        this.handleNewType = this.handleNewType.bind(this);
        this.addAccountRow = this.addAccountRow.bind(this);
        this.clearAccountRow = this.clearAccountRow.bind(this);
        this.editError = this.editError.bind(this);
        this.addError = this.addError.bind(this);
        this.passError = this.passError.bind(this);
    }

    componentDidMount() {
        this.renderDisplay();
    }

    renderDisplay() {
        const { account, dbAccount } = this.props,
            array = [];

        dbAccount.forEach(dbAcc => {
            if (account.id === dbAcc.id) return array.unshift(account);
            array.push(dbAcc)
        });

        this.setState({ display: array });
    }

    toggleEditMode() { this.setState({ editMode: true }) }

    saveAccount() {
        this.props.putAccount(this.state.display);
        this.setState({ editMode: false });
    }

    returnAccount() {
        this.renderDisplay();
        this.setState({ editMode: false });
    }

    renderRowAuth(array) {
        const { dbSpread } = this.props;
        let str = '';

        if (!array) return
        if (array.includes('lock')) return 'Locked'
        if (array.includes('full')) return 'Full'
        dbSpread.sheet.forEach(sheet => {
            array.forEach(num => {
                if (num === sheet.id) return str = sheet.title
            });
        });
        if (str !== '') return str;
        if (array.includes('none')) return 'None'
    }

    toggleLock(row, acc) {
        const { display } = this.state,
            array = display,
            dataAuth = acc.auth;

        if (!dataAuth.includes('lock')) {
            dataAuth.push('lock');
        } else {
            dataAuth.splice(dataAuth.indexOf('lock'), 1);
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
        array.splice(row, 1, newData);

        this.setState({ display: array });
    }

    editAccountRow(row, acc) {
        let accUsername = '',
            accName = '';

        if (acc.username !== null) accUsername = acc.username;
        if (acc.name !== null) accName = acc.name;

        this.setState({ 
            editAccount: row,
            editUsername: accUsername,
            editName: accName,
            editAuth: acc.auth,
            editType: acc.type
        });
    }

    removeAccountRow(row, id) {
        const { display, idAccount } = this.state,
            array = display,
            newIdAccount = idAccount;

        array.splice(row, 1);
        if ((typeof id) === 'string') newIdAccount.splice(newIdAccount.indexOf(parseInt(id.substring(4))), 1);

        this.setState({ 
            display: array,
            idAccount: newIdAccount 
        });
    }

    handleEditUsername(event) { this.setState({ editUsername: event }); }
    handleEditName(event) { this.setState({ editName: event }); }
    handleEditAuth(event) { 
        const { editAuth } = this.state,
            array = [event];

        if (editAuth.includes('lock')) array.push('lock');

        this.setState({ editAuth: array }); 
    }
    handleEditType(event) { this.setState({ editType: event }); }

    replaceAccountRow(row, acc) {
        const { display, editUsername, editName, editAuth, editType } = this.state,
            array = display;
        let takenUsername = false,
            accUsername = null,
            accName = null;

        array.forEach(data => {
            if (data.id === acc.id) return
            if (data.username === editUsername.trim()) takenUsername = true;
        });
        if (takenUsername) return alert('Username is already being used.')

        if (editUsername.trim() !== '') accUsername = editUsername.trim();
        if (editName.trim() !== '') accName = editName.trim();

        let newData = {
            id: acc.id,
            spreadId: acc.spreadId,
            username: accUsername,
            password: acc.password,
            name: accName,
            auth: editAuth,
            type: editType
        };
        array.splice(row, 1, newData);

        this.setState({ 
            display: array,
            editAccount: ''
        });
    }
    
    returnAccountRow() { 
        this.setState({ 
            editAccount: '',
            newPassword: '',
            reNewPassword: ''
        }); 
    }

    handleNewPass(event) { this.setState({ newPassword: event }); }
    handleReNew(event) { this.setState({ reNewPassword: event }); }

    savePass() {
        const { account, putAccount } = this.props,
            { display, newPassword, reNewPassword } = this.state,
            array = [],
            newPass = newPassword.trim(),
            reNewPass = reNewPassword.trim(),
            confirmPass = prompt('Please enter current password.');
        
        if (confirmPass !== account.password) {
            this.setState({
                newPassword: '',
                reNewPassword: ''
            });
            return alert('Incorrect password.');
        }
        if (newPass !== reNewPass) {
            this.setState({
                newPassword: '',
                reNewPassword: ''
            });
            return alert('New passwords do not match.');
        }

        display.forEach(acc => {
            if (acc.id !== account.id) return array.push(acc);
            array.push({
                id: acc.id,
                spreadId: acc.spreadId,
                username: acc.username,
                password: newPass,
                name: acc.name,
                auth: acc.auth,
                type: acc.type
            });
        });

        this.setState({ display: array });
        putAccount(array);
    }

    handleNewUsername(event) { this.setState({ newUsername: event }); }
    handleNewName(event) { this.setState({ newName: event }); }
    handleNewAuth(event) { this.setState({ newAuth: event }); }
    handleNewType(event) { this.setState({ newType: event }); }

    addAccountRow() {
        const { account } = this.props,
            { display, idAccount, newUsername, newName, newAuth, newType } = this.state,
            array = display,
            newIdAccount = idAccount;
        let usernameTaken = false,
            newId = 1,
            accUsername = null,
            accName = null;

        array.forEach(data => {
            if (data.username === newUsername.trim()) usernameTaken = true;
        });
        if (usernameTaken) return alert('Username is already being used.');

        if (newUsername.trim() !== '') accUsername = newUsername.trim();
        if (newName.trim() !== '') accName = newName.trim();

        while (newIdAccount.includes(newId)) newId++;
        newIdAccount.push(newId);

        const newData = {
            id: `new-${newId}`,
            spreadId: account.spreadId,
            username: accUsername,
            password: accUsername,
            name: accName,
            auth: [newAuth],
            type: newType
        }
        if (newType === 'admin') {
            array.splice(2, 0, newData);
        } else {
            array.push(newData);
        }

        this.setState({ 
            display: array, 
            idAccount: newIdAccount,
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

    editError(type, value) {
        const { editUsername, editName } = this.state,
            usernameArray = editUsername.split('');
        let invalid = false;

        switch (type) {
            case 'username':
                const valueArray = value.split('');

                valueArray.forEach(char => { if (char === ' ') invalid = true });
                if (invalid) return 'Invalid Characters.'
                if (value !== '' && (value.length < 7 || value.length > 31)) return '8-32 Characters.'
                return ''
            
            case 'name':
                if (value !== '' && value.length > 31) return 'Max 32 Characters.'
                return ''
            
            default:
                usernameArray.forEach(char => { if (char === ' ') invalid = true });
                if (invalid) return 'Invalid Characters.'
                if (editUsername !== '' && (editUsername.length < 7 || editUsername.length > 31)) return '8-32 Characters.'
                if (editName !== '' && editName.length > 31) return 'Max 32 Characters.'
                return ''
        }
    }

    addError(type, value) {
        const { newUsername, newName } = this.state,
            usernameArray = newUsername.split('');
        let invalid = false;

        switch (type) {
            case 'username':
                const valueArray = value.split('');

                valueArray.forEach(char => { if (char === ' ') invalid = true });
                if (invalid) return 'Invalid Characters.'
                if (value !== '' && (value.length < 7 || value.length > 31)) return '8-32 Characters.'
                return ''
            
            case 'name':
                if (value !== '' && value.length > 31) return 'Max 32 Characters.'
                return ''
            
            default:
                usernameArray.forEach(char => { if (char === ' ') invalid = true });
                if (invalid) return 'Invalid Characters.'
                if (newUsername !== '' && (newUsername.length < 7 || newUsername.length > 31)) return '8-32 Characters.'
                if (newName !== '' && newName.length > 31) return 'Max 32 Characters.'
                return ''
        }
    }

    passError(value) {
        const { newPassword, reNewPassword } = this.state;
        let invalid = false;

        if (value) {
            const valueArray = value.split('');

            valueArray.forEach(char => { if (char === ' ') invalid = true });
            if (invalid) return 'Invalid Characters.'
            if (value !== '' && (value.length < 7 || value.length > 31)) return '8-32 Characters.'
            if (newPassword !== '' && reNewPassword !== '' && newPassword !== reNewPassword) return 'Passwords dont match.'
            return '';
        } else {
            if (newPassword !== '' && reNewPassword !== '' && newPassword !== reNewPassword) return 'Passwords dont match.'
            return '';
        }
    }

    render() {

        const { 
            classes,
            account, 
            dbSpread 
        } = this.props, { 
            editMode, 
            display,
            editAccount,
            editUsername,
            editName,
            editAuth,
            editType,
            newPassword,
            reNewPassword,
            newUsername,
            newName,
            newAuth,
            newType
        } = this.state;

        return <div className={classes.route}>
            <AccountTable
                classes={classes}
                dbSpread={dbSpread}
                account={account}
                editMode={editMode}
                display={display}
                editAccount={editAccount}
                editUsername={editUsername}
                editName={editName}
                editAuth={editAuth}
                editType={editType}
                newPassword={newPassword}
                reNewPassword={reNewPassword}
                newUsername={newUsername}
                newName={newName}
                newAuth={newAuth}
                newType={newType}
                toggleEditMode={this.toggleEditMode}
                saveAccount={this.saveAccount}
                returnAccount={this.returnAccount}
                renderRowAuth={this.renderRowAuth}
                toggleLock={this.toggleLock}
                editAccountRow={this.editAccountRow}
                removeAccountRow={this.removeAccountRow}
                handleEditUsername={this.handleEditUsername}
                handleEditName={this.handleEditName}
                handleEditAuth={this.handleEditAuth}
                handleEditType={this.handleEditType}
                replaceAccountRow={this.replaceAccountRow}
                returnAccountRow={this.returnAccountRow}
                handleNewPass={this.handleNewPass}
                handleReNew={this.handleReNew}
                savePass={this.savePass}
                handleNewUsername={this.handleNewUsername}
                handleNewName={this.handleNewName}
                handleNewAuth={this.handleNewAuth}
                handleNewType={this.handleNewType}
                addAccountRow={this.addAccountRow}
                clearAccountRow={this.clearAccountRow}
                editError={this.editError}
                addError={this.addError}
                passError={this.passError}
            />
        </div>
    }
}