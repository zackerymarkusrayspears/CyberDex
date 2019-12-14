import React, { Component } from 'react';
import './DeleteIndex.css';
import axios from 'axios';

export default class DeleteIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spreadArray: [],
        }
    }

    deleteFromDbData(array) {

        const { getDataFromDB } = this.props;

        array.forEach(value => {

            axios({

                method: 'DELETE',
                url: 'http://localhost:3001/api/deleteData',
                data: { id: value }

            }).then((response) => {
                console.log(response);
            }).catch((error) => {
                console.log(error);
                getDataFromDB();
            });
        });
    }

    checkArray = index => {

        // Access current spreadArray.
        const { spreadArray } = this.state;
        // Create a let to hold a boolean value.
        let notInArray = true;
        // For each value in spreadArray, compare it to the id argument. If it is equal change idInArray to true.
        spreadArray.forEach(value => {
            if (index === value) {
                notInArray = false;
            }
        })
        // Return value of idInArray.
        return notInArray;
    }

    addToArray(index) {

        // Access current spreadArray.
        const { spreadArray } = this.state;
        // Make a copy of spreadArray.
        const newArray = spreadArray;
        // Push id into newArray.
        newArray.push(index);
        // Set state of spreadArray as new state.
        this.setState({spreadArray: newArray});
        console.log(spreadArray);
    }

    removeFromArray(index) {

        // Access current spreadArray.
        const { spreadArray } = this.state;
        // Make a copy of array.
        const newArray = spreadArray;
        // Map values inside spreadArray. If id is equal to map splice newArray at the maps index.
        spreadArray.map((value, i) => {
            if (index === value) {
                newArray.splice(i, 1);
            }
        });
        // Set New array as the state.
        this.setState({ spreadArray: newArray });
        console.log(spreadArray);
    }

    displayArray = () => {

        // Access current spreadArray.
        const { dbData } = this.props;
        // Return a listed item for each object inside the current dbData array.
        return dbData.map((data, index) => {
            return <li key={index} className='DeleteIndex-ordItem'>
                {/* Button to add item listed to spreadArray. */}
                <button 
                className='DeleteIndex-removeBtn'
                    onClick={() => {
                        if (this.checkArray(index)) {
                            this.addToArray(index)
                        } else { 
                            this.removeFromArray(index)
                        }
                    }}>Remove</button>
                {/* Display data from each event. */}
                <h3 className='DeleteIndex-spreadTitle'>{data.spreadsheetTitle}</h3>
                <h6 className='DeleteIndex-sheets'>Sheets:</h6>
                <ul className='DeleteIndex-sheetList'>
                    {/* Return a listed item for each object inside the sheet array of data. */}
                    {data.sheet.map((sheet, i) => {
                        return <li key={i} className='DeleteIndex-unordItem'>
                            <small className='DeleteIndex-sheetTitle'>{sheet.title}</small>
                        </li>
                    })}
                </ul>
            </li>
        });
    }

    render() {

        const { spreadArray } = this.state;

        return(
            <div className='DeleteIndex'>
                <h3 className='DeleteIndex-summary'>Select Spreadsheet(s) to Remove:</h3>
                <ol className='DeleteIndex-spreadList'>
                    {this.displayArray()}
                </ol>
                <button
                    className='DeleteIndex-submitBtn'
                    onClick={() => this.deleteFromDbData(spreadArray)}
                >Submit</button>
            </div>

        );
    }
}