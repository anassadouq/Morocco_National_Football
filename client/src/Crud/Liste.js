import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { LuEdit } from 'react-icons/lu';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { BiAddToQueue } from 'react-icons/bi';

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
  let textColor = 'orange';
  let fontSize = '';

  // Check if player.called is equal to "yes" and change the color if true
  if (player.called === 'yes') {
    textColor = 'green';
    fontSize = 'bold';
  }

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
          <h5 className="card-title">
            Called :{" "}
            <span style={{ color: textColor, fontWeight: fontSize }}>
              {player.called}
            </span>
          </h5>
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

export default function Liste() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/player');
    setPlayers(response.data);
  };

  const deletePlayer = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this player?");
    if (confirmDelete) {
      await axios.delete(`http://127.0.0.1:8000/api/player/${id}`);
      fetchPlayers();
    }
  };

  const filterAndRenderPlayers = (position) => {
    return players
      .filter(item => item.play === position)
      .map(item => (
        <PlayerCard key={item.id} player={item} onDelete={deletePlayer} />
      ));
  };

  return (
    <div className="container">
      <Link to="/create">
        <button className="btn btn-warning my-3"><BiAddToQueue/> Players</button>
      </Link>

      <div className="row">
        <h1>Goalkeepers</h1>
        {filterAndRenderPlayers("goalkeeper")}
      </div> <hr/>

      <div className="row">
        <h1>Defender</h1>
        {filterAndRenderPlayers("defender")}
      </div> <hr/>

      <div className="row">
        <h1>Midfielder</h1>
        {filterAndRenderPlayers("midfielder")}
      </div> <hr/>

      <div className="row">
        <h1>Forward</h1>
        {filterAndRenderPlayers("forward")}
      </div>
    </div>
  );
}