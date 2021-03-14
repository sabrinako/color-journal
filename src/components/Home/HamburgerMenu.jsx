import React from 'react';
import PropTypes from 'prop-types';

const HamburgerMenu = ({
  setIsMenuOpen,
  setShouldShowNewMoodModal,
}) => {
  const onKeyUp = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      setShouldShowNewMoodModal(true);
    }
  };

  return (
    <>
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
    </>
  );
};

HamburgerMenu.propTypes = {
  setIsMenuOpen: PropTypes.func.isRequired,
  setShouldShowNewMoodModal: PropTypes.func.isRequired,
};

export default HamburgerMenu;
