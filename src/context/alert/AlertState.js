// state and actions

import React, {useReducer} from 'react';
import AlertContext from './alertContext';
import AlertReducer from './alertReducer';
import {
    SET_ALERT,
    REMOVE_ALERT
} from '../types'

const AlertState = props => {
    // This is set as one single object.
    const initialState = null;

     const [state, dispatch] = useReducer(AlertReducer, initialState);

    // Set Alert
    const setAlert = (message, type) => {
        dispatch({
            type: SET_ALERT,
            payload: { message, type }
        })
        
    
        // Make the alert message disappear in 5 seconds
        setTimeout(() => dispatch({ type: REMOVE_ALERT }), 5000);
      }

    // Remove Alert

     return <AlertContext.Provider 
        value={{
            alert: state,
            setAlert
        }}
     >{props.children}</AlertContext.Provider>
}

export default AlertState;
