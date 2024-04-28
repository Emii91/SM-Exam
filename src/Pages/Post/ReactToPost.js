import React from "react";
import PropTypes from "prop-types";

const ReactToPost = ({ postId, symbols, onReactToPost }) => {
  const handleReact = (symbol) => {
    onReactToPost(postId, symbol);
  };

  return (
    <div>
      {symbols.map((symbol, index) => (
        <button
          className="btn btn-link"
          key={index}
          onClick={() => handleReact(symbol)}
        >
          {symbol}
        </button>
      ))}
    </div>
  );
};

ReactToPost.propTypes = {
  postId: PropTypes.number.isRequired,
  symbols: PropTypes.arrayOf(PropTypes.string).isRequired,
  onReactToPost: PropTypes.func.isRequired,
};

export default ReactToPost;
