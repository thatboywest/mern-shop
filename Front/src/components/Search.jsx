import React, { useState } from 'react';
import './Search.css';

const SearchInput = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');

  const handleChange = (e) => {
    const text = e.target.value;
    setSearchText(text);
    onSearch(text); // Trigger the search in the parent component
  };

  return (
    <input
      type="text"
      name="text"
      placeholder="Search 'nike air'"
      className="input"
      value={searchText}
      onChange={handleChange}
    />
  );
};

export default SearchInput;
