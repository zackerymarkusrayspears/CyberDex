import React, { Component } from 'react';
import './Search.css';
import SearchForm from '../SearchForm/SearchForm';

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            district: '',
            school: '',
            searchInput: '',
            displayMeta: [],
            displaySearch: []
        }
    }

    changeDistrict = event => {

        const { dbData } = this.props;

        this.setState({
            district: event.target.value
        });
        console.log(dbData[event.target.value]);
    }

    changeSchool = event => {
        const { district } = this.state, { dbData } = this.props;
        const newSchool = dbData[district].sheet[event.target.value];

        this.setState({
            school: newSchool
        });
        console.log(newSchool);
    }

    changeInput = event => {
        this.setState({
            searchInput: event.target.value 
        });
        console.log(event.target.value);
    }

    handleSearch = (school, name) => {

        if (school === undefined || school === '' ) {
            return alert('Error: School is not defined.');
        }

        if (name !== '') { // Search for single return.
            school.value.personData.forEach(data => {
                if (data.name === name) {
                    this.addToDisplay(school, data);
                }
            });
        } else { // Search for All
            school.value.personData.forEach(data => {
                this.addToDisplay(school, data);
            });
        }
    }

    addToDisplay = (school, person) => {

        const { displayMeta, displaySearch } = this.state;
        let newMeta = displayMeta, newSearch = displaySearch, inMeta = false, inSearch = false;

        displayMeta.forEach(data => {
            if (school.title === data.title || inMeta) {
                inMeta = true;
            }
        });
        if (!inMeta) {
            const metaObject = {
                title: school.title,
                metaData: school.value.metaData
            }
            newMeta.push(metaObject);
            this.setState({
                displayMeta: newMeta
            })
            console.log(displayMeta);
            console.log('^ dislpayMeta');
        }
        displaySearch.forEach(data => {
            if (person.name === data.name || inSearch) {
                inSearch = true;
            }
        });
        if (!inSearch) {
            const searchObject = {
                phoneTag: person.phoneTag,
                name: person.name,
                room: person.room,
                extension: person.extension,
                phoneNumber: person.phoneNumber,
                note: person.note
            }
            newSearch.push(searchObject);
            this.setState({
                displaySearch: newSearch
            })
            console.log(displaySearch);
            console.log('^ displaySearch');
        }
    }

    render() {

        const { district, school, searchInput } = this.state;
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
                <p>{this.state.searchInput}</p>
            </div>
        );
    }

}