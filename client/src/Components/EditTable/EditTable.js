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
import FindInPageIcon from '@material-ui/icons/FindInPage';
import SaveIcon from '@material-ui/icons/Save';
import RestorePageIcon from '@material-ui/icons/RestorePage';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';

export default (props) => {

    switch (props.editMode) {
        case (true):
            return<TableContainer className={props.classes.table}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell 
                                className={`${props.classes.defaultCell} ${props.classes.headColumnCell}`}
                                colSpan={3}
                            >Modify</TableCell>
                            <TableCell className={props.classes.btnCell}>
                                <Button 
                                    className={props.classes.btn}
                                    onClick={() => props.returnSpread()}
                                >
                                    <RestorePageIcon/>
                                </Button>
                            </TableCell>
                            <TableCell className={props.classes.btnCell}>
                                <Button 
                                    className={props.classes.btn}
                                    onClick={() => {
                                        props.putSheet(props.spreadTitle, props.display)
                                    }}
                                >
                                    <SaveIcon/>
                                </Button>
                            </TableCell>
                        </TableRow>
                            {props.editSheet !== 'title' ? (
                                <TableRow>
                                    <TableCell 
                                        className={`${props.classes.defaultCell} ${props.classes.headColumnCell}`}
                                        colSpan={4}
                                    >{props.spreadTitle}</TableCell>
                                    <TableCell 
                                        className={props.classes.btnCell}
                                        align='right'
                                    >
                                        <Button
                                            className={props.classes.btn}
                                            onClick={() => props.editSpreadTitleRow()}
                                        >
                                            <EditIcon/>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                <TableRow>
                                    <TableCell 
                                        className={props.classes.defaultCell}
                                        colSpan={3}
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
                                            label={'Spreadsheet Title'}
                                            value={props.editSpreadTitle}
                                            onChange={event => props.handleSpreadTitle(event.target.value)}
                                            error={props.spreadError() !== ''}
                                            helperText={props.spreadError()}
                                            variant='outlined'
                                        />
                                    </TableCell>
                                    <TableCell className={props.classes.btnCell}>
                                        <Button
                                            className={props.classes.btn}
                                            onClick={() => {
                                                if (props.editSpreadTitle.trim() !== '' && props.spreadError() === '') props.replaceSpreadTitleRow();
                                            }}
                                        >
                                            <DoneIcon/>
                                        </Button>
                                    </TableCell>
                                    <TableCell className={props.classes.btnCell}>
                                        <Button
                                            className={props.classes.btn}
                                            onClick={() => props.returnSheetRow()}
                                        >
                                            <CloseIcon/>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            )}
                            <TableRow>
                                <TableCell className={`${props.classes.defaultCell} ${props.classes.headColumnCell}`}>Sheet Title</TableCell>
                                <TableCell 
                                    className={`${props.classes.entriesCell} ${props.classes.headColumnCell}`}
                                    align='center'
                                >Person Entries</TableCell>
                                <TableCell 
                                    className={`${props.classes.entriesCell} ${props.classes.headColumnCell}`}
                                    align='center'
                                >Meta Entries</TableCell>
                                {props.display.length !== 0 ? (
                                    <TableCell 
                                        className={props.classes.btnCell}
                                        colSpan={2}
                                        align='right'
                                    >
                                        <Button
                                            className={props.classes.btn}
                                            onClick={() => props.removeAllSheet()}
                                        >
                                            <DeleteSweepIcon/>
                                        </Button>
                                    </TableCell>
                                ) : (
                                    <TableCell 
                                        className={props.classes.btnCell}
                                        colSpan={2}
                                        align='right'
                                    >
                                        <Button
                                            className={props.classes.btn}
                                            disabled
                                        >
                                            <DeleteSweepIcon/>
                                        </Button>
                                    </TableCell>
                                )}
                            </TableRow>
                    </TableHead>
                    <TableBody>
                        {!props.display || props.display.length !== 0 ? (
                            props.display.map((sheet, i) => {
                                return <TableRow key={`tbr-${i}`}>
                                    {props.editSheet !== sheet.id ? (
                                        <>
                                            <TableCell className={props.classes.defaultCell}>{sheet.title}</TableCell>
                                            <TableCell 
                                                className={props.classes.entriesCell}
                                                align='center'
                                            >{sheet.person.length}</TableCell>
                                            <TableCell 
                                                className={props.classes.entriesCell}
                                                align='center'
                                            >{sheet.meta.length}</TableCell>
                                            <TableCell className={props.classes.btnCell}>
                                                <Button
                                                    className={props.classes.btn}
                                                    onClick={() => props.editSheetRow(sheet.id, sheet)}
                                                >
                                                    <EditIcon/>
                                                </Button>
                                            </TableCell>
                                            <TableCell className={props.classes.btnCell}>
                                                <Button
                                                    className={props.classes.btn}
                                                    onClick={() => props.removeSheetRow(i, sheet.id)}
                                                >
                                                    <DeleteIcon/>
                                                </Button>
                                            </TableCell>
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
                                                    label={'Title'}
                                                    value={props.editTitle}
                                                    onChange={event => props.handleEditTitle(event.target.value)}
                                                    error={props.sheetError(props.editTitle) !== ''}
                                                    helperText={props.sheetError(props.editTitle)}
                                                    variant='outlined'
                                                />
                                            </TableCell>
                                            <TableCell 
                                                className={props.classes.entriesCell}
                                                align='center'
                                            >{sheet.person.length}</TableCell>
                                            <TableCell 
                                                className={props.classes.entriesCell}
                                                align='center'
                                            >{sheet.meta.length}</TableCell>
                                            <TableCell className={props.classes.btnCell}>
                                                <Button
                                                    className={props.classes.btn}
                                                    onClick={() => {
                                                        if (props.editTitle.trim() !== '' && props.sheetError(props.editTitle) === '') props.replaceSheetRow(i, sheet);
                                                    }}
                                                >
                                                    <DoneIcon/>
                                                </Button>
                                            </TableCell>
                                            <TableCell className={props.classes.btnCell}>
                                                <Button
                                                    className={props.classes.btn}
                                                    onClick={() => props.returnSheetRow()}
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
                                    colSpan={5}
                                >No Sheets</TableCell>
                            </TableRow>
                        )}
                        <TableRow>
                            <TableCell 
                                className={props.classes.defaultCell}
                                colSpan={3}
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
                                    value={props.newTitle}
                                    onChange={event => props.handleNewTitle(event.target.value)}
                                    error={props.sheetError(props.newTitle) !== ''}
                                    helperText={props.sheetError(props.newTitle)}
                                    variant='outlined'
                                />
                            </TableCell>
                            <TableCell className={props.classes.btnCell}>
                                <Button
                                    className={props.classes.btn}
                                    onClick={() => {
                                        if (props.newTitle.trim() !== '' && props.sheetError(props.newTitle) === '') props.addSheetRow();
                                    }}
                                >
                                    <AddIcon/>
                                </Button>
                            </TableCell>
                            <TableCell  className={props.classes.btnCell}>
                                <Button
                                    className={props.classes.btn}
                                    onClick={() => props.clearSheetRow()}
                                >
                                    <CloseIcon/>
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        
        default:
            return<TableContainer className={props.classes.table}>
                <Table>
                    <TableHead>
                        {props.googleSheet.length !== 0 ? (
                            <>
                                <TableRow>
                                    <TableCell 
                                        className={`${props.classes.defaultCell} ${props.classes.headColumnCell}`}
                                        colSpan={2}
                                    >Modify</TableCell>
                                    <TableCell 
                                        className={props.classes.btnCell}
                                        align='right'
                                    >
                                        <Button
                                            className={props.classes.btn}
                                            onClick={() => props.clearGoogle()}
                                        >
                                            <RestorePageIcon/>
                                        </Button>
                                    </TableCell>
                                    <TableCell className={props.classes.btnCell}>
                                        <Button
                                            className={props.classes.btn}
                                            onClick={() => props.mergeSpread()}
                                        >
                                            <SaveIcon/>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell 
                                        className={`${props.classes.defaultCell} ${props.classes.headColumnCell}`}
                                        colSpan={4}
                                    >Google Sheet Results</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className={`${props.classes.defaultCell} ${props.classes.headColumnCell}`}>Sheet</TableCell>
                                    <TableCell
                                        className={`${props.classes.entriesCell} ${props.classes.headColumnCell}`}
                                        align='center'
                                    >Person Entries</TableCell>
                                    <TableCell 
                                        className={`${props.classes.entriesCell} ${props.classes.headColumnCell}`}
                                        align='center'
                                    >Meta Entries</TableCell>
                                    <TableCell className={props.classes.btnCell}>
                                        <Button
                                            className={props.classes.btn}
                                            onClick={() => props.removeAllGoogle()}
                                        >
                                            <DeleteSweepIcon/>
                                        </Button>
                                    </TableCell> 
                                </TableRow>
                            </>
                        ) : (
                            <>
                                <TableRow>
                                    <TableCell 
                                        className={`${props.classes.defaultCell} ${props.classes.headColumnCell}`}
                                        colSpan={2}
                                    >Modify</TableCell>
                                    <TableCell 
                                        className={props.classes.btnCell}
                                        align='right'
                                    >
                                        <Button 
                                            className={props.classes.btn}
                                            onClick={() => props.toggleGoogleSearch()}
                                        >
                                            <FindInPageIcon/>
                                        </Button>
                                        <Button 
                                            className={props.classes.btn}
                                            style={{ marginLeft: '16px' }}
                                            onClick={() => props.toggleEditMode()}
                                        >
                                            <EditIcon/>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell 
                                        className={`${props.classes.defaultCell} ${props.classes.headColumnCell}`}
                                        colSpan={3}
                                    >{props.spreadTitle}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className={`${props.classes.defaultCell} ${props.classes.headColumnCell}`}>Sheet</TableCell>
                                    <TableCell 
                                        className={`${props.classes.entriesCell} ${props.classes.headColumnCell}`}
                                        align='center'
                                    >Person Entries</TableCell>
                                    <TableCell 
                                        className={`${props.classes.entriesCell} ${props.classes.headColumnCell}`}
                                        align='center'
                                    >Meta Entries</TableCell>
                                </TableRow>
                            </>
                        )}
                    </TableHead>
                    <TableBody>
                        {props.googleSheet.length !== 0 ? (
                            props.googleSheet.map((sheet, i) => {
                                return <TableRow key={`tbr-${i}`}>
                                    <TableCell className={props.classes.defaultCell}>{sheet.title}</TableCell>
                                    <TableCell 
                                        className={props.classes.entriesCell}
                                        align='center'
                                    >{sheet.person.length}</TableCell>
                                    <TableCell 
                                        className={props.classes.entriesCell}
                                        align='center'
                                    >{sheet.meta.length}</TableCell>
                                    <TableCell className={props.classes.btnCell}>
                                        <Button
                                            className={props.classes.btn}
                                            onClick={() => props.removeGoogleSheet(i)}
                                        >
                                            <CloseIcon/>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            })
                        ) : (
                            !props.display || props.display.length !== 0 ? (
                                props.display.map((sheet, i) => {
                                    return <TableRow key={`tbr-${i}`}>
                                        <TableCell className={props.classes.defaultCell}>{sheet.title}</TableCell>
                                        <TableCell 
                                            className={props.classes.entriesCell}
                                            align='center'
                                        >{sheet.person.length}</TableCell>
                                        <TableCell 
                                            className={props.classes.entriesCell}
                                            align='center'
                                        >{sheet.meta.length}</TableCell>
                                    </TableRow>
                                })
                            ) : (
                                <TableRow>
                                    <TableCell 
                                        className={props.classes.defaultCell}
                                        colSpan={3}
                                    >No Sheets</TableCell>
                                </TableRow>
                            )
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
    }
} 