import React, { Component } from 'react';
import './Main.css';
import Search from '../Search/Search';
import Sheet from '../Sheet/Sheet';

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchInput: '',
            display: [],
            editMode: ''
        }
        this.changeInput = this.changeInput.bind(this);
        this.iterateSearch = this.iterateSearch.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.resetDisplay = this.resetDisplay.bind(this);
        this.setEditMode = this.setEditMode.bind(this);
    }

    changeInput(event) {
        this.setState({
            display: [],
            searchInput: event.target.value
        });
    }

    iterateSearch() {

        const { dbSpread } = this.props, { searchInput, display } = this.state;
        const self = this, input = searchInput.trim().toLowerCase(), inputArray = input.split(' ');
        let sheetIdArray = [], sheetTitleArray = [];

        dbSpread.sheet.forEach(sheet => {
            sheetTitleArray = sheet.title.toLowerCase().split(' ');
            sheetTitleArray.forEach(titleWord => {
                if (inputArray.includes(titleWord)) {
                    sheetIdArray.push(sheet.id);
                    inputArray.splice(inputArray.indexOf(titleWord), 1);
                }
            });
        });

        dbSpread.sheet.forEach((sheet, i) => {
            if (sheetIdArray.length === 0) {
                self.handleSearch(sheet, inputArray);
            } else if (sheetIdArray.includes(sheet.id)) {
                self.handleSearch(sheet, inputArray);
            }
        });

        if (display.length < 1) alert(`Error: "${searchInput}" is not found.`);
    }

    handleSearch(sheet, inputArray) {

        const newDisplay = this.state.display,
            newMetaList = [],
            newPersonList = [],
            input = inputArray.join(' ');

        let pushPerson = false,
            unshiftPerson = false,
            unshiftObject = false,
            nameArray = [],
            tagArray = [],
            roomStr = '',
            extStr = '',
            newObject = {
                id: sheet.id,
                title: sheet.title,
                metaList: newMetaList,
                personList: newPersonList
            };

        // Add all metaData to display.
        sheet.value.metaData.forEach(meta => newMetaList.push(meta));

        sheet.value.personData.forEach(person => {
            // If search is for all results.
            if (inputArray.length === 0) pushPerson = true;
            // If person's values is not null.
            if (person.name !== null) {
                // If person's value is identical to input.
                if (person.name.toLowerCase() === input) {
                    unshiftPerson = true;
                    unshiftObject = true;
                } else {
                    nameArray = person.name.toLowerCase().split(' ');
                    // If any word in person's value matches any word in the input.
                    nameArray.forEach(word => {
                        if (inputArray.includes(word.toLowerCase())) {
                            pushPerson = true;
                        }
                    });
                }
            } if (person.phoneTag !== null && !pushPerson) {
                if (person.phoneTag.toLowerCase() === input) {
                    unshiftPerson = true;
                    unshiftObject = true;
                } else {
                    tagArray = person.phoneTag.toLowerCase().split(' ');
                    tagArray.forEach(word => {
                        if (inputArray.includes(word.toLowerCase())) {
                            pushPerson = true;
                        }
                    });
                }
            } if (person.room !== null && !pushPerson) {
                roomStr = person.room.toString();
                // If person's value matches input.
                if (roomStr === input) {
                    pushPerson = true;
                }
            } if (person.extension !== null && !pushPerson) {
                extStr = person.extension.toString();
                if (extStr === input) {
                    pushPerson = true;
                }
            }
            if (unshiftPerson) {
                newPersonList.unshift(person);
                unshiftPerson = false;
            }
            if (pushPerson) {
                newPersonList.push(person);
                pushPerson = false;
            }
        });
        
        if (unshiftObject) {
            newDisplay.unshift(newObject);
            this.setState({ display: newDisplay });
        }

        if (!unshiftObject && newPersonList.length > 0) {
            newDisplay.push(newObject);
            this.setState({ display: newDisplay });
        }
    }

    resetDisplay() { 
        this.setState({ 
            display: [],
            editMode: ''
        }); 
    }

    setEditMode(event) { this.setState({ editMode: event }); }

    render() {

        const { searchInput, display, editMode } = this.state;
        const { account, dbSpread, postSpread } = this.props;

        return(
            <div className='main'>
                <Search
                    dbSpread={dbSpread}
                    searchInput={searchInput}
                    changeInput={this.changeInput}
                    iterateSearch={this.iterateSearch}
                />
                {display.length !== 0 ? (
                    display.map((data, i) => {
                        return <Sheet 
                            key={`sheet-${i}`}
                            account={account}
                            dbSpread={dbSpread}
                            postSpread={postSpread}
                            data={data}
                            editMode={editMode}
                            setEditMode={this.setEditMode}
                            resetDisplay={this.resetDisplay}
                        />
                    })
                ) : null }
            </div>
        );
    }
}