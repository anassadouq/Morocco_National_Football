import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Register() {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const register = () => {
        if (name && email && password){
            axios.post("http://127.0.0.1:8000/api/register", {
                name, email, password
            }).then((res) => {
                setUsers((prevUsers) => [...prevUsers, res.data]);
            });

            navigate("/login");
        }
    };

    return (
        <div className="container my-5">
            <div className="my-4 card mx-auto" style={{ maxWidth: '600px' }}>
                <div className="card-body">
                    <h1 className="text-center">Register</h1>
                    <div className="form-group">
                        <b>First Name</b>
                        <input type="text" name="name" className="form-control my-3" placeholder="Your Name" onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <b>Email</b>
                        <input type="email" name="email" className="form-control my-3" placeholder="example@gmail.com" onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <b>Password</b>
                        <input type="password" name="password" className="form-control my-3" placeholder="*******" onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className="form-group"> 
                        <button className="form-control btn btn-dark btn-block" onClick={register}>Register</button><br/><br/>
                        <center>
                            <span>Already have an Account?</span>
                            <span>
                                <Link to="/login" className="text-center mx-2">Login</Link>
                            </span>
                        </center>
                    </div>
                </div>
            </div>
        </div>
    );
}