import React, { Component } from 'react';
import './Edit.css';
import Add from '../Add/Add';
import Delete from '../Delete/Delete';

export default class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {

        const { account, dbData, getDataFromDB, usedIds } = this.props;

        return <div className='edit'>
            <Add
                account={account}
                dbData={dbData}
                getDataFromDB={getDataFromDB} 
                usedIds={usedIds}
            />
            <Delete 
                account={account}
                dbData={dbData}
                getDataFromDB={getDataFromDB}
            />
            <div className='edit-help'>
                <div className='edit-help-div'>
                    <h3 className='edit-help-title'>Spreadsheet Titles</h3>
                    <p>Once a spreadsheet is created on <a href='https://www.google.com/sheets/about/'>Google Sheets</a>, give a title the spreadsheet and sheets inside of it.</p>
                    <p>Please refrain from using special characters for the sheet title in Google Sheets.  Special characters will cause errors when retrieving your sheets from your Spreadsheet-ID.  However, once the sheet has been retrieved prompts will pop up allowing you to name your sheets with no restrictions.</p>
                </div>
                <div className='edit-help-div'>
                    <h3 className='edit-help-title'>Spreadsheet Format</h3>
                    <p>The list of lines consist of two columns and extends to row 10(row one is not included). The "A" column consist of titles and "B" of the title's value.</p>
                    <p>Starting on row eleven, the list of people consist of six columns that extends to the end of the sheet(row eleven is not included). The columns values from "A" to "F" consist of phone tags, name, room, extension, phone number, and an additional note. </p>
                </div>
            </div>
        </div>
    }
}