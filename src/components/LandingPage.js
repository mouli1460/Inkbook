import React from "react";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        localStorage.setItem("token", "yourAuthToken"); // Simulated login
        navigate("/login"); // Redirect to Home
        window.location.reload(); // Ensure proper re-render
    };

    return (
        <div className="landing-container">
            <div className="landing-content">
                <h1 className="landing-title">
                    Welcome to <span className="highlight">iNotebook</span>
                </h1>
                <p className="landing-subtitle">
                    The smartest way to organize your thoughts and ideas. Secure. Fast. Simple.
                </p>
                <button className="landing-button" onClick={handleLogin}>
                    Get Started
                </button>
            </div>
        </div>
    );
};

export default LandingPage;
