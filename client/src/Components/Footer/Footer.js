import React, { Component } from 'react';
import './Footer.css';

export default class Footer extends Component {

    render() {
        return (
            <footer className='Footer'>
                <div className='FooterLeft'>
                    <h4 className="footer-school-information">Barren County Schools</h4>
                    <h5 className="footer-school-information">507 Trojan Trail</h5>
                    <h5 className="footer-school-information">Glasgow, KY 42141</h5>
                    <a className="footer-school-information" href="https://www.google.com/maps/place/507+Trojan+Trail,+Glasgow,+KY+42141/@36.9786753,-85.9234659,17z/data=!3m1!4b1!4m5!3m4!1s0x88663de5339cc483:0xe148b390486e4c29!8m2!3d36.9786753!4d-85.9212772">View Map and Directions</a>
                </div>
                <div className='FooterMiddle'>
                    <h5 className="footer-school-information">Phone: 270-651-6315</h5>
                    <h5 className="footer-school-information">Fax: 270-651-9211</h5>
                </div>
                <div className='FooterRight'>
                    <h6 className="footer-school-information">To access translation and interpretation services for students and families whose primary language is not English, contact Barren County Schools Department of Special Programs at (270) 651-3787 or (270)678-9475</h6>

                    <h6 className="footer-school-information">Para tener acceso a servicios de traducción e interpretación para estudiantes y familias cuyo idioma principal no es el inglés, contacte al Departamento de Programas Especiales del Condado de Barren al (270) 651-3787 ó (270) 678-9475</h6>

                    <h6 className="footer-school-information">As required by law, the District does not discriminate on the basis of race, color, national origin, sex, genetic information, disability, age, or limitations related to pregnancy, childbirth, or related medical conditions in its programs and activities and provides equal access to its facilities to the Boy Scouts and other designated youth groups.. </h6>

                </div>
            </footer>
        );
    }
}