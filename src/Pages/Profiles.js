import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Components/Layouts/Navbar";
import "./Profiles.css";

const Profiles = () => {
  const { name } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [actionInProgress, setActionInProgress] = useState(false);

  useEffect(() => {
    const storedFollowStatus = localStorage.getItem(`${name}-follow`);
    setIsFollowing(storedFollowStatus === "true");
  }, [name]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const authToken = localStorage.getItem("accessToken");
        const response = await fetch(
          `https://nf-api.onrender.com/api/v1/social/profiles/${name}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }
        const responseData = await response.json();
        setProfile(responseData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile:", error.message);
        setError("Failed to fetch profile");
        setLoading(false);
      }
    };

    fetchProfile();
  }, [name]);

  const handleFollow = async () => {
    try {
      if (isFollowing) {
        console.log("User is already following this profile");
        return;
      }

      setActionInProgress(true);
      const authToken = localStorage.getItem("accessToken");
      const response = await fetch(
        `https://nf-api.onrender.com/api/v1/social/profiles/${name}/follow`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to follow profile");
      }
      setIsFollowing(true);
      setActionInProgress(false);
      localStorage.setItem(`${name}-follow`, "true");
      setProfile((prevProfile) => ({
        ...prevProfile,
        _count: {
          ...prevProfile._count,
          followers: prevProfile._count.followers + 1,
        },
      }));
    } catch (error) {
      console.error("Error following profile:", error);
      setActionInProgress(false);
    }
  };

  const handleUnfollow = async () => {
    try {
      setActionInProgress(true);
      const authToken = localStorage.getItem("accessToken");
      const response = await fetch(
        `https://nf-api.onrender.com/api/v1/social/profiles/${name}/unfollow`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to unfollow profile");
      }
      setIsFollowing(false);
      setActionInProgress(false);
      localStorage.removeItem(`${name}-follow`);
      setProfile((prevProfile) => ({
        ...prevProfile,
        _count: {
          ...prevProfile._count,
          followers: prevProfile._count.followers - 1,
        },
      }));
    } catch (error) {
      console.error("Error unfollowing profile:", error);
      setActionInProgress(false);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="container">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : !profile ? (
          <p>Profile not found</p>
        ) : (
          <div className="row justify-content-center">
            <div className="col-md-8">
              <h1 className="text-center">Profile Page for {name}</h1>
              <div className="card" id="profile-card">
                <div className="card-body" id="profile-body">
                  <div className="text-center">
                    <p>
                      {" "}
                      <img
                        src={profile.avatar}
                        alt="Avatar"
                        style={{ maxWidth: "200px" }}
                      />
                    </p>
                    <p>
                      {" "}
                      <img
                        src={profile.banner}
                        alt="Banner"
                        style={{ maxWidth: "200px" }}
                      />
                    </p>
                    <p>Name: {profile.name}</p>
                    <p>Followers: {profile._count.followers}</p>
                    <p>Following: {profile._count.following}</p>
                    <p>Posts: {profile._count.posts}</p>
                    {actionInProgress ? (
                      <p>Updating follow status...</p>
                    ) : (
                      <button
                        onClick={isFollowing ? handleUnfollow : handleFollow}
                        className="btn btn-primary"
                      >
                        {isFollowing ? "Unfollow" : "Follow"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profiles;
