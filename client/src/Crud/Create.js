import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BiAddToQueue } from 'react-icons/bi';


export default function Create(){
    const navigate = useNavigate();
    
    const [name,setName] = useState('')
    const [birthday,setBirthday] = useState('')
    const [play,setPlay] = useState('')
    const [club,setClub] = useState('')
    const [called,setCalled] = useState('')

    const createPlayer = async(e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name)
        formData.append('birthday', birthday)
        formData.append('play', play)
        formData.append('club', club)
        formData.append('called', called)

        console.log(formData)
        await axios.post('http://127.0.0.1:8000/api/player', formData)
        .then(({data})=>{
            navigate('/all_players')
        })
    }

    return(
        <center>
            <form onSubmit={createPlayer}>
                <table>
                    <tr>
                        <td>
                            <b>Name</b>
                        </td>
                        <td>
                            <b> : </b>
                            <input type="text" name="name" onChange={(e)=>{setName(e.target.value)}} className="my-4"/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <b>Birthday</b>
                        </td>
                        <td>
                            <b> : </b>
                            <input type="date" name="birthday" onChange={(e)=>{setBirthday(e.target.value)}} className="my-4"/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <b>Play_as</b>
                        </td>
                        <td>
                            <b> : </b>
                            <input type="checkbox" name="play" value="goalkeeper" onChange={(e)=>{setPlay(e.target.value)}} className="my-4 mx-1"/>Goalkeeper
                            <input type="checkbox" name="play" value="defender" onChange={(e)=>{setPlay(e.target.value)}} className="my-4 mx-1"/>Defender
                            <input type="checkbox" name="play" value="midfielder" onChange={(e)=>{setPlay(e.target.value)}} className="my-4 mx-1"/>Midfielder
                            <input type="checkbox" name="play" value="forward" onChange={(e)=>{setPlay(e.target.value)}} className="my-4 mx-1"/>Forward
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <b>Club</b>
                        </td>
                        <td>
                            <b> : </b>
                            <input type="text" name="club" onChange={(e)=>{setClub(e.target.value)}} className="my-4"/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <b>Called</b>
                        </td>
                        <td>
                            <b> : </b>
                            <input type="radio" name="called" value="yes" onChange={(e)=>{setCalled(e.target.value)}} className="my-4 mx-1"/>Yes
                            <input type="radio" name="called" value="no" onChange={(e)=>{setCalled(e.target.value)}} className="my-4 mx-1"/>No
                            <button className="btn btn-warning my-3 mx-2"><BiAddToQueue/> Add</button>
                        </td>
                    </tr>
                </table>
            </form>
        </center>
    )
}