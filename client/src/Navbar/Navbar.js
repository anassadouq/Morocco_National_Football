import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { AccountService } from "../Authentification/AccountService";
import { BiLogOut } from "react-icons/bi";

export default function Navbar(){
    const navigate = useNavigate();
    const logout = () => {
        AccountService.logout()
        navigate('/login')
    }
    
    return(
        <nav className="navbar navbar-expand-lg container">
            <div className="container-fluid">
                <Link to='/'>
                    <img src={"../images/logo.png"} width='30px'/>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#"></a>
                        </li>
                        <li className="nav-item">
                            <Link to='/' className="nav-link mx-1">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/all_players' className="nav-link mx-1">All Players</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/called_up' className="nav-link mx-1">Called-up</Link>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    
                </ul>
                <form className="d-flex">
                    <button className='btn btn-dark' onClick={logout} style={{"width":"100%"}}><BiLogOut/></button>
                </form>
            </div>
        </nav>
    )
}