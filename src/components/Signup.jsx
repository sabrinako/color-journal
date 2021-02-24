import '../styles/Login.css'
import React, { useRef, useState } from "react"
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'

const Signup = () => {
  const inputEmail = useRef()
  const inputPass = useRef()
  const inputPassConfirm = useRef()
  const history = useHistory()

  const [error, setError] = useState("")

  const { signUp, login } = useAuth()

  function handleSubmit(e) {
    e.preventDefault()
    setError("")
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
        .catch((e) => {
          setError(e.message)
        })
    } else {
      setError("Passwords do not match. Try inputting again.")
    }
  }

  return (
    <div className="screen">
      <h1>Color Journal</h1>
      <div className="content-box">
        <form onSubmit={handleSubmit} className="form">
          <h2 className="form-title">Sign Up</h2>
          {error && <div className="error-callout">{error}</div>}
          <label className="block-label">
            <span>Email</span>
            <input id="email" type="email" ref={inputEmail} className="form-field"
          ></input>
          </label>
          <label className="block-label">
            <span className="text-gray-700">Password</span>
            <input id="password" type="password" ref={inputPass} className="form-field"></input>
          </label>
          <label className="block-label">
            <span className="text-gray-700">Confirm Password</span>
            <input id="passwordConfirm" type="password" ref={inputPassConfirm} className="form-field"></input>
          </label>
          <button type="submit" className="indigo-button">Submit</button>
        </form>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  )

};

export default Signup;