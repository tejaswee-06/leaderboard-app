import React from 'react';

function TopThree({ users }) {
  return (
    <div className="top-three-section">
      <div className="top-card second">
        🥈
        <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${users[1]?.name}`} alt="avatar" className="top-avatar" />
        <span className="top-name">{users[1]?.name}</span>
        <span className="top-score">{users[1]?.points}</span>
      </div>
      <div className="top-card first">
        🥇
        <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${users[0]?.name}`} alt="avatar" className="top-avatar" />
        <span className="top-name">{users[0]?.name}</span>
        <span className="top-score">{users[0]?.points}</span>
      </div>
      <div className="top-card third">
        🥉
        <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${users[2]?.name}`} alt="avatar" className="top-avatar" />
        <span className="top-name">{users[2]?.name}</span>
        <span className="top-score">{users[2]?.points}</span>
      </div>
    </div>
  );
}

export default TopThree;