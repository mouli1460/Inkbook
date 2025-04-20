import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import noteContext from "../context/notes/noteContext";
import "./Login.css";


const Login = ({ setToken }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { getNotes } = useContext(noteContext);

    const handleLogin = async (e) => {
      e.preventDefault();
  
      try {
          const response = await fetch("http://localhost:5000/api/auth/login", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, password }),
          });
  
          const json = await response.json();
  
          if (json.authToken) {
              localStorage.setItem("token", json.authToken);
              if (setToken) setToken(json.authToken);  // ✅ Ensure setToken is a function
  
              await getNotes(); // ✅ Fetch notes after login
  
              navigate("/intro"); // ✅ Redirect to Addnote page
          } else {
              console.log("Login failed:", json.error);
          }
      } catch (error) {
          console.error("Error during login:", error);
      }
  };
  

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
