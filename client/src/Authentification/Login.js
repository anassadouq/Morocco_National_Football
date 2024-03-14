import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AccountService } from './AccountService';
import axios from 'axios';

export default function Login() {
  let navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const onChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
    setErrorMessage("");
  };

  const onSubmit = (e) => {
    e.preventDefault();

    axios.post('http://127.0.0.1:8000/api/login', credentials)
      .then(res => {
        AccountService.saveToken(res.data.token);
        navigate('/');
      })
      .catch(error => {
        setErrorMessage("Email or Password incorrect. Please try again.");
      });
  };

  return (
    <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div className="my-4 card mx-auto" style={{ width: '600px' }}>
        <div className="card-body">
          <h1 className="text-center">Login</h1>
          <form onSubmit={onSubmit}>
            <div className="row">
            </div>

            <div className='form-group'>
              <b>Email</b>
              <input type="text" name="email" onChange={onChange} className="form-control my-3" placeholder="Enter Your Email Address" />
            </div>

            <div className='form-group'>
              <b>Password</b>
              <input type="password" name="password" onChange={onChange} className="form-control my-3" placeholder="*******" />
              <button type="submit" className="form-control btn btn-dark btn-block" >Login</button><br/><br/>
            </div>
          </form>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
}