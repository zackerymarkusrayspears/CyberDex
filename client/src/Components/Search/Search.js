import React from 'react';
import './Search.css';
import { 
    TextField,
    Button 
} from '@material-ui/core';

export default function Search(props) {

    return <div className='search'>
        <TextField
            className='search-text'
            value={props.searchInput}
            onChange={event => props.changeInput(event)}
            label={`Search ${props.dbData.title}`}
            onKeyPress={event => {
                if (props.searchInput === '') return
                if (event.key === 'Enter') {
                    event.preventDefault();
                    props.iterateSearch();
                }
            }}
        />
        <Button 
            className = "search-btn"
            onClick={() => {
                if (props.searchInput === '') return
                props.iterateSearch();
            }}
        >Submit</Button>
    </div>
}