import React from 'react';
import '../App.css';

const ComicCard = ({ data }) => (
  <div className="card-cc">
    <div>
      <img src={`${data.thumbnail.path}.${data.thumbnail.extension}`} alt={data.title} className="img-card" />
    </div>
    <div className="title-description-com">
        <div>{data.title}</div>
        {data.description ? <div>{data.description}</div> : <div>No description.</div>}
    </div>
  </div>
);

export default ComicCard;