import React, { useState } from "react";

const CreatePostForm = ({ onPostCreated }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const authToken = localStorage.getItem("accessToken");
      const response = await fetch(
        "https://nf-api.onrender.com/api/v1/social/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({ title, body }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to create post");
      }
      console.log("Post created successfully!");
      if (typeof onPostCreated === "function") {
        onPostCreated();
      }
      setShowSuccessMessage(true);
      setTitle("");
      setBody("");
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="create-post-form-container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title:
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="body" className="form-label">
            Body:
          </label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary btn-sm">
          Create Post
        </button>
        {showSuccessMessage && (
          <p className="success-message">Post created successfully!</p>
        )}
      </form>
    </div>
  );
};

export default CreatePostForm;
