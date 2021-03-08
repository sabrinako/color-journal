import React, { useState } from 'react';
import '../../styles/Dashboard.css';
import { useHistory } from 'react-router-dom';
import 'firebase/database';
import { useAuth } from '../../contexts/AuthContext';
import { useNewMoodModal } from '../../contexts/NewMoodContext';
import Newsfeed from './Newsfeed';
import NewMoodModal from './NewMoodModal';

export default function Dashboard() {
  const { logout } = useAuth();
  const { shouldShowNewMoodModal, setShouldShowNewMoodModal } = useNewMoodModal();

  const [error, setError] = useState('');
  const history = useHistory();

  const handleLogout = async () => {
    setError('');
    try {
      await logout();
      history.push('/login');
    } catch {
      setError('FAILED LOGOUT');
    }
  };

  return (
    <>
      { shouldShowNewMoodModal
          && <NewMoodModal />}
      <div className="screen">
        <nav className="navbar">
          <h1 className="dashboard-title">Dashboard</h1>
          <button onClick={handleLogout} className="indigo-button logout-button" type="submit">Logout</button>
        </nav>

        { error && <div className="error-callout">{error}</div> }
        <div className="dashboard-body">
          <div className="new-mood-button-wrapper">
            <button
              onClick={() => setShouldShowNewMoodModal(true)}
              className="circle-button"
              type="button"
            >
              +
            </button>
            New Mood
          </div>
          <Newsfeed />
        </div>
      </div>
    </>
  );
}
