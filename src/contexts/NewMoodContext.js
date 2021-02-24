import React, {useContext, useState} from 'react'

const NewMoodContext = React.createContext()

export function useNewMoodModal() {
    return useContext(NewMoodContext)
}

export function NewMoodProvider({children}) {
    const [color, setColor] = useState('#1e88e5');
    const [note, setNote] = useState("")
    const [shouldShowNewMoodModal, setShouldShowNewMoodModal] = useState(false);

    const createNewMood = (currentUserEntriesRef) => {
        const newEntryRef = currentUserEntriesRef.child(Date.now())
        newEntryRef.set({
                color: color,
                note: note
            })
            .then(() => {
                setShouldShowNewMoodModal(false)
            })
    }

    const value = {
        color,
        note,
        shouldShowNewMoodModal,
        setShouldShowNewMoodModal,
        setColor,
        setNote,
        createNewMood
    }

    return ( 
        <NewMoodContext.Provider value={value}>
            {children}
        </NewMoodContext.Provider>
    )
}