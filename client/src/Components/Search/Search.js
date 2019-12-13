import React, { Component } from 'react';
import './Search.css';
import SearchForm from '../SearchForm/SearchForm';
import List from '../List/List';

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            district: '',
            school: '',
            searchInput: '',
            display: []
        }
    }

    defaultInput = () => {

        this.setState({
            searchInput: ''
        });
    }

    changeDistrict = event => {

        this.setState({
            district: event.target.value
        });
    }

    changeSchool = event => {
        const { district } = this.state, { dbData } = this.props;
        const newSchool = dbData[district].sheet[event.target.value];

        this.setState({
            school: newSchool
        });
    }

    changeInput = event => {
        this.setState({
            searchInput: event.target.value 
        });
    }

    handleSearch = (school, name) => {

        const newDisplay = [], newList = [];

        if (school === undefined || school === '' ) {
            return alert('Error: District or School is not defined.');
        }

        if (name !== '') { // Search for single return.
            // For ever person in personData
            for (var i = 0; i < school.value.personData.length; i++) {
                var person = school.value.personData[i];
                console.log(person.name);
                // If name matches the person.
                if (person.name === name) {
                    // Push person to newList
                    newList.push(person);
                    // Create an object to hold new data.
                    var newObject = {
                        title: school.title,
                        metaList: school.value.metaData,
                        personList: newList
                    }
                    // Push newObject to newDisplay
                    newDisplay.push(newObject);
                    // Set display as neDisplay.
                    return this.setState({display: newDisplay})
                } else if (i === school.value.personData.length) {
                    return alert('Error: Name is not in sheet.');
                }
            }
        } else { // Search for All
            // For ever person in personData
            for (var i = 0; i < school.value.personData.length; i++) {
                var person = school.value.personData[i];
                // Push person to newList
                newList.push(person);
            }
            // Create an object to hold new data.
            var newObject = {
                title: school.title,
                metaList: school.value.metaData,
                personList: newList
            }
            // Push newObject to newDisplay
            newDisplay.push(newObject);
            // Set display as neDisplay.
            this.setState({display: newDisplay})
        }
    }


    render() {

        const { district, school, searchInput, display } = this.state;
        const{ dbData } = this.props;

        return(
            <div className='Search'>
                <SearchForm
                    dbData={dbData}
                    district={district}
                    school={school}
                    searchInput={searchInput}
                    changeDistrict={this.changeDistrict}
                    changeSchool={this.changeSchool}
                    changeInput={this.changeInput}
                    handleSearch={this.handleSearch}
                    defaultInput={this.defaultInput}
                />
                <List display={display}/>
            </div>
        );
    }

}