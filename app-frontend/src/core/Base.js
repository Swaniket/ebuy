import React from 'react'
import Menu from "./Menu";

const Base = ({
    title = 'My Title', 
    description = 'My Description', 
    className = 'bg-transparent text-dark p-4', 
    // It's responsible for injecting components
    children
}) => {
    return (
        <div>
            <Menu />
            <div className="container-fluid">
                <div className="jumbotron bg-dark text-white text-center">
                    <h2 className="display-4">{title}</h2>
                    <p className="lead">{description}</p>
                </div>

                <div className = {className}>{children}</div>
            </div>
            <footer className = "footer mt-auto py-3 bg-dark">
                <div className="container-fluid bg-success text-white text-center py-3">
                    <h4>For any questions, reach us</h4>
                    <button className = "btn btn-warning btn-lg">Contact Us</button>
                    <div className="container">
                        <span className = "text-warning">
                            An amazing Django react Full stack course
                        </span>
                    </div>
                </div>

            </footer>
        </div>
    )
}

export default Base