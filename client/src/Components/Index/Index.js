import React, { Component } from 'react';
import axios from 'axios';
import './Index.css';

export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addId: '',
            addArray: [],
            titleArray: [],
            dbArray: [],
        }
    }

    getData = () => {

        // Access current arrays.
        const { addArray } = this.state;
        // Bind this as self.
        const self = this;
        // Temporary acces token.
        const accessToken = 'ya29.Il-0B9OqFcWXBX_ny1ijtOLa7q4LcWRD6Mv9ryNWPp5igFsGryiSlyXk_v9PYt1LLZXMpGNmS43IWVAWoa6tXzkm68RJAPmpLD6lnSLvi_9ZqY-9RfgwT_s2bsyuF-R3YQ';

        // For each SpreadsheetID in the addArray.
        addArray.forEach( id => {
            // Perform a GET on the ID.
            axios({
                method: 'GET',
                url: `https://sheets.googleapis.com/v4/spreadsheets/${id}`,
                headers: { Authorization: `Bearer ${accessToken}` }
        
            }).then((response) => {
                console.log(response);
                // response.data.sheet of sheets.properties.title
                var newArray = [];
                var dbArray = [id];

                response.data.sheets.map(event => {
                    return newArray = newArray.concat(event.properties.title);
                });

                dbArray = dbArray.concat(newArray);
                
                self.setState({ 
                    titleArray: newArray,
                    dbArray: dbArray
                });

            }).catch((error) => {
              console.log(error);
            });

        });
    }

    addToArray = spreadsheetId => {
        // Access current array.
        const { addArray } = this.state;
        // Make new version of array.
        const newArray = addArray.concat(spreadsheetId);
        // Check value of Input.
        if (!spreadsheetId) {
            return
        } else {
            // Set New array as the state.
            this.setState({ addArray: newArray});
        }
    }

    removeFromArray = i => {
        // Access current array.
        const { addArray } = this.state;
        // Make a copy of array.
        const newArray = addArray;
        // Splice from the index of the mapped key.
        newArray.splice(i, 1);
        // Set New array as the state.
        return this.setState({ addArray: newArray});
    }

    displayArray = () => {
        // Access current array.
        const { addArray, titleArray } = this.state;
        // Iterate through array.
        return addArray.map((event, i) => (
            <li key={i}>
                {event}
                {/* Button to remove listed item from Array */}
                <button onClick={() => this.removeFromArray()}>X</button>
                {titleArray.length !== 0 ? <small>{'Sheets: ' + titleArray}</small> : null}
            </li>
        ));
    }

    render() {

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
                    onClick={() => this.getData()}
                >Submit</button>
            </div>
        );
    }
}