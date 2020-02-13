import React, { Component } from 'react';
import gapi from 'gapi-client';
import axios from 'axios';
import { 
    Container,
    Paper,
    TextField,
    Button,
} from '@material-ui/core';
import EditTable from '../EditTable/EditTable';
import SearchIcon from '@material-ui/icons/Search';

export default class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            display: [],
            idSheet: [],
            findHidden: true, 
            spreadId: '',
            googleSheet: [],
            editMode: false,
            spreadTitle: '',
            editSpreadTitle: '',
            editSheet: '',
            editTitle: '',
            newTitle: ''
        }
        this.toggleGoogleSearch = this.toggleGoogleSearch.bind(this);
        this.removeGoogleSheet = this.removeGoogleSheet.bind(this);
        this.mergeSpread = this.mergeSpread.bind(this);
        this.clearGoogle = this.clearGoogle.bind(this);
        this.toggleEditMode = this.toggleEditMode.bind(this);
        this.returnSpread = this.returnSpread.bind(this);
        this.editSpreadTitleRow = this.editSpreadTitleRow.bind(this);
        this.handleSpreadTitle = this.handleSpreadTitle.bind(this);
        this.replaceSpreadTitleRow = this.replaceSpreadTitleRow.bind(this);
        this.removeAllSheet = this.removeAllSheet.bind(this);
        this.editSheetRow = this.editSheetRow.bind(this);
        this.removeSheetRow = this.removeSheetRow.bind(this);
        this.handleEditTitle = this.handleEditTitle.bind(this);
        this.replaceSheetRow = this.replaceSheetRow.bind(this);
        this.returnSheetRow = this.returnSheetRow.bind(this);
        this.handleNewTitle = this.handleNewTitle.bind(this);
        this.addSheetRow = this.addSheetRow.bind(this);
        this.clearSheetRow = this.clearSheetRow.bind(this);
        this.spreadError = this.spreadError.bind(this);
        this.sheetError = this.sheetError.bind(this);
    }

    componentDidMount() {
        this.renderDisplay();
    }

    renderDisplay() {
        const { dbSpread } = this.props,
            array = [];
        dbSpread.sheet.forEach(sheet => array.push(sheet));
        this.setState({ 
            display: array,
            spreadTitle: dbSpread.title
        });
    }

    toggleGoogleSearch() {
        const { findHidden } = this.state;

        gapi.load('v2/auth', () => {
            gapi.client.init({

                discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"],
                clientId: '514027974805-j223jhp0e7h1iu7so91dlthpeupmn0k9.apps.googleusercontent.com',
                scope: 'https://www.googleapis.com/auth/drive.metadata.readonly'

            }).then(response => {
                console.log(response);
            }).catch(error => {
                console.log(error);
            })
        });

        this.setState({ 
            findHidden: !findHidden,
            spreadId: ''
        });
    }

    idError() {
        const { spreadId } = this.state,
            array = spreadId.split('');
        let invalid = false;
        array.forEach(char => {
            if (char === ' ') invalid = true;
        });
        if (invalid) return 'Invalid Characters.'
        return `For Example: https://docs.google.com/spreadsheets/d/${<b>Spreadsheet-ID</b>}/edit#gid=0`
    }

    checkValue = (value) => {
        if (value === undefined || value === "") return null
        return value.trim();
    }

    getGoogleSpread() {

        const { spreadId, idSheet } = this.state,
            sheetArray = [],
            newIdSheet = idSheet,
            self = this,
            accessToken = prompt('What is the password?');
        let setState = false,
            newId = 1;

        axios({

            method: 'GET',
            url: `https://sheets.googleapis.com/v4/spreadsheets/${spreadId}`,
            headers: { Authorization: `Bearer ${accessToken}` }

        }).then((res) => {

            // For each sheet in spreadsheet.
            res.data.sheets.forEach((sheet, index) => {
                const title = sheet.properties.title,
                    personArray = [],
                    metaArray = [];
                
                
                // Find sheet values.
                axios({
                    method: 'GET',
                    url: `https://sheets.googleapis.com/v4/spreadsheets/${spreadId}/values/${title}`,
                    headers: { Authorization: `Bearer ${accessToken}` }
                }).then(response => {

                    // Organize sheet data.
                    response.data.values.forEach((data, i) => {
                        if (i === 0 || i === 10 || data.length === 0) return
                        if (i > 10) {
                            const personObject = {
                                id: i - 10,
                                name: self.checkValue(data[0]),
                                phoneTag: self.checkValue(data[1]),
                                extension: self.checkValue(data[2]),
                                room: self.checkValue(data[3]),
                                note: self.checkValue(data[4])
                            }
                            personArray.push(personObject);

                        } else {
                            const metaObject = {
                                id: i + 1,
                                line: self.checkValue(data[0]),
                                number: self.checkValue(data[1])
                            }
                            metaArray.push(metaObject);
                        }
                        if (i !== response.data.values.length - 1) return
                        // Push sheet and ID used.
                        while (newIdSheet.includes(newId)) newId++;
                        newIdSheet.push(newId);
                        personArray.sort((a, b) => a.name.localeCompare(b.name));
                        metaArray.sort((a, b) => a.line.localeCompare(b.line));
                        sheetArray.push({
                            id: `new-${newId}`,
                            title: title,
                            person: personArray,
                            meta: metaArray
                        });
                        if (index === res.data.sheets.length - 1) setState = true;
                    });

                    // Set state of data object.
                    if (!setState) return
                    sheetArray.sort((a, b) => a.title.localeCompare(b.title));
                    self.setState({ 
                        idSheet: newIdSheet,
                        googleSheet: sheetArray
                    });
                }).catch(error => {
                    console.log(error);
                    alert('Sheet not found.');
                });
            });
        }).catch(err => {
            console.log(err);
            alert('Incorrect password.')
        });
    }

    removeGoogleSheet(row) {
        const { googleSheet } = this.state,
            sheet = googleSheet;

        sheet.splice(row, 1);

        this.setState({ googleSheet: sheet });
    }

    mergeSpread() {
        const { putSheet } = this.props,
            { display, googleSheet, spreadTitle } = this.state,
            array = display;

        googleSheet.forEach(sheet => array.push(sheet));
        putSheet(spreadTitle, array);

        this.setState({
            display: array,
            spreadId: '',
            googleSheet: [],
        });
    }

    clearGoogle() {
        this.setState({
            spreadId: '',
            googleSheet: []
        });
    }

    toggleEditMode() { 
        this.setState({ 
            findHidden: true,
            spreadId: '',
            editMode: true 
        }); 
    }

    returnSpread() {
        this.setState({ editMode: false });
        this.renderDisplay();
    }

    editSpreadTitleRow() {
        this.setState({
            editSheet: 'title',
            editSpreadTitle: this.state.spreadTitle,
        })
    }
    
    handleSpreadTitle(event) { this.setState({ editSpreadTitle: event }) }

    replaceSpreadTitleRow() {
        this.setState({ 
            spreadTitle: this.state.editSpreadTitle.trim(),
            editSheet: ''
        });
    }

    removeAllSheet() { 
        this.setState({ 
            display: [],
            idSheet: [] 
        }); 
    }

    editSheetRow(id, sheet) {
        let sheetTitle = '';

        if (sheet.title !== '') sheetTitle = sheet.title;
        
        this.setState({
            editSheet: id,
            editTitle: sheetTitle
        });
    }

    removeSheetRow(row, id) {
        const { display, idSheet } = this.state,
            array = display,
            newIdSheet = idSheet;

        if ((typeof id) === 'string') newIdSheet.splice(newIdSheet.indexOf(parseInt(id.substring(4))), 1);
        array.splice(row, 1);

        this.setState({ 
            display: array,
            idSheet: newIdSheet
        });
    }

    handleEditTitle(event) { this.setState({ editTitle: event }); }

    replaceSheetRow(row, sheet) {
        const { display, editTitle } = this.state,
            array = display;
        let takenTitle = false,
            sheetTitle = null;

        array.forEach(data => {
            if (data.id === sheet.id) return
            if (data.title === editTitle.trim()) takenTitle = true;
        });
        if (takenTitle) return alert('Title is already being used.');

        if (editTitle.trim() !== '') sheetTitle = editTitle.trim();

        const newSheet = {
            id: sheet.id,
            title: sheetTitle,
            person: sheet.person,
            meta: sheet.meta
        };
        array.splice(row, 1, newSheet);

        this.setState({ 
            display: array,
            editSheet: ''
        });
    }

    returnSheetRow() { this.setState({ editSheet: '' }); }

    handleNewTitle(event) { this.setState({ newTitle: event }); }

    addSheetRow() {
        const { display, idSheet, newTitle } = this.state,
            array = display,
            newIdSheet = idSheet;
        let titleTaken = false,
            newId = 1,
            sheetTitle = null;

        array.forEach(sheet => {
            if (sheet.title === newTitle.trim()) titleTaken = true;
        });
        if (titleTaken) return alert('Title is already being used.');

        if (newTitle.trim() !== '') sheetTitle = newTitle.trim();

        while (newIdSheet.includes(newId)) newId++;
        newIdSheet.push(newId);

        const newSheet = {
            id: `new-${newId}`,
            title: sheetTitle,
            person: [],
            meta: []
        };
        array.push(newSheet);

        array.sort((a, b) => a.title.localeCompare(b.title));

        this.setState({
            display: array,
            idSheet: newIdSheet,
            newTitle: ''
        })
    }

    clearSheetRow() { this.setState({ newTitle: '' }); }

    spreadError() {
        const { editSpreadTitle } = this.state;
        if (editSpreadTitle !== '' && editSpreadTitle.length > 49) return 'Max 50 Characters.'
        return ''
    }

    sheetError(value) {
        if (value !== '' & value.length > 32) return 'Max 32 Characters.'
        return ''
    }

    render() {

        const { 
            classes,
            account, 
            dbSpread, 
            putSheet 
        } = this.props, { 
            display, 
            findHidden,
            editMode, 
            spreadId, 
            googleSheet,
            editSheet,
            spreadTitle,
            editSpreadTitle,
            editTitle,
            newTitle
        } = this.state;

        return <div className={classes.route}>
            {!findHidden ? (
                <Container 
                    className={classes.container}
                    style={{ marginBottom: '25px' }}
                >
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
                        label='Spreadsheet-ID'
                        value={spreadId}
                        onChange={event => {
                            this.setState({ spreadId: event.target.value });
                        }}
                        error={this.idError() === 'Invalid Characters.'}
                        helperText={this.idError()}
                        variant='outlined'
                        onKeyPress={event => {
                            if (spreadId === '' || this.idError() === 'Invalid Characters.') return
                            if(event.key === 'Enter') {
                                event.preventDefault();
                                this.getGoogleSpread();
                                this.setState({ editMode: false });
                            }
                        }}
                    />
                    <Button
                        className={classes.searchBtn}
                        style={{ height: '56px' }}
                        onClick={() => {
                            if (spreadId === '' || this.idError() === 'Invalid Characters.') return
                            this.getGoogleSpread();
                            this.setState({ editMode: false });
                        }}
                    >
                        <SearchIcon/>
                    </Button>
                </Container>
            ) : null }
            <EditTable
                classes={classes}
                account={account}
                dbSpread={dbSpread}
                display={display}
                putSheet={putSheet}
                googleSheet={googleSheet}
                editMode={editMode}
                editSheet={editSheet}
                spreadTitle={spreadTitle}
                editSpreadTitle={editSpreadTitle}
                editTitle={editTitle}
                newTitle={newTitle}
                toggleGoogleSearch={this.toggleGoogleSearch}
                removeGoogleSheet={this.removeGoogleSheet}
                mergeSpread={this.mergeSpread}
                clearGoogle={this.clearGoogle}
                toggleEditMode={this.toggleEditMode}
                returnSpread={this.returnSpread}
                editSpreadTitleRow={this.editSpreadTitleRow}
                handleSpreadTitle={this.handleSpreadTitle}
                replaceSpreadTitleRow={this.replaceSpreadTitleRow}
                removeAllSheet={this.removeAllSheet}
                editSheetRow={this.editSheetRow}
                removeSheetRow={this.removeSheetRow}
                handleEditTitle={this.handleEditTitle}
                replaceSheetRow={this.replaceSheetRow}
                returnSheetRow={this.returnSheetRow}
                handleNewTitle={this.handleNewTitle}
                addSheetRow={this.addSheetRow}
                clearSheetRow={this.clearSheetRow}
                spreadError={this.spreadError}
                sheetError={this.sheetError}
            />
            {!findHidden ? (
                <Container className={classes.help}>
                    <Paper className={classes.helpPage}>
                        <h3>Spreadsheet Titles</h3>
                        <p>Once a spreadsheet is created on <a href='https://www.google.com/sheets/about/'>Google Sheets</a>, give a title the spreadsheet and sheets inside of it.</p>
                        <p>Please refrain from using special characters for the sheet title in Google Sheets.  Special characters will cause errors when retrieving your sheets from your Spreadsheet-ID.  However, once the sheet has been retrieved prompts will pop up allowing you to name your sheets with no restrictions.</p>
                    </Paper>
                    <Paper className={classes.helpPage}>
                        <h3>Spreadsheet Format</h3>
                        <p>The list of lines consist of two columns and extends to row 10(row one is not included). The "A" column consist of titles and "B" of the title's value.</p>
                        <p>Starting on row eleven, the list of people consist of six columns that extends to the end of the sheet(row eleven is not included). The columns values from "A" to "F" consist of phone tags, name, room, extension, phone number, and an additional note. </p>
                    </Paper>
                </Container>
            ) : null }
        </div>
    }
}