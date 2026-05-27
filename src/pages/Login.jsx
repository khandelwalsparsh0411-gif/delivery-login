import React, { useState } from "react";
import "./Login.css";
import { FaEnvelope, FaLock, FaMotorcycle } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    alert("Login Successful");
  };

  return (
    <div className="login-container">
      <div className="login-box">

        <div className="logo-section">
          <FaMotorcycle className="bike-icon" />
          <h1>Delivery App</h1>
          <p>Fast & Secure Delivery</p>
        </div>

        <form onSubmit={handleLogin}>

          <div className="input-box">
            <FaEnvelope className="icon" />
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-box">
            <FaLock className="icon" />
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit">
            Login
          </button>

        </form>

      </div>
    </div>
  );
};

export default Login;