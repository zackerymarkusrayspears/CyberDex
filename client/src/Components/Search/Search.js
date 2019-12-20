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
            display: [],
            singleResult: false
        });
    }

    iterateSearch = () => {

        const { dbData } = this.props, { searchInput, display } = this.state;
        const self = this, input = searchInput.trim().toLowerCase(), inputArray = input.split(' ');
        let inputTitle = '';

        if (searchInput === '') return

        // For each spreadsheet
        dbData.forEach(spread => {
            // For each sheet
            spread.sheet.forEach(sheet => {
                // For each input word 
                inputArray.forEach((inputWord) => {
                    let sheetArray = sheet.title.toLowerCase().split(' ');
                    // For each Title word
                    sheetArray.forEach(word => {
                        // If a inputted word is equal to a title word.
                        if (word === inputWord) {
                            // Set it equal as searchTitle and replace its value with null.
                            if (inputTitle === '') {
                                inputTitle = inputWord;
                            } else {
                                inputTitle += ` ${inputWord}`;
                            }
                            inputArray.splice(inputArray.indexOf(inputWord), 1, '');
                        }
                    });
                });
            });
        });

        // For each spreadsheet
        dbData.forEach((spread, index) => {
            // For each sheet
            spread.sheet.forEach((sheet, i) => {
                // Search for results.
                self.handleSearch(sheet, inputTitle, inputArray);
                // If its the last search and display has no results.
                if (index === dbData.length - 1 && i === spread.sheet.length - 1 && display.length < 1) {
                    alert(`Error: "${searchInput}" is not found.`);
                }
            });
        });
    }

    handleSearch = (sheet, inputTitle, inputArray) => {

        // Access current display state.
        const { display } = this.state;
        // Create newDisplay thats equal to the current display state and newList array.
        const newDisplay = display, newList = [];
        // Create booleans to state the type of search.
        let titleSearch = false, onlyTitle = false, specific = false, inArray = false;
        // Make and array of words from the input that is lowercased and removes any whitespaces on the ends.
        var newObject = {
            title: sheet.title,
            metaList: sheet.value.metaData,
            personList: newList
        }

        // If input title has a value, compare it's value to the sheets title and word in title.
        if (inputTitle !=='') {
            // Create let to count the number of nulls.
            let nulls = 0;
            let sheetArray = sheet.title.toLowerCase().split(' ');
            sheetArray.forEach(word => {
                if ((word === inputTitle || sheet.title.toLowerCase() === inputTitle) && !titleSearch) {
                    // If true set titleSearch as true and create then search each word in inputArray for the value of null.
                    titleSearch = true;
                    inputArray.forEach(word => {
                        if (word === '' && !onlyTitle) nulls++;
                    });
                    // If null is every value in inputArray set onlyTitle to true.
                    if (nulls === inputArray.length) onlyTitle = true;
                }
            });
        }

        // For every word in inputArray.
        inputArray.forEach((input, index) => {
            // Return if the search is for a sheet values and its not the last word in the inputArray.
            if (onlyTitle && input === '' && index < inputArray.length - 1) return
            // For ever person in personList
            sheet.value.personData.forEach(person => {
                // If the search input only consist of title names.
                if (titleSearch && onlyTitle) {
                    // Push every person.
                    newList.push(person);
                // If the search input has a title and a specific word or all specific words.
                } else if ((titleSearch && !onlyTitle) || inputTitle === '') {
                    // Return if the input is null.
                    if (input === '') return;
                    // Filter null values from input array and create a string of the remaining words.
                    let specificInput = inputArray.filter(Boolean).join(' ');
                    // Reset inArray as false.
                    inArray = false;
                    // If Person's values is not null or a specific search is made.
                    if (person.name !== null && !specific) {
                        // Return if this is a specific search and the input is not on the last word.
                        if (person.name.toLowerCase() === specificInput && index < inputArray.length - 1) return;
                        // If this is a specific search.
                        if (person.name.toLowerCase() === specificInput) {
                            specific = true;
                            inArray = true;
                        // Else search input and word values for a match.
                        } else {
                            let nameArray = person.name.toLowerCase().split(' ');
                            nameArray.forEach(word => {
                                // If input matches a word or the total value set inArray to true.
                                if (word === input) {
                                    inArray = true;
                                }
                            });
                        }
                    } if (person.phoneTag !== null && !inArray && !specific) {
                        if (person.phoneTag.toLowerCase() === specificInput && index < inputArray.length - 1) return;
                        if (person.phoneTag.toLowerCase() === specificInput) {
                            specific = true;
                            inArray = true;
                        } else {
                            let tagArray = person.phoneTag.toLowerCase().split(' ');
                            tagArray.forEach(word => {
                                if (word === input) {
                                    inArray = true;
                                }
                            });
                        }
                    } if (person.room !== null && !inArray && !specific) {
                        let roomStr = person.room.toString();
                        // If input matches the number set inArray to true.
                        if (roomStr === input) {
                            inArray = true;
                        }
                    } if (person.extension !== null && !inArray && !specific) {
                        let extensionStr = person.extension.toString();
                        if (extensionStr === input) {
                            inArray = true;
                        }
                    }
                    // If inArray is true push the person.
                    if (inArray) {
                        // Push person to newList
                        newList.push(person);
                    }
                }
            });

            if (titleSearch && onlyTitle && newList.length > 0) {
                // Push newObject to newDisplay
                newDisplay.push(newObject);
                // Set display as neDisplay.
                return this.setState({
                    display: newDisplay
                });

            } else if ((titleSearch && newDisplay.length < 1 || inputTitle === '') && newList.length > 0 ) {
                // Push newObject to newDisplay
                newDisplay.push(newObject);
                // Set display as neDisplay.
                return this.setState({
                    display: newDisplay,
                    singleResult: true 
                });
            }
        });
    }

    render() {

        const { searchInput, display, singleResult } = this.state;

        return(
            <div className='Search'>
                <div className='Search-searchBar'>
                    <SearchForm
                        searchInput={searchInput}
                        changeInput={this.changeInput}
                        iterateSearch={this.iterateSearch}
                    />
                </div>
                <List display={display} singleResult={singleResult}/>
            </div>
        );
    }

}