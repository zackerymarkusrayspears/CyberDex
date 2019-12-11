import React, { Component } from 'react';
import './SearchForm.css';

export default class SearchForm extends Component {

    render() {
        const { value, handleInput, handleSearch } = this.props;

        return(
            <form className='SearchForm'>
                <div className='SearchForm-selectGrid'>
                    <select className='SearchForm-select'>
                        <option 
                            selected
                            value={''}
                        >District</option>
                        <option 
                            value={'barrenCounty'}
                        >Barren County</option>
                    </select>
                    <select className='SearchForm-select'>
                        <option 
                            selected
                            value={''}
                        >School</option>
                        <option 
                            value={'redCross'}
                        >Red Cross Elementary </option>
                        <option 
                            value={'templeHill'}
                        >Temple Hill Elementary </option>
                        <option 
                            value={'parkCity'}
                        >Park City Elementary </option>
                        <option 
                            value={'northJackson'}
                        >North Jackson Elementary</option>
                        <option 
                            value={'hiseville'}
                        >Hiseville Elementary</option>
                        <option 
                            value={'austinTracy'}
                        >Austin Tracy Elementary</option>
                        <option 
                            value={'barrenMiddle'}
                        >Barren County Middle School</option>
                        <option 
                            value={'trojanAcademy'}
                        >Trojan Academy</option>
                        <option 
                            value={'barrenHigh'}
                        >Barren County High School</option>
                    </select>
                </div>
                <input  
                    className='SearchForm-input' 
                    type='text' 
                    placeholder='Search For Teacher..'
                    value={value}
                    onChange={event => handleInput(event)}
                    onKeyPress={event => {
                        if (event.key === 'Enter') {
                            handleSearch();
                        }
                    }}
                />
                <button 
                    className = "SearchForm-button"
                    onClick={() => handleSearch()}
                >Submit</button>
            </form>
        );
    } 
}