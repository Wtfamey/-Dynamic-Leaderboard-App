import React from 'react';
import styles from './Leaderboard.module.css';

const trophy = (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="#FFC107" xmlns="http://www.w3.org/2000/svg" style={{ verticalAlign: 'middle', filter: 'drop-shadow(0 1px 2px #FFB30088)' }}>
    <path d="M17 4V2H7v2H2v2c0 3.31 2.69 6 6 6h1v2.09A5.001 5.001 0 0 0 7 19v1h10v-1a5.001 5.001 0 0 0-2-3.91V12h1c3.31 0 6-2.69 6-6V4h-5zm-2 13c0 1.1-.9 2-2 2s-2-.9-2-2v-2h4v2zm7-11v1c0 2.21-1.79 4-4 4h-1V4h5zm-16 0h5v4H6c-2.21 0-4-1.79-4-4V4z"/>
  </svg>
);

const Podium = ({ users }) => (
  <div className={styles.podiumWrapper}>
    {[1, 0, 2].map((pos, idx) => (
      users[pos] && (
        <div
          key={users[pos].id}
          className={styles[`podium${pos+1}`]}
        >
          <div className={styles.avatarWrapper}>
            <img src={users[pos].avatar} alt={users[pos].name} className={styles.avatar} />
            {pos === 0 && <span className={styles.crown}>👑</span>}
          </div>
          <div className={styles.podiumName}>{users[pos].name}</div>
          <div className={styles.podiumPoints}>{trophy} {users[pos].totalPoints.toLocaleString()}</div>
        </div>
      )
    ))}
  </div>
);

const Leaderboard = ({ users }) => {
  const podiumUsers = users.slice(0, 3);
  const rest = users.slice(3);
  return (
    <div className={styles.leaderboardCard}>
      <div className={styles.bgFestive}></div>
      <h2 className={styles.title}>Weekly Contribution Ranking</h2>
      <Podium users={podiumUsers} />
      <table className={styles.table}>
        <tbody>
          {rest.map((user, idx) => (
            <tr key={user.id} className={styles.row}>
              <td className={styles.rank}>{idx + 4}</td>
              <td>
                <img src={user.avatar} alt={user.name} className={styles.rowAvatar} />
                <span className={styles.rowName}>{user.name}</span>
              </td>
              <td className={styles.rowPoints}>{trophy} {user.totalPoints.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard; 