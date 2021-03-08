import '../styles/Login.css';
import React, { useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const inputEmail = useRef();
  const inputPass = useRef();
  const history = useHistory();

  const [error, setError] = useState('');

  const { login } = useAuth();

  async function handleSubmit(e) {
    setError('');
    e.preventDefault();
    login(inputEmail.current.value, inputPass.current.value)
      .then(() => {
        history.push('/');
      })
      .catch((loginError) => {
        setError(loginError.message);
      });
  }

  return (
    <div className="screen">
      <h1>Color Journal</h1>
      <div className="content-box">
        <form onSubmit={handleSubmit} className="form">
          <h2 className="form-title">Login</h2>
          { error && <div className="error-callout">{error}</div> }
          <label className="block-label" htmlFor="email">
            <span className="text-gray-700">Email</span>
            <input
              id="email"
              type="email"
              ref={inputEmail}
              className="form-field"
            />
          </label>
          <label className="block-label" htmlFor="password">
            <span className="text-gray-700">Password</span>
            <input id="password" type="password" ref={inputPass} className="form-field" />
          </label>
          <button type="submit" className="indigo-button">
            Submit
          </button>
        </form>
        <p>
          Need an account?
          {' '}
          <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
