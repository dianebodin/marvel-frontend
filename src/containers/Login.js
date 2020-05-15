import React, { useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import '../App.css';


const Login = ({ fetchCookies }) => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(0);

  const handleUsernameChange = e => { setUsername(e.target.value); };
  const handlePasswordChange = e => { setPassword(e.target.value); };

  const history = useHistory();

  const handleSubmitLogin = async (e) => {
    try {
      e.preventDefault();
      if (!username || !password) setError(1);
      else {
        const response = await axios.post(`${process.env.REACT_APP_PATH_BACKEND}/user/log_in`,
          {
            username, password
          }
        );
        setError(0);
        fetchCookies(response.data.token, response.data.username);

        history.push("/"); 
      }
    } catch (error) { 
        if (error.response) {
          console.log(error.response)
          if (error.response.status === 404) setError(2);
          else if (error.response.data.error === "Wrong password") setError(3);
        } 
      }
  }

  return (
    <div className="form-container">

      <form onSubmit={handleSubmitLogin}>
        <div className="title">Log in</div>
        <p>Username</p>
        <input type="text" onChange={handleUsernameChange} />
        <p>Password</p>
        <input type="password" onChange={handlePasswordChange} autoComplete="off" />

        <div className="container-err-msg">
          {error === 1 ? <div className="err-msg">Champs à remplir</div> : null}
          {error === 2 ? <div className="err-msg">Compte inexistant</div> : null}
          {error === 3 ? <div className="err-msg">Mauvais mot de passe</div> : null}
        </div>
        <div className="validate">
          <input type="submit" value="Validate" />
        </div>

        <Link to="/signup" className="no-link"><div className="no-account">You don't have an account ?</div></Link>
      </form>
    </div>
  );
}

export default Login;