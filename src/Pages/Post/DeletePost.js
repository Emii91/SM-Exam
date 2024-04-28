import React, { useState } from "react";

const DeletePost = ({ postId }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isDeleted, setIsDeleted] = useState(false);

  const handleDelete = async () => {
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

      if (response.ok) {
        console.log("Post deleted successfully!");
        setIsDeleted(true);
        window.location.reload();
      } else {
        throw new Error("Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      setErrorMessage("Failed to delete post");
    }
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-danger"
        onClick={() => handleDelete(postId)}
      >
        Delete
      </button>
      {errorMessage && <p>Error: {errorMessage}</p>}
      {isDeleted && <p>Post deleted successfully!</p>}
    </div>
  );
};

export default DeletePost;
