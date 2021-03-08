import '../styles/Login.css';
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Signup = () => {
  const inputEmail = useRef();
  const inputPass = useRef();
  const inputPassConfirm = useRef();
  // const history = useHistory();

  const [error, setError] = useState('');

  const { signUp } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (inputPass.current.value === inputPassConfirm.current.value) {
      signUp(inputEmail.current.value, inputPass.current.value)
        .then(() => {
          // login(inputEmail.current.value, inputPass.current.value)
          //   .then(
          //     history.push("/")
          //   )
          //   .catch((e) => {
          //       setError(e.message)
          //   })
        })
        .catch((signUpError) => {
          setError(signUpError.message);
        });
    } else {
      setError('Passwords do not match. Try inputting again.');
    }
  }

  return (
    <div className="screen">
      <h1>Color Journal</h1>
      <div className="content-box">
        <form onSubmit={handleSubmit} className="form">
          <h2 className="form-title">Sign Up</h2>
          {error && <div className="error-callout">{error}</div>}
          <label className="block-label" htmlFor="email">
            <span>Email</span>
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
          <label className="block-label" htmlFor="passwordConfirm">
            <span className="text-gray-700">Confirm Password</span>
            <input id="passwordConfirm" type="password" ref={inputPassConfirm} className="form-field" />
          </label>
          <button type="submit" className="indigo-button">Submit</button>
        </form>
        <p>
          Already have an account?
          <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
