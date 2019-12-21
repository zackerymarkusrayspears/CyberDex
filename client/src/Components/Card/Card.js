import React, { Component } from 'react';
import './Card.css';

export default class Card extends Component {

    render() {

        const { singleResult, name, phoneTag, room, extension, phoneNumber, note } = this.props;
        const cardClass = singleResult ? 'Card Card-full' : 'Card';

        return <li className={cardClass}>
            {name !== null ? (
                <h3 className='Card-title'>{name}</h3>
            ) : (
                ''
            )}
            <div className='Card-body'>
                {phoneTag !== null ? (
                    <h4 className='Card-phoneTag'>{phoneTag}</h4>
                ) : (
                    ''
                )}
                {room !== null ? (
                    <p className='Card-content'>{`Room: ${room}`}</p>
                ) : (
                    ''
                )}
                {extension !== null ? (
                    <p className='Card-content'>{`Extension: ${extension}`}</p>
                ) : (
                    ''
                )}
                {phoneNumber !== null ? (
                    <p className='Card-content'>{`Phone Number: ${phoneNumber}`}</p>
                ) : (
                    ''
                )}
                {note !== null ? (
                    <small className='Card-content'>{`Note: ${note}`}</small>
                ) : (
                    ''
                )}
            </div>
        </li>
    }
}