import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteState from "./context/notes/NoteState";
import Navbar from "./components/Navbar";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Addnote from "./components/Addnote";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import About from "./components/About";
import IntroPage from "./components/IntroPage";

function App() {
    const [token, setToken] = useState(localStorage.getItem("token") || "");

    useEffect(() => {
        console.log("Token in localStorage:", token);
    }, [token]);

    return (
        <NoteState>
            <Router>
                <Navbar />
                <Alert message="This is an alert" />
                <Routes>
    <Route exact path="/" element={token ? <Home /> : <LandingPage />} />
    <Route exact path="/login" element={<Login setToken={setToken} />} />
    <Route exact path="/addnote" element={token ? <Addnote /> : <Login setToken={setToken} />} /> 
    <Route exact path="/signup" element={<SignUp/>}/>
    <Route exact path="/about" element={<About/>}/>
    <Route exact path="/intro" element={<IntroPage/>}/>
</Routes>

            </Router>
        </NoteState>
    );
}

export default App;
