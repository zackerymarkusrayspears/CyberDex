import React, { Component } from 'react';
import './Delete.css';
import axios from 'axios';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';

export default class Delete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sheetArray: [],
        }
    }

    renderSheetArray(i, addAll) {

        // Access current spreadArray.
        const { sheetArray } = this.state;
        // Make a copy of spreadArray.
        const newArray = sheetArray;
        let inArray = false;

        sheetArray.forEach(sheet => {
            if (sheet === i) inArray = true;
        })

        if (addAll === undefined) {
            if (inArray) {
                newArray.splice(newArray.indexOf(i), 1);
            } else {
                newArray.push(i);
            }
        } else if (addAll) {
            if (!inArray) {
                newArray.push(i);
            }
        } else {
            if (inArray) {
                newArray.splice(newArray.indexOf(i), 1);
            }
        }

        // Set state of spreadArray as new state.
        this.setState({ sheetArray: newArray});
    }

    deleteSheet() {

        // Access current dbArray.
        const { account, dbSpread, dbAccount, postSpread } = this.props,
            { sheetArray } = this.state,
            newSheetArray = [];

        let sheetStr = '',
            newLog = '';

        dbSpread.sheet.forEach((sheet, i) => {
            if (!sheetArray.includes(i)) newSheetArray.push(sheet);
        });

        if (sheetArray.length === dbSpread.sheet.length) {
            newLog = `Removed all sheets from CyberDex.`
        } else {
            sheetArray.forEach((num, i) => {
                if (sheetArray.length === 1) return sheetStr = dbSpread.sheet[num].title;

                if (i !== sheetArray.length - 1) {
                    sheetStr += `${dbSpread.sheet[num].title}, `
                } else {
                    sheetStr += `and ${dbSpread.sheet[num].title}`
                }
            });
            newLog = `Removed sheet(s) ${sheetStr} from CyberDex.`
        }
        
        if (account.name === '') return alert('Account does not have a name.');

        const newRecord = {
            id: account.id,
            name: account.name,
            log: newLog,
            type: 'remove',
            timestamp: Date()
        }

        // Axios request to post the new id number and data from spreadsheet object.
        axios({

            url: 'http://localhost:3001/api/updateData',
            method: 'PUT',
            data: {
                id: dbSpread.id,
                title: dbSpread.title,
                sheet: newSheetArray,
                account: dbAccount,
                record: newRecord
            }

        }).then((reponse) => {
            console.log(reponse);
            postSpread();
            dbSpread.sheet.forEach((sheet, i) => {
                this.renderSheetArray(i, false)
            })
        }).catch((error) => {
            console.log(error);
        });
    }

    render() {

        const { sheetArray } = this.state;
        const { dbSpread } = this.props;

        return(
            <div className='delete'>
                {dbSpread.sheet.length !== 0 ? (
                    <>
                        <h3 className='delete-summary'>Select sheet(s) to remove:</h3>
                        {sheetArray.length > 0 ? (
                            <Button
                                onClick={() => this.deleteSheet()}
                            >Submit</Button>
                        ) : (
                            ''
                        )}
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>{dbSpread.title}</TableCell>
                                        {sheetArray.length !== dbSpread.sheet.length ? (
                                            <TableCell align='right'>
                                                <Button 
                                                    onClick={() => {
                                                        dbSpread.sheet.forEach((sheet, i) => {
                                                            this.renderSheetArray(i, true)
                                                        })
                                                    }}
                                                >Add All</Button>
                                            </TableCell>
                                        ) : null }
                                        {sheetArray.length !== 0 ? (
                                            <TableCell align='right'>
                                                <Button 
                                                    onClick={() => {
                                                        dbSpread.sheet.forEach((sheet, i) => {
                                                            this.renderSheetArray(i, false)
                                                        })
                                                    }}
                                                >Remove All</Button>
                                            </TableCell>
                                        ) : null }
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {dbSpread.sheet.map((sheet, i) => {
                                        return <TableRow key={`tr-${i}`}>
                                            <TableCell>{sheet.title}</TableCell>
                                            {(sheetArray.length === dbSpread.sheet.length || sheetArray.length === 0) ? (
                                                <TableCell align='right'>
                                                    <Button 
                                                        onClick={() => {
                                                            this.renderSheetArray(i, undefined)
                                                        }}
                                                    >X</Button>
                                                </TableCell>
                                            ) : (
                                                <TableCell align='right' colSpan={2}>
                                                    <Button 
                                                        onClick={() => {
                                                            this.renderSheetArray(i, undefined)
                                                        }}
                                                    >X</Button>
                                                </TableCell>
                                            )}
                                        </TableRow>
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </>
                ) : (
                    <h3 className='delete-summary'>No sheets currently stored.</h3>
                )}
            </div>
        );
    }
}