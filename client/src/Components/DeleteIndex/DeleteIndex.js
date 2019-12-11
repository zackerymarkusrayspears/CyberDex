import React, { Component } from 'react';
import './DeleteIndex.css';

export default class DeleteIndex extends Component {

    displayDB() {


    }

    render() {

        const { dbData } = this.props;

        return(
            <div className='DeleteIndex'>
                <h3>Select Spreadsheet(s) to Remove:</h3>
                <ol>
                    {dbData.map((data, i) => {
                        return (
                            <li key={i}>
                                {/* Button to add item listed to deleteArray */}
                                <button onClick={() => {
                                    this.addToArray(i)
                                }}>X</button>
                                {/* Display data from each event */}
                                <h6>{data.spreadsheetTitle}</h6>
                                <small>{'SpreadsheetID: ' + data.spreadsheetId}</small>
                                <br />
                                <small>{'Sheets: ' + data.sheetTitle}</small>
                            </li>
                        );
                    })}
                </ol>
            </div>

        );
    }
}