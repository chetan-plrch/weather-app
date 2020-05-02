import React from "react";

const ListItem = ({ id, name, onClick }) => {
  return (
    <li key={id} className="List-item" onClick={onClick}>
      {name}
    </li>
  );
};

export default ListItem;
