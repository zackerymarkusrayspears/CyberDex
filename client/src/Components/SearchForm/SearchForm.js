import React, { Component } from 'react';
import './SearchForm.css';

export default class SearchForm extends Component {

    render() {
        const { value, handleInput, handleSearch } = this.props;

        return(
            <form className='SearchForm'>
                <input  
                    className='SearchForm-input' 
                    type='text' 
                    placeholder='Search For Teacher..'
                    value={value}
                    onChange={event => handleInput(event)}
                />
                <button 
                    className = "SearchForm-button"
                    onClick={() => handleSearch()}
                >Submit</button>
            </form>
        );
    } 
}