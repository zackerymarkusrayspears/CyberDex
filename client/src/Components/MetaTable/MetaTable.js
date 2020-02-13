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
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';

export default (props) => {

    switch (props.editMode) {
        case (props.sheetId):
            return <TableContainer className={props.classes.table}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell className={`${props.classes.defaultCell} ${props.classes.headColumnCell}`}>Line</TableCell>
                            <TableCell className={`${props.classes.defaultCell} ${props.classes.headColumnCell}`}>Number</TableCell>
                            <TableCell 
                                className={`${props.classes.defaultCell} ${props.classes.headColumnCell}`}
                                colSpan={2}
                                align='center'
                            >Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {!props.meta || props.meta.length !== 0 ? (
                            props.meta.map((row, i) => {
                                if (row.line === null && row.number === null) return
                                return <TableRow key={`tbr-${i}`}>
                                    {props.editMeta !== i ? (
                                        <>
                                            <TableCell className={props.classes.defaultCell}>{row.line}</TableCell>
                                            <TableCell className={props.classes.defaultCell}>{row.number}</TableCell>
                                            {props.editMode === props.sheetId ? (
                                                <>
                                                    <TableCell className={props.classes.btnCell}>
                                                        <Button
                                                            className={props.classes.btn}
                                                            onClick={() => props.editMetaRow(i, row)}
                                                        >
                                                            <EditIcon/>
                                                        </Button>
                                                    </TableCell>
                                                    <TableCell className={props.classes.btnCell}>
                                                        <Button
                                                            className={props.classes.btn}
                                                            onClick={() => props.removeMetaRow(i, row)}
                                                        >
                                                            <DeleteIcon/>
                                                        </Button>
                                                    </TableCell>
                                                </>
                                            ) : null }
                                        </>
                                    ) : (
                                        <>
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
                                                    label={'Line'}
                                                    value={props.editLine}
                                                    onChange={event => props.handleEditLine(event.target.value)}
                                                    error={props.inputError('default', props.editLine) !== ''}
                                                    helperText={props.inputError('default', props.editLine)}
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
                                                    label={'Number'}
                                                    value={props.editNumber}
                                                    onChange={event => props.handleEditNumber(event.target.value)}
                                                    error={props.inputError('default', props.editNumber) !== ''}
                                                    helperText={props.inputError('default', props.editNumber)}
                                                    variant='outlined'
                                                />
                                            </TableCell>
                                            <TableCell className={props.classes.btnCell}>
                                                <Button
                                                    className={props.classes.btn}
                                                    onClick={() => {
                                                        if (props.editLine.trim() !== '' && props.editNumber.trim() !== '' && props.inputError('editMeta') === '') props.replaceMetaRow(i, row.id);
                                                    }}
                                                >
                                                    <DoneIcon/>
                                                </Button>
                                            </TableCell>
                                            <TableCell className={props.classes.btnCell}>
                                                <Button
                                                    className={props.classes.btn}
                                                    onClick={() => props.returnMetaRow()}
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
                                    colSpan={4}
                                >No Information</TableCell>
                            </TableRow>
                        )}
                        <TableRow>
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
                                    label={'Line'}
                                    value={props.newLine}
                                    onChange={event => props.handleNewLine(event.target.value)}
                                    error={props.inputError('default', props.newLine) !== ''}
                                    helperText={props.inputError('default', props.newLine)}
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
                                    label={'Number'}
                                    value={props.newNumber}
                                    onChange={event => props.handleNewNumber(event.target.value)}
                                    error={props.inputError('default', props.newNumber) !== ''}
                                    helperText={props.inputError('default', props.newNumber)}
                                    variant='outlined'
                                />
                            </TableCell>
                            <TableCell className={props.classes.btnCell}>
                                <Button
                                    className={props.classes.btn}
                                    onClick={() => {
                                        if (props.newLine.trim() !== '' && props.newNumber.trim() !== '' && props.inputError('newMeta') === '') props.addMetaRow();
                                    }}
                                >
                                    <AddIcon/>
                                </Button>
                            </TableCell>
                            <TableCell className={props.classes.btnCell}>
                                <Button
                                    className={props.classes.btn}
                                    onClick={() => props.clearMetaRow()}
                                >
                                    <CloseIcon/>
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        
        default:
            return <TableContainer className={props.classes.table}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell className={`${props.classes.defaultCell} ${props.classes.headColumnCell}`}>Line</TableCell>
                            <TableCell className={`${props.classes.defaultCell} ${props.classes.headColumnCell}`}>Number</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {!props.meta || props.meta.length !== 0 ? (
                            props.meta.map((row, i) => {
                                if (row.line === null && row.number == null) return
                                return <TableRow key={`tbr-${i}`}>
                                    <TableCell className={props.classes.defaultCell}>{row.line}</TableCell>
                                    <TableCell className={props.classes.defaultCell}>{row.number}</TableCell>
                                </TableRow>
                            })
                        ) : (
                            <TableRow>
                                <TableCell 
                                    className={props.classes.defaultCell}
                                    colSpan={2}
                                >No Information</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
    }
}