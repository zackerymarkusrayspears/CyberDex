import React, { Component } from 'react';
import './Card.css';

export default class Card extends Component {

    render() {

        const { phoneTag, name, room, extension, phoneNumber, note, capitalize } = this.props;
        return <li className='Card'>
            {name !== null ? (
                <h3 className='Card-name'>{capitalize(name)}</h3>
            ) : (
                ''
            )}
            <div className='Card-body'>
                <div className='Card-bodyMain'>
                    {phoneTag !== null ? (
                        <h6 className='Card-phoneTag'>{`Phone Tag: ${capitalize(phoneTag)}`}</h6>
                    ) : (
                        ''
                    )}
                    {room !== null ? (
                        <h6 className='Card-room'>{`Room: ${capitalize(room)}`}</h6>
                    ) : (
                        ''
                    )}
                    {extension !== null ? (
                        <h6 className='Card-extension'>{`Extension: ${extension}`}</h6>
                    ) : (
                        ''
                    )}
                    {phoneNumber !== null ? (
                        <h6 className='Card-phoneNumber'>{`Phone Number: ${phoneNumber}`}</h6>
                    ) : (
                        ''
                    )}
                </div>
                <div className='Card-bodyNotes'>
                    {note !== null ? (
                        <p className='Card-note'>{`Note: ${capitalize(note)}`}</p>
                    ) : (
                        ''
                    )}
                </div>
            </div>
        </li>
    }
}