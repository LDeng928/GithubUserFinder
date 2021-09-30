import React, { useContext } from 'react'
import AlertContext from '../../context/alert/alertContext'

export const Alert = () => {
    // Initialize the context
    const alertContext = useContext(AlertContext);

    // Destruct alert from the alertContext
    const { alert } = alertContext;

    return (
        alert != null && (
            <div className={`alert alert-${alert.type}`}>
                <i className="fas fa-info-circle" style={{marginRight: "10px"}}></i>{alert.message}
            </div>
        )
    )
}
