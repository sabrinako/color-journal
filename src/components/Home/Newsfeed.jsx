import React, { useState, useEffect } from 'react';
import 'firebase/database';
import { useAuth } from '../../contexts/AuthContext';
import app from '../../firebase';
import MoodTile from './MoodTile';

export default function Newsfeed() {
  const [entries, setEntries] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    const dbRef = app.database().ref('entries').child(currentUser.uid);
    dbRef.on('value', ((snapshot) => {
      const data = snapshot.val();
      if (data) {
        setEntries(data);
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
