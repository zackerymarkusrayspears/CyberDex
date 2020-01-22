import React, { Component } from 'react';
import './History.css';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Button } from '@material-ui/core';

export default class History extends Component {
    constructor(props) {
        super(props);
        this.state = {
            display: [],
            filterUser: 'all',
            filterType: 'all',
            filterAmount: 15,
            currentIndex: 0,
            currentPage: 1
        }
    }

    componentDidMount() {
        this.renderRecord();
    }

    renderRecord(argUser, argType, argAmount, argIndex, argPage) {

        const { dbData } = this.props;
        const { filterUser, filterType, filterAmount, currentIndex, currentPage } = this.state;

        let newDisplay = [],
            user = filterUser,
            type = filterType,
            amount = filterAmount,
            index = currentIndex,
            page = currentPage;

        if (argUser !== user && argUser !== undefined) user = argUser;
        if (argType !== type && argType !== undefined) type = argType;
        if (argAmount !== amount && argAmount !== undefined) amount = argAmount;
        if (argIndex !== index && argIndex !== undefined) index = argIndex;
        if (argPage !== page && argPage !== undefined) page = argPage;

        for (var i = index; newDisplay.length < amount; i++) {
            if (user === dbData.record[i].id || user === 'all') {
                if (type === dbData.record[i].type || type === 'all') {
                    newDisplay.push(dbData.record[i]);
                }
            }
            if (i === dbData.record.length - 1) return this.setState({ 
                display: newDisplay,
                filterUser: user,
                filterType: type,
                filterAmount: amount,
                currentIndex: index,
                currentPage: page
            });
        }
        this.setState({ 
            display: newDisplay,
            filterUser: user,
            filterType: type,
            filterAmount: amount,
            currentIndex: index,
            currentPage: page
        });
    }

    renderDisplay() {

        const { display } = this.state;

        if (display.length !== 0) {
            return display.map((record, i) => {
                return <TableRow key={`tr-${i}`}>
                    <TableCell>{record.name}</TableCell>
                    <TableCell>{record.log}</TableCell>
                    <TableCell align='right'>{record.timestamp.substring(0, 24)}</TableCell>
                </TableRow>
            })
        } else {
            return <TableRow>
                <TableCell colSpan={3}>No Records</TableCell>
            </TableRow>
        }
    }

    render() {

        const { dbData } = this.props;
        const { display, filterUser, filterType, filterAmount, currentIndex, currentPage } = this.state;

        return(
            <div className='history'>
                <FormControl>
                    <InputLabel id='history-select-user'>Account</InputLabel>
                    <Select
                        labelId='history-select-user'
                        className='history-select'
                        value={filterUser}
                        onChange={event => {
                            this.renderRecord( 
                                event.target.value,
                                filterType,
                                filterAmount,
                                0,
                                1
                            );
                        }}
                    >
                        {dbData.account.map((account, i) => {
                            return <MenuItem 
                                key={`mi-${i}`}
                                value={account.id}
                            >{account.username}</MenuItem>
                        })}
                        <MenuItem value='all'>All</MenuItem>
                    </Select>
                </FormControl>
                <FormControl>
                    <InputLabel id='history-select-type'>Type</InputLabel>
                    <Select
                        labelId='history-select-type'
                        className='history-select-small'
                        value={filterType}
                        onChange={event => {
                            this.renderRecord( 
                                filterUser,
                                event.target.value,
                                filterAmount,
                                0,
                                1
                            );
                        }}
                    >
                        <MenuItem value='add'>Add</MenuItem>
                        <MenuItem value='remove'>Remove</MenuItem>
                        <MenuItem value='modify'>Modify</MenuItem>
                        <MenuItem value='account'>Account</MenuItem>
                        <MenuItem value='all'>All</MenuItem>
                    </Select>
                </FormControl>
                <FormControl className='history-form-right'>
                    <InputLabel id='history-select-display'>Display</InputLabel>
                    <Select
                        labelId='history-select-display'
                        className='history-select-small'
                        value={filterAmount}
                        onChange={event => {
                            this.renderRecord(
                                filterUser,
                                filterType,
                                event.target.value,
                                0,
                                1
                            );
                    }}
                    >
                        <MenuItem value={50}>50</MenuItem>
                        <MenuItem value={25}>25</MenuItem>
                        <MenuItem value={15}>15</MenuItem>
                    </Select>
                </FormControl>
                <TableContainer component={Paper} className='history-table'>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell align='right'>Timestamp</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.renderDisplay()}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div className='history-pagination'>
                    {currentIndex === 0 ? (
                        <Button
                            className='history-button-page'
                            disabled
                        >{'<'}</Button>
                    ) : (
                        <Button
                            className='history-button-page'
                            onClick={() => {
                                let prevPage = currentIndex - filterAmount,
                                    decPage = currentPage;
                                decPage--;
                                this.renderRecord(
                                    filterUser,
                                    filterType,
                                    filterAmount,
                                    prevPage, 
                                    decPage
                                );
                            }}
                        >{'<'}</Button>
                    )}
                    <h3 className='history-page'>{currentPage}</h3>
                    {display.length < filterAmount ? (
                        <Button
                            className='history-button-page'
                            disabled
                        >{'>'}</Button>
                    ) : (
                        <Button
                            className='history-button-page'
                            onClick={() => {
                                let nextPage = currentIndex + filterAmount;
                                let incPage = currentPage;
                                incPage++;
                                this.setState({ 
                                    currentPage: incPage 
                                });
                                this.renderRecord(
                                    filterUser,
                                    filterType,
                                    filterAmount,
                                    nextPage, 
                                    incPage
                                );
                            }}
                        >{'>'}</Button>
                    )}
                </div>
            </div>
        );
    }
}