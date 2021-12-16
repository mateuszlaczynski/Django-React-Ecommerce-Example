import React, { useState, useEffect } from 'react'
import Base from '../core/Base'
import { signup, isAuthenticated } from './helper/userApiCalls'
import { useNavigate } from 'react-router'

const Signup = () => {
    const [values, setValues] = useState({
        name:"",
        email:"",
        password:"",
        error:"",
        success:false,
    })

    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated()) {
            navigate('/');
        }
    }, [])

    const {name,email,password,error,success} = values

    const handleChange = (field) =>
        (event) => {
            setValues({...values, [field]: event.target.value})
    }

    const onSubmit = (event) => {
        event.preventDefault();
        setValues({...values, error:false})
        if (password.length >= 8) {
            signup({name, email, password})
            .then((data) => {
                if (data.email === email
                    && data.name === name) {
                        setValues({
                            ...values,
                            name:"",
                            email:"",
                            password:"",
                            error:"",
                            success:true
                        })
                        navigate("/signin")
                    }
            })
            .catch((error) => console.log(error))  
        } else {
            setValues({
                ...values,
                error:true,
                success:false
            })
        }
    }

    const signUpForm = () => {
         return (
            <div className="input-panel">
                <h2 style={{paddingTop:"10px", paddingLeft:"20px"}}>Signup</h2><hr/>
                <form style={{padding:"20px"}}>
                    <div className="form-group">
                    <label>Username</label>
                    <input
                        name="name"
                        className="form-control"
                        value={name}
                        onChange={handleChange("name")}
                        type="name"
                    />
                    </div>
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
            )
        }

    const usernameError = () => {
        if (!name) {
            return true;
        }
    }

    const emailError = () => {
        if (!email) {
            return true;
        }   
    }
    
    const passwordError = () => {
        if (password.length < 8) {
            return true;
        }
    }

    return (
        <>
            <Base title="Signup">
                {signUpForm()}
                <br/>
                {error && usernameError() && <h6 className="error-message">Name field is required!</h6>}
                {error && emailError() && <h6 className="error-message">Invalid email!</h6>}
                {error && passwordError() && <h6 className="error-message">Your password is too short!</h6>}
                {error && <h6 className="error-message">Form did not submit, check all of the fields. Remember your email must be unique!</h6>}
            </Base>
        </>
        )
}

export default Signup;