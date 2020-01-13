import React, { Component } from 'react';
import './UpdateIndex.css';
import UpdateList from '../UpdateList/UpdateList';

export default class UpdateIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spreadSelected: '',
            sheetSelected: ''
        }
    }

    renderSelect = () => {
        const { dbData } = this.props;
        const { spreadSelected } = this.state;

        return (
            <div>
                <select
                value={this.state.spreadSelected}
                    onChange={event => {
                        this.setState({
                            spreadSelected: event.target.value,
                            sheetSelected: ''
                        })
                    }}
                >
                    <option value='' defaultValue>Select</option>
                    {dbData.map((spread, i) => {
                        return <option key={i} value={i}>{spread.spreadsheetTitle}</option>
                    })}
                </select>
                    {spreadSelected !== '' ? (
                        <select
                            value={this.state.sheetSelected}
                                onChange={event => {
                                    this.setState({
                                        sheetSelected: event.target.value
                                    })
                                }}
                        >
                            <option value='' defaultValue>Select</option>
                            {dbData[spreadSelected].sheet.map((sheet, i) => {
                                return <option key={i} value={i}>{sheet.title}</option>
                            })}
                        </select>
                    ) : (
                        ''
                    )}
            </div>
        );
    }

    render() {
        
        const { dbData } = this.props;
        const { spreadSelected, sheetSelected } = this.state;

        return(
            <div className='UpdateIndex'>
                {dbData.length > 0 ? (
                    <div>
                        <h3 className='UpdateIndex-summary'>Select Spreadsheet to Update:</h3>
                        {this.renderSelect()}
                        {spreadSelected !== '' && sheetSelected !== '' ? (
                            <UpdateList
                                sheet={dbData[spreadSelected].sheet[sheetSelected]}
                            />
                        ) : (
                            ''
                        )}
                    </div>
                ) : (
                    <h3 className='UpdateIndex-summary'>No Spreadsheets currently stored.</h3>
                )}
            </div>
        );
    }
}