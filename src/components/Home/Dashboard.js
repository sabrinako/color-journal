import React, { useState, useEffect, useReducer } from 'react'
import { useHistory } from 'react-router-dom'
import { HexColorPicker, HexColorInput } from "react-colorful";
import 'firebase/database'
import app from "../../firebase"
import { useAuth } from '../../contexts/AuthContext'
import Newsfeed from "./Newsfeed"

export default function Dashboard() {
    const { currentUser, logout } = useAuth()

    const [error, setError] = useState("")
    const [shouldShowNewMoodModal, setNewMoodModal] = useState(false)
    const history = useHistory()

    const [color, setColor] = useState('#1e88e5');
    const [note, setNote] = useState("")

    const currentUserEntriesRef =  app.database().ref("entries").child(currentUser.uid)

    function handleTextEdit(e) {
        setNote(e.target.value)
    }

    function createNewEntry(e) {
        e.preventDefault()
        const newEntryRef = currentUserEntriesRef.child(Date.now())
        newEntryRef.set({
            color: color,
            note: note
        })
            .then(() => {
                setNewMoodModal(false)
            })
    }

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
        <>
        { shouldShowNewMoodModal == true && <div className="fixed left-0 top-0 z-10 h-screen w-screen">
            <div className="flex flex-col flex-wrap justify-start justify-items-start align-items-start p-4 shadow-lg mt-20 m-auto border-4 border-indigo-50 rounded-md bg-white h-2/3 sm:h-1/2 w-4/6">
            <div className="flex flex-row w-full">
                <h2 className="text-lg font-bold h-8">New Mood</h2>
                <button
                    onClick={setNewMoodModal(false)}
                    className="inline-block ml-auto w-6 h-6 text-sm rounded-full bg-indigo-600 text-white"
                >x</button>
            </div>
                <form className="flex flex-col sm:flex-wrap min-w-full h-5/6">
                    <HexColorPicker color={color} onChange={setColor(color)} />
                    <HexColorInput className="mt-1 border-4 border-indigo-100 rounded-md w-200px" color={color} onChange={setColor} />
                    <label className="mt-1 sm:w-1/2 h-24 sm:h-4/6">
                        <h3 className="font-bold">Notes</h3>
                        <textarea
                            defaultValue=""
                            onChange={handleTextEdit}
                            className="border-4 border-indigo-100 rounded-md w-200px sm:w-full sm:h-3/4"></textarea>
                    </label>
                    <button
                        type="submit"
                        className="mt-2 sm:w-1/2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div> }
        <div className="flex flex-col h-screen">
            <div className="flex flex-row items-center bg-indigo-50 shadow-lg p-4">
                <h1 className="text-lg sm:text-xl font-bold text-indigo-600">Dashboard</h1>
                <button
                    onClick={handleLogout}
                    className="py-2 sm:px-4 w-24 ml-auto border border-transparent shadow-sm sm:text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >Logout</button>
            </div>    
            
            { error && <div className="rounded-sm shadow-sm border-2 border-red-600 font-bold bg-red-200 text-red-800 p-2">{error}</div> }
            <div className="flex flex-col h-full">
                <div className="flex flex-col h-48 sm:h-64 items-center justify-center">
                    <button
                        onClick={setNewMoodModal(true)}
                        className="rounded-full h-8 w-8 flex items-center justify-center text-white bg-indigo-300 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                    >+</button>
                    New Mood
                </div>
                {/* <Newsfeed 
                    dbRef={currentUserEntriesRef}
                /> */}
            </div>
        </div>
        </>
    )
}