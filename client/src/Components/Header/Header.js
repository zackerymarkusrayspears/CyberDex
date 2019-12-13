import React, { Component } from 'react';
import './Header.css';

class Header extends Component {
    render() {
        const { children } = this.props;

        return(
            <div className='Header'>
                <div className='Header-main'>
                    <img className='BC-logo' src="https://www.barren.k12.ky.us/docs/district/brand%20images/we%20are%20bc%201%20burgundy%20filled%20white%20font.jpg?id=83313" alt="Barren County Logo"></img>
                    {children}
                </div>
            </div>
        );
    }
}

export default Header;