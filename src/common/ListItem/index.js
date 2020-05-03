import React from "react";

const attachSpan = (name, searchText) => {
  const searchTextLower = searchText.toLowerCase();
  const nameInLower = name.toLowerCase();

  const index = nameInLower.indexOf(searchTextLower);
  const substringInName = name.substr(index, searchTextLower.length);

  const nameSplits = name.split(substringInName);
  return [nameSplits[0], substringInName, nameSplits[1]];
};

const ListItem = ({ id, name, searchText, onClick, placeholder }) => {
  if (placeholder) {
    return (
      <li key={id} className="List-item">
        {name}
      </li>
    );
  }

  const [first, middle, last] = attachSpan(name, searchText);

  return (
    <li key={id} className="List-item" onClick={onClick}>
      <span>{first}</span>
      <span className="Highlight">{middle}</span>
      <span>{last}</span>
    </li>
  );
};

export default ListItem;
