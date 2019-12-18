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

    changeInput = event => {
        this.setState({
            searchInput: event.target.value,
            display: []
        });
    }

    iterateSearch = () => {

        const { dbData } = this.props;
        const { searchInput, display } = this.state;
        const self = this;

        dbData.forEach((spread, index) => {
            spread.sheet.forEach((sheet, i) => {
                self.handleSearch(sheet, searchInput);
                if (index === dbData.length - 1 && i === spread.sheet.length - 1 && display.length < 1) {
                    alert(`Error: "${searchInput}" is not found.`);
                }
            });
        });
    }

    handleSearch = (school, value) => {

        if (value === '') return

        const { display } = this.state;

        // Create new arrays for display state.
        const newDisplay = display, newList = [], input = value.trim().toLowerCase(), inputArray = input.split(' ');
        let inArray = false, correctSheet = false;
        // Make and array of words from the input that is lowercased and removes any whitespaces on the ends.
        var newObject = {
            title: school.title,
            metaList: school.value.metaData,
            personList: newList
        }

        if (inputArray.length === 1) { // General Search

            // For ever person in personData
            school.value.personData.forEach(person => {
                // Reset inArray as false.
                inArray = false;
                // If their is a value for Person's values set words to lowercase and inside and array.
                if (person.name !== null) {
                    let schoolArray = school.title.toLowerCase().split(' ');
                    schoolArray.forEach(word => {
                        if (word === input || school.title.toLowerCase() === input) {
                            inArray = true;
                        }
                    });
                } if (person.name !== null && !inArray) {
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
            });
            if (newList.length > 0) {
                // Push newObject to newDisplay
                newDisplay.push(newObject);
                // Set display as neDisplay.
                this.setState({
                    display: newDisplay,
                    singleResult: true
                });
            }
        } else { // Specific Search
            
            correctSheet = false;
            inputArray.forEach((inputWord, index) => {
                
                // For ever person in personData
                school.value.personData.forEach(person => {
                    // Reset inArray as false.
                    inArray = false;
                    // If their is a value for Person's values set words to lowercase and inside and array.
                    if (index === 0) {
                        let schoolArray = school.title.toLowerCase().split(' ');
                        schoolArray.forEach(word => {
                            if (word === inputWord || school.title.toLowerCase() === inputWord) {
                                correctSheet = true;
                            }
                        });
                    } if (person.name !== null && !inArray && correctSheet) {
                        let nameArray = person.name.toLowerCase().split(' ');
                        nameArray.forEach(word => {
                            if (word === inputWord || person.name.toLowerCase() === inputWord) {
                                inArray = true;
                            }
                        });
                    } if (person.phoneTag !== null && !inArray && correctSheet) {
                        let tagArray = person.phoneTag.toLowerCase().split(' ');
                        tagArray.forEach(word => {
                            if (word === inputWord || person.phoneTag.toLowerCase() === inputWord) {
                                inArray = true;
                            }
                        });
                    } if (person.room !== null && !inArray && correctSheet) {
                        let roomStr = person.room.toString();
                        if (roomStr === inputWord) {
                            inArray = true;
                        }
                    } if (person.extension !== null && !inArray && correctSheet) {
                        let extensionStr = person.extension.toString();
                        if (extensionStr === inputWord) {
                            inArray = true;
                        }
                    }
                    // If value matches the person.
                    if (inArray && correctSheet) {
                        // Push person to newList
                        newList.push(person);
                    }
                });
                if (newList.length > 0) {
                    // Push newObject to newDisplay
                    newDisplay.push(newObject);
                    // Set display as neDisplay.
                    this.setState({
                        display: newDisplay,
                        singleResult: true
                    });
                }
            });
        }
    }


    render() {

        const { searchInput, display, singleResult } = this.state;

        return(
            <div className='Search'>
                <SearchForm
                    searchInput={searchInput}
                    changeInput={this.changeInput}
                    iterateSearch={this.iterateSearch}
                />
                <List display={display} singleResult={singleResult}/>
            </div>
        );
    }

}