import React, { useState } from 'react';
import styles from './AddUserForm.module.css';

const randomAvatar = (seed) => `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(seed || Math.random())}`;

const AddUserForm = ({ onAddUser }) => {
  const [name, setName] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (name.trim()) {
      onAddUser(name.trim());
      setName('');
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        type="text"
        placeholder="Add new user..."
        value={name}
        onChange={e => setName(e.target.value)}
        maxLength={20}
      />
      <button className={styles.button} type="submit">Add</button>
      {name.trim() && (
        <div className={styles.avatarPreview}>
          <img src={randomAvatar(name)} alt={name} className={styles.avatarImg} />
        </div>
      )}
    </form>
  );
};

export default AddUserForm; 