import React, { useState } from "react";
import CreatePostForm from "./CreatePostForm";

const CreatePostPage = () => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handlePostCreated = () => {
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 5000);
  };

  return (
    <div>
      {showSuccessMessage && <p>Post created successfully!</p>}
      <h2>Create a New Post</h2>
      <CreatePostForm onPostCreated={handlePostCreated} />
    </div>
  );
};

export default CreatePostPage;
