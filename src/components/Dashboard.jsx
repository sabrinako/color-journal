import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Dashboard() {
    const [error, setError] = useState("")
    const history = useHistory()

    const { currentUser, logout } = useAuth()

    async function handleLogout() {
        setError("")
        try {
            await logout()
            history.push("/login")
        } catch {
            setError("FAILED LOGOUT")
        }
    }

    return (
        <div className="flex flex-col h-screen justify-center items-center">
            <h1 className="text-3xl font-bold text-indigo-600 mb-3">Dashboard</h1>
            <div className="container grid bg-white w-5/6 shadow-md rounded-lg justify-items-center">
            { error && <div className="rounded-sm shadow-sm border-2 border-red-600 font-bold bg-red-200 text-red-800 p-2">{error}</div> }
            </div>
            <button
                onClick={handleLogout}
                className="mr-10 justify-self-end self-end py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >Logout</button>
        </div>
    )
}