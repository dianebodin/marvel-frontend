import React from 'react';

const Pagination = ({ total, clickPage }) => {

  const nb_pages = Math.ceil(total / 100);
    
  const fillArray = () => {
    const arr = [];
    for (let i = 1; i <= nb_pages; i++) arr.push(i);
    return arr;
  };

  return (
    <div className="pagination">
      {fillArray().map((nb) => {
        return (
          <span key={nb}>
            <button className="pagination-button" onClick={() => clickPage(nb)}>{nb}</button>
          </span>
        )
      })}
    </div>
  );
};

export default Pagination;