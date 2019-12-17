import React, { Component } from 'react';
import './List.css';
import Card from '../Card/Card';

class List extends Component {

    renderMetaList = array => {

        if (array.length > 0) {
            return <div className='List-metaData'>
                <h2 className='List-metaTitle'>Lines</h2>
                <ul className='List-metaList'>
                    {array[0].metaList.map((data, i) => {
                        return <li key={i}>
                            <p className='List-metaItem'>{`- ${data.line}: ${data.number}`}</p>
                        </li>
                    })}
                </ul>
            </div>
        }
    }

    renderUnordList(array) {

        const { singleResult } = this.props;
    
        if (array.length > 0) {
            return <div className='List-personData'>
                <h2 className='List-personTitle'>Search Results</h2>
                <ul className='List-personList'>
                    {array[0].personList.map((data, i) => {
                        return <Card 
                            key={i}
                            singleResult={singleResult}
                            name={data.name}
                            phoneTag={data.phoneTag}
                            room={data.room}
                            extension={data.extension}
                            phoneNumber={data.phoneNumber}
                            note={data.note}
                        />
                    })}
                </ul>
            </div>
        }
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
                    <div className='List-renderList'>
                        <h1 className='List-sheetTitle'>{display[0].title}</h1>
                        {this.renderMetaList(display)}
                        {this.renderUnordList(display)}
                    </div>
                )}
            </div>
        );
    }
}

export default List