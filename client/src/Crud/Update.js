import React, { useState ,useEffect} from "react";
import axios from "axios";
import { useNavigate ,useParams} from "react-router-dom";
import { LuEdit } from 'react-icons/lu';

export default function Update() {

    const navigate = useNavigate();
    const { id } = useParams();

    const [name,setName] = useState('')
    const [birthday,setBirthday] = useState('')
    const [play,setPlay] = useState('')
    const [club,setClub] = useState('')
    const [called,setCalled] = useState('')


    useEffect(()=>{
        fetchPlayer();
    },[])

    const fetchPlayer = async() =>{
        await axios.get(`http://127.0.0.1:8000/api/player/${id}`)
        .then(({ data }) => {
            const { name, birthday, play, club, called } = data.player
            setName(name)
            setBirthday(birthday)
            setPlay(play)
            setClub(club)
            setCalled(called)

        }).catch(({ response: {data} }) => {
            console.log(data.message)
        })
    }

    const updatePlayer = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('_method', 'PATCH')
        formData.append('name', name)
        formData.append('birthday', birthday)
        formData.append('play', play)
        formData.append('club', club)
        formData.append('called', called)

        await axios.post('http://127.0.0.1:8000/api/player/' + id, formData)
        .then(({ data }) => {
            console.log(data.message)
            navigate('/all_players')
        }).catch(({ response }) => {
            if (response.status == 422) {
                console.log(response.data.errors)
            } else {
                console.log(response.data.message)
            }
        })
    }

    return (
        <center>
            <form onSubmit={updatePlayer}>
                <table>
                    <tr>
                        <td>Name</td>
                        <td>
                            : <input type="text" name="name" value={name} onChange={(e)=>{setName(e.target.value)}} className="my-3"/>
                        </td>
                    </tr>
                    <tr>
                        <td>Birthday</td>
                        <td>
                            : <input type="text" name="birthday" value={birthday} onChange={(e)=>{setBirthday(e.target.value)}} className="my-3"/>
                        </td>
                    </tr>
                    <tr>
                        <td>Play_As</td>
                        <td>
                            : <input type="text" name="play" value={play} onChange={(e)=>{setPlay(e.target.value)}} className="my-3"/>
                        </td>
                    </tr>
                    <tr>
                        <td>Club</td>
                        <td>
                            : <input type="text" name="club" value={club} onChange={(e)=>{setClub(e.target.value)}} className="my-3"/>
                        </td>
                    </tr>
                    <tr>
                        <td>Called</td>
                        <td>
                            : <input type="radio" name="called" value="yes" onChange={(e)=>{setCalled(e.target.value)}} className="my-3 mx-1"/>Yes
                            <input type="radio" name="called" value="no" onChange={(e)=>{setCalled(e.target.value)}} className="my-3 mx-1"/>No 
                            <button className="btn btn-secondary mx-2"><LuEdit/> Player</button>                       
                        </td>
                    </tr>
                </table>                           
            </form>
        </center>
    )
}