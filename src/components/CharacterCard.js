import React from 'react';
import '../App.css';

const CharacterCard = ({ data }) => (
  <div className="card-cc">
    <div>
      <img src={`${data.thumbnail.path}.${data.thumbnail.extension}`} alt={data.name} className="img-card" />
    </div>
    <div className="name-description-char">
      <div>{data.name}</div>
      {data.description ? (<div>{data.description}</div>) : (<div>No description.</div>)}
    </div>
  </div>
);

export default CharacterCard;