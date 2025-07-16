import React from 'react';
import axios from 'axios';

const ClaimButton = ({ userId, onClaim }) => {
  const handleClaim = async () => {
    if (!userId) return;

    try {
      const res = await axios.post('http://localhost:5000/claim', { userId });
      const { points } = res.data;
      alert(`🎉 Successfully claimed ${points} points!`);
      onClaim(); // triggers refresh
    } catch (err) {
      console.error('❌ Error claiming points:', err);
      alert('Claim failed. Try again later.');
    }
  };

  return (
    <button
      className="claim-button"
      onClick={handleClaim}
      disabled={!userId}
    >
      Claim Points
    </button>
  );
};

export default ClaimButton;