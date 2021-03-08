import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';

const NewMoodContext = React.createContext();

export function useNewMoodModal() {
  return useContext(NewMoodContext);
}

export function NewMoodProvider({ children }) {
  const [color, setColor] = useState({ h: 0, s: 0, l: 0 });
  const [note, setNote] = useState('');
  const [shouldShowNewMoodModal, setShouldShowNewMoodModal] = useState(false);
  const [isNewMood, setIsNewMood] = useState(true); // reusing modal for editing moods
  const [moodKey, setMoodKey] = useState(); // only used when editing

  const createNewMood = (currentUserEntriesRef) => {
    const newEntryRef = currentUserEntriesRef.child(Date.now());
    newEntryRef.set({
      h: color.h,
      s: color.s,
      l: color.l,
      note,
    })
      .then(() => {
        setShouldShowNewMoodModal(false);
        setColor({ h: 0, s: 0, l: 0 });
        setNote('');
        setIsNewMood(true);
        setMoodKey();
      });
  };

  const editMood = (currentMoodRef) => {
    currentMoodRef.set({
      h: color.h,
      s: color.s,
      l: color.l,
      note,
    })
      .then(() => {
        setShouldShowNewMoodModal(false);
        setColor({ h: 0, s: 0, l: 0 });
        setNote('');
        setIsNewMood(true);
        setMoodKey();
      });
  };

  const value = {
    color,
    note,
    shouldShowNewMoodModal,
    setShouldShowNewMoodModal,
    setColor,
    setNote,
    createNewMood,
    editMood,
    isNewMood,
    setIsNewMood,
    moodKey,
    setMoodKey,
  };

  return (
    <NewMoodContext.Provider value={value}>
      {children}
    </NewMoodContext.Provider>
  );
}

NewMoodProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
