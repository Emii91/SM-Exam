import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Layouts/Navbar";
import "./Home.css";

export default function Home() {
  return (
    <div className="home">
      <Navbar />
      <h1 style={{ fontFamily: "Platypi, sans-serif" }}>LinkUp</h1>
      <p>
        Connect with friends and family seamlessly with our secure messaging
        platform.
      </p>
      <p>Experience fast, reliable, and encrypted communication.</p>
      <div className="button-container">
        <Link to="/register" className="btn btn-primary">
          Register
        </Link>
        <Link to="/login" className="btn btn-primary">
          Login
        </Link>
      </div>
    </div>
  );
}
