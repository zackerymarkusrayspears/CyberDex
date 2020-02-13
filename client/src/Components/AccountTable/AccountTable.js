import React from 'react';
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
    TextField,
    Button,
} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import RestorePageIcon from '@material-ui/icons/RestorePage';
import SecurityIcon from '@material-ui/icons/Security';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';

export default (props) => {

    switch (props.editMode) {
        case (true):
            return <TableContainer className={props.classes.table}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell 
                                className={`${props.classes.defaultCell} ${props.classes.headColumnCell}`}
                                colSpan={5}
                            >{props.dbSpread.title}</TableCell>
                            <TableCell className={props.classes.btnCell}>
                                <Button
                                    className={props.classes.btn}
                                    onClick={() => props.returnAccount()}
                                >
                                    <RestorePageIcon/>
                                </Button>
                            </TableCell>
                            <TableCell className={props.classes.btnCell}>
                                <Button
                                    className={props.classes.btn}
                                    onClick={() => props.saveAccount()}
                                >
                                    <SaveIcon/>
                                </Button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className={`${props.classes.defaultCell} ${props.classes.headColumnCell}`}>Username</TableCell>
                            <TableCell className={`${props.classes.defaultCell} ${props.classes.headColumnCell}`}>Name</TableCell>
                            <TableCell 
                                 className={`${props.classes.authCell} ${props.classes.headColumnCell}`}
                                align='center'
                            >Authority</TableCell>
                            <TableCell 
                                 className={`${props.classes.typeCell} ${props.classes.headColumnCell}`}
                                align='center'
                            >Type</TableCell>
                            <TableCell 
                                 className={`${props.classes.defaultCell} ${props.classes.headColumnCell}`}
                                colSpan={3} 
                                align='center'
                            >Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.display ? (
                            <>
                                {props.display.map((acc, i) => {
                                    return <TableRow key={`tr-${i}`}>
                                        {props.editAccount !== acc.id ? (
                                            props.editAccount !== `pass-${acc.id}` ? (
                                                <>
                                                    <TableCell className={props.classes.defaultCell}>{acc.username}</TableCell>
                                                    <TableCell className={props.classes.defaultCell}>{acc.name}</TableCell>
                                                    <TableCell 
                                                        className={props.classes.authCell}
                                                        align='center'
                                                    >{props.renderRowAuth(acc.auth)}</TableCell>
                                                    <TableCell 
                                                        className={props.classes.typeCell}
                                                        align='center'
                                                    >
                                                        {acc.type === 'master' ? 'Master' : 
                                                            acc.type === 'admin' ? 'Admin' : 'User'
                                                        }
                                                    </TableCell>
                                                    {props.account.id === acc.id ? (
                                                        props.account.type !== 'master' ? (
                                                            <>
                                                                <TableCell className={props.classes.btnCell}>
                                                                    <Button
                                                                        className={props.classes.btn}
                                                                        onClick={() => props.editAccountRow(`pass-${acc.id}`, acc)}
                                                                    >
                                                                        <SecurityIcon/>
                                                                    </Button>
                                                                </TableCell>
                                                                <TableCell className={props.classes.btnCell}>
                                                                    <Button
                                                                        className={props.classes.btn}
                                                                        onClick={() => props.editAccountRow(acc.id, acc)}
                                                                    >
                                                                        <EditIcon/>
                                                                    </Button>
                                                                </TableCell>
                                                                <TableCell className={props.classes.btnCell}>
                                                                    <Button
                                                                        className={props.classes.btn}
                                                                        onClick={() => props.removeAccountRow(i, acc.id)}
                                                                    >
                                                                        <DeleteIcon/>
                                                                    </Button>
                                                                </TableCell>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <TableCell 
                                                                    className={props.classes.btnCell}
                                                                    colSpan={2}
                                                                    align='right'
                                                                >
                                                                    <Button
                                                                        className={props.classes.btn}
                                                                        onClick={() => props.editAccountRow(`pass-${acc.id}`, acc)}
                                                                    >
                                                                        <SecurityIcon/>
                                                                    </Button>
                                                                </TableCell>
                                                                <TableCell className={props.classes.btnCell}>
                                                                    <Button
                                                                        className={props.classes.btn}
                                                                        onClick={() => props.editAccountRow(acc.id, acc)}
                                                                    >
                                                                        <EditIcon/>
                                                                    </Button>
                                                                </TableCell>
                                                            </>
                                                        ) 
                                                    ) : (
                                                        acc.type !== 'master' ? (
                                                            <>
                                                                {!acc.auth.includes('lock') ? (
                                                                    props.account.type !== 'master' && acc.type === 'user' ? (
                                                                        <TableCell 
                                                                            className={props.classes.btnCell}
                                                                            colSpan={2}
                                                                            align='right'
                                                                        >
                                                                            <Button
                                                                                className={props.classes.btn}
                                                                                onClick={() => props.toggleLock(i, acc)}
                                                                            >
                                                                                <LockIcon/>
                                                                            </Button>
                                                                        </TableCell>
                                                                    ) : (
                                                                        <TableCell className={props.classes.btnCell}>
                                                                            <Button
                                                                                className={props.classes.btn}
                                                                                onClick={() => props.toggleLock(i, acc)}
                                                                            >
                                                                                <LockIcon/>
                                                                            </Button>
                                                                        </TableCell>
                                                                    )
                                                                ) : (
                                                                    props.account.type !== 'master' && acc.type === 'user' ? (
                                                                        <TableCell 
                                                                            className={props.classes.btnCell}
                                                                            colSpan={2}
                                                                            align='right'
                                                                        >
                                                                            <Button
                                                                                className={props.classes.btn}
                                                                                onClick={() => props.toggleLock(i, acc)}
                                                                            >
                                                                                <LockOpenIcon/>
                                                                            </Button>
                                                                        </TableCell>
                                                                    ) : (
                                                                        <TableCell className={props.classes.btnCell}>
                                                                            <Button
                                                                                className={props.classes.btn}
                                                                                onClick={() => props.toggleLock(i, acc)}
                                                                            >
                                                                                <LockOpenIcon/>
                                                                            </Button>
                                                                        </TableCell>
                                                                    )
                                                                )}
                                                                {props.account.type === 'master' ? (
                                                                    <TableCell className={props.classes.btnCell}>
                                                                        <Button
                                                                            className={props.classes.btn}
                                                                            onClick={() => props.editAccountRow(acc.id, acc)}
                                                                        >
                                                                            <EditIcon/>
                                                                        </Button>
                                                                    </TableCell>
                                                                ) : null }
                                                                <TableCell className={props.classes.btnCell}>
                                                                    <Button
                                                                        className={props.classes.btn}
                                                                        onClick={() => props.removeAccountRow(i, acc.username)}
                                                                    >
                                                                        <DeleteIcon/>
                                                                    </Button>
                                                                </TableCell>
                                                            </>
                                                        ) : (
                                                            <TableCell
                                                                className={props.classes.defaultCell}
                                                                colSpan={3}
                                                                align='center'
                                                            >Master Account</TableCell>
                                                        )
                                                    )}
                                                </>
                                            ) : (
                                                <>
                                                    <TableCell 
                                                        className={props.classes.defaultCell}
                                                        colSpan={2}
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
                                                            label={'New Password'}
                                                            type='password'
                                                            value={props.newPassword}
                                                            onChange={event => props.handleNewPass(event.target.value)}
                                                            error={props.passError(props.newPassword) !== ''}
                                                            helperText={props.passError(props.newPassword)}
                                                            variant='outlined'
                                                        />
                                                    </TableCell>
                                                    <TableCell 
                                                        className={props.classes.defaultCell}
                                                        colSpan={2}
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
                                                            label={'Confirm Password'}
                                                            type='password'
                                                            value={props.reNewPassword}
                                                            onChange={event => props.handleReNew(event.target.value)}
                                                            error={props.passError(props.reNewPassword) !== ''}
                                                            helperText={props.passError(props.reNewPassword)}
                                                            variant='outlined'
                                                        />
                                                    </TableCell>
                                                    <TableCell 
                                                        className={props.classes.btnCell}
                                                        colSpan={2}
                                                        align='right'
                                                    >
                                                        <Button
                                                            className={props.classes.btn}
                                                            onClick={() => {
                                                                if (props.newPassword !== '' && props.reNewPassword !== '' && props.passError(props.newPassword) === '' && props.passError(props.reNewPassword) === '' && props.passError() === '') props.savePass();
                                                            }}
                                                        >
                                                            <DoneIcon/>
                                                        </Button>
                                                    </TableCell>
                                                    <TableCell className={props.classes.btnCell}>
                                                        <Button
                                                            className={props.classes.btn}
                                                            onClick={() => props.returnAccountRow()}
                                                        >
                                                            <CloseIcon/>
                                                        </Button>
                                                    </TableCell>
                                                </>
                                            )
                                        ) : (
                                            <>
                                                {props.account.id === acc.id ? (
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
                                                                label='Username'
                                                                value={props.editUsername}
                                                                onChange={event => props.handleEditUsername(event.target.value)}
                                                                error={props.editError('username', props.editUsername) !== ''}
                                                                helperText={props.editError('username', props.editUsername)}
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
                                                                label='Name'
                                                                value={props.editName}
                                                                onChange={event => props.handleEditName(event.target.value)}
                                                                error={props.editError('name', props.editName) !== ''}
                                                                helperText={props.editError('name', props.editName)}
                                                                variant='outlined'
                                                            />
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
                                                                    readOnly: true,
                                                                    classes: {
                                                                        root: props.classes.outline,
                                                                        focused: props.classes.focused,
                                                                        notchedOutline: props.classes.notchedOutline
                                                                    },
                                                                }}
                                                                label='Username'
                                                                value={props.editUsername}
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
                                                                    readOnly: true,
                                                                    classes: {
                                                                        root: props.classes.outline,
                                                                        focused: props.classes.focused,
                                                                        notchedOutline: props.classes.notchedOutline
                                                                    },
                                                                }}
                                                                label='Name'
                                                                value={props.editName}
                                                                variant='outlined'
                                                            />
                                                        </TableCell>
                                                    </>
                                                )}
                                                <TableCell 
                                                    className={props.classes.authCell}
                                                    align='center'
                                                >
                                                    <FormControl 
                                                        className={props.classes.input}
                                                        variant='outlined'
                                                        color='secondary'
                                                    >
                                                        <InputLabel 
                                                            id='account-edit-auth'
                                                            className={props.classes.focused}
                                                        >Authority</InputLabel>
                                                        {props.account.type === 'master' && props.account.id !== acc.id ? (
                                                            <Select
                                                                labelId='account-edit-auth'
                                                                value={props.editAuth[0]}
                                                                onChange={event => props.handleEditAuth(event.target.value)}
                                                                labelWidth={65}
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
                                                        ) : (
                                                            <Select
                                                                labelId='account-edit-auth'
                                                                value={props.editAuth[0]}
                                                                inputProps={{ readOnly: true }}
                                                                labelWidth={65}
                                                            >
                                                                <MenuItem value={props.editAuth[0]}>
                                                                    {props.renderRowAuth(props.editAuth)}
                                                                </MenuItem>
                                                            </Select>
                                                        )}
                                                    </FormControl>
                                                </TableCell>
                                                <TableCell 
                                                    className={props.classes.typeCell}
                                                    align='center'
                                                >
                                                    <FormControl 
                                                        className={props.classes.input}
                                                        variant='outlined'
                                                        color='secondary'
                                                    >
                                                        <InputLabel 
                                                            id='account-edit-type'
                                                            className={props.classes.focused}
                                                        >Type</InputLabel>
                                                        {props.account.type === 'master' && props.account.id !== acc.id ? (
                                                            <Select
                                                                labelId='account-edit-type'
                                                                value={props.editType}
                                                                onChange={event => props.handleEditType(event.target.value)}
                                                                labelWidth={38}
                                                            >
                                                                <MenuItem value='admin'>Admin</MenuItem>
                                                                <MenuItem value='user'>User</MenuItem>
                                                            </Select>
                                                        ) : (
                                                            <Select
                                                                labelId='account-edit-type'
                                                                value={props.editType}
                                                                inputProps={{ readOnly: true }}
                                                                labelWidth={38}
                                                            >
                                                                <MenuItem value={props.editType}>
                                                                    {props.editType === 'master' ? 'Master' : 
                                                                props.editType === 'admin' ? 'Admin' : 'User'}
                                                                </MenuItem>
                                                            </Select>
                                                        )}
                                                    </FormControl>
                                                </TableCell>
                                                <TableCell 
                                                    className={props.classes.btnCell}
                                                    colSpan={2}
                                                    align='right'
                                                >
                                                    <Button
                                                        className={props.classes.btn}
                                                        onClick={() => {
                                                            if (props.editUsername !== '' && props.editName !== '' && props.editError('all') === '') {
                                                                props.returnAccountRow();
                                                                props.replaceAccountRow(i, acc);
                                                            }
                                                        }}
                                                    >
                                                        <DoneIcon/>
                                                    </Button>
                                                </TableCell>
                                                <TableCell className={props.classes.btnCell}>
                                                    <Button
                                                        className={props.classes.btn}
                                                        onClick={() => props.returnAccountRow()}
                                                    >
                                                        <CloseIcon/>
                                                    </Button>
                                                </TableCell>
                                            </>
                                        )}
                                    </TableRow>
                                })}
                                {(props.account.type === 'admin' || props.account.type === 'master') ? (
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
                                                label='Username'
                                                value={props.newUsername}
                                                onChange={event => props.handleNewUsername(event.target.value)}
                                                error={props.addError('username', props.newUsername) !== ''}
                                                helperText={props.addError('username', props.newUsername)}
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
                                                label='Name'
                                                value={props.newName}
                                                onChange={event => props.handleNewName(event.target.value)}
                                                error={props.addError('name', props.newName) !== ''}
                                                helperText={props.addError('name', props.newName)}
                                                variant='outlined'
                                            />
                                        </TableCell>
                                        <TableCell 
                                            className={props.classes.authCell}
                                            align='center'
                                        >
                                            <FormControl 
                                                className={props.classes.input}
                                                variant='outlined'
                                                color='secondary'
                                            >
                                                <InputLabel 
                                                    id='account-new-auth'
                                                    className={props.classes.focused}
                                                >Authority</InputLabel>
                                                <Select
                                                    labelId='account-new-auth'
                                                    value={props.newAuth}
                                                    onChange={event => props.handleNewAuth(event.target.value)}
                                                    labelWidth={65}
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
                                        <TableCell 
                                            className={props.classes.typeCell}
                                            align='center'
                                        >
                                            <FormControl 
                                                className={props.classes.input}
                                                variant='outlined'
                                                color='secondary'
                                            >
                                                <InputLabel 
                                                    id='account-new-type'
                                                    className={props.classes.focused}
                                                >Type</InputLabel>
                                                <Select
                                                    labelId='account-new-type'
                                                    value={props.newType}
                                                    onChange={event => props.handleNewType(event.target.value)}
                                                    labelWidth={38}
                                                >
                                                    <MenuItem value='admin'>Admin</MenuItem>
                                                    <MenuItem value='user'>User</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </TableCell>
                                        <TableCell 
                                            className={props.classes.btnCell}
                                            colSpan={2}
                                            align='right'
                                        >
                                            <Button
                                                className={props.classes.btn}
                                                onClick={() => {
                                                    if (props.newUsername !== '' && props.newName !== '' && props.addError('all') === '') props.addAccountRow()
                                                }}
                                            >
                                                <AddIcon/>
                                            </Button>
                                        </TableCell>
                                        <TableCell className={props.classes.btnCell}>
                                            <Button
                                                className={props.classes.btn}
                                                onClick={() => props.clearAccountRow()}
                                            >
                                                <CloseIcon/>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ) : null }
                            </>
                        ) : (
                            <TableRow>
                                <TableCell 
                                    className={props.classes.defaultCell}
                                    colSpan={8}
                                >Error: No data.</TableCell>
                            </TableRow> 
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        
        default:
            return <TableContainer className={props.classes.table}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell 
                                className={`${props.classes.defaultCell} ${props.classes.headColumnCell}`}
                                colSpan={3}
                            >{props.dbSpread.title}</TableCell>
                            <TableCell 
                                className={props.classes.btnCell}
                                align='right'
                            >
                                <Button
                                    className={props.classes.btn}
                                    onClick={() => props.toggleEditMode()}
                                >
                                    <EditIcon/>
                                </Button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className={`${props.classes.defaultCell} ${props.classes.headColumnCell}`}>Username</TableCell>
                            <TableCell className={`${props.classes.defaultCell} ${props.classes.headColumnCell}`}>Name</TableCell>
                            <TableCell 
                                className={`${props.classes.authCell} ${props.classes.headColumnCell}`}
                                align='center'
                            >Authority</TableCell>
                            <TableCell 
                                className={`${props.classes.typeCell} ${props.classes.headColumnCell}`}
                                align='center'
                            >Type</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.display ? (
                            props.display.map((acc, i) => {
                                return <TableRow key={`tr-${i}`}>
                                    <TableCell className={props.classes.defaultCell}>{acc.username}</TableCell>
                                    <TableCell className={props.classes.defaultCell}>{acc.name}</TableCell>
                                    <TableCell 
                                        className={props.classes.authCell}
                                        align='center'
                                    >{props.renderRowAuth(acc.auth)}</TableCell>
                                        <TableCell 
                                            className={props.classes.typeCell}
                                            align='center'
                                        >
                                            {acc.type === 'master' ? 'Master' : 
                                                acc.type === 'admin' ? 'Admin' : 'User'
                                            }
                                        </TableCell>
                                </TableRow>
                            })
                        ) : (
                            <TableRow>
                                <TableCell 
                                    className={props.classes.defaultCell}
                                    colSpan={4}
                                >Error: No data.</TableCell>
                            </TableRow> 
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
    }
}