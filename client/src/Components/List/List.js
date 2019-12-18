import React, { Component } from 'react';
import './List.css';
import Card from '../Card/Card';

export default class List extends Component {

    renderLists = array => {

        return array.map((sheet, i) => {
            return <div className='List-renderList' key={i}>
                <h1 className='List-sheetTitle'>{sheet.title}</h1>
                {this.renderMetaList(sheet.metaList)}
                {this.renderPersonList(sheet.personList)}
            </div>
        });
    }

    renderMetaList = array => {

        return <div className='List-metaData'>
            <h2 className='List-metaTitle'>Lines</h2>
            <ul className='List-metaList'>
                {array.map((item, i) => {
                    return <li key={i}>
                        <p className='List-metaItem'>{`- ${item.line}: ${item.number}`}</p>
                    </li>
                })}
            </ul>
        </div>
    }

    renderPersonList(array) {

        const { singleResult } = this.props;

        return <div className='List-personData'>
            <h2 className='List-personTitle'>Search Results</h2>
            <ul className='List-personList'>
                {array.map((item, i) => {
                    return <Card 
                        key={i}
                        singleResult={singleResult}
                        name={item.name}
                        phoneTag={item.phoneTag}
                        room={item.room}
                        extension={item.extension}
                        phoneNumber={item.phoneNumber}
                        note={item.note}
                    />
                })}
            </ul>
        </div>
    }

    render() {

        const { display } = this.props;

        return (

            <div className='List'>
                {display.length < 1 ? (
                    <div className='List-defaultTitle'>
                        <h1 className='List-defaultOne'>Cyber</h1>
                        <h1 className='List-defaultTwo'>Dex</h1>
                    </div>
                ) : (
                    this.renderLists(display)
                )}
            </div>
        );
    }
}