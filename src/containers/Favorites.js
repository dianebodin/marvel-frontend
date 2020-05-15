import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import ReactLoading from "react-loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Favorites = () => {

  const [data1, setData1] = useState([]); //data characters
  const [data2, setData2] = useState([]); //data comics
  const [isLoading, setIsLoading] = useState(true);

  const token = Cookies.get("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await axios.get(`${process.env.REACT_APP_PATH_BACKEND}/fav_characters`, { headers: { Authorization: "Bearer " + token }});
        const response2 = await axios.get(`${process.env.REACT_APP_PATH_BACKEND}/fav_comics`, { headers: { Authorization: "Bearer " + token }});
        setData1(response1.data);
        setData2(response2.data);
        setIsLoading(false);
      } catch (error) { console.log(error.message); }
    };
    fetchData();
  }, [token]);


  const handleFavoriteChar = async (char) => {
    try {
      const formData = new FormData();
      formData.append("id_char", char._id);
      formData.append("name", char.name);
      formData.append("description", char.description);
      formData.append("img", char.img);
      const res = await axios.put(`${process.env.REACT_APP_PATH_BACKEND}/favorite/characters`, formData, { headers: { Authorization: "Bearer " + token }});
      setData1(res.data); //la réponse de la requête renvoie le nouveau tableau
    } catch (error) { console.log(error.message); }
  }

  const handleFavoriteCom = async (com) => {
    try {
      const formData = new FormData();
      formData.append("id_com", com._id);
      formData.append("title", com.title);
      formData.append("description", com.description);
      formData.append("img", com.img);
      const res = await axios.put(`${process.env.REACT_APP_PATH_BACKEND}/favorite/comics`, formData, { headers: { Authorization: "Bearer " + token }});
      setData2(res.data); //la réponse de la requête renvoie le nouveau tableau
    } catch (error) { console.log(error.message); }
  }


  return (
    <>
    {isLoading ? (<div className="loading"><ReactLoading type="bubbles" color="red" /></div>) 
      : (
        <div className="fav-container">
        
          <div className="fav-char">
            <div className="fav-title">CHARACTERS</div>
            {data1.map((char, i) => {
              return (
                <div className="fav-cc" key={i}>
                  <FontAwesomeIcon className="star-icon-fav" icon="star" onClick={() => handleFavoriteChar(char)} />
                  <div><img src={char.img} alt={char.name} className="img-fav" /></div>
                  <div className="infos-fav">
                    <div>{char.name}</div>
                    {char.description ? (<div>{char.description}</div>) : (<div>No description.</div>)}
                  </div>
                </div>
              )
            })}
          </div>

          <div className="fav-com">
          <div className="fav-title">COMICS</div>
            {data2.map((com, i) => {
              return (
                <div className="fav-cc" key={i}>
                  <FontAwesomeIcon className="star-icon-fav" icon="star" onClick={() => handleFavoriteCom(com)} />
                  <div><img src={com.img} alt={com.title} className="img-fav" /></div>
                  <div className="infos-fav">
                    <div>{com.title}</div>
                    {com.description && com.description !== "null" ? (<div>{com.description}</div>) : (<div>No description.</div>)}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </>
  );

}

export default Favorites;