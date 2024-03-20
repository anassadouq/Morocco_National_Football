import React, { useState ,useEffect} from "react";
import axios from "axios";
import { useNavigate ,useParams} from "react-router-dom";
import { LuEdit } from 'react-icons/lu';

export default function Update() {

    const navigate = useNavigate();
    const { id } = useParams();
    
    const [image, setImage] = useState(null);
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
            const { image, name, birthday, play, club, called } = data.player
            setImage(image)
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
        formData.append('_method', 'PATCH');
        formData.append('name', name);
        formData.append('birthday', birthday);
        formData.append('play', play);
        formData.append('called', called);

        if (image) {
            formData.append('image', image);
        }

        if (club) {
            formData.append('club', club);
        }
    
        await axios.post(`http://127.0.0.1:8000/api/player/${id}`, formData)
            .then(({ data }) => {
                console.log(data.message);
                navigate('/all_players');
            })
            .catch(({ response }) => {
                if (response.status === 422) {
                    console.log(response.data.errors);
                } else {
                    console.log(response.data.message);
                }
            });
    }      

    return (
        <center>
            <div className="container my-3">
                <div className="my-4 card mx-auto" style={{ maxWidth: '600px' }}>
                    <div className="card-body"></div>
                    <form onSubmit={updatePlayer}>
                        <table>
                            
                            <tr>
                                <td>
                                    <b>Image</b>
                                </td>
                                <td>
                                    <b> : </b>
                                    <input type="file" name="image" onChange={(e)=>{setImage(e.target.files[0])}} className="my-4"/>
                                </td>
                            </tr>
                            
                            <tr>
                                <td>
                                    <b>Name</b>
                                </td>
                                <td>
                                    <b> : </b>
                                    <input type="text" name="name" value={name} onChange={(e)=>{setName(e.target.value)}} className="my-4"/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Birthday</b>
                                </td>
                                <td>
                                    <b> : </b>
                                    <input type="date" name="birthday" value={birthday} onChange={(e)=>{setBirthday(e.target.value)}} className="my-4"/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Play_as</b>
                                </td>
                                <td>
                                    <b> : </b>
                                    <input type="checkbox" name="play" value="goalkeeper" onChange={(e)=>{setPlay(e.target.value)}} className="my-4 mx-1" checked={play === "goalkeeper"}/>Goalkeeper
                                    <input type="checkbox" name="play" value="defender" onChange={(e)=>{setPlay(e.target.value)}} className="my-4 mx-1" checked={play === "defender"}/>Defender
                                    <input type="checkbox" name="play" value="midfielder" onChange={(e)=>{setPlay(e.target.value)}} className="my-4 mx-1" checked={play === "midfielder"}/>Midfielder
                                    <input type="checkbox" name="play" value="forward" onChange={(e)=>{setPlay(e.target.value)}} className="my-4 mx-1" checked={play === "forward"}/>Forward
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Club</b>
                                </td>
                                <td>
                                    <b> : </b>
                                    <input type="file" name="club" onChange={(e)=>{setClub(e.target.files[0])}} className="my-4"/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Called</b>
                                </td>
                                <td>
                                    <b> : </b>
                                    <input type="radio" name="called" value="yes" onChange={(e)=>{setCalled(e.target.value)}} className="my-4 mx-1" checked={called === "yes"}/>Yes
                                    <input type="radio" name="called" value="no" onChange={(e)=>{setCalled(e.target.value)}} className="my-4 mx-1" checked={called === "no"}/>No 
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>
                                    <button className="form-control btn btn-secondary btn-block"><LuEdit/> Update</button>                       
                                </td>
                            </tr>
                        </table>                           
                    </form>
                </div>
            </div>
        </center>
    )
}