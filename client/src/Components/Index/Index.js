import React, { Component } from 'react';
import './Index.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import AddIndex from '../AddIndex/AddIndex';
import DeleteIndex from '../DeleteIndex/DeleteIndex';

export default class Index extends Component {

    render() {
        const { getDataFromDB, dbData } = this.props;
        return(
            <div className='Index'>
                <Router>
                    <nav className='Index-navBar'>
                        <ul className='Index-navList'>
                            <li className='Index-navItem'>
                                <Link className='Index-link' to='/index'>Add</Link>
                            </li>
                            <li className='Index-navItem'>
                                <Link className='Index-link' to='/index/delete'>Delete</Link>
                            </li>
                        </ul>
                    </nav>
                    <Switch>
                        <Route exact path='/index'>
                            <AddIndex getDataFromDB={getDataFromDB} dbData={dbData} />
                        </Route>
                        <Route path='/index/delete'>
                            <DeleteIndex getDataFromDB={getDataFromDB} dbData={dbData} />
                        </Route>
                    </Switch>
                </Router>
                <div className='Index-help'>
                    <div className='Index-helpDiv'>
                        <h3 className='Index-helpTitle'>Spreadsheet Titles</h3>
                        <p className='Index-helpContent'>Once a spreadsheet is created on <a href='https://www.google.com/sheets/about/'>Google Sheets</a>, give a title the spreadsheet and sheets inside of it.</p>
                        <p className='Index-helpContent'>Please refrain from using special characters for the sheet title in Google Sheets.  Special characters will cause errors when retrieving your sheets from your Spreadsheet-ID.  However, once the sheet has been retrieved prompts will pop up allowing you to name your sheets with no restrictions.</p>
                    </div>
                    <div className='Index-helpDiv'>
                        <h3 className='Index-helpTitle'>Spreadsheet Format</h3>
                        <p className='Index-helpContent'>The list of lines consist of two columns and extends to row 10(row one is not included). The "A" column consist of titles and "B" of the title's value.</p>
                        <p className='Index-helpContent'>Starting on row eleven, the list of people consist of six columns that extends to the end of the sheet(row eleven is not included). The columns values from "A" to "F" consist of phone tags, name, room, extension, phone number, and an additional note. </p>
                    </div>
                </div>
            </div>
        );
    }
}