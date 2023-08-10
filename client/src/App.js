import React, { Component } from "react"
import Navbar from './Navbar/Navbar';
import CalledUp from './CalledUp/CalledUp';
import Liste from './Crud/Liste';
import Create from './Crud/Create';
import Update from './Crud/Update';
import HomePage from "./HomePage/HomePage";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

class App extends Component{
    render(){
        return(
                <Router>
                    <Navbar/>
                    <Routes>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path='/all_players' element={<Liste/>}/>
                        <Route path='/create' element={<Create/>}/>
                        <Route path='/update/:id' element={<Update/>}/>
                        <Route path='/called_up' element={<CalledUp/>}/>
                    </Routes>
                </Router>
        )
    }
}
export default App;