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
            display: [],
            singleResult: false
        }
    }

    changeDistrict = event => {

        this.setState({
            district: event.target.value,
            school: '',
            searchInput: '',
            display: []
        });
    }

    changeSchool = event => {

        const { district } = this.state, { dbData } = this.props;
        const newSchool = dbData[district].sheet[event.target.value];

        this.setState({
            school: newSchool,
            searchInput: ''
        });

        if (newSchool === undefined) {
            return this.setState({
                display: []
            })
        }

        this.handleSearch(newSchool, '');
    }

    changeInput = event => {
        this.setState({
            searchInput: event.target.value 
        });
    }

    handleSearch = (school, value) => {

        if (school === undefined || school === '') return;
        // Create new arrays for display state.
        const newDisplay = [], newList = [], input = value.trim().toLowerCase();
        let inArray = false;
        // Make and array of words from the input that is lowercased and removes any whitespaces on the ends.
        var newObject = {
            title: school.title,
            metaList: school.value.metaData,
            personList: newList
        }
        if (value !== '') { // Search for single return.

            // For ever person in personData
            for (var i = 0; i < school.value.personData.length; i++) {
                var person = school.value.personData[i];
                // Reset inArray as false.
                inArray = false;
                // If their is a value for Person's values set words to lowercase and inside and array.
                if (person.name !== null) {
                    let nameArray = person.name.toLowerCase().split(' ');
                    nameArray.forEach(word => {
                        if (word === input || person.name.toLowerCase() === input) {
                            inArray = true;
                        }
                    });
                } if (person.phoneTag !== null && !inArray) {
                    let tagArray = person.phoneTag.toLowerCase().split(' ');
                    tagArray.forEach(word => {
                        if (word === input || person.phoneTag.toLowerCase() === input) {
                            inArray = true;
                        }
                    });
                } if (person.room !== null && !inArray) {
                    let roomStr = person.room.toString();
                    if (roomStr === input) {
                        inArray = true;
                    }
                } if (person.extension !== null && !inArray) {
                    let extensionStr = person.extension.toString();
                    if (extensionStr === input) {
                        inArray = true;
                    }
                }
                // If value matches the person.
                if (inArray) {
                    // Push person to newList
                    newList.push(person);
                }
            }
            if (newList.length > 0) {
                // Push newObject to newDisplay
                newDisplay.push(newObject);
                // Set display as neDisplay.
                return this.setState({
                    display: newDisplay,
                    singleResult: true
                });
            }

            alert(`Error: "${value}" is not in sheet.`);
            return this.handleSearch(school, '');

        } else { // Search for All
            // For ever person in personData
            for (var i = 0; i < school.value.personData.length; i++) {
                var person = school.value.personData[i];
                // Push person to newList
                newList.push(person);
            }
            // Push newObject to newDisplay
            newDisplay.push(newObject);
            // Set display as neDisplay.
            this.setState({
                display: newDisplay,
                singleResult: false
            })
        }
    }


    render() {

        const { district, school, searchInput, display, singleResult } = this.state;
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
                />
                <List display={display} singleResult={singleResult}/>
            </div>
        );
    }

}