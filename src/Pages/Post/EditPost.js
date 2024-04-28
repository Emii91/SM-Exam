import React, { useState } from "react";

const EditPost = ({ postId }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const authToken = localStorage.getItem("accessToken");
      const response = await fetch(
        `https://nf-api.onrender.com/api/v1/social/posts/${postId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({ title, body }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update post");
      }
      console.log("Post updated successfully!");
      setSuccessMessageVisible(true);
      setTitle("");
      setBody("");
      window.location.reload();
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <div className="edit-post-form-container">
      {successMessageVisible && <p>Post updated successfully!</p>}
      <form className="edit-post" onSubmit={handleSubmit}>
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
        <button
          type="button"
          className="btn btn-warning me-2"
          onClick={handleSubmit}
        >
          Edit
        </button>
      </form>
    </div>
  );
};

export default EditPost;
