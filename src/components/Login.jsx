import '../index.css'
import React, { useRef, useState } from "react"
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const Login = () => {
    const inputEmail = useRef()
    const inputPass = useRef()
    const history = useHistory()

    const [error, setError] = useState("")

    const { login } = useAuth()

    async function handleSubmit(e) {
        setError("")
        e.preventDefault()
        login(inputEmail.current.value, inputPass.current.value)
            .catch(() => {
                setError("FAILED TO LOGIN")
            })
        history.push("/")
    }

    return (
    <div className="flex flex-col h-screen justify-center items-center">
        <h1 className="text-3xl font-bold text-indigo-600 mb-3">Color Journal</h1>
        <div className="container grid bg-white w-5/6 shadow-md rounded-lg justify-items-center">
        <div className="mb-3 min-w-full p-4">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
            <h2 className="text-2xl font-bold">Login</h2>
            { error && <div className="rounded-sm shadow-sm border-2 border-red-600 font-bold bg-red-200 text-red-800 p-2">{error}</div> }
            <label className="block">
                <span className="text-gray-700">Email</span>
                <input
                id="email"
                type="email"
                ref={inputEmail}
                className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
            ></input>
            </label>
            <label className="block">
                <span className="text-gray-700">Password</span>
                <input
                id="password"
                type="password"
                ref={inputPass}
                className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
                ></input>
            </label>
            <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Submit
            </button>
            </form>
            Need an account? <Link to="/signup">Sign Up</Link>
        </div>
        </div>
    </div>
  )

};

export default Login;