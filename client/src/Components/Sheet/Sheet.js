import React, { Component } from 'react';
import axios from 'axios';
import './Sheet.css';
import PersonTable from '../PersonTable/PersonTable';
import MetaTable from '../MetaTable/MetaTable';
import { Button } from '@material-ui/core';


export default class Sheet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sheetId: this.props.data.id,
            deletePerson: [],
            personData: this.props.data.personList,
            title: this.props.data.title,
            editTitle: '',
            editPerson: '',
            editName: '',
            editPhoneTag: '',
            editExtension: '',
            editRoom: '',
            editNote: '',
            newName: '',
            newPhoneTag: '',
            newExtension: '',
            newRoom: '',
            newNote: '',
            metaData: this.props.data.metaList,
            deleteMeta: [],
            editMeta: '',
            editLine: '',
            editNumber: '',
            newLine: '',
            newNumber: ''
        }
        this.editSheetTitle = this.editSheetTitle.bind(this);
        this.handleSheetTitle = this.handleSheetTitle.bind(this);
        this.replaceSheetTitle = this.replaceSheetTitle.bind(this);
        this.editPersonRow = this.editPersonRow.bind(this);
        this.removePersonRow = this.removePersonRow.bind(this);
        this.handleEditName = this.handleEditName.bind(this);
        this.handleEditPhoneTag = this.handleEditPhoneTag.bind(this);
        this.handleEditExtension = this.handleEditExtension.bind(this);
        this.handleEditRoom = this.handleEditRoom.bind(this);
        this.handleEditNote = this.handleEditNote.bind(this);
        this.replacePersonRow = this.replacePersonRow.bind(this);
        this.returnPersonRow = this.returnPersonRow.bind(this);
        this.handleNewName = this.handleNewName.bind(this);
        this.handleNewPhoneTag = this.handleNewPhoneTag.bind(this);
        this.handleNewExtension = this.handleNewExtension.bind(this);
        this.handleNewRoom = this.handleNewRoom.bind(this);
        this.handleNewNote = this.handleNewNote.bind(this);
        this.addPersonRow = this.addPersonRow.bind(this);
        this.clearPersonRow = this.clearPersonRow.bind(this);
        this.editMetaRow = this.editMetaRow.bind(this);
        this.removeMetaRow = this.removeMetaRow.bind(this);
        this.handleEditLine = this.handleEditLine.bind(this);
        this.handleEditNumber = this.handleEditNumber.bind(this);
        this.replaceMetaRow = this.replaceMetaRow.bind(this);
        this.returnMetaRow = this.returnMetaRow.bind(this);
        this.handleNewLine = this.handleNewLine.bind(this);
        this.handleNewNumber = this.handleNewNumber.bind(this);
        this.addMetaRow = this.addMetaRow.bind(this);
        this.clearMetaRow = this.clearMetaRow.bind(this);
    }

    editSheetTitle() {
        this.setState({
            editPerson: 'title', 
            editTitle: this.state.title
        });
    }

    handleSheetTitle(event) { this.setState({ editTitle: event }); }

    replaceSheetTitle() {
        this.setState({ 
            title: this.state.editTitle.trim(),
            editTitle: '',
            editPerson: ''
        });
    }
    
    editPersonRow(row, name, phoneTag, extension, room, note) {
        this.setState({ 
            editPerson: row,
            editName: name,
            editPhoneTag: phoneTag,
            editExtension: extension,
            editRoom: room,
            editNote: note
        });
    }

    removePersonRow(row, id) {
        const display = this.state.personData;
        const array = this.state.deletePerson;
        display.splice(row, 1);
        array.push(id);
        this.setState({ 
            personData: display,
            deletePerson: array 
        });
    }

    handleEditName(event) { this.setState({ editName: event }); }
    handleEditPhoneTag(event) { this.setState({ editPhoneTag: event }); }
    handleEditExtension(event) { this.setState({ editExtension: event }); }
    handleEditRoom(event) { this.setState({ editRoom: event }); }
    handleEditNote(event) { this.setState({ editNote: event }); }

    replacePersonRow(row, id) {
        const array = this.state.personData, 
            { editName, editPhoneTag, editExtension, editRoom, editNote } = this.state;

        let dataName = null,
            dataPhoneTag = null,
            dataExtension = null,
            dataRoom = null,
            dataNote = null;

        if (editName.trim() !== '') dataName = editName.trim();
        if (editPhoneTag.trim() !== '') dataPhoneTag = editPhoneTag.trim();
        if (editExtension.trim() !== '') dataExtension = editExtension.trim();
        if (editRoom.trim() !== '') dataRoom = editRoom.trim();
        if (editNote.trim() !== '') dataNote = editNote.trim();

        const newData = {
            id: id,
            name: dataName,
            phoneTag: dataPhoneTag,
            extension: dataExtension,
            room: dataRoom,
            note: dataNote,
        }
        array.splice(row, 1, newData);

        this.setState({ 
            personData: array,
            editPerson: '',
            editName: '',
            editPhoneTag: '',
            editExtension: '',
            editRoom: '',
            editNote: ''
        });
    }

    returnPersonRow() { this.setState({ editPerson: '' }); }

    handleNewName(event) { this.setState({ newName: event }); }
    handleNewPhoneTag(event) { this.setState({ newPhoneTag: event }); }
    handleNewExtension(event) { this.setState({ newExtension: event }); }
    handleNewRoom(event) { this.setState({ newRoom: event }); }
    handleNewNote(event) { this.setState({ newNote: event }); }

    addPersonRow() {
        const { dbSpread } = this.props;
        const array = this.state.personData, 
            { sheetId, personData, newName, newPhoneTag, newExtension, newRoom, newNote } = this.state;

        let idArray = [],
            dataId = 1,
            dataName = null,
            dataPhoneTag = null,
            dataExtension = null,
            dataRoom = null,
            dataNote = null;

        if (newName.trim() !== '') dataName = newName.trim();
        if (newPhoneTag.trim() !== '') dataPhoneTag = newPhoneTag.trim();
        if (newExtension.trim() !== '') dataExtension = newExtension.trim();
        if (newRoom.trim() !== '') dataRoom = newRoom.trim();
        if (newNote.trim() !== '') dataNote = newNote.trim();

        dbSpread.sheet.forEach(sheet => {
            if (sheet.id === sheetId) {
                sheet.value.personData.forEach(existPer => {
                    if (!idArray.includes(existPer.id)) idArray.push(existPer.id);
                });
                personData.forEach(newPer => {
                    if (!idArray.includes(newPer.id)) idArray.push(newPer.id);
                });
            }
        });

        while (idArray.includes(dataId)) dataId++;

        const newData = {
            id: dataId,
            name: dataName,
            phoneTag: dataPhoneTag,
            extension: dataExtension,
            room: dataRoom,
            note: dataNote,
        }

        console.log(newData);

        array.push(newData);

        this.setState({ 
            personData: array, 
            newName: '',
            newPhoneTag: '',
            newExtension: '',
            newRoom: '',
            newNote: ''
        });
    }

    clearPersonRow() {
        this.setState({
            newName: '',
            newPhoneTag: '',
            newExtension: '',
            newRoom: '',
            newNote: ''
        });
    }

    editMetaRow(row, line, number) {
        this.setState({
            editMeta: row,
            editLine: line,
            editNumber: number
        });
    }

    removeMetaRow(row, id) {
        const display = this.state.metaData;
        const array = this.state.deleteMeta;
        display.splice(row, 1);
        array.push(id);
        this.setState({ 
            metaData: display,
            deleteMeta: array 
        });
    }

    handleEditLine(event) { this.setState({ editLine: event }); }
    handleEditNumber(event) { this.setState({ editNumber: event }); }

    replaceMetaRow(row, id) {
        const array = this.state.metaData, { editLine, editNumber } = this.state;

        let dataLine = null , 
            dataNumber = null;

        if (editLine.trim() !== '') dataLine = editLine.trim();
        if (editNumber.trim() !== '') dataNumber = editNumber.trim();

        const newData = {
            id: id,
            line: dataLine,
            number: dataNumber
        }
        array.splice(row, 1, newData);

        this.setState({ 
            metaData: array,
            editMeta: '',
            editLine: '',
            editNumber: ''
        });
    }

    returnMetaRow() { this.setState({ editMeta: '' }); }

    handleNewLine(event) { this.setState({ newLine: event }); }
    handleNewNumber(event) { this.setState({ newNumber: event }); }

    addMetaRow() {
        const { dbSpread } = this.props;
        const array = this.state.metaData, { sheetId, metaData, newLine, newNumber } = this.state;

        let idArray = [],
            dataId = 1,
            dataLine = null, 
            dataNumber = null;

        if (newLine.trim() !== '') dataLine = newLine.trim();
        if (newNumber.trim() !== '') dataNumber = newNumber.trim();

        dbSpread.sheet.forEach(sheet => {
            if (sheet.id === sheetId) {
                sheet.value.metaData.forEach(existMeta => {
                    if (!idArray.includes(existMeta.id)) idArray.push(existMeta.id);
                });
                metaData.forEach(newMeta => {
                    if (!idArray.includes(newMeta.id)) idArray.push(newMeta.id);
                });
            }
        });

        while (idArray.includes(dataId)) dataId++;

        const newData = {
            id: dataId,
            line: dataLine,
            number: dataNumber
        }

        array.push(newData);

        this.setState({ 
            metaData: array, 
            newLine: '',
            newNumber: ''
        });
    }

    clearMetaRow() {
        this.setState({
            newLine: '',
            newNumber: ''
        });
    }

    checkModification() {

        const { dbSpread } = this.props;
        const { sheetId, title, personData, deletePerson, metaData, deleteMeta } = this.state;
        
        let newSheetArray = [],
            newPersonData = [],
            newMetaData = [],
            oldTitle = '',
            modData = [],
            update = false,
            updateSheet = {
                id: sheetId,
                title: title,
                value: {
                    metaData: newMetaData,
                    personData: newPersonData
                }
            };

        dbSpread.sheet.forEach(sheet => {
            if (sheet.id === sheetId) {
                if (sheet.title !== title) {
                    oldTitle = sheet.title;
                }
                sheet.value.personData.forEach(existPer => {
                    if (deletePerson.includes(existPer.id) && !modData.includes('deleted')) return modData.push('deleted');
                    personData.forEach(updPer => {
                        if (updPer.id === existPer.id) {
                            if (updPer.name !== existPer.name) {
                                update = true;
                            }
                            if (updPer.phoneTag !== existPer.phoneTag) {
                                update = true;
                            }
                            if (updPer.extension !== existPer.extension) {
                                update = true;
                            }
                            if (updPer.room !== existPer.room) {
                                update = true;
                            }
                            if (updPer.note !== existPer.note) {
                                update = true;
                            }
                            if (update) {
                                newPersonData.push(updPer);
                                if (!modData.includes('updated')) modData.push('updated');
                            }
                        }
                    });
                    if (update) {
                        update = false;
                    } else {
                        newPersonData.push(existPer);
                    }
                });
                personData.forEach(newPer => {
                    if (!newPersonData.includes(newPer)) {
                        newPersonData.push(newPer);
                        if (!modData.includes('added')) modData.push('added');
                    }
                });
                sheet.value.metaData.forEach(existMeta => {
                    if (deleteMeta.includes(existMeta.id) && !modData.includes('deleted')) return modData.push('deleted');
                    metaData.forEach(updMeta => {
                        if (updMeta.id === existMeta.id) {
                            if (updMeta.line !== existMeta.line) {
                                update = true;
                            }
                            if (updMeta.number !== existMeta.number) {
                                update = true;
                            }
                            if (update) {
                                newMetaData.push(updMeta);
                                if (!modData.includes('updated')) modData.push('updated');
                            }
                        }
                    });
                    if (update) {
                        update = false;
                    } else {
                        newMetaData.push(existMeta);
                    }
                });
                metaData.forEach(newMeta => {
                    if (!newMetaData.includes(newMeta)) {
                        newMetaData.push(newMeta);
                        if (!modData.includes('added')) modData.push('added');
                    }
                });
                update = true;
            }
            if (update) {
                newSheetArray.push(updateSheet);
                update = false;
            } else {
                newSheetArray.push(sheet);
            }
        });

        if (oldTitle === '' && modData.length === 0) return alert('No modifications were made to CyberDex.');
        this.putSheet(newSheetArray, oldTitle, modData);
    }

    putSheet(sheet, oldTitle, modData) {

        // Access current dbArray.
        const { account, sheetId, postSpread, resetDisplay } = this.props,
            { title } = this.state;
        let newLog = '';
        
        if (account.name === '' || account.name === null) return alert('Account does not have a name.');

        if (oldTitle !== '') {
            newLog = `Replaced current title "${oldTitle}" with "${title}".`
                if (modData.length !== 0) {
                    newLog += '  Account also ';
                    modData.forEach((action, i) => {
                        switch (i) {
                            case 0:
                                if (modData.length === 1) newLog += `${action} content.`;
                                if (modData.length === 2) newLog += `${action} and `;
                                if (modData.length === 3) newLog += `${action}, `;
                                break;
                            case 1:
                                if (modData.length === 2) newLog += `${action} content.`;
                                if (modData.length === 3)newLog += `${action}, `
                                break;
                            default:
                                if (modData.length === 3) newLog += `and ${action} content.`
                                break;
                        }
                    });
                };
        } else {
            newLog += 'Account ';
            modData.forEach((action, i) => {
                switch (i) {
                    case 0:
                        if (modData.length === 1) newLog += `${action} content on ${title}.`;
                        if (modData.length === 2) newLog += `${action} and `;
                        if (modData.length === 3) newLog += `${action}, `;
                        break;
                    case 1:
                        if (modData.length === 2) newLog += `${action} content on ${title}`;
                        if (modData.length === 3)newLog += `${action}, `
                        break;
                    default:
                        if (modData.length === 3) newLog += `and ${action} content on ${title}.`
                        break;
                }
            });
        }

        const newRecord = {
            id: account.id,
            name: account.name,
            log: newLog,
            type: 'modify',
            timestamp: Date()
        }

        // Axios request to post the new id number and data from spreadsheet object.
        axios({

            url: 'http://localhost:3001/api/putSheet',
            method: 'PUT',
            data: {
                id: account.spreadId,
                sheetId: sheetId,
                username: account.username,
                password: account.password,
                sheet: sheet,
                record: newRecord
            }

        }).then((reponse) => {
            console.log(reponse);
            postSpread();
            resetDisplay();
        }).catch((error) => {
            console.log(error);
        });
    }

    render() {

        const {
            sheetId,
            personData,
            editPerson,
            editName,
            editPhoneTag,
            editExtension,
            editRoom,
            editNote,
            newName,
            newPhoneTag,
            newExtension,
            newRoom,
            newNote,
            metaData,
            editMeta, 
            title, 
            editTitle, 
            editLine, 
            editNumber, 
            newLine, 
            newNumber
        } = this.state;

        const { 
            account, 
            data,
            editMode,
            setEditMode,
            resetDisplay
        } = this.props;

        return <div className='sheet'>
            {account !== '' ? (
                <div className='sheet-modify'>
                {account.auth.includes(data.id) || account.auth.includes('full') ? (
                        editMode === '' ? (
                            <Button
                                className='sheet-modify-btn'
                                onClick={() => setEditMode(data.id)}
                            >Edit</Button>
                        ) : (
                            editMode === data.id ? (
                                <>
                                    <Button
                                        className='sheet-modify-btn'
                                        onClick={() => this.checkModification()}
                                    >Save</Button>
                                    <Button
                                        className='sheet-modify-btn'
                                        onClick={() => resetDisplay()}
                                    >Return</Button>
                                </>
                            ) : null 
                        )
                    ) : null }
                </div>
            ) : null }
            <PersonTable 
                editMode={editMode}
                sheetId={sheetId}
                personData={personData}
                title={title}
                editTitle={editTitle}
                editPerson={editPerson}
                editName={editName}
                editPhoneTag={editPhoneTag}
                editExtension={editExtension}
                editRoom={editRoom}
                editNote={editNote}
                newName={newName}
                newPhoneTag={newPhoneTag}
                newExtension={newExtension}
                newRoom={newRoom}
                newNote={newNote}
                editSheetTitle={this.editSheetTitle}
                handleSheetTitle={this.handleSheetTitle}
                replaceSheetTitle={this.replaceSheetTitle}
                editPersonRow={this.editPersonRow}
                removePersonRow={this.removePersonRow}
                handleEditName={this.handleEditName}
                handleEditPhoneTag={this.handleEditPhoneTag}
                handleEditExtension={this.handleEditExtension}
                handleEditRoom={this.handleEditRoom}
                handleEditNote={this.handleEditNote}
                replacePersonRow={this.replacePersonRow}
                returnPersonRow={this.returnPersonRow}
                handleNewName={this.handleNewName}
                handleNewPhoneTag={this.handleNewPhoneTag}
                handleNewExtension={this.handleNewExtension}
                handleNewRoom={this.handleNewRoom}
                handleNewNote={this.handleNewNote}
                addPersonRow={this.addPersonRow}
                clearPersonRow={this.clearPersonRow}
            />
            <MetaTable
                editMode={editMode}
                sheetId={sheetId}
                metaData={metaData}
                editMeta={editMeta}
                editLine={editLine}
                editNumber={editNumber}
                newLine={newLine}
                newNumber={newNumber}
                editSheetTitle={this.editSheetTitle}
                handleSheetTitle={this.handleSheetTitle}
                replaceSheetTitle={this.replaceSheetTitle}
                returnSheetTitle={this.returnSheetTitle}
                editMetaRow={this.editMetaRow}
                removeMetaRow={this.removeMetaRow}
                handleEditLine={this.handleEditLine}
                handleEditNumber={this.handleEditNumber}
                replaceMetaRow={this.replaceMetaRow}
                returnMetaRow={this.returnMetaRow}
                handleNewLine={this.handleNewLine}
                handleNewNumber={this.handleNewNumber}
                addMetaRow={this.addMetaRow}
                clearMetaRow={this.clearMetaRow}
            />
        </div>
    }
}