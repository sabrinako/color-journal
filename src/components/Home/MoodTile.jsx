import React, { useState } from 'react';
import PropTypes from 'prop-types';
import KebabMenu from './KebabMenu';

function formatHSL(entry) {
  const {
    h, s, l,
  } = { ...entry };
  return `hsl(${h}, ${s}%, ${l}%)`;
}

function formatDate(utcSeconds) {
  const date = new Date(0);
  date.setUTCMilliseconds(utcSeconds);
  const now = Date.now();

  // if in the past 24 hours
  if (Math.abs(now - date.getTime()) <= 86400000) {
    // if in the past hour
    if (Math.abs(now - date.getTime()) <= 3600000) {
      return (
        <div className="date-label">
          {Math.round((now - date) / 60000)}
          {' '}
          minutes ago
        </div>
      );
    }
    return (
      <div className="date-label">
        {Math.round((now - date) / 3600000)}
        {' '}
        hours ago
      </div>
    );
  }

  return (
    <div className="date-label">
      {date.toLocaleDateString('en-US')}
    </div>
  );
}

const MoodTile = ({ keyId, entry }) => {
  const [shouldShowKebabMenu, setShouldShouldKebabMenu] = useState(false);

  const onKebabClick = (e) => {
    e.preventDefault();
    setShouldShouldKebabMenu(!shouldShowKebabMenu);
  };

  return (
    <div key={keyId} className="mood">
      <div className="mood-item" style={{ backgroundColor: formatHSL(entry) }} />
      <div className="mood-note">
        <div>
          {entry.note}
          {formatDate(keyId)}
        </div>
        <button type="button" className="kebab" onClick={onKebabClick}>
          <i className="fas fa-ellipsis-v" />
        </button>
        {shouldShowKebabMenu
        && <KebabMenu keyId={keyId} entry={entry} />}
      </div>
    </div>
  );
};

MoodTile.propTypes = {
  keyId: PropTypes.string.isRequired,
  entry: PropTypes.objectOf(PropTypes.oneOf([PropTypes.number, PropTypes.string])).isRequired,
};

export default MoodTile;
