import React, { Component } from 'react'
import PropTypes from 'prop-types'


export class Search extends Component {
    state = {
        text: ''
    }

    static propTypes = {
        searchUsers: PropTypes.func.isRequired,
        clearUsers: PropTypes.func.isRequired,
        showClear: PropTypes.bool.isRequired,
        setAlert: PropTypes.func.isRequired,
    }

    onChange = (event) => {
        this.setState({[event.target.name]: event.target.value}) // Access the user typed input through event.target.value
    }

    onSubmit = (event) => {
        event.preventDefault();
        if(this.state.text == '') {
            this.props.setAlert('Please enter something', 'light');
        }
        else {
             // Pass up the value
            this.props.searchUsers(this.state.text);
            // Reset the form
            this.setState({text: ''});
        }
       
    }

    render() {
        const {showClear, clearUsers} = this.props;
        return (
            <div>
                <form onSubmit={this.onSubmit} className="form">
                    <input type="text" name="text" placeholder="Search users" value={this.state.text} onChange={this.onChange}/>
                    <input type="submit" value="search" className="btn btn-dark btn-block" />
                </form>
                {
                    showClear && <button className="btn btn-light btn-block" onClick={clearUsers}>Clear Users</button>
                }
                
            </div>
        )
    }
}

export default Search
