import React from 'react';
import PropTypes from 'prop-types';
import app from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';
import { useNewMoodModal } from '../../contexts/NewMoodContext';

const KebabMenu = ({ keyId, entry }) => {
  const { currentUser } = useAuth();
  const {
    setColor, setNote, setShouldShowNewMoodModal, setIsNewMood, setMoodKey,
  } = useNewMoodModal();

  const onEdit = (e) => {
    e.preventDefault();
    setColor({ h: entry.h, s: entry.s, l: entry.l });
    setNote(entry.note);
    setIsNewMood(false);
    setMoodKey(keyId);
    setShouldShowNewMoodModal(true);
  };

  const onDelete = (e) => {
    e.preventDefault();
    const currentMoodRef = app.database().ref('entries').child(currentUser.uid).child(keyId);
    currentMoodRef.remove();
  };

  return (
    <>
      <div />
      <div className="kebab-menu">
        <button type="button" onClick={onEdit}>Edit</button>
        <button type="button" onClick={onDelete}>Delete</button>
      </div>
    </>
  );
};

KebabMenu.propTypes = {
  keyId: PropTypes.string.isRequired,
  entry: PropTypes.shape({
    h: PropTypes.number.isRequired,
    s: PropTypes.number.isRequired,
    l: PropTypes.number.isRequired,
    note: PropTypes.string.isRequired,
  }).isRequired,
};

export default KebabMenu;
