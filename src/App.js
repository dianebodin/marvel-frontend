import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Signup from './containers/Signup';
import Login from './containers/Login';
import Characters from './containers/Characters';
import Character from './containers/Character';
import Comics from './containers/Comics';
import Favorites from './containers/Favorites';
import Cookies from 'js-cookie';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch, faStar } from '@fortawesome/free-solid-svg-icons';
library.add(faSearch, faStar); 


const App = () => {

  const [token, setToken] = useState(Cookies.get("token") || null); //récupération du cookie
  const [userCookie, setUserCookie] = useState(Cookies.get("userCookie") || null);

  const fetchCookies = (res_token, res_username) => {
    setToken(res_token);
    setUserCookie(res_username);
    Cookies.set("token", res_token);
    Cookies.set("userCookie", res_username);
  };

  return (
    <>
      <Router>
        <Header token={token} setToken={setToken} userCookie={userCookie} />
        <Switch>

          <Route path="/signup">
            <Signup fetchCookies={fetchCookies} />
          </Route>
          
          <Route path="/login">
            <Login fetchCookies={fetchCookies} />
          </Route>

          <Route path="/comics">
            <Comics />
          </Route>

          <Route path="/favorites">
            <Favorites />
          </Route>

          <Route path="/character/:id">
            <Character />
          </Route>

          <Route path="/">
            <Characters />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
