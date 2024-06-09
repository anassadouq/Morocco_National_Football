import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BiAddToQueue } from 'react-icons/bi';

export default function Create(){
    const navigate = useNavigate();
    
    const [name,setName] = useState('')
    const [image, setImage] = useState('')
    const [birthday,setBirthday] = useState('')
    const [play,setPlay] = useState('')
    const [club,setClub] = useState('')
    const [clubImage,setClubImage] = useState('')
    const [called,setCalled] = useState('')

    const createPlayer = async(e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name)
        formData.append('image', image)
        formData.append('birthday', birthday)
        formData.append('play', play)
        formData.append('club', club)
        formData.append('clubImage', clubImage)
        formData.append('called', called)

        console.log(formData)
        await axios.post('http://127.0.0.1:8000/api/player', formData)
        .then(({data})=>{
            console.log(data.message)
            navigate('/all_players')
        }).catch(({response})=>{
            if (response.status ===422) {
                console.log(response.data.errors)
            } else {
                console.log(response.data.message)
            }
        })
    }

    return(
        <center>
            <div className="my-3">
                <div className="my-4 card mx-auto" style={{ maxWidth: '600px' }}>
                    <div className="card-body">
                        <form method="post" onSubmit={createPlayer}>
                            <table>
                                <tr>
                                    <td>
                                        <b>Name</b>
                                    </td>
                                    <td>
                                        <b> : </b>
                                        <input type="text" name="name" placeholder="Player name" onChange={(e)=>{setName(e.target.value)}} className="my-4"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <b>Image</b>
                                    </td>
                                    <td>
                                        <b> : </b>
                                        <input type="file" name="image" onChange={(e)=>setImage(e.target.files[0])} className="my-4"/>
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
                                        <b>Play as</b>
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
                                        <input type="text" name="club" placeholder="Club name" onChange={(e)=>{setClub(e.target.value)}} className="my-4"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <b>Image Club</b>
                                    </td>
                                    <td>
                                        <b> : </b>
                                        <input type="file" name="clubImage" onChange={(e)=>setClubImage(e.target.files[0])} className="my-4"/>
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
                                    </td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>
                                        <button className="form-control btn btn-warning btn-block"><BiAddToQueue/> Player</button>
                                    </td>
                                </tr>
                            </table>
                        </form>
                    </div>
                </div>
            </div>
        </center>
    )
}