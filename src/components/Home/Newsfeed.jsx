import React, { useState, useEffect } from 'react';
import {
  ref, child, onValue, off,
} from 'firebase/database';
import { useAuth } from '../../contexts/AuthContext';
import { useNewMoodModal } from '../../contexts/NewMoodContext';
import { rtdb } from '../../firebase';
import MoodTile from './MoodTile';

export default function Newsfeed() {
  const [entries, setEntries] = useState([]);
  const { user } = useAuth();
  const { setColor, setNote, createNewMood } = useNewMoodModal();

  useEffect(() => {
    if (user) {
      const dbRef = child(ref(rtdb, 'entries'), user.uid);

      onValue(dbRef, (snapshot) => {
        if (!snapshot.exists()) {
          setColor({ h: 53, s: 100, l: 50 });
          setNote('Welcome to Color Journal! Click the three dots to edit or delete this mood entry. Click the plus sign to create a new entry.');
          createNewMood(dbRef);
        } else {
          const data = snapshot.val();
          if (data) {
            setEntries(data);
          }
        }
      });

      return () => off(dbRef);
    }

    return () => {};
  }, [user]);

  return (
    <div className="newsfeed">
      {Object.keys(entries).reverse().map((key) => (
        <MoodTile
          key={key}
          keyId={key}
          entry={entries[key]}
        />
      ))}
    </div>
  );
}
