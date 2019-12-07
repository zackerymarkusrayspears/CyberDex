import React, { Component } from 'react';
import './Index.css';

export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addId: '',
            addArray: [],
        }
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
        this.setState({ addArray: newArray});
    }

    displayArray = () => {
        // Access current array.
        const { addArray } = this.state;
        // Iterate through array.
        return addArray.map((event, i) => (
            <li key={i}>
                {event}
                {/* Button to remove listed item from Array */}
                <button onClick={() => this.removeFromArray(i)}>X</button>
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
            </div>
        );
    }
}