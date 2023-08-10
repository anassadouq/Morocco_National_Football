import React from "react";
import { Link } from "react-router-dom";
export default function Navbar(){
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
        </nav>
    )
}