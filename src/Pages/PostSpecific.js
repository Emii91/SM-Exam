import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Components/Layouts/Navbar";
import "./Posts.css";

const PostSpecific = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const authToken = localStorage.getItem("accessToken");
        const response = await fetch(
          `https://nf-api.onrender.com/api/v1/social/posts/${id}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch post");
        }
        const postData = await response.json();
        console.log("Post object:", postData);
        setPost(postData);
      } catch (error) {
        console.error("Error fetching post:", error);
        setError(error.message);
      }
    };

    fetchPost();

    const storedComments = JSON.parse(
      localStorage.getItem(`post_${id}_comments`)
    );
    if (storedComments) {
      setComments(storedComments);
    }
  }, [id]);

  const handleRemoveComment = (index) => {
    const updatedComments = [...comments];
    updatedComments.splice(index, 1);
    setComments(updatedComments);
    localStorage.setItem(
      `post_${id}_comments`,
      JSON.stringify(updatedComments)
    );
  };

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Navbar />
      <div className="post-specific-content">
        <div className="card">
          <div className="card-body">
            <h1>Title: {post.title}</h1>
            <p className="centered">Body: {post.body}</p>
            <div>
              <ul>
                {comments.map((comment, index) => (
                  <li key={index}>
                    {comment.body}
                    <button onClick={() => handleRemoveComment(index)}>
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostSpecific;
