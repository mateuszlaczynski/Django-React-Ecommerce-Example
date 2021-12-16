import React from 'react'
import { useNavigate } from 'react-router';
import { isAuthenticated } from '../user/helper/userApiCalls';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faShoppingCart} from "@fortawesome/free-solid-svg-icons"

const Nav = () => {
    const navigate = useNavigate();

    return (
        <nav className="nav-base">
            <button onClick={()=>navigate("/")} className="navbar-item">Home</button>
            {isAuthenticated() ? (
                <>
                    <button onClick={()=>navigate("/signout")} className="navbar-item">Signout</button>
                </>
            ) : (
                <>
                    <button onClick={()=>navigate("/signin")} className="navbar-item">Log in</button>
                    <button onClick={()=>navigate("/signup")} className="navbar-item">Register</button>
                </>
            )}

            <button onClick={()=>navigate("/cart")} style={{marginLeft:"auto"}} className="navbar-item">
                <FontAwesomeIcon icon={faShoppingCart}/> Cart
            </button>
            
        </nav>
    )
}

export default Nav;