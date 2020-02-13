import React from 'react';
import { Link } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {
    AppBar, 
    Toolbar,
    Container,
    Typography,
} from '@material-ui/core';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import MenuIcon from '@material-ui/icons/Menu'

export default (props) => {

    return <AppBar 
        className={props.classes.appBar}
        position='static'
    >
        <Toolbar className={props.classes.toolBar}>
            <Link 
                className={props.classes.homeLink}
                onClick={() => props.handleDisplay('main')}
                to='/'
            >
                <h1 className={props.classes.cyber}>Cyber</h1>
                <h1 className={props.classes.dex}>Dex</h1>
            </Link>
            <Container className={props.classes.acc}>
                <AccountBoxIcon/>
                {props.account.username !== '' ? (
                    <Typography className={props.classes.accLink}>
                        {props.account.username}
                    </Typography>
                ) : (
                    <Link 
                        className={props.classes.accLink}
                        onClick={() => props.handleDisplay('login')}
                        to='/'
                    >Log in</Link>
                )}
            </Container>
            <Container className={props.classes.right}>
                {props.account.username !== '' ? (
                    <>
                        <Link
                            className={props.classes.rightLink}
                            to='/account'
                        >Account</Link>
                        {(props.account.type === 'admin' || props.account.type === 'master') ? (
                            <>
                                <Link 
                                    className={props.classes.rightLink}
                                    to='/edit'
                                >Edit</Link>
                                <Link 
                                    className={props.classes.rightLink}
                                    to='/history' 
                                >History</Link>
                            </>
                        ) : null }
                        <Link
                            className={props.classes.rightLink}
                            onClick={() => props.handleLogOut()}
                            to='/'
                        >Log out</Link>
                    </>
                ) : null }
            </Container>
        </Toolbar>
    </AppBar>


        // <Container className={props.classes.left}>
        // </Container>





        {/* <Tabs 
            className={props.classes.right}
            centered={true}
        >
            {props.account.username === '' ? (
                <Tab 
                    className={props.classes.rightLink}
                    label={'Log in'}
                    onClick={() => props.handleDisplay('login')}
                    component={Link}
                    to='/'
                />
            ) : (
                <>
                    <Tab 
                        className={props.classes.rightLink}
                        label={'Account'}
                        component={Link}
                        to='/account'
                    />
                    {(props.account.type === 'admin' || props.account.type === 'master') ? (
                        <>
                            <Tab 
                                className={props.classes.rightLink}
                                label={'Edit'}
                                component={Link}
                                to='/edit'
                            />
                            <Tab 
                                className={props.classes.rightLink}
                                label={'History'}
                                component={Link}
                                to='/history' 
                            />
                        </>
                    ) : null }
                    <Tab 
                        className={props.classes.rightLink}
                        label={'Log out'} 
                        onClick={() => props.handleLogOut()}
                        component={Link}
                        to='/'
                    />
                </>
            )}
        </Tabs> */}
}