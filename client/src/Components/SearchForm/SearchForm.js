import React, { Component } from 'react';
import './SearchForm.css';

export default class SearchForm extends Component {

    addDistricts = array => {

        return array.map((data, i) => {
            return <option key={i} value={i}>
                {data.spreadsheetTitle}
            </option>
        });
    }

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
        const { dbData, district, school, searchInput, changeDistrict, changeSchool, changeInput, handleSearch, defaultInput } = this.props;

        return (
            <form className='SearchForm'>
                <select 
                    className='SearchForm-select'
                    onChange={event => changeDistrict(event)}
                >
                    <option 
                        defaultValue
                        value={''}
                    >District</option>
                    {this.addDistricts(dbData)}
                </select>
                <select 
                    className='SearchForm-select'
                    onChange={event => changeSchool(event)}
                >
                    <option 
                        defaultValue
                        value={''}
                    >School</option>
                    {this.addSchools(dbData[district])}
                </select>
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
                                handleSearch(school, searchInput);
                                defaultInput();
                            }
                        }}
                    />
                    <button 
                        className = "SearchForm-button"
                        onClick={event => {
                            event.preventDefault();
                            handleSearch(school, searchInput);
                            defaultInput();
                        }}
                    >Submit</button>
                </div>
            </form>
        );
    }
}