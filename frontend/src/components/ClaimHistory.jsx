import React from 'react';
import styles from './ClaimHistory.module.css';

const trophy = (
  <svg className={styles.trophy} width="18" height="18" viewBox="0 0 24 24" fill="#FFC107" xmlns="http://www.w3.org/2000/svg" style={{ verticalAlign: 'middle', filter: 'drop-shadow(0 1px 2px #FFB30088)' }}>
    <path d="M17 4V2H7v2H2v2c0 3.31 2.69 6 6 6h1v2.09A5.001 5.001 0 0 0 7 19v1h10v-1a5.001 5.001 0 0 0-2-3.91V12h1c3.31 0 6-2.69 6-6V4h-5zm-2 13c0 1.1-.9 2-2 2s-2-.9-2-2v-2h4v2zm7-11v1c0 2.21-1.79 4-4 4h-1V4h5zm-16 0h5v4H6c-2.21 0-4-1.79-4-4V4z"/>
  </svg>
);

const ClaimHistory = ({ history }) => (
  <div className={styles.historyWrapper}>
    <h3 className={styles.title}>Claim History</h3>
    <ul className={styles.list}>
      {history.length === 0 && <li className={styles.empty}>No claims yet.</li>}
      {history.map((item, idx) => (
        <li key={idx} className={styles.item}>
          <span className={styles.points}>{trophy} +{item.points}</span>
          <span className={styles.date}>{new Date(item.claimedAt).toLocaleString()}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default ClaimHistory; 