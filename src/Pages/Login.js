import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Layouts/Navbar";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState(localStorage.getItem("userEmail") || "");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://nf-api.onrender.com/api/v1/social/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      if (!response.ok) {
        throw new Error("Login failed");
      }
      const data = await response.json();
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userName", data.name);
      navigate("/myprofile");
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="name.name@stud.noroff.no"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
          {error && <div className="text-danger">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default Login;
