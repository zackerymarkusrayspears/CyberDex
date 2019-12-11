import React, { Component } from 'react';
import axios from 'axios';
import './AddIndex.css';

export default class AddIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spreadArray: [],
            spreadId: ''
        }
    }

    componentDidMount() {
        this.props.getDataFromDB();
    }

    getSpreadsheet = id => {

        // Access current titleArray, sheetArray, and spreadArray.
        const { spreadArray } = this.state;
        const titleArray = [], sheetArray = [];
        // Create copies of all state arrays.
        var newDataArray = spreadArray;
        // Bind this as self.
        const self = this;
        // Temporary access token.
        const accessToken = 'ya29.Il-0B64VXNeBFahF3nMhLWC-DDVTSsnW5uP4tI3J72wQY470-g1I164zMt2z9PHypoM6da-PI9jQuScWcjHRvMK05-iTKuGBmypvKRGn6nQKvLt1O6XyQaufXplSyrPUyw';

        axios({

            method: 'GET',
            url: `https://sheets.googleapis.com/v4/spreadsheets/${id}`,
            headers: { Authorization: `Bearer ${accessToken}` }

        }).then((response) => {
            console.log(response);
            // For each sheet in the response call getValues with arguments of spreadsheetID, sheet title, and access token.
            for (var index = 0; index < response.data.sheets.length; index++ ) {
                const sheet = response.data.sheets[index], objectArray = [];

                axios({

                    method: 'GET',
                    url: `https://sheets.googleapis.com/v4/spreadsheets/${id}/values/${sheet.properties.title}`,
                    headers: { Authorization: `Bearer ${accessToken}` }

                }).then((response) => {
                    console.log(response);
                    // Call checkValue with arguments of the sheets value array and sheet title.
                    if (self.checkValue(response.data.values)) {
                        // Iterate through array of rows.
                        for (var i = 1; i < response.data.values.length; i++) {
                            var row = response.data.values[i];
                            // Assign values to object.
                            const valObject = {
                                extension: row[0],
                                room: row[1],
                                firstName: row[2],
                                lastName: row[3]
                            }
                            // Push getObject to objectArray for every row.
                            objectArray.push(valObject);
                        }
                        titleArray.push(sheet.properties.title);
                        sheetArray.push({sheet: objectArray});
                    }
                }).catch((error) => {
                    console.log(error);
                });
            }
            // Create variable getObject to store spreadsheet data.
            var spreadObject = {
                spreadsheetId: id,
                spreadsheetTitle: response.data.properties.title,
                sheetTitle: titleArray,
                sheetValue: sheetArray
            };
            // Push getObject to newDataArray.
            newDataArray.push(spreadObject);
            // Update spreadTitleArray with newDataArray.
            self.setState({ 
                spreadArray: newDataArray
            });

        }).catch((error) => {
            console.log(error);
            alert(`Error: SpreadsheetID: ${id} not found.`);
        });
    }

    checkValue = array => {

        // Iterate through array of rows.
        for (var index = 1; index < array.length; index++) {
            var row = array[index];
            // Iterate through array of values.
            for(var i = 0; i < row.length; i++) {
                if (i < 2) { // Number values.
                    const intValue = parseInt(row[i]);
                    // If value isn't a number return false and an alert to the client.
                    if (isNaN(intValue)) {
                        alert(`Error: "${row[i]}" is not a valid number.`);
                        return false;
                    }
                } else { // String values.
                    const regExp = /^[a-z ,.'-]+$/i, strValue = row[i].toLowerCase();
                    const evalString = regExp.test(strValue);
                    // If value isn't a name return false and an alert to the client.
                    if (!evalString) {
                        alert(`Error: "${row[i]}" is not a valid name.`);
                        return false;
                    }
                }
            }
        }
        return true;
    }

    postArray = array => {

        // Access current dbArray.
        const { dbData } = this.props;
        // For each spreadsheet object inside the array.
        array.forEach(spread => {
            // Create an id.
            let idToBeAdded = 0;
            // Map the current dbArray for existing ids.
            let currentIds = dbData.map(data => data.id);
            // While the created id is equal to an existing id, increment the id.
            while (currentIds.includes(idToBeAdded)) {
                idToBeAdded++;
            }
            // Axios request to post the new id number and data from spreadsheet object.

            axios({

                url: 'http://localhost:3001/api/postData',
                method: 'POST',
                data: {
                    id: idToBeAdded,
                    spreadsheetId: spread.spreadsheetId,
                    spreadsheetTitle: spread.spreadsheetTitle,
                    sheetTitle: spread.sheetTitle,
                    sheetValue: spread.sheetValue
                }

            }).then((reponse) => {
                console.log(reponse);
            }).catch((error) => {
                console.log(error);
            });
        });
    }

    addToArray(id) {

        // Access current dbArray.
        const { dbData } = this.props;
        // Create boolean to state if id exist.
        let idNotExist = true;
        // Create function to check if id exist in dbData.
        dbData.map(data => {
            if (id !== data.spreadsheetId) {
                return
            } else {
                alert(`Error: "${data.spreadsheetTitle}" is already added to CyberDex.`)
                return idNotExist = false
            }
        })
        // If id has a value and checkDB returns true, call getData else return.
        if (id && idNotExist) {
            this.getSpreadsheet(id);
        } else return
    }

    removeFromArray(i) {

        // Access current spreadArray.
        const { spreadArray } = this.state;
        // Make a copy of array.
        const newDataArray = spreadArray;
        // Splice from the index of the mapped key.
        newDataArray.splice(i, 1);
        // Set New array as the state.
        this.setState({ spreadArray: newDataArray});
    }

    displayArray = () => {

        // Access current spreadArray.
        const { spreadArray } = this.state;
        // If spreadArray has any values map spreadArray else return.
        if (spreadArray) {
            // Iterate through array.
            return spreadArray.map((event, i) => (
                <li key={i}>
                    {/* Button to remove listed item from Array */}
                    <button onClick={() => this.removeFromArray(i)}>X</button>
                    {/* Display data from each event */}
                    <h6>{event.spreadsheetTitle}</h6>
                    <small>{'SpreadsheetID: ' + event.spreadsheetId}</small>
                    <br />
                    <small>{'Sheets: ' + event.sheetTitle}</small>
                </li>
            ));
        } else return
    }

    render() {

        // Access current spreadId and spreadArray.
        const { spreadId, spreadArray } = this.state;
        // Access getDataFromDB function to keep current dbData fresh.
        const { getDataFromDB } = this.props;
        
        return(
            <div className='Index'>
                <label className='Index-addLabel'>Google Sheet:</label>
                <input 
                    id='Index-addText'
                    type='text'
                    placeholder='Enter Spreadsheet-ID'
                    value={spreadId}
                    onChange={event => {
                        this.setState({ spreadId: event.target.value });
                    }}
                    onKeyPress={event => {
                        if(event.key === 'Enter') {
                            getDataFromDB();
                            this.addToArray(spreadId);
                            this.setState({ spreadId: '' });
                        }
                    }}
                />
                <button
                    className='Index-addBtn'
                    onClick={() => {
                        getDataFromDB();
                        this.addToArray(spreadId);
                        this.setState({ spreadId: '' });
                    }}
                >Add</button>
                <br />
                <small><em>For Example: https://docs.google.com/spreadsheets/d/<b>Spreadsheet-ID</b>/edit#gid=0</em></small>
                <ol>
                    {this.displayArray()}
                </ol>
                <button
                    onClick={() => this.postArray(spreadArray)}
                >Submit</button>
            </div>
        );
    }
}