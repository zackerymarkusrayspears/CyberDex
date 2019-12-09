import React, { Component } from 'react';
import axios from 'axios';
import './AddIndex.css';

export default class AddIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spreadsheetId: '',
            dataArray: [],
        }
    }

    getSpreadsheet = id => {
        // Access current dataArray.
        const { dataArray } = this.state;
        // Bind this as self.
        const self = this;
        // Temporary acces token.
        const accessToken = 'ya29.Il-0B84iKLf-cVS0VzaZItJiWWIAszeG18Ajdo5QeQqzkNzQjp2IKz-50LTwxUEmD3SzFPLAw852Shi36SrZc_sQIO4wSkj0Q4qVIdYTdEYtik9sb5sFjZSQcr9CyRpgZg';

        axios({
            method: 'GET',
            url: `https://sheets.googleapis.com/v4/spreadsheets/${id}`,
            headers: { Authorization: `Bearer ${accessToken}` }   
        }).then((response) => {
            console.log(response);
            // Create a copy of dataArray as newDataArray and Create sheetArray.
            var newDataArray = dataArray, sheetArray = [];
            // Map the array of sheets in the responce and store title values in sheetArray.
            response.data.sheets.map(event => {
                return sheetArray = sheetArray.concat(event.properties.title);
            });
            // Create variable getObject to store response data.
            var getObject = {
                spreadsheetId: id,
                spreadsheetTitle: response.data.properties.title,
                sheet: sheetArray
            };
            // Push getObject to newDataArray.
            newDataArray.push(getObject);
            // Update dataArray with newDataArray.
            self.setState({ 
                dataArray: newDataArray
            });
        }).catch((error) => {
            console.log(error);
        });
    }

    getValues = () => {
        // Access current dataArray.
        const { dataArray } = this.state;
        // Temporary acces token.
        const accessToken = 'ya29.Il-0B84iKLf-cVS0VzaZItJiWWIAszeG18Ajdo5QeQqzkNzQjp2IKz-50LTwxUEmD3SzFPLAw852Shi36SrZc_sQIO4wSkj0Q4qVIdYTdEYtik9sb5sFjZSQcr9CyRpgZg';

        dataArray.forEach(data => {
            for (var i = 0; i < data.sheet.length; i++ ) {
                axios({
                    method: 'GET',
                    url: `https://sheets.googleapis.com/v4/spreadsheets/${data.spreadsheetId}/values/${data.sheet[i]}`,
                    headers: { Authorization: `Bearer ${accessToken}` }   
                }).then((response) => {
                    console.log(response);
                }).catch((error) => {
                    console.log(error);
                });
            }
        });
    }



    addToArray = spreadsheetId => {
        // If spreadsheetId has a value call getData else return
        if (spreadsheetId) {
            this.getSpreadsheet(spreadsheetId);
        } else return
    }

    removeFromArray = i => {
        // Access current dataArray.
        const { dataArray } = this.state;
        // Make a copy of array.
        const newDataArray = dataArray;
        // Splice from the index of the mapped key.
        newDataArray.splice(i, 1);
        // Set New array as the state.
        return this.setState({ dataArray: newDataArray});
    }

    displayArray = () => {
        // Access current dataArray.
        const { dataArray } = this.state;
        // If dataArray has any values map dataArray else return.
        if (dataArray) {
            // Iterate through array.
            return dataArray.map((event, i) => (
                <li key={i}>
                    {/* Button to remove listed item from Array */}
                    <button onClick={() => this.removeFromArray(i)}>X</button>
                    {/* Display data from each event */}
                    <h6>{event.spreadsheetTitle}</h6>
                    <small>{'SpreadsheetID: ' + event.spreadsheetId}</small>
                    <br />
                    <small>{'Sheets: ' + event.sheet}</small>
                </li>
            ));
        } else return
    }

    render() {
        // Access current addId.
        const { addId } = this.state;
        
        return(
            <div className='Index'>
                <label className='Index-addLabel'>Google Sheet:</label>
                <input 
                    id='Index-addText'
                    type='text'
                    placeholder='Enter Spreadsheet-ID'
                    onChange={event => this.setState({ addId: event.target.value })}
                />
                <button
                    className='Index-addBtn'
                    onClick={() => this.addToArray(addId)}
                >Add</button>
                <br />
                <small><em>For Example: https://docs.google.com/spreadsheets/d/<b>Spreadsheet-ID</b>/edit#gid=0</em></small>
                <ol>
                    {this.displayArray()}
                </ol>
                <button
                    onClick={() => this.getValues()}
                >Submit</button>
            </div>
        );
    }
}