import React, { Component } from 'react';
import axios from 'axios';
import './Add.css';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import { 
    TextField,
    Button
} from '@material-ui/core';

export default class Add extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spreadId: '',
            existingData: false,
            getSheet: ''
        }
    }

    addGoogleSheet = () => {

        const { dbData } = this.props;

        let data = false;

        // Check if any id exists in dbData.
        if (dbData.sheet.length !== 0) {
            data = true;
            this.setState({ existingData: true });
        }

        if (!data) {
            this.getSheet();
        } else {
            let warning = prompt("Would you like to replace your current CyberDex's Sheet(s) with Google Sheets? (Yes/No)");
            if (warning === '' || warning === null || warning.toLowerCase().trim() !== 'yes') {
                this.setState({ existingData: false });
                return
            } else this.getSheet();
        }
    }

    getSheet = id => {

        const { spreadId } = this.state;
        // Bind this as self.
        const self = this;
        const sheetArray = []

        // Temporary access token.
        const accessToken = 'ya29.Il-6B9TvG3EWECUwLhAAStEovY9hPBhqNUzRuicXK7rMF3KYiNo2EtQE-pDwPR2iaBcECqFYm5fTHGvnvFZ46CZMXidrt18NRJFHBW2KvWeUQsVvCTrwgLx-OVd3iHl8yA';

        axios({

            method: 'GET',
            url: `https://sheets.googleapis.com/v4/spreadsheets/${spreadId}`,
            headers: { Authorization: `Bearer ${accessToken}` }

        }).then((response) => {
            console.log(response);
            // For each sheet in the response call getValues with arguments of spreadsheetID, sheet title, and access token.
            for (var index = 0; index < response.data.sheets.length; index++ ) {
                const sheet = response.data.sheets[index], title = sheet.properties.title, metaArray = [], personArray = [];

                var sheetsLength = response.data.sheets.length,
                    spreadTitle = response.data.properties.title;
                
                axios({

                    method: 'GET',
                    url: `https://sheets.googleapis.com/v4/spreadsheets/${spreadId}/values/${title}`,
                    headers: { Authorization: `Bearer ${accessToken}` }

                }).then((response) => {
                    console.log(response);

                    // Iterate through array of rows 2 - 10.
                    for (let i = 1; i < 9; i++) {
                        let metaData = response.data.values[i];
                        if (metaData.length !== 0) {
                            // Create an id.
                            let metaId = i;
                            // Assign values to metaObject with metaData values.
                            const metaObject = {
                                id: metaId,
                                line: self.checkValue(metaData[0]),
                                number: self.checkValue(metaData[1])
                            }
                            // Push metaObject to metaArray.
                            metaArray.push(metaObject);
                        }
                    }
                    // Iterate through array of rows 12 - array length.
                    for (let i = 11; i < response.data.values.length; i++) {
                        let personData = response.data.values[i];
                        // Create an id.
                        let personId = i - 10;
                        // Assign values to personObject with personData values.
                        const personObject = {
                            id: personId,
                            name: self.checkValue(personData[0]),
                            phoneTag: self.checkValue(personData[1]),
                            extension: self.checkValue(personData[2]),
                            room: self.checkValue(personData[3]),
                            note: self.checkValue(personData[4])
                        }
                        // Push personObject to personArray for every row.
                        personArray.push(personObject);
                    }
                    // Create an id.
                    let sheetId = 1;
                    // Map the current sheetArray for existing ids.
                    let currentIds = sheetArray.map(data => data.id);
                    // While the created id is equal to an existing id, increment the id.
                    while (currentIds.includes(sheetId)) {
                        sheetId++;
                    }

                    // Push sheet's title, metaArray and personArray as an object into sheetArray.
                    sheetArray.push({
                        id: sheetId,
                        title: title,
                        value: {
                            metaData: metaArray,
                            personData: personArray
                        }
                    });

                    if (index === sheetsLength) {

                        // Create variable getObject to store spreadsheet data.
                        var spreadObject = {
                            title: spreadTitle,
                            sheet: sheetArray
                        };

                        // Update spreadTitleArray with newDataArray.
                        self.setState({
                            spreadId: '',
                            getSheet: spreadObject 
                        });

                        console.log(spreadObject);
                    }
                }).catch((error) => {
                    console.log(error);
                    alert(`Error: Sheet ${title} not found.`);
                });
            }

        }).catch((error) => {
            console.log(error);
            alert(`Error: SpreadsheetID: ${id} not found.`);
            this.setState({ existingData: false });
        });
    }

    checkValue = (value) => {

        // If row has a value.
        if (value === undefined || value === "") {
            return null
        } else {
            return value.trim();
        }
    }

    displaySheet = () => {

        // Access current spreadArray.
        const { getSheet } = this.state;
        // If spreadArray has any values map spreadArray else return.
        if (getSheet !== '') {
            console.log(getSheet);
            return <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell colSpan={2}>Spreadsheet</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>{getSheet.title}</TableCell>
                            <TableCell align='right'>
                                <Button 
                                    onClick={() => {
                                        this.setState({ getSheet: '' });
                                    }}
                                >X</Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        } else return
        
    }

    addSheet() {

        // Access current dbArray.
        const { account, usedIds, dbData, getDataFromDB } = this.props,
            { existingData, getSheet } = this.state,
            recordArray = dbData.record;
            
        let newLog = '';

        if (existingData) {
            newLog = `Replaced ${dbData.title} with ${getSheet.title}.`
        } else {
            newLog = `Added ${getSheet.title}.`
        }

        if (account.name === '') return alert('Account does not have a name.');

        const newRecord = {
            id: account.id,
            name: account.name,
            log: newLog,
            type: 'add',
            timestamp: Date()
        }

        recordArray.unshift(newRecord);

        // Create an id.
        let idToBeAdded = 1;
        // While the created id is equal to an existing id, increment the id.
        while (usedIds.includes(idToBeAdded)) {
            idToBeAdded++;
        }

        // Axios request to post the new id number and data from spreadsheet object.
        axios({

            url: 'http://localhost:3001/api/updateData',
            method: 'PUT',
            data: {
                id: dbData.id,
                title: getSheet.title,
                sheet: getSheet.sheet,
                account: dbData.account,
                record: recordArray
            }

        }).then((reponse) => {
            console.log(reponse);
            this.setState({
                spreadId: '',
                existingData: false,
                getSheet: ''
            });
            getDataFromDB();
        }).catch((error) => {
            console.log(error);
        });
    }

    render() {

        const { dbData } = this.props;
        const { spreadId, getSheet } = this.state;
        
        return(
            <div className='add'>
                <div className='add-inputs'>
                    <TextField 
                        value={spreadId}
                        onChange={event => {
                            this.setState({ spreadId: event.target.value });
                        }}
                        label='Spreadsheet-ID'
                        onKeyPress={event => {
                            if(event.key === 'Enter') {
                                event.preventDefault();
                                this.addGoogleSheet();
                            }
                        }}
                    />
                    {dbData.sheet.length > 0 ? (
                        <Button
                            onClick={event => {
                                event.preventDefault();
                                this.addGoogleSheet();
                            }}
                        >Replace</Button>
                    ) : (
                        <Button
                            onClick={event => {
                                event.preventDefault();
                                this.addGoogleSheet();
                            }}
                        >Add</Button>
                    )}
                </div>
                <p className='add-example'>For Example: https://docs.google.com/spreadsheets/d/<b>Spreadsheet-ID</b>/edit#gid=0</p>
                {getSheet !== '' ? (
                    <Button
                        onClick={() => this.addSheet()}
                    >Submit</Button>
                ) : (
                    ''
                )}
                {this.displaySheet()}
            </div>
        );
    }
}