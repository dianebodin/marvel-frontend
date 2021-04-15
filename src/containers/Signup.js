import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import '../App.css';

const Signup = ({ fetchCookies }) => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState(0);

  const handleUsernameChange = e => { setUsername(e.target.value); };
  const handlePasswordChange = e => { setPassword(e.target.value); };
  const handlePassword2Change = e => { setPassword2(e.target.value); };

  const history = useHistory();

  const handleSubmitSignup = async (e) => {
    try {
      e.preventDefault();
      if (!username || !password || !password2) setError(1);
      else if (password !== password2) setError(2);
      else if (password.length < 5) setError(3);
      else {
        const response = await axios.post(`${process.env.REACT_APP_PATH_BACKEND}/user/sign_up`,
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
        if (error.response.status === 400) setError(4);
      } 
    }
  };

  return (
    <div className="form-container">
      <div className="title">Sign up</div>
      <form onSubmit={handleSubmitSignup}>
        <p>Username</p>
        <input type="text" value={username} onChange={handleUsernameChange} />
        <p>Password</p>
        <input type="password" value={password} onChange={handlePasswordChange} autoComplete="off" /> 
        <p>Confirm password</p>
        <input type="password" value={password2} onChange={handlePassword2Change} autoComplete="off" /> 

        <div className="container-err-msg">
          {error === 1 ? <div className="err-msg">Champs à remplir</div> : null}
          {error === 2 ? <div className="err-msg">Les mots de passe ne sont pas identiques</div> : null}
          {error === 3 ? <div className="err-msg">Le mot de passe contient au moins 5 caractères</div> : null}
          {error === 4 ? <div className="err-msg">Le pseudo est déjà utilisé</div> : null}
        </div>

        <input type="submit" value="Validate" />
      </form>
    </div>
  );
};

export default Signup;