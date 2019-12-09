import React, {Component} from 'react';
import './Search.css';
class Header extends Component {
    render() {
    return(
        <div>
            <div className = 'Search'>
            <form>
           <input type='text' placeholder='Search For Teacher..'></input>
           <button>Submit</button>

           </form>
           </div>
        </div>

    );

    } 
}

export default Header;