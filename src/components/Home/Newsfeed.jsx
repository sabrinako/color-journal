import React, { useState, useEffect } from 'react';
import 'firebase/database';
import { useAuth } from '../../contexts/AuthContext';
import { useNewMoodModal } from '../../contexts/NewMoodContext';
import app from '../../firebase';
import MoodTile from './MoodTile';

export default function Newsfeed() {
  const [entries, setEntries] = useState([]);
  const { currentUser } = useAuth();
  const { setColor, setNote, createNewMood } = useNewMoodModal();

  useEffect(() => {
    const dbRef = app.database().ref('entries').child(currentUser.uid);
    dbRef.on('value', ((snapshot) => {
      if (!snapshot.exists()) {
        setColor({ h: 53, s: 100, l: 50 });
        setNote('Welcome to Color Journal!\nClick the three dots to edit or delete this mood entry.\nClick the plus sign to create a new entry.');
        createNewMood(dbRef);
      } else {
        const data = snapshot.val();
        if (data) {
          setEntries(data);
        }
      }
    }));

    return () => {
      dbRef.off();
    };
  }, []);

  return (
    <div className="newsfeed">
      {Object.keys(entries).reverse().map((key) => (
        <MoodTile
          keyId={key}
          entry={entries[key]}
        />
      ))}
    </div>
  );
}
