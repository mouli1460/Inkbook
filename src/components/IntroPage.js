import React from 'react';
import { useNavigate } from 'react-router-dom';
import './IntroPage.css';

const IntroPage = () => {
    const navigate = useNavigate(); // Initialize the useNavigate hook

    const handleStartClick = () => {
        navigate('/addnote'); // Navigate to the /addnote route
    };

    return (
        <div className="intro-container">
            <div className="intro-header">
                <h1>Welcome to Your Notebook</h1>
                <p>Your digital workspace to create, edit, and organize your notes.</p>
            </div>
            
            <div className="features-container">
                <div className="feature-box">
                    <h3>Create Notes</h3>
                    <p>Easily create new notes and store important information in an organized way.</p>
                </div>
                <div className="feature-box">
                    <h3>Edit Notes</h3>
                    <p>Edit your notes anytime to keep them up to date and relevant.</p>
                </div>
                <div className="feature-box">
                    <h3>Delete Notes</h3>
                    <p>If a note is no longer needed, simply delete it to keep your workspace clean.</p>
                </div>
            </div>

            <div className="ready-to-start">
                <button onClick={handleStartClick}>Ready to Start</button>
            </div>
        </div>
    );
};

export default IntroPage;
