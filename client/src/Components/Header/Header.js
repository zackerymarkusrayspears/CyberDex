import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

export default function Header(props) {

    return <div className='header'>
        <nav className="header-top">
            <div className="header-top-left">
                <ul className="header-top-list">
                    <li className='header-top-item'>
                        <Link 
                            className='header-top-link'
                            onClick={() => props.handleDisplay('main')}
                            to='/'
                        >CyberDex</Link>
                    </li>
                </ul>
            </div>
        </nav>
        <nav className='header-btm'>
            <ul className='header-btm-list'>
                {props.account.username === '' ? (
                    <li className='header-btm-item'>
                        <a
                            className='header-btm-link'
                            onClick={() => props.handleDisplay('login')}
                        >Log in</a>
                    </li>
                ) : (
                    <>
                        <li className='header-btm-item'>
                            <Link
                                className='header-btm-link'
                                to='/account'
                            >Account</Link>
                        </li>
                        {props.account.type === 'admin' ? (
                            <>
                                <li className='header-btm-item'>
                                    <Link 
                                        className='header-btm-link'
                                        to='/edit'
                                    >Edit</Link>
                                </li>
                                <li className='header-btm-item'>
                                    <Link 
                                        className='header-btm-link'
                                        to='/history'
                                    >History</Link>
                                </li>
                            </>
                        ) : null }
                        <li className='header-btm-item'>
                            <Link
                                className='header-btm-link'
                                onClick={() => props.handleLogOut()}
                                to='/'
                            >Log out</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    </div>
}