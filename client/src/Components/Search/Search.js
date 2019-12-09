import React, {Component} from 'react';
import './Search.css';
class Header extends Component {
    render() {
    return(
        <div>
            <form>
                <input  className = 'Bar' type='text' placeholder='Search For Teacher..'></input>
                <button className = "Button">Submit</button>

             </form>
           
        </div>

    );

    } 
}

export default Header;

