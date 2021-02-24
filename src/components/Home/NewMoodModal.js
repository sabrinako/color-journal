import '../../styles/NewMoodModal.css'
import React from 'react'
import { HexColorPicker, HexColorInput } from "react-colorful"
import app from "../../firebase"
import { useAuth } from '../../contexts/AuthContext'
import { useNewMoodModal } from '../../contexts/NewMoodContext'

export default function NewMoodModal() {
    const { color, setShouldShowNewMoodModal, setColor, setNote, createNewMood } = useNewMoodModal()
    const { currentUser } = useAuth()

    const createNewEntry = (e) => {
        e.preventDefault()
        const currentUserEntriesRef =  app.database().ref("entries").child(currentUser.uid)
        createNewMood(currentUserEntriesRef)
    }

    const handleTextEdit = (e) => {
        setNote(e.target.value)
    }

    return (
        <div className="modal-bg">
            <div className="modal-box">
                <div className="modal-header">
                    <h2 className="modal-header-text">New Mood</h2>
                    <button
                        onClick={() => setShouldShowNewMoodModal(false)}
                        className="circle-button close-modal-button"
                    >x</button>
                </div>
                <form className="modal-form" onSubmit={createNewEntry}>
                    <HexColorPicker color={color} onChange={setColor} />
                    <HexColorInput className="color-field" color={color} onChange={setColor} />
                    <label className="mt-1 sm:w-1/2 h-24 sm:h-4/6">
                        <h3 className="font-bold">Notes</h3>
                        <textarea
                            defaultValue=""
                            onChange={handleTextEdit}
                            className="border-4 border-indigo-100 rounded-md w-200px sm:w-full sm:h-3/4"></textarea>
                    </label>
                    <button type="submit" className="indigo-button">Submit</button>
                </form>
            </div>
        </div>
    )
}