import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ComicCard from '../components/ComicCard';
import Pagination from '../components/Pagination';
import Search from '../components/Search';
import '../App.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from 'js-cookie';
import ReactLoading from "react-loading";


const Comics = () => {

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [offset, setOffset] = useState(0);
  const [inputSearch, setInputSearch] = useState("");

  const token = Cookies.get("token");


  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = [];
        setInputSearch(inputSearch.trim());
        if (inputSearch.length > 0) response = await axios.get(`${process.env.REACT_APP_PATH_BACKEND}/search/comics?offset=${offset}&titleStartsWith=${inputSearch}`); //search
        else response = await axios.get(`${process.env.REACT_APP_PATH_BACKEND}/comics?offset=${offset}`); //par défaut

        setData(response.data.data);
        setIsLoading(false);
      } catch (error) { console.log(error.message); }
    };
    fetchData();
  }, [offset, inputSearch]);


  const clickPage = (nb) => {
    setOffset(nb*100-100);
  }


  const handleFavorite = async (item) => {
    try {
      const formData = new FormData();
      formData.append("id_com", item.id);
      formData.append("title", item.title);
      formData.append("description", item.description);
      formData.append("img", item.thumbnail.path+"."+item.thumbnail.extension);
      await axios.put(`${process.env.REACT_APP_PATH_BACKEND}/favorite/comics`, formData, { headers: { Authorization: "Bearer " + token }});
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
                <FontAwesomeIcon className="star-icon" icon="star" onClick={() => handleFavorite(item)} />
              ) : null}
              <ComicCard data={item} />
            </div>
            );
          })}
        </>
      )}

      <Pagination total={data.total} clickPage={clickPage} />
    </>
  );
}

export default Comics;