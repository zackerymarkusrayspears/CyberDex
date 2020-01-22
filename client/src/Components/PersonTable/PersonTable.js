import React from 'react';
import './PersonTable.css';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import { 
    TextField,
    Button
} from '@material-ui/core';

export default function PersonTable(props) {

    return <TableContainer 
        component={Paper}
        className='personTable'
    >
        <Table>
            <TableHead>
                <TableRow>
                    {props.editPerson !== 'title' ? (
                        <>
                            <TableCell colSpan={5}>{props.title}</TableCell>
                            {props.editMode === props.sheetId ? (
                                <TableCell colSpan={2} align='right'>
                                    <Button
                                        onClick={() => props.editSheetTitle()}
                                    >Edit</Button>
                                </TableCell>
                            ) : null }
                        </>
                    ) : (
                        <>
                            <TableCell colSpan={5}>
                                <TextField
                                    value={props.editTitle}
                                    onChange={event => props.handleSheetTitle(event.target.value)}
                                    label={'Title'}
                                />
                            </TableCell>
                            <TableCell align='right'>
                                <Button
                                    onClick={() => {
                                        if (props.editTitle.trim() === '') return props.returnPersonRow();
                                        props.replaceSheetTitle();
                                    }}
                                >Replace</Button>
                            </TableCell>
                            <TableCell align='right'>
                                <Button
                                    onClick={() => props.returnPersonRow()}
                                >Return</Button>
                            </TableCell>
                        </>
                    )}
                </TableRow>
                <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Phone Tag</TableCell>
                    <TableCell>Extension</TableCell>
                    <TableCell>Room</TableCell>
                    <TableCell>Note</TableCell>
                    {props.editMode === props.sheetId ? (
                        <TableCell 
                            colSpan={2}
                            align='right'
                        >Actions</TableCell>
                    ) : '' }
                </TableRow>
            </TableHead>
            <TableBody>
                {props.personData.map((row, i) => (
                <TableRow key={`tbr-${i}`}>
                    {props.editPerson !== i ? (
                        <>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.phoneTag}</TableCell>
                            <TableCell>{row.extension}</TableCell>
                            <TableCell>{row.room}</TableCell>
                            <TableCell>{row.note}</TableCell>
                            {props.editMode === props.sheetId ? (
                                <>
                                    <TableCell align='right'>
                                        <Button
                                            onClick={() => {
                                                props.editPersonRow(
                                                    i, 
                                                    row.name, 
                                                    row.phoneTag, 
                                                    row.extension, 
                                                    row.room, 
                                                    row.note
                                                )
                                            }}
                                        >Edit</Button>
                                    </TableCell>
                                    <TableCell align='right'>
                                        <Button
                                            onClick={() => props.removePersonRow(i, row.id)}
                                        >Delete</Button>
                                    </TableCell>
                                </>
                            ) : null }
                        </>
                    ) : (
                        <>
                            <TableCell>
                                <TextField
                                    value={props.editName}
                                    onChange={event => props.handleEditName(event.target.value)}
                                    label={'Name'}
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                    value={props.editPhoneTag}
                                    onChange={event => props.handleEditPhoneTag(event.target.value)}
                                    label={'Phone Tag'}
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                    value={props.editExtension}
                                    onChange={event => props.handleEditExtension(event.target.value)}
                                    label={'Extension'}
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                    value={props.editRoom}
                                    onChange={event => props.handleEditRoom(event.target.value)}
                                    label={'Room'}
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                    value={props.editNote}
                                    onChange={event => props.handleEditNote(event.target.value)}
                                    label={'Note'}
                                />
                            </TableCell>
                            <TableCell align='right'>
                                <Button
                                    onClick={() => {
                                        if (props.editName.trim() === '' && props.editPhoneTag.trim() === '' && props.editExtension.trim() === '' && props.editRoom.trim() === '' && props.editNote.trim() === '') return props.returnPersonRow();
                                        props.replacePersonRow(i, row.id);
                                    }}
                                >Replace</Button>
                            </TableCell>
                            <TableCell align='right'>
                                <Button
                                    onClick={() => props.returnPersonRow()}
                                >Return</Button>
                            </TableCell>
                        </>
                    )}
                </TableRow>
                ))}
                {props.editMode === props.sheetId ? (
                    <TableRow>
                        <TableCell>
                            <TextField
                                value={props.newName}
                                onChange={event => props.handleNewName(event.target.value)}
                                label={'Name'}
                            />
                        </TableCell>
                        <TableCell>
                            <TextField
                                value={props.newPhoneTag}
                                onChange={event => props.handleNewPhoneTag(event.target.value)}
                                label={'Phone Tag'}
                            />
                        </TableCell>
                        <TableCell>
                            <TextField
                                value={props.newExtension}
                                onChange={event => props.handleNewExtension(event.target.value)}
                                label={'Extension'}
                            />
                        </TableCell>
                        <TableCell>
                            <TextField
                                value={props.newRoom}
                                onChange={event => props.handleNewRoom(event.target.value)}
                                label={'Room'}
                            />
                        </TableCell>
                        <TableCell>
                            <TextField
                                value={props.newNote}
                                onChange={event => props.handleNewNote(event.target.value)}
                                label={'Note'}
                            />
                        </TableCell>
                        <TableCell align='right'>
                            <Button
                                onClick={() => {
                                    if (props.newName.trim() === '' && props.newPhoneTag.trim() === '' && props.newExtension.trim() === '' && props.newRoom.trim() === '' && props.newNote.trim() === '') return
                                    props.addPersonRow()
                                }}
                            >Add</Button>
                        </TableCell>
                        <TableCell align='right'>
                            <Button
                                onClick={() => props.clearPersonRow()}
                            >Clear</Button>
                        </TableCell>
                    </TableRow>
                ) : null }
            </TableBody>
        </Table>
    </TableContainer>
}