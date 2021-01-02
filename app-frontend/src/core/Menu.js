import React, {Fragment} from 'react'
import {Link, withRouter} from 'react-router-dom'
import './styles/Menu.css'
import {signout, isAuthenticated} from "../auth/helper/index"


const currentTab = (history, path) => {
    if(history.location.pathname === path){
        return {color: "#2ecc72"}
    } else {
        return {color: "#000000"}
    }
}

// History can only be used with withRouter
const Menu = ({history, path}) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className = "container-fluid">

                {/* Brand Name & Logo */}
                <Link style = {currentTab(history, "/")} className = "navbar-brand mx-auto d-none d-lg-block" to = "/">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="24" fill="currentColor" className="bi bi-eyeglasses" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M4 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm2.625.547a3 3 0 0 0-5.584.953H.5a.5.5 0 0 0 0 1h.541A3 3 0 0 0 7 8a1 1 0 0 1 2 0 3 3 0 0 0 5.959.5h.541a.5.5 0 0 0 0-1h-.541a3 3 0 0 0-5.584-.953A1.993 1.993 0 0 0 8 6c-.532 0-1.016.208-1.375.547zM14 8a2 2 0 1 0-4 0 2 2 0 0 0 4 0z"/>
                    </svg>
                    Ebuy
                </Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">

                <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>

                    <ul className="navbar-nav">
                            {/* Profile Items */}
                            <li className = "nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="24" fill="currentColor" className="bi bi-people" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1h7.956a.274.274 0 0 0 .014-.002l.008-.002c-.002-.264-.167-1.03-.76-1.72C13.688 10.629 12.718 10 11 10c-1.717 0-2.687.63-3.24 1.276-.593.69-.759 1.457-.76 1.72a1.05 1.05 0 0 0 .022.004zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10c-1.668.02-2.615.64-3.16 1.276C1.163 11.97 1 12.739 1 13h3c0-1.045.323-2.086.92-3zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
                                    </svg>
                                </a>

                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    {isAuthenticated() && (
                                        <li className="nav-item">
                                            <Link style = {currentTab(history, "/user/dashboard")}className = "nav-link" to = "/user/dashboard">Dashboard</Link>
                                        </li>
                                    )}

                                    {!isAuthenticated() && (
                                        <Fragment>
                                            <li className="nav-item">
                                                <Link style = {currentTab(history, "/signup")}className = "nav-link" to = "/signup">Signup</Link>
                                            </li>

                                            <li className="nav-item">
                                                <Link style = {currentTab(history, "/signin")}className = "nav-link" to = "/signin">
                                                    Signin
                                                </Link>
                                            </li>
                                        </Fragment>
                                    )}


                                    
                                    {isAuthenticated() && (
                                        <li className="nav-item d-flex">
                                        <span className = "nav-link text-warning" onClick = {() => {
                                            signout(() => {
                                                history.push("/signin")
                                            })
                                        }}>Signout</span>
                                        </li>
                                    )}
                                    

                                </ul>                                
                            </li>
                            {/* Cart */}
                            <li className="nav-item">
                                <Link style = {currentTab(history, "/cart")}className = "nav-link" to = "/cart">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="24" fill="currentColor" className="bi bi-cart3" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                                    </svg>
                                </Link>
                            </li>
                    </ul>
                </div>
            </div>
        </nav>
       
    )
}

export default withRouter(Menu)
