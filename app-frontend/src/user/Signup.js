import React, {useState} from 'react'
import {Link} from "react-router-dom"
import {signup} from "../auth/helper/index"
import Base from '../core/Base'
import './styles/Signup.css'

const Signup = () => {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false,
    })

    const {name, email, password, error, success} = values

    // It's gonna be a higher order function to handle all the changes in these values
    // If the user is filling up the name, the higher order function will call the setValue for the name
    const handleChange = (name) => (event) => {
        setValues({...values, error: false, [name]: event.target.value})
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        setValues({...values, error: false})
        signup({name, email, password})
        .then(data => {
            console.log("Data:", data);
            // We can access the properties as: data.email[0] to acees the error message, if exists
            if(data.email === email){
                setValues({
                    ...values,
                    name: "",
                    email: "",
                    password: "",
                    error: "",
                    success: true
                })
            }
            // The error checking logic can be done here 
            else {
                setValues({
                    ...values, 
                    error: true, 
                    success: false
                })
            }
        })
        .catch(e => console.log(e))

    }

    const successMessage = () => {
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className = "alert alert-success" style = {{display: success ? "" : "none"}}>
                        New Account created successfully. You can <Link to = "/signin">Login now.</Link>
                    </div>
                </div>
            </div>
        )
    }

    const errorMessage = () => {
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className = "alert alert-danger" style = {{display: error ? "" : "none"}}>
                        Check all fields again
                    </div>
                </div>
            </div>
        )
    }

    const signUpForm = () => {
        return(
            <div className="row align-items-center justify-content-center min-vh-100">
                <div className="col-md-6 col-lg-4 col-xl-4 py-6 py-md-0 signup">
                    <div className = "mb-2 mt-4 text-center">
                        <h6 className = "h3 mb-1">SIGN UP</h6>
                        <p className = "text-muted mb-0">Signup to continue</p>
                    </div>
                    <form>
                        <div className="form-group mb-3 mt-3">
                            <input 
                                placeholder = "Please enter your full name"
                                type="text" 
                                className = "form-control" 
                                value = {name} 
                                onChange = {handleChange("name")}
                            />
                        </div>

                        <div className="form-group mb-3">
                            <input 
                                placeholder = "Please enter your email"
                                type="text" 
                                className = "form-control" 
                                value = {email} 
                                onChange = {handleChange("email")}
                            />
                        </div>

                        <div className="form-group mb-3">
                            <input 
                                placeholder = "Choose a password"
                                type="password" 
                                className = "form-control" 
                                value = {password} 
                                onChange = {handleChange("password")}
                            />
                        </div>

                        <button className = "w-100 btn btn-lg btn-primary mb-4" onClick = {handleSubmit}>
                            Submit
                        </button>

                    </form>
                </div>
            </div>
        )
    }

    return (
        <Base title = "Sign Up Page" description = "A signup for store">
            {successMessage()}
            {errorMessage()}
            {signUpForm()}
            <p className="text-center">
                {JSON.stringify(values)}
            </p>
        </Base>
    )
}

export default Signup
