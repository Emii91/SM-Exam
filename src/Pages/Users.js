import React, { useState, useEffect } from "react";
import Navbar from "../Components/Layouts/Navbar";
import { Link } from "react-router-dom";
import "./Users.css";

const Users = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProfiles = async () => {
    try {
      const authToken = localStorage.getItem("accessToken");
      const response = await fetch(
        "https://nf-api.onrender.com/api/v1/social/profiles",
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch profiles");
      }
      const responseData = await response.json();
      setProfiles(responseData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching profiles:", error.message);
      setError("Failed to fetch profiles");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  return (
    <div>
      <Navbar />
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : profiles.length === 0 ? (
        <p>No profiles found</p>
      ) : (
        <div className="users-container">
          {profiles.map((profile) => {
            console.log(profile);
            return (
              <div key={profile.name} className="user-card">
                {profile.avatar ? (
                  <div className="card-img-container">
                    <img
                      src={profile.avatar}
                      className="card-img-top"
                      alt={`Avatar for ${profile.name}`}
                    />
                  </div>
                ) : (
                  <div className="card-img-container">
                    <div className="avatar-placeholder">
                      <span className="avatar-placeholder-text">No Avatar</span>
                    </div>
                  </div>
                )}
                <div className="card-body user">
                  <p className="card-title">Username: {profile.name}</p>
                  <div className="card-footer">
                    <Link
                      to={`/profile/${profile.name}`}
                      className="btn btn-primary"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Users;
