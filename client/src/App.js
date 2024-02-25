import React, { Component } from "react"

import Register from "./Authentification/Register";
import Login from "./Authentification/Login";
import AuthGuard from './Authentification/AuthGuard';

import CalledUp from './CalledUp/CalledUp';
import Liste from './Crud/Liste';
import Create from './Crud/Create';
import Update from './Crud/Update';
import HomePage from "./HomePage/HomePage";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default class App extends Component{
    render(){
        return(
            <Router>
                <Routes>
                    {/* Auth */}
                        <Route path="/register" element={<Login />} />
                        <Route path="/login" element={<Login />} />

                    <Route path="/" element={
                        <AuthGuard>
                            <HomePage/>
                        </AuthGuard>
                    }/>

                    <Route path="/all_players" element={
                        <AuthGuard>
                            <Liste/>
                        </AuthGuard>
                    }/>

                    <Route path="/create" element={
                        <AuthGuard>
                            <Create/>
                        </AuthGuard>
                    }/>

                    <Route path="/update/:id" element={
                        <AuthGuard>
                            <Update/>
                        </AuthGuard>
                    }/>

                    <Route path="/called_up" element={
                        <AuthGuard>
                            <CalledUp/>
                        </AuthGuard>
                    }/>
                </Routes>
            </Router>
        )
    }
}