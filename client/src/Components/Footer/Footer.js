import React, { Component } from 'react';
import './Footer.css';

export default class Footer extends Component {

    render() {
        return (
            <footer className='Footer'>
                <div className='FooterLeft'>
                    <h1 className="footer-school-information">Barren County Schools</h1>
                    <h2 className="footer-school-information">507 Trojan Trail</h2>
                    <h2 className="footer-school-information">Glasgow, KY 42141</h2>
                    <a className="footer-school-information" href="https://www.google.com/maps/place/507+Trojan+Trail,+Glasgow,+KY+42141/@36.9786753,-85.9234659,17z/data=!3m1!4b1!4m5!3m4!1s0x88663de5339cc483:0xe148b390486e4c29!8m2!3d36.9786753!4d-85.9212772">View Map and Directions</a>
                </div>
                <div className='FooterRight'>
                    <h2 className="footer-school-information">Phone: 270-651-6315</h2>
                    <h2 className="footer-school-information">Fax: 270-651-9211</h2>
                </div>
                if ()
            </footer>
        );
    }
}