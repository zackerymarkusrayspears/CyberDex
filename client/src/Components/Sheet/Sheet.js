import React, { Component } from 'react';
import PersonTable from '../PersonTable/PersonTable';
import MetaTable from '../MetaTable/MetaTable';

export default class Sheet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sheetId: this.props.data.id,
            person: this.props.data.person,
            meta: this.props.data.meta,
            idPerson: [],
            idMeta: [],
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
        this.inputError = this.inputError.bind(this);
    }

    editSheetTitle() {
        this.setState({
            editPerson: 'title', 
            editTitle: this.state.title
        });
    }

    handleSheetTitle(event) { this.setState({ editTitle: event }); }

    replaceSheetTitle() {
        const { dbSpread } = this.props,
            { editTitle } = this.state;
        let takenTitle = false;

        dbSpread.sheet.forEach(data => {
            if (data.title === editTitle.trim()) takenTitle = true;
        });
        if (takenTitle) return alert('Title is already being used.');

        this.setState({ 
            title: editTitle.trim(),
            editTitle: '',
            editPerson: ''
        });
    }
    
    editPersonRow(row, person) {
        let personName = '',
            personPhoneTag = '',
            personExtension = '',
            personRoom = '',
            personNote = '';

        if (person.name !== null) personName = person.name;
        if (person.phoneTag !== null) personPhoneTag = person.phoneTag;
        if (person.extension !== null) personExtension = person.extension;
        if (person.room !== null) personRoom = person.room;
        if (person.note !== null) personNote = person.note;

        this.setState({ 
            editPerson: row,
            editName: personName,
            editPhoneTag: personPhoneTag,
            editExtension: personExtension,
            editRoom: personRoom,
            editNote: personNote
        });
    }

    removePersonRow(row, data) {
        const { person, idPerson } = this.state,
            newPerson = person,
            newIdPerson = idPerson;

        if ((typeof data.id) === 'string') {
            newPerson.splice(row, 1);
            newIdPerson.splice(newIdPerson.indexOf(parseInt(data.id.substring(4))), 1);
        } else {
            const nullPerson = {
                id: data.id,
                name: null,
                phoneTag: null,
                extension: null,
                room: null,
                note: null
            }
            newPerson.splice(row, 1, nullPerson);
        }

        this.setState({ 
            person: newPerson,
            idPerson: newIdPerson
        });
    }

    handleEditName(event) { this.setState({ editName: event }); }
    handleEditPhoneTag(event) { this.setState({ editPhoneTag: event }); }
    handleEditExtension(event) { this.setState({ editExtension: event }); }
    handleEditRoom(event) { this.setState({ editRoom: event }); }
    handleEditNote(event) { this.setState({ editNote: event }); }

    replacePersonRow(row, id) {
        const { person, editName, editPhoneTag, editExtension, editRoom, editNote } = this.state,
            newPerson = person;
        let personName = null,
            personPhoneTag = null,
            personExtension = null,
            personRoom = null,
            personNote = null;

        if (editName.trim() !== '') personName = editName.trim();
        if (editPhoneTag.trim() !== '') personPhoneTag = editPhoneTag.trim();
        if (editExtension.trim() !== '') personExtension = editExtension.trim();
        if (editRoom.trim() !== '') personRoom = editRoom.trim();
        if (editNote.trim() !== '') personNote = editNote.trim();

        const newData = {
            id: id,
            name: personName,
            phoneTag: personPhoneTag,
            extension: personExtension,
            room: personRoom,
            note: personNote,
        }
        newPerson.splice(row, 1, newData);

        this.setState({ 
            person: newPerson,
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
        const { person, idPerson, newName, newPhoneTag, newExtension, newRoom, newNote } = this.state,
            newPerson = person,
            newIdPerson = idPerson;
        let newId = 1,
            personName = null,
            personPhoneTag = null,
            personExtension = null,
            personRoom = null,
            personNote = null;

        if (newName.trim() !== '') personName = newName.trim();
        if (newPhoneTag.trim() !== '') personPhoneTag = newPhoneTag.trim();
        if (newExtension.trim() !== '') personExtension = newExtension.trim();
        if (newRoom.trim() !== '') personRoom = newRoom.trim();
        if (newNote.trim() !== '') personNote = newNote.trim();

        while (newIdPerson.includes(newId)) newId++;
        newIdPerson.push(newId);

        const newData = {
            id: `new-${newId}`,
            name: personName,
            phoneTag: personPhoneTag,
            extension: personExtension,
            room: personRoom,
            note: personNote
        }
        newPerson.push(newData);

        newPerson.sort((a, b) => a.name.localeCompare(b.name));

        this.setState({ 
            person: newPerson, 
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

    editMetaRow(row, meta) {
        let metaLine = '',
            metaNumber = '';

        if (meta.line !== null) metaLine = meta.line;
        if (meta.Number !== null) metaNumber = meta.number;

        this.setState({
            editMeta: row,
            editLine: metaLine,
            editNumber: metaNumber
        });
    }

    removeMetaRow(row, data) {
        const { meta, idMeta } = this.state,
            newMeta = meta,
            newIdMeta = idMeta;

        if ((typeof data.id) === 'string') {
            newMeta.splice(row, 1);
            newIdMeta.splice(newIdMeta.indexOf(parseInt(data.id.substring(4))), 1);
        } else {
            const nullMeta = {
                id: data.id,
                line: null,
                number: null
            }
            newMeta.splice(row, 1, nullMeta);
        }

        this.setState({ 
            meta: newMeta,
            idMeta: newIdMeta 
        });
    }

    handleEditLine(event) { this.setState({ editLine: event }); }
    handleEditNumber(event) { this.setState({ editNumber: event }); }

    replaceMetaRow(row, id) {
        const { meta, editLine, editNumber } = this.state;
        let metaLine = null,
            metaNumber = null;

        if (editLine.trim() !== '') metaLine = editLine.trim();
        if (editNumber.trim() !== '') metaNumber = editNumber.trim();

        const newMeta = meta,
            newData = {
            id: id,
            line: metaLine,
            number: metaNumber
        };
        newMeta.splice(row, 1, newData);

        this.setState({ 
            meta: newMeta,
            editMeta: '',
            editLine: '',
            editNumber: ''
        });
    }

    returnMetaRow() { this.setState({ editMeta: '' }); }

    handleNewLine(event) { this.setState({ newLine: event }); }
    handleNewNumber(event) { this.setState({ newNumber: event }); }

    addMetaRow() {
        const { meta, idMeta, newLine, newNumber } = this.state,
            newMeta = meta,
            newIdMeta = idMeta;
        let newId = 1,
            metaLine = null,
            metaNumber = null;

        if (newLine.trim() !== '') metaLine = newLine.trim();
        if (newNumber.trim() !== '') metaNumber = newNumber.trim();

        while (newIdMeta.includes(newId)) newId++;
        newIdMeta.push(newId);

        const newData = {
            id: `new-${newId}`,
            line: metaLine,
            number: metaNumber
        }
        newMeta.push(newData);

        newMeta.sort((a, b) => a.line.localeCompare(b.line));

        this.setState({ 
            meta: newMeta, 
            idMeta: newIdMeta,
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

    inputError(type, value) {
        const {
            editName,
            editPhoneTag,
            editExtension,
            editRoom,
            editNote,
            editLine,
            editNumber,
            newName,
            newPhoneTag,
            newExtension,
            newRoom,
            newNote,
            newLine,
            newNumber
        } = this.state;

        switch (type) {
            case 'title':
                if (value !== '' && value.length > 50) return 'Max 50 Characters.'
                return ''
            case 'small':
                if (value !== '' && value.length > 10) return 'Max 10 Characters.'
                return ''
            case 'note':
                if (value !== '' && value.length > 100) return 'Max 100 Characters.'
                return ''
            case 'editPerson':
                if (editName !== '' && editName.length > 32 && (
                    editPhoneTag !== '' && editPhoneTag.length > 32 ||
                    editExtension !== '' && editExtension.length > 10 ||
                    editRoom !== '' && editRoom.length > 10 ||
                    editNote !== '' && editNote.length > 100
                )) return 'error'
                return ''
            case 'editMeta':
                if (editLine !== '' && editLine.length > 32) return 'Max 32 Characters.'
                if (editNumber !== '' && editNumber.length > 32) return 'Max 32 Characters.'
                return ''
            case 'newPerson':
                if (newName !== '' && newName.length > 32 && (
                    newPhoneTag !== '' && newPhoneTag.length > 32 ||
                    newExtension !== '' && newExtension.length > 10 ||
                    newRoom !== '' && newRoom.length > 10 ||
                    newNote !== '' && newNote.length > 100
                )) return 'error'
                return ''
            case 'newMeta':
                if (newLine !== '' && newLine.length > 32) return 'Max 32 Characters.'
                if (newNumber !== '' && newNumber.length > 32) return 'Max 32 Characters.'
                return ''
            default:
                if (value !== '' && value.length > 32) return 'Max 32 Characters.'
                return ''
        }
    }

    render() {

        const {
            classes,
            account,
            dbSpread,
            putSheet,
            editMode,
            setEditMode,
            resetDisplay
        } = this.props, {
            sheetId,
            person,
            meta,
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
            editMeta, 
            title, 
            editTitle, 
            editLine, 
            editNumber, 
            newLine, 
            newNumber
        } = this.state;

        return <div className={classes.sheet}>
            <PersonTable 
                classes={classes}
                account={account}
                dbSpread={dbSpread}
                putSheet={putSheet}
                setEditMode={setEditMode}
                resetDisplay={resetDisplay}
                editMode={editMode}
                sheetId={sheetId}
                person={person}
                meta={meta}
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
                inputError={this.inputError}
            />
            <MetaTable
                classes={classes}
                editMode={editMode}
                sheetId={sheetId}
                meta={meta}
                editMeta={editMeta}
                editLine={editLine}
                editNumber={editNumber}
                newLine={newLine}
                newNumber={newNumber}
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
                inputError={this.inputError}
            />
        </div>
    }
}