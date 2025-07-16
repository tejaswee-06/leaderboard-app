import React from 'react';

function RankList({ users }) {
  return (
    <div className="rank-list">
      {users.map((user, index) => (
        <div className="rank-entry" key={user._id}>
          <div className="left-section">
            <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} alt="avatar" className="avatar" />
            <span className="name">{user.name}</span>
          </div>
          <span className="rank-badge">#{index + 4}</span>
          <span className="score">{user.points.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
}

export default RankList;