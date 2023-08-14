import React from 'react'
import { Link } from 'react-router-dom'

export default function navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" href="#">Noxe</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page"
                             to="home">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="movies">Movies</Link>
                        </li>
                     
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page"
                             to="tv">Tv</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="People">People</Link>
                        </li>
                    </ul>


                    <ul className="navbar-nav  mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" 
                             to="Login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="register">Register</Link>
                        </li>
                  
                        <li className="nav-item">
                            <span className="nav-link">LogOut</span>
                        </li>
                    </ul>
                  
                </div>
            </div>
        </nav>
    )
}
