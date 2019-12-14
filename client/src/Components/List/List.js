import React, { Component } from 'react';
import './List.css';
import Card from '../Card/Card';

class List extends Component {

    renderMetaList = array => {

        if (array.length > 0) {
            return <div className='List-metaData'>
                <h2 className='List-metaTitle'>Main Lines</h2>
                <ul className='List-metaList'>
                    {array[0].metaList.map((data, i) => {
                        return <li key={i}>
                            <p className='List-metaItem'>{`- ${this.capitalize(data.line)}: ${data.number}`}</p>
                        </li>
                    })}
                </ul>
            </div>
        }
    }

    renderUnordList(array) {
    
        if (array.length > 0) {
            return array[0].personList.map((data, i) => {
                return <Card 
                    key={i}
                    name={data.name}
                    phoneTag={data.phoneTag}
                    room={data.room}
                    extension={data.extension}
                    phoneNumber={data.phoneNumber}
                    note={data.note}
                    capitalize={this.capitalize}
                />
            });
        }
    }

    capitalize = str => {

        const strArray = str.split(' ');
        var capitalizedArray = strArray.map(value => {
            return value.charAt(0).toUpperCase() + value.slice(1)

        });
        return capitalizedArray.join(' ');
    }

    render() {

        const { display } = this.props;

        return (

            <div className='List'>
                {display.length < 1 ? (
                    <h1 className='List-defaultTitle'>CyberDex</h1>
                ) : (
                    <h1 className='List-sheetTitle'>{display[0].title}</h1>
                )}
                {this.renderMetaList(display)}
                <ul className='List-personList'>
                    {this.renderUnordList(display)}
                </ul>
            </div>
        );
    }
}

export default List