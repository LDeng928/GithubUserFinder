import React from 'react'
import UserItem from './UserItem'
import { Spinner } from '../layout/spinner'
import PropTypes from 'prop-types'

// Functional component. Doesn't require state
const Users = ({users, loading}) => {
//    state= {
//        users: [
//            {
//                id: '1',
//                login: 'mojombo',
//                avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
//                html_url: 'https://github.com/mojombo'
//            },
//            {
//                 id: '2',
//                 login: 'defunkt',
//                 avatar_url: 'https://avatars.githubusercontent.com/u/2?v=4',
//                 html_url: 'https://github.com/defunkt'
//             },
//             {
//                 id: '3',
//                 login: 'pjhyett',
//                 avatar_url: 'https://avatars.githubusercontent.com/u/3?v=4',
//                 html_url: 'https://github.com/pjhyett'
//             }
//        ]
//    }


    // Pass the 'props' here. (this.props)
    if(loading) {
        return <Spinner></Spinner>
    }
    else
    {
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
Users.propTypes = {
    users: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired
}

// style variable
const userStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '1rem'
}

export default Users