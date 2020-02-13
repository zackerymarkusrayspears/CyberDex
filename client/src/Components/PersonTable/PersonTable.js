import React from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { 
    TextField,
    Button
} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import RestorePageIcon from '@material-ui/icons/RestorePage';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';

export default (props) => {

    switch (props.editMode) {
        case (props.sheetId):
            return <TableContainer className={`${props.classes.table} ${props.classes.person}`}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell 
                                className={`${props.classes.defaultCell} ${props.classes.headColumnCell}`}
                                colSpan={5}
                            >Modify</TableCell>
                            <TableCell className={props.classes.btnCell}>
                                <Button
                                    className={props.classes.btn}
                                    onClick={() => props.resetDisplay()}
                                >
                                    <RestorePageIcon/>
                                </Button>
                            </TableCell>
                            <TableCell className={props.classes.btnCell}>
                                <Button
                                    className={props.classes.btn}
                                    onClick={() => {
                                        const newSheet = [];
                                        newSheet.push({
                                            id: props.sheetId,
                                            title: props.title,
                                            person: props.person,
                                            meta: props.meta
                                        });
                                        props.putSheet(props.dbSpread.title, newSheet);
                                    }}
                                >
                                    <SaveIcon/>
                                </Button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            {props.editPerson !== 'title' ? (
                                <>
                                    <TableCell 
                                        className={`${props.classes.defaultCell} ${props.classes.headColumnCell}`}
                                        colSpan={5}
                                    >{props.title}</TableCell>
                                    {props.editMode === props.sheetId ? (
                                        <TableCell 
                                            className={props.classes.btnCell}
                                            colSpan={2}
                                            align='right'
                                        >
                                            <Button
                                                className={props.classes.btn}
                                                onClick={() => props.editSheetTitle()}
                                            >
                                                <EditIcon/>
                                            </Button>
                                        </TableCell>
                                    ) : null }
                                </>
                            ) : (
                                <>
                                    <TableCell 
                                        className={props.classes.defaultCell}
                                        colSpan={5}
                                    >
                                        <TextField
                                            className={props.classes.input}
                                            InputLabelProps={{
                                                classes: {
                                                    focused: props.classes.focused
                                                },
                                            }}
                                            InputProps={{
                                                classes: {
                                                    root: props.classes.outline,
                                                    focused: props.classes.focused,
                                                    notchedOutline: props.classes.notchedOutline
                                                },
                                            }}
                                            label={'Title'}
                                            value={props.editTitle}
                                            onChange={event => props.handleSheetTitle(event.target.value)}
                                            error={props.inputError('title', props.editTitle) !== ''}
                                            helperText={props.inputError('title', props.editTitle)}
                                            variant='outlined'
                                        />
                                    </TableCell>
                                    <TableCell className={props.classes.btnCell}>
                                        <Button
                                            className={props.classes.btn}
                                            onClick={() => {
                                                if (props.editTitle.trim() !== '' && props.inputError('title', props.editTitle) === '') props.replaceSheetTitle();
                                            }}
                                        >
                                            <DoneIcon/>
                                        </Button>
                                    </TableCell>
                                    <TableCell className={props.classes.btnCell}>
                                        <Button
                                            className={props.classes.btn}
                                            onClick={() => props.returnPersonRow()}
                                        >
                                            <CloseIcon/>
                                        </Button>
                                    </TableCell>
                                </>
                            )}
                        </TableRow>
                        <TableRow>
                            <TableCell className={`${props.classes.nameCell} ${props.classes.headColumnCell}`}>Name</TableCell>
                            <TableCell className={`${props.classes.tagCell} ${props.classes.headColumnCell}`}>Phone Tag</TableCell>
                            <TableCell 
                                className={`${props.classes.extCell} ${props.classes.headColumnCell}`}
                                align='center'
                            >Extension</TableCell>
                            <TableCell 
                                className={`${props.classes.roomCell} ${props.classes.headColumnCell}`}
                                align='center'
                            >Room</TableCell>
                            <TableCell className={`${props.classes.defaultCell} ${props.classes.headColumnCell}`}>Note</TableCell>
                            <TableCell 
                                className={`${props.classes.defaultCell} ${props.classes.headColumnCell}`}
                                colSpan={2}
                                align='center'
                            >Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {!props.person || props.person.length !== 0 ? (
                            props.person.map((row, i) => {
                                if (row.name === null) return
                                return <TableRow key={`tbr-${i}`}>
                                    {props.editPerson !== i ? (
                                        <>
                                            <TableCell className={props.classes.nameCell}>{row.name}</TableCell>
                                            <TableCell className={props.classes.tagCell}>{row.phoneTag}</TableCell>
                                            <TableCell 
                                                className={props.classes.extCell}
                                                align='center'
                                            >{row.extension}</TableCell>
                                            <TableCell 
                                                className={props.classes.roomCell}
                                                align='center'
                                            >{row.room}</TableCell>
                                            <TableCell className={props.classes.defaultCell}>{row.note}</TableCell>
                                            <TableCell className={props.classes.btnCell}>
                                                <Button
                                                    className={props.classes.btn}
                                                    onClick={() => props.editPersonRow(i, row)}
                                                >
                                                    <EditIcon/>
                                                </Button>
                                            </TableCell>
                                            <TableCell className={props.classes.btnCell}>
                                                <Button
                                                    className={props.classes.btn}
                                                    onClick={() => props.removePersonRow(i, row)}
                                                >
                                                    <DeleteIcon/>
                                                </Button>
                                            </TableCell>
                                        </>
                                    ) : (
                                        <>
                                            <TableCell className={props.classes.nameCell}>
                                                <TextField
                                                    className={props.classes.input}
                                                    InputLabelProps={{
                                                        classes: {
                                                            focused: props.classes.focused
                                                        },
                                                    }}
                                                    InputProps={{
                                                        classes: {
                                                            root: props.classes.outline,
                                                            focused: props.classes.focused,
                                                            notchedOutline: props.classes.notchedOutline
                                                        },
                                                    }}
                                                    label={'Name'}
                                                    value={props.editName}
                                                    onChange={event => props.handleEditName(event.target.value)}
                                                    error={props.inputError('default', props.editName) !== ''}
                                                    helperText={props.inputError('default', props.editName)}
                                                    variant='outlined'
                                                />
                                            </TableCell>
                                            <TableCell className={props.classes.tagCell}>
                                                <TextField
                                                    className={props.classes.input}
                                                    InputLabelProps={{
                                                        classes: {
                                                            focused: props.classes.focused
                                                        },
                                                    }}
                                                    InputProps={{
                                                        classes: {
                                                            root: props.classes.outline,
                                                            focused: props.classes.focused,
                                                            notchedOutline: props.classes.notchedOutline
                                                        },
                                                    }}
                                                    label={'Phone Tag'}
                                                    value={props.editPhoneTag}
                                                    onChange={event => props.handleEditPhoneTag(event.target.value)}
                                                    error={props.inputError('default', props.editPhoneTag) !== ''}
                                                    helperText={props.inputError('default', props.editPhoneTag)}
                                                    variant='outlined'
                                                />
                                            </TableCell>
                                            <TableCell 
                                                className={props.classes.extCell}
                                                align='center'
                                            >
                                                <TextField
                                                    className={props.classes.input}
                                                    InputLabelProps={{
                                                        classes: {
                                                            focused: props.classes.focused
                                                        },
                                                    }}
                                                    InputProps={{
                                                        classes: {
                                                            root: props.classes.outline,
                                                            focused: props.classes.focused,
                                                            notchedOutline: props.classes.notchedOutline
                                                        },
                                                    }}
                                                    label={'Extension'}
                                                    value={props.editExtension}
                                                    onChange={event => props.handleEditExtension(event.target.value)}
                                                    error={props.inputError('small', props.editExtension) !== ''}
                                                    helperText={props.inputError('small', props.editExtension)}
                                                    variant='outlined'
                                                />
                                            </TableCell>
                                            <TableCell 
                                                className={props.classes.roomCell}
                                                align='center'
                                            >
                                                <TextField
                                                    className={props.classes.input}
                                                    InputLabelProps={{
                                                        classes: {
                                                            focused: props.classes.focused
                                                        },
                                                    }}
                                                    InputProps={{
                                                        classes: {
                                                            root: props.classes.outline,
                                                            focused: props.classes.focused,
                                                            notchedOutline: props.classes.notchedOutline
                                                        },
                                                    }}
                                                    label={'Room'}
                                                    value={props.editRoom}
                                                    onChange={event => props.handleEditRoom(event.target.value)}
                                                    error={props.inputError('small', props.editRoom) !== ''}
                                                    helperText={props.inputError('small', props.editRoom)}
                                                    variant='outlined'
                                                />
                                            </TableCell>
                                            <TableCell className={props.classes.defaultCell}>
                                                <TextField
                                                    className={props.classes.input}
                                                    InputLabelProps={{
                                                        classes: {
                                                            focused: props.classes.focused
                                                        },
                                                    }}
                                                    InputProps={{
                                                        classes: {
                                                            root: props.classes.outline,
                                                            focused: props.classes.focused,
                                                            notchedOutline: props.classes.notchedOutline
                                                        },
                                                    }}
                                                    label={'Note'}
                                                    value={props.editNote}
                                                    onChange={event => props.handleEditNote(event.target.value)}
                                                    error={props.inputError('note', props.editNote) !== ''}
                                                    helperText={props.inputError('note', props.editNote)}
                                                    variant='outlined'
                                                />
                                            </TableCell>
                                            <TableCell className={props.classes.btnCell}>
                                                <Button
                                                    className={props.classes.btn}
                                                    onClick={() => {
                                                        if (props.editName.trim() !== '' && (
                                                            props.editPhoneTag.trim() !== '' || 
                                                            props.editExtension.trim() !== '' || 
                                                            props.editRoom.trim() !== '' || 
                                                            props.editNote.trim() !== '') && 
                                                            props.inputError('editPerson') === ''
                                                        ) props.replacePersonRow(i, row.id);
                                                    }}
                                                >
                                                    <DoneIcon/>
                                                </Button>
                                            </TableCell>
                                            <TableCell className={props.classes.btnCell}>
                                                <Button
                                                    className={props.classes.btn}
                                                    onClick={() => props.returnPersonRow()}
                                                >
                                                    <CloseIcon/>
                                                </Button>
                                            </TableCell>
                                        </>
                                    )}
                                </TableRow>
                            })
                        ) : (
                            <TableRow>
                                <TableCell 
                                    className={props.classes.defaultCell}
                                    colSpan={7}
                                >No Information</TableCell>
                            </TableRow>
                        )}
                        <TableRow>
                            <TableCell className={props.classes.nameCell}>
                                <TextField
                                    className={props.classes.input}
                                    InputLabelProps={{
                                        classes: {
                                            focused: props.classes.focused
                                        },
                                    }}
                                    InputProps={{
                                        classes: {
                                            root: props.classes.outline,
                                            focused: props.classes.focused,
                                            notchedOutline: props.classes.notchedOutline
                                        },
                                    }}
                                    label={'Name'}
                                    value={props.newName}
                                    onChange={event => props.handleNewName(event.target.value)}
                                    error={props.inputError('default', props.newName) !== ''}
                                    helperText={props.inputError('default', props.newName)}
                                    variant='outlined'
                                />
                            </TableCell>
                            <TableCell className={props.classes.tagCell}>
                                <TextField
                                    className={props.classes.input}
                                    InputLabelProps={{
                                        classes: {
                                            focused: props.classes.focused
                                        },
                                    }}
                                    InputProps={{
                                        classes: {
                                            root: props.classes.outline,
                                            focused: props.classes.focused,
                                            notchedOutline: props.classes.notchedOutline
                                        },
                                    }}
                                    label={'Phone Tag'}
                                    value={props.newPhoneTag}
                                    onChange={event => props.handleNewPhoneTag(event.target.value)}
                                    error={props.inputError('default', props.newPhoneTag) !== ''}
                                    helperText={props.inputError('default', props.newPhoneTag)}
                                    variant='outlined'
                                />
                            </TableCell>
                            <TableCell 
                                className={props.classes.extCell}
                                align='center'
                            >
                                <TextField
                                    className={props.classes.input}
                                    InputLabelProps={{
                                        classes: {
                                            focused: props.classes.focused
                                        },
                                    }}
                                    InputProps={{
                                        classes: {
                                            root: props.classes.outline,
                                            focused: props.classes.focused,
                                            notchedOutline: props.classes.notchedOutline
                                        },
                                    }}
                                    label={'Extension'}
                                    value={props.newExtension}
                                    onChange={event => props.handleNewExtension(event.target.value)}
                                    error={props.inputError('small', props.newExtension) !== ''}
                                    helperText={props.inputError('small', props.newExtension)}
                                    variant='outlined'
                                />
                            </TableCell>
                            <TableCell 
                                className={props.classes.roomCell}
                                align='center'
                            >
                                <TextField
                                    className={props.classes.input}
                                    InputLabelProps={{
                                        classes: {
                                            focused: props.classes.focused
                                        },
                                    }}
                                    InputProps={{
                                        classes: {
                                            root: props.classes.outline,
                                            focused: props.classes.focused,
                                            notchedOutline: props.classes.notchedOutline
                                        },
                                    }}
                                    label={'Room'}
                                    value={props.newRoom}
                                    onChange={event => props.handleNewRoom(event.target.value)}
                                    error={props.inputError('small', props.newRoom) !== ''}
                                    helperText={props.inputError('small', props.newRoom)}
                                    variant='outlined'
                                />
                            </TableCell>
                            <TableCell className={props.classes.defaultCell}>
                                <TextField
                                    className={props.classes.input}
                                    InputLabelProps={{
                                        classes: {
                                            focused: props.classes.focused
                                        },
                                    }}
                                    InputProps={{
                                        classes: {
                                            root: props.classes.outline,
                                            focused: props.classes.focused,
                                            notchedOutline: props.classes.notchedOutline
                                        },
                                    }}
                                    label={'Note'}
                                    value={props.newNote}
                                    onChange={event => props.handleNewNote(event.target.value)}
                                    error={props.inputError('note', props.newNote) !== ''}
                                    helperText={props.inputError('note', props.newNote)}
                                    variant='outlined'
                                />
                            </TableCell>
                            <TableCell className={props.classes.btnCell}>
                                <Button
                                    className={props.classes.btn}
                                    onClick={() => {
                                        if (props.newName.trim() !== '' && (
                                            props.newPhoneTag.trim() !== '' || 
                                            props.newExtension.trim() !== '' || 
                                            props.newRoom.trim() !== '' || 
                                            props.newNote.trim() !== '') && 
                                            props.inputError('newPerson') === ''
                                        ) props.addPersonRow()
                                    }}
                                >
                                    <AddIcon/>
                                </Button>
                            </TableCell>
                            <TableCell className={props.classes.btnCell}>
                                <Button
                                    className={props.classes.btn}
                                    onClick={() => props.clearPersonRow()}
                                >
                                    <CloseIcon/>
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        
        default:
            return <TableContainer className={`${props.classes.table} ${props.classes.person}`}>
                <Table>
                    <TableHead>
                        {props.account.auth.includes(props.sheetId) || props.account.auth.includes('full') ? (
                            <TableRow>
                                <TableCell className={`${props.classes.defaultCell} ${props.classes.headColumnCell}`}>Modify</TableCell>
                                <TableCell 
                                    className={props.classes.btnCell}
                                    colSpan={4}
                                    align='right'
                                >
                                    <Button
                                        className={props.classes.btn}
                                        onClick={() => props.setEditMode(props.sheetId)}
                                    >
                                        <EditIcon/>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ) : null }
                        <TableRow>
                            <TableCell 
                                className={`${props.classes.defaultCell} ${props.classes.headColumnCell}`}
                                colSpan={5}
                            >{props.title}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className={`${props.classes.nameCell} ${props.classes.headColumnCell}`}>Name</TableCell>
                            <TableCell className={`${props.classes.tagCell} ${props.classes.headColumnCell}`}>Phone Tag</TableCell>
                            <TableCell 
                                className={`${props.classes.extCell} ${props.classes.headColumnCell}`}
                                align='center'
                            >Extension</TableCell>
                            <TableCell 
                                className={`${props.classes.roomCell} ${props.classes.headColumnCell}`}
                                align='center'
                            >Room</TableCell>
                            <TableCell className={`${props.classes.defaultCell} ${props.classes.headColumnCell}`}>Note</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {!props.person || props.person.length !== 0 ? (
                            props.person.map((row, i) => {
                                if (row.name === null) return
                                return <TableRow key={`tbr-${i}`}>
                                    <TableCell className={props.classes.nameCell}>{row.name}</TableCell>
                                    <TableCell className={props.classes.tagCell}>{row.phoneTag}</TableCell>
                                    <TableCell 
                                        className={props.classes.extCell}
                                        align='center'
                                    >{row.extension}</TableCell>
                                    <TableCell 
                                        className={props.classes.roomCell}
                                        align='center'
                                    >{row.room}</TableCell>
                                    <TableCell className={props.classes.defaultCell}>{row.note}</TableCell>
                                </TableRow>
                            })
                        ) : (
                            <TableRow>
                                <TableCell 
                                    className={props.classes.defaultCell}
                                    colSpan={5}
                                >No Information</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
    }
}