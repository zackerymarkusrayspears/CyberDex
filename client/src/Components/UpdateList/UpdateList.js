import React, { Component } from 'react';
import './UpdateList.css';

export default class UpdateList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sheetTitle: this.props.sheet.title
        }
    }

    render() {

        const { sheetTitle } = this.state;
        
        return(
            <div>
                <input 
                    value={sheetTitle}
                    onChange={event => {
                        this.setState({
                            sheetTitle: event.target.value
                        });
                    }}
                />
            </div>
        );
    }
}