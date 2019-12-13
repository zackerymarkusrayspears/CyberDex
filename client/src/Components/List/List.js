import React, { Component } from 'react';
import './List.css'

class List extends Component {

    renderMetaList = array => {

        if (array.length > 0) {
            return array[0].metaList.map((data, i) => {
                return <li key={i}>
                    {`${data.line}: ${data.number}`}
                </li>
            })
        }
    }

    renderUnordList(array) {
    
        if (array.length > 0) {
            return array[0].personList.map((data, i) => {
                return <li key={i}>
                    <h3>{data.name}</h3>
                    <h4>{`Phone Tag: ${data.phoneTag}`}</h4>
                    <h4>{`Room: ${data.room}`}</h4>
                    <h4>{`Extension: ${data.extension}`}</h4>
                    <h4>{`Phone Number: ${data.phoneNumber}`}</h4>
                    <p>{`Note: ${data.note}`}</p>
                </li>
            });
        }
    }

    render() {

        const { display } = this.props;

        return (

            <div className='List'>
                <div className='List-metaData'>
                    {display.length > 0 ? (
                        <h1>{display[0].title}</h1>
                    ) : (
                        <h1>CyberDex</h1>
                    )}
                    <ul className='List-metaList'>
                        {this.renderMetaList(display)}
                    </ul>
                </div>
                <ul className='List-unordList'>
                    {this.renderUnordList(display)}
                </ul>
            </div>
        );
    }
}

export default List