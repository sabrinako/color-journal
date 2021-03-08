import '../../styles/NewMoodModal.css';
import React from 'react';
import { HslColorPicker } from 'react-colorful';
import app from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';
import { useNewMoodModal } from '../../contexts/NewMoodContext';

export default function NewMoodModal() {
  const {
    color,
    note,
    setShouldShowNewMoodModal,
    setColor,
    setNote,
    createNewMood,
    editMood,
    isNewMood,
    moodKey,
  } = useNewMoodModal();
  const { currentUser } = useAuth();

  const createNewEntry = (e) => {
    e.preventDefault();
    if (isNewMood) {
      const currentUserEntriesRef = app.database().ref('entries').child(currentUser.uid);
      createNewMood(currentUserEntriesRef);
    } else {
      const moodRef = app.database().ref('entries').child(currentUser.uid).child(moodKey);
      editMood(moodRef);
    }
  };

  const handleTextEdit = (e) => {
    setNote(e.target.value);
  };

  return (
    <div className="modal-bg">
      <div className="modal-box">
        <div className="modal-header">
          <h2 className="modal-header-text">New Mood</h2>
          <button
            onClick={() => setShouldShowNewMoodModal(false)}
            className="circle-button close-modal-button"
            type="submit"
          >
            x
          </button>
        </div>
        <form className="modal-form" onSubmit={createNewEntry}>
          {/* <label className="picker-label" htmlFor="main"> */}
          <h3>Color</h3>
          <HslColorPicker id="main" color={color} onChange={setColor} />
          <span className="color-block" style={{ backgroundColor: `hsl(${color.h}, ${color.s}, ${color.l})` }} />
          {/* </label> */}
          <label className="textarea-label" htmlFor="note">
            <h3>Notes</h3>
            <textarea
              id="note"
              defaultValue={note}
              onChange={handleTextEdit}
              className="notes-textarea"
            />
          </label>
          <button type="submit" className="indigo-button">Submit</button>
        </form>
      </div>
    </div>
  );
}
