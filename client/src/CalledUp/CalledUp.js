import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { LuEdit } from 'react-icons/lu';
import { RiDeleteBin5Line } from 'react-icons/ri';
import Navbar from "../Navbar/Navbar";

function calculateAge(birthday) {
    const birthDate = new Date(birthday);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - birthDate.getFullYear();
    
    if (currentDate.getMonth() < birthDate.getMonth() || (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate())) {
      return age - 1;
    }
    
    return age;
}
  
function PlayerCard({ player, onDelete }) {
    const age = calculateAge(player.birthday);
  
    return (
        <div className="col-md-3 mb-2">
            <div className="card">
                <div className="card-header" style={{ padding: "0" }}>
                    <img src={`http://127.0.0.1:8000/storage/${player.image}`} style={{ width: "100%" }}/>
                </div>
                <div className="card-body">
                    <h5 className="card-title">
                        <b>{player.name}</b>
                        <span className="position-absolute end-0" style={{ fontSize: "12px" }}>
                            {age} years
                        </span>
                    </h5>
                    <h5 className="card-title">{player.club}</h5>
                    <Link to={`/update/${player.id}`}>
                        <button className="btn btn-outline-secondary mx-1">
                            <LuEdit />
                        </button>
                    </Link>
                    <button onClick={() => onDelete(player.id)} className="btn btn-outline-danger">
                        <RiDeleteBin5Line />
                    </button>
                </div>
            </div>
        </div>
    );
}

function calculateAverageAgeAll(players) {
    const totalAges = players.reduce((sum, player) => {
        const age = calculateAge(player.birthday);
        return sum + age;
    }, 0);

    return totalAges / players.length;
}

export default function CalledUp() {
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        fetchPlayers();
    }, []);

    const fetchPlayers = async () => {
        const response = await axios.get('http://127.0.0.1:8000/api/player');
        setPlayers(response.data);
    };

    const deletePlayer = async (id) => {
        await axios.delete(`http://127.0.0.1:8000/api/player/${id}`);
        fetchPlayers();
    };

    const filterAndRenderPlayers = (position, called) => {
        return players
        .filter(item => item.play === position && item.called === called)
        .map(item => (
            <PlayerCard key={item.id} player={item} onDelete={deletePlayer} />
        ));
    };

    return (
        <div>
            <Navbar/>
            <div className="container">
                <div className="row">
                    <h2 className="text-success">Average Age : &nbsp;
                        {calculateAverageAgeAll(players.filter(item => item.called === "yes")).toFixed(1)} years
                    </h2>
                </div>
                <div className="row my-2">
                    <h1>Goalkeepers</h1>
                    {filterAndRenderPlayers("goalkeeper", "yes")}
                </div><hr/>

                <div className="row">
                    <h1>Defender</h1>
                    {filterAndRenderPlayers("defender", "yes")}
                </div><hr/>

                <div className="row">
                    <h1>Midfielder</h1>
                    {filterAndRenderPlayers("midfielder", "yes")}
                </div><hr/>

                <div className="row">
                    <h1>Forward</h1>
                    {filterAndRenderPlayers("forward", "yes")}
                </div>
            </div>
        </div>
    );
}