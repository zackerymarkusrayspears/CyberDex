import React, { Component } from 'react';
import axios from 'axios';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { 
    Container, 
    Button
} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

export default class Record extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            record: [],
            filterUser: 'all',
            filterType: 'all',
            filterAmount: 15,
            currentIndex: 0,
            currentPage: 1
        }
    }

    componentDidMount() {
        this.setState({
            loading: false,
            record: this.props.dbRecord
        })
    }

    renderRecord(argUser, argType, argAmount, argIndex, argPage) {

        const { account } = this.props;
        const { filterUser, filterType, filterAmount, currentIndex, currentPage } = this.state;

        let recUser = filterUser,
            recType = filterType,
            recAmount = filterAmount,
            recIndex = currentIndex,
            recPage = currentPage;

        if (argUser !== recUser && argUser !== undefined) recUser = argUser;
        if (argType !== recType && argType !== undefined) recType = argType;
        if (argAmount !== recAmount && argAmount !== undefined) recAmount = argAmount;
        if (argIndex !== recIndex && argIndex !== undefined) recIndex = argIndex;
        if (argPage !== recPage && argPage !== undefined) recPage = argPage;

        this.setState({ loading: true });

        axios({
            url: 'http://localhost:3001/api/postRecord',
            method: 'POST',
            data: {
                id: account.spreadId,
                user: recUser,
                type: recType,
                amount: recAmount,
                index: recIndex
            }
        }).then(response => {
            if (!response.data.success) {
              this.setState({ loading: false });
              return alert(response.data.message);
            }
            this.setState({ 
                loading: false,
                record: response.data.data,
                filterUser: recUser,
                filterType: recType,
                filterAmount: recAmount,
                currentIndex: recIndex,
                currentPage: recPage
            });
        }).catch(error => {
            console.log(error);
            this.setState({ loading: false });
        });
    }

    render() {

        const { 
            classes, 
            dbAccount 
        } = this.props, { 
            loading, 
            record, 
            filterUser, 
            filterType, 
            filterAmount, 
            currentIndex, 
            currentPage 
        } = this.state;

        return <div className={classes.route}>
            <Container className={classes.filter}>
                <FormControl
                    className={classes.filterSelect}
                    variant='outlined'
                    color='secondary'
                >
                    <InputLabel 
                        id='history-select-user'
                        className={classes.focused}
                    >Account</InputLabel>
                    <Select
                        labelId='history-select-user'
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
                        labelWidth={63}
                    >
                        <MenuItem value='deleted'>Deleted</MenuItem>
                        {dbAccount.map((account, i) => {
                            return <MenuItem 
                                key={`mi-${i}`}
                                value={account.id}
                            >{account.username}</MenuItem>
                        })}
                        <MenuItem value='all'>All</MenuItem>
                    </Select>
                </FormControl>
                <FormControl
                    className={classes.filterSelectSm}
                    variant='outlined'
                    color='secondary'
                >
                    <InputLabel 
                        id='history-select-type'
                        className={classes.focused}
                    >Type</InputLabel>
                    <Select
                        labelId='history-select-type'
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
                        labelWidth={37}
                    >
                        <MenuItem value='add'>Add</MenuItem>
                        <MenuItem value='remove'>Remove</MenuItem>
                        <MenuItem value='modify'>Modify</MenuItem>
                        <MenuItem value='account'>Account</MenuItem>
                        <MenuItem value='all'>All</MenuItem>
                    </Select>
                </FormControl>
                <FormControl 
                    className={`${classes.filterSelectSm} ${classes.filterRight}`}
                    variant='outlined'
                    color='secondary'
                >
                    <InputLabel 
                        id='history-select-ammount'
                        className={classes.focused}
                    >Display</InputLabel>
                    <Select
                        labelId='history-select-ammount'
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
                        labelWidth={54}
                    >
                        <MenuItem value={50}>50</MenuItem>
                        <MenuItem value={25}>25</MenuItem>
                        <MenuItem value={15}>15</MenuItem>
                    </Select>
                </FormControl>
            </Container>
            <TableContainer className={classes.table}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell className={`${classes.nameCell} ${classes.headColumnCell}`}>Name</TableCell>
                            <TableCell className={classes.headColumnCell}>Account Log</TableCell>
                            <TableCell 
                                className={`${classes.timeCell} ${classes.headColumnCell}`}
                                align='center'
                            >Timestamp</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {!loading ? (
                            !record || record.length !== 0 ? (
                                record.map((entry, index) => {
                                    return <TableRow key={`tbr-${index}`}>
                                        <TableCell className={classes.nameCell}>{entry.name}</TableCell>
                                        <TableCell>
                                            {entry.log.map((log, i) => {
                                                return <p
                                                    key={`log-${i}`}
                                                    className='history-table-log'
                                                >{log}</p>
                                            })}
                                        </TableCell>
                                        <TableCell 
                                            className={classes.timeCell}
                                            aling='center'
                                        >{entry.timestamp.substring(0, 24)}</TableCell>
                                    </TableRow>
                                })
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={3}>No Records</TableCell>
                                </TableRow>
                            )
                        ) : (
                            <TableRow>
                                <TableCell colSpan={3}>Please wait...</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            {!loading ? (
                <Container className={classes.pagination}>
                    {currentIndex === 0 ? (
                        <Button
                            className={classes.btn}
                            disabled
                        >
                            <ChevronLeftIcon/>
                        </Button>
                    ) : (
                        <Button
                            className={classes.btn}
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
                        >
                            <ChevronLeftIcon/>
                        </Button>
                    )}
                    <h3 className={classes.paginationPage}>{currentPage}</h3>
                    {record.length < filterAmount ? (
                        <Button
                            className={classes.btn}
                            disabled
                        >
                            <ChevronRightIcon/>
                        </Button>
                    ) : (
                        <Button
                            className={classes.btn}
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
                        >
                            <ChevronRightIcon/>
                        </Button>
                    )}
                </Container>
            ) : null }
        </div>
    }
}