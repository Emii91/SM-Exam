import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Layouts/Navbar";
import "./Posts.css";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [commentInputs, setCommentInputs] = useState({});

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("comments"));
    if (!storedPosts) {
      fetchPosts();
    } else {
      setPosts(storedPosts);
    }
  }, []);

  const fetchPosts = async () => {
    try {
      const authToken = localStorage.getItem("accessToken");
      const response = await fetch(
        "https://nf-api.onrender.com/api/v1/social/posts",
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }
      const postData = await response.json();
      setPosts(postData);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError(error.message);
    }
  };

  const handleCommentSubmit = async (postId, comment) => {
    try {
      const authToken = localStorage.getItem("accessToken");
      const response = await fetch(
        `https://nf-api.onrender.com/api/v1/social/posts/${postId}/comment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({ body: comment }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to submit comment");
      }
      console.log("Comment submitted successfully!");

      const updatedPosts = posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [...(post.comments || []), { body: comment }],
            }
          : post
      );
      setPosts(updatedPosts);

      localStorage.setItem("comments", JSON.stringify(updatedPosts));
      clearCommentInput(postId);
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const handleReactToPost = (postId, e) => {
    e.preventDefault();
    e.stopPropagation();
    const updatedPosts = posts.map((post) =>
      post.id === postId
        ? {
            ...post,
            reacted: !post.reacted,
          }
        : post
    );
    setPosts(updatedPosts);
    localStorage.setItem("comments", JSON.stringify(updatedPosts));
  };

  const handleCommentInputChange = (postId, value) => {
    setCommentInputs((prevInputs) => ({
      ...prevInputs,
      [postId]: value,
    }));
  };

  const clearCommentInput = (postId) => {
    setCommentInputs((prevInputs) => ({
      ...prevInputs,
      [postId]: "",
    }));
  };

  const handleRemoveComment = (postId, index) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        const updatedComments = [...post.comments];
        updatedComments.splice(index, 1);
        return {
          ...post,
          comments: updatedComments,
        };
      }
      return post;
    });
    setPosts(updatedPosts);
    localStorage.setItem("comments", JSON.stringify(updatedPosts));
  };

  return (
    <div className="posts-page">
      <Navbar />
      <div className="posts-content">
        <h1>Posts</h1>
        {error && <p>Error: {error}</p>}
        <div className="posts-container">
          {posts.map((post) => (
            <div className="post-card" key={post.id}>
              <div className="card" id="card-border">
                <div className="card-body">
                  <Link to={`/post/${post.id}`} className="post-link">
                    <p className="card-title">
                      {post.title}
                      <button
                        onClick={(e) => handleReactToPost(post.id, e)}
                        className="btn btn-link float-end"
                        style={{ fontSize: "1.2rem" }}
                      >
                        {post.reacted ? (
                          <i className="bi bi-heart-fill text-danger"></i>
                        ) : (
                          <i className="bi bi-heart text-danger"></i>
                        )}
                      </button>
                    </p>
                  </Link>
                  <form
                    id="post-form"
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleCommentSubmit(post.id, commentInputs[post.id]);
                    }}
                  >
                    <div className="form-group">
                      <textarea
                        className="form-control"
                        rows="3"
                        value={commentInputs[post.id] || ""}
                        onChange={(e) =>
                          handleCommentInputChange(post.id, e.target.value)
                        }
                        placeholder="Write a comment..."
                      />
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </form>
                  {post.comments && (
                    <ul className="list-group list-group-flush">
                      {post.comments.map((comment, index) => (
                        <li key={index} className="list-group-item">
                          {comment.body}
                          <button
                            className="btn btn-link float-end"
                            onClick={() => handleRemoveComment(post.id, index)}
                          >
                            <i className="bi bi-x text-danger"></i>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Posts;
