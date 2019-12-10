import React, {Component} from 'react';
import './Search_Form.css';
class SearchForm extends Component {
    render() {
        return(
            <div>
                <form>
                    <input  
                        className = 'Bar' 
                        type='text' 
                        placeholder='Search For Teacher..'
                        ref={input => this.search = input}
                        onchange={this.handleInputChange}
                    />
                    <button className = "Button">Submit</button>
                        <p>{this.state.query}</p>
                </form>     
            </div>
        );
    } 
}

export default SearchForm;