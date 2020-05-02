import React from "react";

const ListContainer = ({ children }) => {
  return (
    <div className="List-container">
      <ul className="List-block">{children}</ul>
    </div>
  );
};

export default ListContainer;
