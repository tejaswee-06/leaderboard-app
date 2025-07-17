import React, { useState, useEffect } from 'react';
import Tabs from './Tabs';
import TopThree from './TopThree';
import RankList from './RankList';
import UserSelector from './UserSelector';
import ClaimButton from './ClaimButton';
import ClaimHistory from './ClaimHistory';
import './Leaderboard.css';
import axios from 'axios';

function Leaderboard() {
  const [activeTab, setActiveTab] = useState('Party Ranking');
  const [activeSubTab, setActiveSubTab] = useState('Weekly Contribution');
  const [selectedUserId, setSelectedUserId] = useState('');
  const [users, setUsers] = useState([]);
  const [refreshFlag, setRefreshFlag] = useState(false);

  const fallbackUsers = [
    { _id: '1', name: 'PRITESH', points: 4200 },
    { _id: '2', name: 'RIMJHIM RAJ', points: 3900 },
    { _id: '3', name: 'KRISHU', points: 3700 },
    { _id: '4', name: 'AVINASH', points: 3400 },
    { _id: '5', name: 'RIYA', points: 3100 },
    { _id: '6', name: 'DEVIL', points: 9999 }
  ];

 useEffect(() => {
  axios.get('http://localhost:5000/users')
    .then(res => {
      const raw = Array.isArray(res.data) ? res.data : res.data.users || [];
      const sorted = raw.length ? [...raw].sort((a, b) => b.points - a.points) : fallbackUsers;
      setUsers(sorted);
    })
    .catch(() => {
      console.error('Failed to fetch users — using fallback');
      setUsers(fallbackUsers);
    });
}, [refreshFlag, fallbackUsers]); 

  const handleUserAdded = () => setRefreshFlag(prev => !prev);
  const handleUserSelect = id => setSelectedUserId(id);
  const handleClaimPoints = () => setRefreshFlag(prev => !prev);

  return (
    <div className="leaderboard">
      <Tabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activeSubTab={activeSubTab}
        setActiveSubTab={setActiveSubTab}
      />

      <div className="actions">
        <UserSelector
          onUserSelect={handleUserSelect}
          onUserAdded={handleUserAdded}
        />
        <ClaimButton userId={selectedUserId} onClaim={handleClaimPoints} />
      </div>

      {users.length >= 3 && <TopThree users={users.slice(0, 3)} />}
      <RankList users={users.slice(3)} />

      <div className="history-container">
        <ClaimHistory refreshFlag={refreshFlag} />
      </div>
    </div>
  );
}

export default Leaderboard;