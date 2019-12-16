import React, { Component } from 'react';
import './Header.css';

class Header extends Component {
    render() {
        const { children } = this.props;

        return(
            <div className='Header'>
                <div className='Header-main'>
                    <img className='BC-logo' src="https://www.barren.k12.ky.us/docs/district/brand%20images/district%20logo/we%20are%20bc%201%20burgundy%20filled%20white%20font.png?id=85394" alt="Barren County Logo"></img>
                    {children}
                </div>
                    {/* <div className='Sign-in'>
                        <p>Sign In</p>
                    </div> */}
            </div>
        );
    }
}

export default Header;