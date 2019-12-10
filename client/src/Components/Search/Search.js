import React, { Component } from 'react';
import '../Search_Form/Search_Form';
import axios from 'axios';

const {API_KEY} = process.env
const API_URL = '/'
class Search extends Component {
    state = {
        query: '',
    }
    handleInputChange = () =>{
        this.setState({
            query: this.search.value
        })
    }

}