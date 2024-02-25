import React from "react";
import Navbar from "../Navbar/Navbar";
import './HomePage.css';

export default function HomePage(){
    return(
        <div>
            <Navbar/>
            <img src={"../images/maroc1.jpg"} className="home-page"/>
        </div>
    )
}