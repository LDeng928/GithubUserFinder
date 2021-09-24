import PropTypes from 'prop-types'
import { useState } from 'react'

// convert from class component to functional component
const Search = ({showClear, clearUsers, searchUsers, setAlert}) => {
    // create state with useState()
    const [text, setText] = useState('')


    const onChange = (event) => {
        setText(event.target.value) // Access the user typed input through event.target.value
    }

    const onSubmit = (event) => {
        event.preventDefault();
        if(text === '') {
            setAlert('Please enter something', 'light');
        }
        else {
             // Pass up the value
            searchUsers(text);
            // Reset the form
            setText('');
        }
       
    }

    
    return (
        <div>
            <form onSubmit={onSubmit} className="form">
                <input type="text" name="text" placeholder="Search users" value={text} onChange={onChange}/>
                <input type="submit" value="search" className="btn btn-dark btn-block" />
            </form>
            {
                showClear && <button className="btn btn-light btn-block" onClick={clearUsers}>Clear Users</button>
            }
            
        </div>
    )
    
}

Search.propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired,
}

export default Search
