import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ClaimHistory({ refreshFlag }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/history')
      .then(res => setHistory(res.data))
      .catch(err => console.error(err));
  }, [refreshFlag]);

  return (
    <div className="history">
      <h2>📜 Claim History</h2>
      <ul>
        {history.map(record => (
          <li key={record._id}>
            <strong>{record.user.name}</strong> claimed {record.pointsClaimed} pts
            <span> — {new Date(record.claimedAt).toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ClaimHistory;