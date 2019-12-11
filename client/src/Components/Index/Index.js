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
                    <nav>
                        <ul>
                            <li>
                                <Link to='/index/add'>Add</Link>
                            </li>
                            <li>
                                <Link to='/index/delete'>Delete</Link>
                            </li>
                        </ul>
                    </nav>
                    <Switch>
                        <Route path='/index/add'>
                            <AddIndex getDataFromDB={getDataFromDB} dbData={dbData} />
                        </Route>
                        <Route path='/index/delete'>
                            <DeleteIndex getDataFromDB={getDataFromDB} dbData={dbData} />
                        </Route>
                    </Switch>
                </Router>
            </div>
        );
    }
}