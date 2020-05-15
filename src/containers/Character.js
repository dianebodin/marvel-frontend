import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import ReactLoading from "react-loading";


const Character = () => {

  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {

        const response1 = await axios.get(`${process.env.REACT_APP_PATH_BACKEND}/character/${params.id}`);
        const response2 = await axios.get(`${process.env.REACT_APP_PATH_BACKEND}/character/${params.id}/comics`);

        setData1(response1.data.data.results[0]);
        setData2(response2.data.data);
        setIsLoading(false);
      } catch (error) { console.log(error.message); }
    };
    fetchData(); 
  }, [params.id]);


  return (
    <>
      {isLoading ? (<div className="loading"><ReactLoading type="bubbles" color="red" /></div>) 
      : (
        <div className="character-container">

          <div className="card-c char">
            <div className="card-cc">
              <div className="img-container">
                <img src={`${data1.thumbnail.path}.${data1.thumbnail.extension}`} alt={data1.name} className="img-card" />
              </div>


              <div className="name-description-char">
                <div>{data1.name}</div>
                {data1.description ? (<div>{data1.description}</div>) : (<div>No description.</div>)}
              </div>
            </div>
          </div>

        {data2.results.map((item, i) => {
          return (
            <div className="com4char-c" key={i}>
              <div>
                <img src={`${item.thumbnail.path}.${item.thumbnail.extension}`} alt={item.title} className="img-com4char" />
              </div>
              <div className="title-description-com4char">
                  <div>{item.title}</div>
                  {item.description ? (<div>{item.description}</div>) : (<div>No description.</div>)}
              </div>
            </div>
          );
        })}
        </div>
      )}
    </>
  );
}

export default Character;