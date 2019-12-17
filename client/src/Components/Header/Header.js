import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './Header.css';

export default function Header(props) {
    const { children } = props;
    const logoImgSrc = "https://www.barren.k12.ky.us/docs/district/brand%20images/district%20logo/we%20are%20bc%201%20burgundy%20filled%20white%20font.png?id=85394";

    return(
        <nav className="header">
            <div className="left-nav nav-menu">
                <ul className="nav-item-list">
                    <li className="nav-logo">
                      <img className='nav-logo' src={logoImgSrc} alt="Barren County Logo"/>
                    </li>
                    <li className='nav-item'>
                        <Link className='nav-link' to='/'>Search</Link>
                    </li>
                    <li className='nav-item'>
                        <Link className='nav-link' to='/index'>Edit</Link>
                    </li>
                </ul>
            </div>
            {/* <div className="right-nav nav-menu">
                <ul class="nav-item-list">
                    <li className='nav-item'>
                        <Link className='nav-link' to='#'>Sign In</Link>
                    </li>
                </ul>
            </div> */}
        </nav>
    );
}