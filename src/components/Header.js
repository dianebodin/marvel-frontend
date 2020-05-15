import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import logo from '../assets/logo.png';
import '../App.css';
import Cookies from 'js-cookie';


const Header = ({ token, setToken, userCookie }) => {

  const history = useHistory();

  const logout = () => {
    setToken(null);
    Cookies.remove("token");
    history.push("/");
  }

  return (
    <header>
    <nav>
      <ul>
        <div className="header-left">
          <li>
            <Link to="/" className="header-link">
              <img src={logo} alt="Logo Marvel" />
            </Link>
          </li>

          <li>
            <Link to="/" className="header-link">
              Characters
            </Link>
          </li>

          <li>
            <Link to="/comics" className="header-link">
              Comics
            </Link>
          </li>

          <li>
            {token === null ? (
              <Link to="/login" className="header-link">
                Favorites
              </Link>
              ) : (
              <Link to="/favorites" className="header-link">
                Favorites
              </Link>
            )}
          </li>
        </div>

        <li className="header-right">
          {token === null ? (
            <Link to="/login" className="header-link">
              <div className="user-button">
                Log in
              </div>
            </Link>
          ) : (
            <>
              <span className="username">Hello {userCookie} !</span>
              <span onClick={() => logout()} className="logout">Log out</span>
            </>
          )}
        </li>
      </ul>
    </nav>
    </header>
  );
}

export default Header;