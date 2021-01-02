import React, {useState} from 'react'
import {Link, Redirect} from "react-router-dom"
import Base from '../core/Base'
import {signin, authenticate, isAuthenticated} from '../auth/helper/index'

const Signin = () => {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false,
        loading: false,
        didRedirect: false

    })

    const {name, email, password, error, success, loading, didRedirect} = values

    const handleChange = (name) => (event) => {
        setValues({...values, error: false, [name]: event.target.value})
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        // Updating the state
        setValues({...values, error: false, loading: true})
        // Signing in the user
        signin({email, password})
        .then(data => {
            console.log("Data:", data)
            if (data.token) {
                // let sessionToken  = data.token
                authenticate(data, () => {
                    console.log("TOKEN ADDED");
                    setValues({
                        ...values,
                        didRedirect: true,
                        error: "",
                        success: true
                    })
                })
            }
            else {
                setValues({
                    ...values, 
                    loading: false,
                    error: true, 
                    success: false

                })
            }

        })
        .catch((e) => console.log(e))

    }

    const performRedirect = () => {
        if (isAuthenticated()) {
            return <Redirect to = "/"/>
        }
    }

    const loadingMessage = () => {
        return(
            loading && (
                <div className = "alert alert-info">
                    <h2>Loading...</h2>
                </div>
            )
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

    const signInForm = () => {
        return(
            <div className="row align-items-center justify-content-center min-vh-100">
                <div className="col-md-6 col-lg-4 col-xl-4 py-6 py-md-0 signup">
                    <div className = "mb-2 mt-4 text-center">
                        <h6 className = "h3 mb-1">SIGN IN</h6>
                        <p className = "text-muted mb-0">Please Sign In to continue</p>
                    </div>
                    <form> 
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
        <Base title = "Welcome to Sign in page">
            {errorMessage()}
            {loadingMessage()}
            
            {signInForm()}
            <p className = "text-center">
                {JSON.stringify(values)}
            </p>

            {performRedirect()}
        </Base>
    )
}

export default Signin
