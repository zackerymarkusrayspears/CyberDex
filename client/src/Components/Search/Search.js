
import React, { Component } from 'react';
import './Search.css';
import SearchForm from '../SearchForm/SearchForm';
// import axios from 'axios';

// const {API_KEY} = process.env
// const API_URL = '/'

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchInput: '',
        }
    }

    handleInput = event => {
        this.setState({
            searchInput: event.target.value 
        })
        console.log(this.state.searchInput);
    }

    handleSearch = () => {
        const { searchInput } = this.state;

        console.log(searchInput);
    }

    render() {
        const { searchInput } = this.state;
        return(
            <div className='Search'>
                <SearchForm
                    value={searchInput}
                    handleInput={this.handleInput}
                    handleSearch={this.handleSearch}
                />
                <p>{this.state.searchInput}</p>
            </div>
        );
    }

}