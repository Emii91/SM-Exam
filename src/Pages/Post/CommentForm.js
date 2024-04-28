import React, { useState } from "react";

const CommentForm = ({ postId, onCommentSubmit }) => {
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      onCommentSubmit(postId, comment);
      setComment("");
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write a comment..."
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default CommentForm;
