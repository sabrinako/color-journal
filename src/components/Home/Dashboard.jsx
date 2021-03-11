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

  const onKeyUp = (e) => {
    e.preventDefault();
    setShouldShowNewMoodModal(true);
  };

  return (
    <>
      { shouldShowNewMoodModal
          && <NewMoodModal />}
      <div className="screen">
        <nav className="navbar">
          <h1 className="dashboard-title">Dashboard</h1>
          <button onClick={handleLogout} className="main-button logout-button" type="submit">Logout</button>
        </nav>

        { error && <div className="error-callout">{error}</div> }
        <div className="dashboard-body">
          <div className="new-mood-button-wrapper">
            <button
              className="new-mood-button"
              onClick={() => setShouldShowNewMoodModal(true)}
              type="button"
              id="new_mood"
              tabIndex={0}
              onKeyUp={onKeyUp}
            >
              <i className="fas fa-plus-circle" />
              New Mood
            </button>
          </div>
          <Newsfeed />
        </div>
      </div>
    </>
  );
}
