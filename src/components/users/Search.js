import PropTypes from 'prop-types'
import { useState, useContext } from 'react'
import GithubContext from '../../context/github/githubContext'
import AlertContext from '../../context/alert/alertContext'

// convert from class component to functional component
const Search = () => {
    // Initialize github context
    const githubContext = useContext(GithubContext);
    const alertContext = useContext(AlertContext);
    
    // create state with useState()
    const [text, setText] = useState('')


    const onChange = (event) => {
        setText(event.target.value) // Access the user typed input through event.target.value
    }

    const onSubmit = (event) => {
        event.preventDefault();
        if(text === '') {
            alertContext.setAlert("Please enter something in the search bar.", "dark");
            // alertContext.setAlert('Please enter something', 'light');
        }
        else {
             // Pass up the value
             githubContext.searchUsers(text);
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
                githubContext.users.length > 0 && (<button className="btn btn-light btn-block" onClick={githubContext.clearUsers}>Clear Users</button>)
            }
            
        </div>
    )
    
}

// Search.propTypes = {       
//     setAlert: PropTypes.func.isRequired,
// }

export default Search
