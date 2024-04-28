import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Layouts/Navbar";
import CreatePostForm from "./Post/CreatePostForm";
import DeletePost from "./Post/DeletePost";
import EditPost from "./Post/EditPost";
import img from "../Components/Assets/bread-821503_1280.jpg";
import "./MyProfile.css";

const MyProfile = () => {
  const [avatarURL, setAvatarURL] = useState("");
  const [bannerURL, setBannerURL] = useState("");
  const [error, setError] = useState(null);
  const [showCreatePostForm, setShowCreatePostForm] = useState(false);
  const [posts, setPosts] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);
  const [showAvatarInput, setShowAvatarInput] = useState(false);
  const [showBannerInput, setShowBannerInput] = useState(false);
  const [showCreatePostInput, setShowCreatePostInput] = useState(false);

  const profileName = localStorage.getItem("userName");

  useEffect(() => {
    const storedAvatarURL = localStorage.getItem("avatarURL");
    if (storedAvatarURL) {
      setAvatarURL(storedAvatarURL);
    }

    const fetchUserPosts = async () => {
      try {
        const authToken = localStorage.getItem("accessToken");
        const response = await fetch(
          `https://nf-api.onrender.com/api/v1/social/profiles/${profileName}/posts`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user's posts");
        }
        const postData = await response.json();
        setPosts(postData);
      } catch (error) {
        console.error("Error fetching user's posts:", error);
        setError("Failed to fetch user's posts");
      }
    };

    const fetchBannerURL = async () => {
      try {
        const authToken = localStorage.getItem("accessToken");
        const response = await fetch(
          `https://nf-api.onrender.com/api/v1/social/profiles/${profileName}/banner`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        if (response.ok) {
          const bannerData = await response.json();
          setBannerURL(bannerData.bannerURL || img);
        } else {
          setBannerURL(img);
        }
      } catch (error) {
        console.error("Error fetching user's banner:", error);
        setBannerURL(img);
      }
    };

    fetchUserPosts();
    fetchBannerURL();
  }, [profileName]);

  const handleAvatarURLChange = (event) => {
    setAvatarURL(event.target.value);
  };

  const handleBannerURLChange = (event) => {
    setBannerURL(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const authToken = localStorage.getItem("accessToken");

      if (avatarURL) {
        const avatarResponse = await fetch(
          `https://nf-api.onrender.com/api/v1/social/profiles/${profileName}/media`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              avatar: avatarURL,
            }),
          }
        );

        if (!avatarResponse.ok) {
          throw new Error("Failed to update avatar");
        }

        localStorage.setItem("avatarURL", avatarURL);
        console.log("Avatar URL updated successfully!");
      }

      if (bannerURL) {
        console.log("Banner URL to be updated:", bannerURL);
        const bannerResponse = await fetch(
          `https://nf-api.onrender.com/api/v1/social/profiles/${profileName}/banner`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              banner: bannerURL,
            }),
          }
        );

        console.log("Banner update response:", bannerResponse);

        if (!bannerResponse.ok) {
          throw new Error("Failed to update banner");
        }

        localStorage.setItem("bannerURL", bannerURL);
        console.log("Banner URL updated successfully!");
      }

      setSuccessMessage("Profile media updated successfully!");
      setSuccessMessageVisible(true);
    } catch (error) {
      console.error("Error updating profile media:", error);
      setError("Failed to update profile media");
    }
  };

  const handleCreatePostClick = () => {
    setShowCreatePostForm(!showCreatePostForm);
    setShowCreatePostInput(!showCreatePostInput);
  };

  const handlePostDeleted = async (postId) => {
    try {
      const authToken = localStorage.getItem("accessToken");

      const response = await fetch(
        `https://nf-api.onrender.com/api/v1/social/posts/${postId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.ok || response.status === 204) {
        setPosts(posts.filter((post) => post.id !== postId));
        setSuccessMessage("Post deleted successfully!");
        setSuccessMessageVisible(true);
      } else {
        throw new Error("Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      setError("Failed to delete post");
    }
  };

  const toggleAvatarInput = () => {
    setShowAvatarInput((prev) => !prev);
  };

  const toggleBannerInput = () => {
    setShowBannerInput((prev) => !prev);
  };

  return (
    <div>
      <Navbar />
      {bannerURL && (
        <div className="banner-container position-relative">
          <img src={bannerURL || img} alt="Banner" className="banner-image" />
          <div
            className="position-absolute bottom-0 start-0 p-3"
            style={{ zIndex: 1 }}
          >
            {showBannerInput && (
              <form
                onSubmit={handleSubmit}
                className="mb-3 d-flex align-items-center"
              >
                <input
                  type="text"
                  id="bannerURL"
                  value={bannerURL}
                  onChange={handleBannerURLChange}
                  className="form-control"
                />
                <button type="submit" className="btn btn-primary btn-sm ms-2">
                  Update
                </button>
              </form>
            )}
          </div>
          <div
            className="position-absolute bottom-0 start-0 m-2"
            style={{ zIndex: 2 }}
          >
            <button
              onClick={toggleBannerInput}
              className="btn btn-primary btn-sm"
            >
              Change Banner
            </button>
          </div>
        </div>
      )}

      <div className="container mt-3">
        <div className="row row-cols-1 row-cols-lg-2 g-0">
          <div className="col">
            <div className="card h-100 mx-auto" style={{ maxWidth: "400px" }}>
              <img
                src={avatarURL}
                className="card-img-top"
                id="avatar-img"
                alt="Avatar"
              />
              <div className="card-body">
                <h5 className="card-title">Profile Images</h5>
                <p className="card-text">Update your avatar.</p>
                <div className="form-group">
                  <button
                    onClick={toggleAvatarInput}
                    className="btn btn-primary mb-2"
                  >
                    Change Avatar
                  </button>
                  {showAvatarInput && (
                    <form onSubmit={handleSubmit}>
                      <label htmlFor="avatarURL">New Avatar URL:</label>
                      <input
                        type="text"
                        id="avatarURL"
                        value={avatarURL}
                        onChange={handleAvatarURLChange}
                        className="form-control mb-2"
                      />
                      <button
                        type="submit"
                        className="btn btn-primary btn-block"
                      >
                        Update Avatar
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card h-100 mx-auto" style={{ maxWidth: "400px" }}>
              <div className="card-body">
                <h5 className="card-title">Create Post</h5>
                <p>Stay connected! Share your thoughts with your friends.</p>
                <button
                  type="button"
                  className="btn btn-primary btn-block"
                  onClick={handleCreatePostClick}
                >
                  {showCreatePostForm ? "Hide Form" : "Create Post"}
                </button>
                {showCreatePostInput && <CreatePostForm />}
              </div>
            </div>
          </div>
        </div>
      </div>
      <h1 className="mt-3 text-center">Your posts</h1>
      <div className="container">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-0">
          {posts.map((post) => (
            <div className="col" key={post.id}>
              <div className="card h-100">
                <div className="card-body">
                  <h2 className="card-title">{post.title}</h2>
                  <p className="card-text">{post.body}</p>
                  <div className="btn-group" role="group">
                    <EditPost postId={post.id} />
                    <DeletePost
                      postId={post.id}
                      onPostDeleted={handlePostDeleted}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="text-center mt-3">
        <button className="btn btn-primary">
          <Link to="/posts" className="text-white">
            View Posts
          </Link>
        </button>
      </div>
      {error && <p className="text-center mt-3">Error: {error}</p>}
      {successMessageVisible && (
        <p className="text-center mt-3">{successMessage}</p>
      )}
    </div>
  );
};

export default MyProfile;
