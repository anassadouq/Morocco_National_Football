import React from "react";
import Navbar from "../Navbar/Navbar";
import './HomePage.css';

export default function HomePage(){
    return(
        <div className="home-page">
            <Navbar/>
            <img src={"../images/moroccan_player.jpeg"} className="home-page"/>
        </div>
    )
}