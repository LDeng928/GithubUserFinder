import React,  { useContext } from 'react'
import UserItem from './UserItem'
import { Spinner } from '../layout/spinner'
import PropTypes from 'prop-types'
import GithubContext from '../../context/github/githubContext'

// Functional component. Doesn't require state
const Users = () => {
    // Initialize the context
    const githubContext = useContext(GithubContext);

    // Destruction
    const { loading, users } = githubContext;

    
    if(loading) {
        return <Spinner></Spinner>
    } else {
        return (
            <div style={userStyle}>
                {
                    users.map(user => (
                        <UserItem key={user.id} user={user}></UserItem>
                    ))
                }
            </div>
        )
    }
   
    
}

// Prop types 
// Users.propTypes = {
//     users: PropTypes.array.isRequired,
//     loading: PropTypes.bool.isRequired
// }

// style variable
const userStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '1rem'
}

export default Users
