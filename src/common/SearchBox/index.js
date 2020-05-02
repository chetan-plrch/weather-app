import React from "react";

const SearchBox = ({ searchText, onChange, onFocus, onBlur }) => {
  return (
    <input
      placeholder="Search for city"
      onFocus={onFocus}
      onBlur={onBlur}
      className="Search-text"
      onChange={onChange}
      value={searchText}
    />
  );
};

export default SearchBox;
