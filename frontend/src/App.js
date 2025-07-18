import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './App.module.css';
import UserSelector from './components/UserSelector';
import AddUserForm from './components/AddUserForm';
import ClaimButton from './components/ClaimButton';
import Leaderboard from './components/Leaderboard';
import ClaimHistory from './components/ClaimHistory';
import {
  getUsers,
  addUser,
  claimPoints,
  getLeaderboard,
  getHistory,
} from './api/leaderboardApi';

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [history, setHistory] = useState([]);
  const [claiming, setClaiming] = useState(false);
  const [lastClaim, setLastClaim] = useState(null);
  const [error, setError] = useState('');

  // Fetch users and leaderboard on mount
  useEffect(() => {
    fetchAll();
  }, []);

  // Fetch history when selected user changes
  useEffect(() => {
    if (selectedUserId) {
      getHistory(selectedUserId).then(setHistory);
    } else {
      setHistory([]);
    }
  }, [selectedUserId]);

  const fetchAll = async () => {
    try {
      const [usersData, leaderboardData] = await Promise.all([
        getUsers(),
        getLeaderboard(),
      ]);
      console.log('usersData:', usersData);
      console.log('leaderboardData:', leaderboardData);
      setUsers(usersData);
      setLeaderboard(leaderboardData);
      if (usersData.length > 0 && !selectedUserId) {
        setSelectedUserId(usersData[0].id);
      }
    } catch (e) {
      console.error('fetchAll error:', e);
      setError('Failed to load data.');
    }
  };

  const handleAddUser = async (name) => {
    try {
      const newUser = await addUser(name);
      setUsers((prev) => [...prev, newUser]);
      setLeaderboard(await getLeaderboard());
      setSelectedUserId(newUser.id);
      setError('');
    } catch (e) {
      setError('Could not add user.');
    }
  };

  const handleClaim = async () => {
    if (!selectedUserId) return;
    setClaiming(true);
    setError('');
    try {
      const result = await claimPoints(selectedUserId);
      setLastClaim({
        points: result.points,
        name: result.name,
      });
      setLeaderboard(result.leaderboard);
      setUsers(await getUsers());
      setHistory(await getHistory(selectedUserId));
      setTimeout(() => setLastClaim(null), 2000);
    } catch (e) {
      setError('Could not claim points.');
    } finally {
      setClaiming(false);
    }
  };

  return (
    <div className={styles.appWrapper}>
      <header className={styles.header}>
        <div className={styles.confetti}></div>
        <span className={styles.headerTrophy}>
          <svg width="38" height="38" viewBox="0 0 24 24" fill="#FFC107" xmlns="http://www.w3.org/2000/svg" style={{ verticalAlign: 'middle', filter: 'drop-shadow(0 2px 4px #ffb30044)' }}>
            <path d="M17 4V2H7v2H2v2c0 3.31 2.69 6 6 6h1v2.09A5.001 5.001 0 0 0 7 19v1h10v-1a5.001 5.001 0 0 0-2-3.91V12h1c3.31 0 6-2.69 6-6V4h-5zm-2 13c0 1.1-.9 2-2 2s-2-.9-2-2v-2h4v2zm7-11v1c0 2.21-1.79 4-4 4h-1V4h5zm-16 0h5v4H6c-2.21 0-4-1.79-4-4V4z"/>
          </svg>
        </span>
        <h1 className={styles.headerTitle}>Leaderboard</h1>
        <p className={styles.subtitle}>Claim points, climb the ranks, and track your history! 🎉</p>
      </header>
      <main className={styles.main}>
        <section className={styles.leftPanel}>
          <UserSelector
            users={users}
            selectedUserId={selectedUserId}
            onSelect={setSelectedUserId}
          />
          <AddUserForm onAddUser={handleAddUser} />
          <ClaimButton
            onClaim={handleClaim}
            disabled={!selectedUserId}
            loading={claiming}
          />
          <AnimatePresence>
            {lastClaim && (
              <motion.div
                className={styles.claimFeedback}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                +{lastClaim.points} points for {lastClaim.name}!
              </motion.div>
            )}
          </AnimatePresence>
          {error && <div className={styles.error}>{error}</div>}
          <ClaimHistory history={history} />
        </section>
        <section className={styles.rightPanel}>
          <Leaderboard users={leaderboard} />
        </section>
      </main>
      <footer className={styles.footer}>
        <span>created by ameychikane</span>
      </footer>
    </div>
  );
}

export default App; 
