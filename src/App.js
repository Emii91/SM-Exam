import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Users from "./Pages/Users";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import MyProfile from "./Pages/MyProfile";
import Profiles from "./Pages/Profiles";
import Posts from "./Pages/Posts";
import PostSpecific from "./Pages/PostSpecific";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/myprofile" element={<MyProfile />} />
        <Route path="/profile/:name" element={<Profiles />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/post/:id" element={<PostSpecific />} />
      </Routes>
    </Router>
  );
};

export default App;
