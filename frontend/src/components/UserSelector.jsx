import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserSelector({ onUserSelect, onUserAdded }) {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/users')
      .then(response => {
        const fetchedUsers = Array.isArray(response.data)
          ? response.data
          : Array.isArray(response.data.users)
          ? response.data.users
          : [];

        setUsers(fetchedUsers);
      })
      .catch(error => {
        console.error('User fetch error:', error);
        // No fallback — leave users empty
      });
  }, []);

  const handleAddUser = () => {
    if (!newUser.trim()) return;

    axios.post('http://localhost:5000/users', { name: newUser })
      .then(response => {
        setUsers(prev => [...prev, response.data]);
        setNewUser('');
        if (onUserAdded) onUserAdded();
      })
      .catch(error => {
        console.error('Add user failed:', error);
        alert('❌ Could not add user.');
      });
  };

  const sortedUsers = [...users].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div>
      {/* Add new user */}
      <input
        type="text"
        value={newUser}
        onChange={e => setNewUser(e.target.value)}
        placeholder="Enter user name"
      />
      <button className="add-user-button" onClick={handleAddUser}>
  Add User
</button>

      <br /><br />

      {/* Select existing user */}
      <select onChange={e => onUserSelect(e.target.value)}>
        <option value="">--Choose--</option>
        {sortedUsers.map(user => (
          <option key={user._id} value={user._id}>
            {user.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default UserSelector;