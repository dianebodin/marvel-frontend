import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../App.css';

const Search = ({ setInputSearch }) => { 
  
  const handleInputSearchChange = e => setInputSearch(e.target.value);

  return (
    <div className="search-bar">
      <input type="text" className="input-search" onChange={handleInputSearchChange} placeholder="Search..." />
      <FontAwesomeIcon className="search-icon" icon="search" />
    </div>
  );
};

export default Search;