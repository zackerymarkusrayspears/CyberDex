import React, { Component } from 'react';
import './SearchForm.css';

export default class SearchForm extends Component {

    render() {
        const { value, handleInput, handleSearch } = this.props;

        return(
            <form className='SearchForm'>
                <label>District:
                    <select>
                        <option 
                            selected
                            value={''}
                        >Select</option>
                        <option 
                            value={'barrenCounty'}
                        >Barren County</option>
                    </select>
                </label>
                <label>School:
                    <select>
                        <option 
                            selected
                            value={''}
                        >Select</option>
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
                </label>
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