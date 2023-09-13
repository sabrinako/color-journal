import React, { useState } from 'react';
import '../../styles/Dashboard.css';
import { useHistory } from 'react-router-dom';
import 'firebase/database';
import { useAuth } from '../../contexts/AuthContext';
import { useNewMoodModal } from '../../contexts/NewMoodContext';
import Newsfeed from './Newsfeed';
import NewMoodModal from './NewMoodModal';

const Dashboard = () => {
  const { logout, setCurrentUser } = useAuth();
  const { shouldShowNewMoodModal, setShouldShowNewMoodModal } = useNewMoodModal();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [error, setError] = useState('');
  const history = useHistory();

  const handleLogout = async () => {
    setError('');
    logout()
      .then(() => {
        setCurrentUser({});
        history.push('/login');
      })
      .catch(() => {
        setError('FAILED LOGOUT');
      });
  };

  const onKeyUp = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      setShouldShowNewMoodModal(true);
    }
  };

  return (
    <>
      Hello
      { shouldShowNewMoodModal
          && <NewMoodModal />}
      <div className="screen">
        <nav>
          <div className="navbar">
            <h1 className="dashboard-title">Dashboard</h1>
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="hamburger-button"
            >
              <i className="fas fa-bars" />
            </button>
          </div>
          {isMenuOpen
            && (
            <ul className="hamburger-menu">
              <button
                onClick={() => {
                  setShouldShowNewMoodModal(true);
                  setIsMenuOpen(false);
                }}
                type="button"
                id="new_mood"
                tabIndex={0}
                onKeyUp={onKeyUp}
              >
                New Mood
                <i className="fas fa-plus-circle" />
              </button>
              <button
                onClick={handleLogout}
                type="submit"
              >
                Logout
                <i className="fas fa-sign-out-alt" />
              </button>
            </ul>
            )}
        </nav>

        { error && <div className="error-callout">{error}</div> }
        <div className="dashboard-body">
          <Newsfeed />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
