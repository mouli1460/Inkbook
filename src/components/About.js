import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <h1 className="about-title">About iNotebook</h1>
      <p className="about-text">
        iNotebook is a secure and efficient note-taking application that allows users to store, manage, and access their notes anytime. Built using the MERN stack, iNotebook ensures data persistence with MongoDB and seamless user experience with React.
      </p>
      <h2 className="about-subtitle">Features</h2>
      <div className="features-grid">
        <div className="feature-box">
          <i className="fa-solid fa-file-shield feature-icon"></i>
          <p>Secure storage of notes</p>
        </div>
        <div className="feature-box">
          <i className="fa-solid fa-cloud feature-icon"></i>
          <p>Cloud-based access from anywhere</p>
        </div>
        <div className="feature-box">
          <i className="fa-solid fa-user-shield feature-icon"></i>
          <p>User authentication for privacy</p>
        </div>
        <div className="feature-box">
          <i className="fa-solid fa-paint-brush feature-icon"></i>
          <p>Simple and intuitive UI</p>
        </div>
        <div className="feature-box">
          <i className="fa-solid fa-folder-tree feature-icon"></i>
          <p>Efficient organization and categorization</p>
        </div>
      </div>
      <p className="about-text">
        Whether you're a student, professional, or just someone who loves organizing thoughts, iNotebook is the perfect solution for you!
      </p>
    </div>
  );
};

export default About;
