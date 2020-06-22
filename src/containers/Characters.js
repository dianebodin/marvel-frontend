import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CharacterCard from '../components/CharacterCard';
import Pagination from '../components/Pagination';
import Search from '../components/Search';
import { Link } from 'react-router-dom';
import '../App.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from 'js-cookie';
import ReactLoading from "react-loading";


const Characters = () => {

  const [data, setData] = useState([]); //tableau de données
  const [isLoading, setIsLoading] = useState(true);
  const [favChar, setFavChar] = useState([]);
  
  //paramètres query
  const [offset, setOffset] = useState(0); 
  const [inputSearch, setInputSearch] = useState("");

  const token = Cookies.get("token");


  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = [];
        setInputSearch(inputSearch.trim());
        if (inputSearch.length > 0) {
          setOffset(0);
          response = await axios.get(`${process.env.REACT_APP_PATH_BACKEND}/search/characters?offset=${offset}&nameStartsWith=${inputSearch}`); //search
        }
        else response = await axios.get(`${process.env.REACT_APP_PATH_BACKEND}/characters?offset=${offset}`); //par défaut

        setData(response.data.data);
        setIsLoading(false);
      } catch (error) { console.log(error.message); }
    };
    fetchData();
  }, [offset, inputSearch]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_PATH_BACKEND}/fav_characters/by_id`, { headers: { Authorization: "Bearer " + token }});
        setFavChar(response.data);
      } catch (error) { console.log(error.message); }
    };
    fetchData();
  }, [token, favChar]);


  const clickPage = (nb) => {
    setOffset(nb*100-100);
  }


  const handleFavorite = async (item) => {
    try {
      const formData = new FormData();
      formData.append("id_char", item.id);
      formData.append("name", item.name);
      formData.append("description", item.description);
      formData.append("img", item.thumbnail.path+"."+item.thumbnail.extension);
      await axios.put(`${process.env.REACT_APP_PATH_BACKEND}/favorite/characters`, formData, { headers: { Authorization: "Bearer " + token }});
    } catch (error) { console.log(error.message); }
  }


  return (
    <>
      {isLoading ? (<div className="loading"><ReactLoading type="bubbles" color="red" /></div>) 
        : (
        <>
          <Search setInputSearch={setInputSearch} />

          {data.results.map((item, i) => {
            return (
              <div className="card-c" key={i}>
                {token ? (
                  <FontAwesomeIcon icon="star" className={favChar.indexOf(JSON.stringify(item.id)) !== -1 ? "star-icon red" : "star-icon black"} onClick={() => handleFavorite(item)} />
                ) : null}
                <Link to={`/character/${item.id}`} className="no-link"> 
                    <CharacterCard key={i} data={item} />
                </Link>
              </div>
            );
          })}
        </>
      )}
      <Pagination total={data.total} clickPage={clickPage} />
    </>
  );
}

export default Characters;