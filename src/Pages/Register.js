import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Layouts/Navbar";
import "./Register.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (name.trim() === "") {
        throw new Error("Name cannot be empty");
      }

      if (!email.endsWith("@stud.noroff.no")) {
        throw new Error("Only users with stud.noroff.no email can register");
      }

      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters long");
      }

      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      const response = await fetch(
        "https://nf-api.onrender.com/api/v1/social/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            banner: "",
            avatar: "",
            password,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      setSuccess("Registration successful");
      navigate("/login");

      localStorage.setItem("userEmail", email);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
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
              Password (Must be 7 characters)
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
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password (Must be 7 characters)
            </label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Register
          </button>
          {error && <div className="text-danger">{error}</div>}
          {success && <div className="text-success">{success}</div>}
        </form>
      </div>
    </div>
  );
};

export default Register;
