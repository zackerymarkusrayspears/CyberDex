import React, { Component } from 'react';
import './SearchForm.css';

export default class SearchForm extends Component {

    addSchools = district => {

        if (district !== undefined) {
            return district.sheet.map((data, i) => {
                return <option key={i} value={i}>
                    {data.title}
                </option>
            });
        }
    }

    render() {
        const { searchInput, changeInput, iterateSearch } = this.props;

        return (
            <form className='SearchForm'>
                <div className='SearchForm-searchBar'>
                    <input
                        className='SearchForm-input'
                        type='text'
                        placeholder='Search by Name/Tag/Room/Extension'
                        value={searchInput}
                        onChange={event => changeInput(event)}
                        onKeyPress={event => {
                            if (event.key === 'Enter') {
                                event.preventDefault();
                                iterateSearch();
                            }
                        }}
                    />
                    <button 
                        className = "SearchForm-button"
                        onClick={event => {
                            event.preventDefault();
                            iterateSearch();
                        }}
                    >Submit</button>
                </div>
            </form>
        );
    }
}