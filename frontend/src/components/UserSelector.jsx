import React from 'react';
import styles from './UserSelector.module.css';

const UserSelector = ({ users, selectedUserId, onSelect }) => {
  const selectedUser = users.find(u => u.id === selectedUserId);
  return (
    <div className={styles.selectorWrapper}>
      <label htmlFor="user-select" className={styles.label}>Select User:</label>
      <select
        id="user-select"
        className={styles.select}
        value={selectedUserId || ''}
        onChange={e => onSelect(Number(e.target.value))}
      >
        <option value="" disabled>Select a user</option>
        {users.map(user => (
          <option key={user.id} value={user.id}>{user.name}</option>
        ))}
      </select>
      {selectedUser && (
        <div className={styles.avatarPreview}>
          <img src={selectedUser.avatar} alt={selectedUser.name} className={styles.avatarImg} />
          <span className={styles.selectedName}>{selectedUser.name}</span>
        </div>
      )}
    </div>
  );
};

export default UserSelector; 