import React from "react";

const Logout = () => {
  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
