import React, { useState, useEffect } from 'react'
import Base from '../core/Base'
import { signout, isAuthenticated } from './helper/userApiCalls'
import { useNavigate } from "react-router";

const Signout = () => {
    const [logoutSuccess, setLogoutSuccess] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (logoutSuccess || !isAuthenticated()) {
            navigate("/")
        }

    }, [logoutSuccess])

    const signoutSubmit = () => {
        signout()
        .then(
            setLogoutSuccess(true)
        )
    }

    return (

        <Base title="Signout">
            <h1>Are you sure you want to log out?</h1>
            <a className='signout-text' onClick={signoutSubmit}>Sign out</a>
        </Base>
    )
}
export default Signout;