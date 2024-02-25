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
        <nav class="navbar navbar-expand-lg container">
            <div class="container-fluid">
                <Link to='/'>
                    <img src={"../images/logo.png"} width='40px'/>
                </Link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="#"></a>
                        </li>
                        <li class="nav-item">
                            <Link to='/' class="nav-link mx-1">Home</Link>
                        </li>
                        <li class="nav-item">
                            <Link to='/all_players' class="nav-link mx-1">All Players</Link>
                        </li>
                        <li class="nav-item">
                            <Link to='/called_up' class="nav-link mx-1">Called-up</Link>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    
                </ul>
                <form className="d-flex">
                    <button className='btn btn-dark' onClick={logout}><BiLogOut/></button>
                </form>
            </div>
        </nav>
    )
}