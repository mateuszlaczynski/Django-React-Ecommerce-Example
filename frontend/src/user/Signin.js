import React, { useState, useEffect } from 'react'
import Base from '../core/Base';
import { signin, authenticate, isAuthenticated } from './helper/userApiCalls';
import { useNavigate } from "react-router-dom"

const Signin= () => {
    const [values, setValues] = useState({
        name:"",
        email:"",
        password:"",
        error:"",
        success:"",
    });
    const [error, setError] = useState(false) 

    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated()) {
            navigate('/');
        }
    }, [])

    const { name, email, password, loading, success, didRedirect } = values;

    const handleChange = (field) =>
        (event) => {
            setValues({...values, [field]: event.target.value})
            setError(false)
    }

    const onSubmit = (event) => {
        event.preventDefault();
        setValues({...values, loading:true})

        signin({email, password})
        .then((data) => {
            if (data.token) {
                authenticate(data, () => {
                    setValues({...values})
                    navigate("/")
                })
            }
            setError(true);
        })
        .catch((error) => console.log(error))
    }


    const signInForm = () => {
        return (
            <div className="input-panel">
                <h2 style={{paddingTop:"10px", paddingLeft:"20px"}}>Signup</h2><hr/>
                <form style={{padding:"20px"}}>
                    <div className="form-group">
                    <label>Email</label>
                    <input
                        name="email"
                        className="form-control"
                        value={email}
                        onChange={handleChange("email")}
                        type="email"
                    />
                    </div>
                    <div className="form-group">
                    <label>Password</label>
                    <input
                        name="password"
                        className="form-control"
                        value={password}
                        onChange={handleChange("password")}
                        type="password"
                    />
                    </div>
                    <button
                    onClick={onSubmit}
                    className="submit-button"
                    >
                    Submit
                    </button>
            </form>
            </div>
        );
    };

    const emailError = () => {
        if (!email && loading) {
            return true;
        }   
    }
    
    const passwordError = () => {
        if (password.length < 8 && loading) {
            return true;
        }
    }

    const validationError = () => {
        if (email && password.length >= 8 && error && loading) {
            return true;
        }
    }

    return (
        <>
            <Base title="Signin">
                {signInForm()}
                <br/>
                {emailError() && <h6 className="error-message">Email field can not be empty!</h6>}
                {passwordError() && <h6 className="error-message">Password is too short!</h6>}
                {validationError() && <h6 className="error-message">Incorrect email or password!</h6>}
            </Base>
        </>
    )
}

export default Signin;