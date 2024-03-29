import React from 'react';
import PropTypes from 'prop-types';
import { ref, child, remove } from 'firebase/database';
import { rtdb } from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';
import { useNewMoodModal } from '../../contexts/NewMoodContext';

const KebabMenu = ({ keyId, entry }) => {
  const { user } = useAuth();
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
    const currentMoodRef = child(child(ref(rtdb, 'entries'), user.uid), keyId);
    remove(currentMoodRef);
  };

  return (
    <>
      <div />
      <div className="kebab-wrapper">
        <div className="triangle" />
        <div className="kebab-menu">
          <button type="button" onClick={onEdit}>
            <i className="fas fa-edit" />
            Edit
          </button>
          <div className="divider" />
          <button type="button" onClick={onDelete}>
            <i className="fas fa-trash-alt" />
            Delete
          </button>
        </div>
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
