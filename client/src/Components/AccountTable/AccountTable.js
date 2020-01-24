import React from 'react';
import './AccountTable.css';
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
import { 
    TextField,
    Button,
} from '@material-ui/core';

export default function AccountTable(props) {

    return <TableContainer component={Paper}>
        <Table>
            <TableHead>
            {!props.editMode ? (
                <>
                    {props.account.type !== 'admin' ? (
                        <TableRow>
                            <TableCell colSpan={6}>{props.title}</TableCell>
                        </TableRow>
                    ) : (
                        <TableRow>
                            <TableCell colSpan={5}>{props.title}</TableCell>
                        </TableRow>
                    )}
                    <TableRow>
                        <TableCell>Username</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Authority</TableCell>
                        <TableCell align='right'>Type</TableCell>
                    </TableRow>
                </>
            ) : (
                <>
                    {props.editAccount !== 'title' ? (
                        <TableRow>
                            <TableCell colSpan={5}>{props.title}</TableCell>
                            {props.account.type === 'admin' ? (
                                <TableCell align='right'>
                                    <Button
                                        onClick={() => props.editSpreadTitle()}
                                    >Edit</Button>
                                </TableCell>
                            ) : null }
                        </TableRow>
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4}>
                                <TextField
                                    value={props.editTitle}
                                    onChange={event => props.handleSpreadTitle(event.target.value)}
                                    label={'Spreadsheet Title'}
                                />
                            </TableCell>
                            <TableCell align='right'>
                                <Button
                                    onClick={() => {
                                        if (props.editTitle.trim() === '') return props.returnAccountRow();
                                        props.replaceSpreadTitle();
                                    }}
                                >Replace</Button>
                            </TableCell>
                            <TableCell align='right'>
                                <Button
                                    onClick={() => props.returnAccountRow()}
                                >Return</Button>
                            </TableCell>
                        </TableRow>
                    )}
                    <TableRow>
                        <TableCell>Username</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Authority</TableCell>
                        <TableCell align='right'>Type</TableCell>
                        <TableCell colSpan={2} align='right'>Actions</TableCell>
                    </TableRow>
                </>
            )}
            </TableHead>
            <TableBody>
                {props.accountData ? (
                    !props.editMode ? (
                        props.accountData ? (
                            props.accountData.map((acc, i) => {
                                if (props.account.type !== 'admin' && i > 0) return
                                return <TableRow key={`tr-${i}`}>
                                    <TableCell>{acc.username}</TableCell>
                                    <TableCell>{acc.name}</TableCell>
                                    <TableCell>{props.renderRowAuth(acc.auth)}</TableCell>
                                    <TableCell align='right'>{acc.type === 'admin' ? 'Admin' : 'User'}</TableCell>
                                </TableRow>
                            })
                        ) : null
                    ) : (
                        <>
                            {props.accountData.map((acc, i) => {
                                if (props.account.type !== 'admin' && i > 0) return
                                return <TableRow key={`tr-${i}`}>
                                    {props.editAccount !== acc.id ? (
                                        <>
                                            <TableCell>{acc.username}</TableCell>
                                            <TableCell>{acc.name}</TableCell>
                                            <TableCell>{props.renderRowAuth(acc.auth)}</TableCell>
                                            <TableCell align='right'>{acc.type === 'admin' ? 'Admin' : 'User'}</TableCell>
                                            {i === 0 ? (
                                                <TableCell 
                                                    align='right'
                                                    colSpan={2}
                                                >
                                                    <Button
                                                        onClick={() => {
                                                            props.editAccountRow(
                                                                acc.id,
                                                                acc.username,
                                                                acc.name,
                                                                acc.auth,
                                                                acc.type
                                                            );
                                                        }}
                                                    >Edit</Button>
                                                </TableCell>
                                            ) : (
                                                acc.type !== 'admin' ? (
                                                    <>
                                                        {props.account.type === 'admin' ? (
                                                            (!acc.auth.includes('lock')) ? (
                                                                <TableCell align='right'>
                                                                    <Button
                                                                        onClick={() => props.toggleLock(i, acc)}
                                                                    >Lock</Button>
                                                                </TableCell>
                                                            ) : (
                                                                <TableCell align='right'>
                                                                    <Button
                                                                        onClick={() => props.toggleLock(i, acc)}
                                                                    >Unlock</Button>
                                                                </TableCell>
                                                            )
                                                        ) : null }
                                                        <TableCell 
                                                            colSpan={2}
                                                            align='right'
                                                        >
                                                            <Button
                                                                onClick={() => props.removeAccountRow(i, acc.username)}
                                                            >Delete</Button>
                                                        </TableCell>
                                                    </>
                                                ) : (
                                                    <TableCell 
                                                        colSpan={2}
                                                        align='right'
                                                    >Admin Account</TableCell>
                                                )
                                            )}
                                        </>
                                    ) : (
                                        <>
                                            <TableCell>
                                                <TextField
                                                    value={props.editUsername}
                                                    onChange={event => props.handleEditUsername(event.target.value)}
                                                    label='Username'
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    value={props.editName}
                                                    onChange={event => props.handleEditName(event.target.value)}
                                                    label='Name'
                                                />
                                            </TableCell>
                                            <TableCell>{props.renderRowAuth(props.editAuth)}</TableCell>
                                            <TableCell align='right'>{props.editType === 'admin' ? 'Admin' : 'User'}</TableCell>
                                            <TableCell align='right'>
                                                <Button
                                                    onClick={() => {
                                                        if (props.editUsername.trim() === '' || props.editName.trim() === '') return props.returnAccountRow();
                                                        props.replaceAccountRow(i, acc);
                                                    }}
                                                >Replace</Button>
                                            </TableCell>
                                            <TableCell align='right'>
                                                <Button
                                                    onClick={() => props.returnAccountRow()}
                                                >Return</Button>
                                            </TableCell>
                                        </>
                                    )}
                                </TableRow>
                            })}
                            {props.account.type === 'admin' ? (
                                <TableRow>
                                    <TableCell>
                                        <TextField
                                            value={props.newUsername}
                                            onChange={event => props.handleNewUsername(event.target.value)}
                                            label='Username'
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            value={props.newName}
                                            onChange={event => props.handleNewName(event.target.value)}
                                            label='Name'
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <FormControl>
                                            <InputLabel id='account-select-auth'>Authority</InputLabel>
                                            <Select
                                                labelId='account-select-auth'
                                                value={props.newAuth}
                                                onChange={event => props.handleNewAuth(event.target.value)}
                                                label='Authority'
                                            >
                                                <MenuItem value='full'>Full</MenuItem>
                                                {props.dbSpread.sheet.map((sheet, i) => {
                                                    return <MenuItem
                                                        key={`mi-${i}`}
                                                        value={sheet.id}
                                                    >{sheet.title}</MenuItem>
                                                })}
                                                <MenuItem value='none'>None</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </TableCell>
                                    <TableCell align='right'>
                                        <FormControl>
                                            <InputLabel id='account-select-type'>Type</InputLabel>
                                            <Select
                                                labelId='account-select-type'
                                                value={props.newType}
                                                onChange={event => props.handleNewType(event.target.value)}
                                                label='Type'
                                            >
                                                <MenuItem value='admin'>Admin</MenuItem>
                                                <MenuItem value='user'>User</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </TableCell>
                                    <TableCell align='right'>
                                        <Button
                                            onClick={() => {
                                                if (props.newUsername.trim() === '') return
                                                props.addAccountRow()}
                                            }
                                        >Add</Button>
                                    </TableCell>
                                    <TableCell align='right'>
                                        <Button
                                            onClick={() => props.clearAccountRow()}
                                        >Clear</Button>
                                    </TableCell>
                                </TableRow>
                            ) : null }
                        </>
                    )
                ) : <TableRow colSpan={6}>Please wait...</TableRow> }
            </TableBody>
        </Table>
    </TableContainer>
}