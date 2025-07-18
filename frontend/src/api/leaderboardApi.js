import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000',
});

// Helper to generate a random avatar URL
const randomAvatar = (seed) => `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(seed || Math.random())}`;
const fallbackAvatar = 'https://api.dicebear.com/7.x/adventurer/svg?seed=default';

export const getUsers = async () => {
  const res = await api.get('/users');
  // Assign random avatar if not present or empty
  const usersWithAvatars = res.data.map(user => ({
    ...user,
    avatar: user.avatar && user.avatar.length > 10 ? user.avatar : randomAvatar(user.name || user.id),
  }));
  console.log('getUsers (with avatars):', usersWithAvatars);
  return usersWithAvatars;
};

export const addUser = async (name) => {
  const res = await api.post('/users', { name });
  // Assign random avatar
  const userWithAvatar = {
    ...res.data,
    avatar: randomAvatar(name),
  };
  console.log('addUser (with avatar):', userWithAvatar);
  return userWithAvatar;
};

export const claimPoints = async (userId) => {
  const res = await api.post('/claim', { userId });
  return res.data;
};

export const getLeaderboard = async () => {
  const res = await api.get('/leaderboard');
  // Assign random avatar if not present or empty
  const leaderboardWithAvatars = res.data.map(user => ({
    ...user,
    avatar: user.avatar && user.avatar.length > 10 ? user.avatar : randomAvatar(user.name || user.id),
  }));
  console.log('getLeaderboard (with avatars):', leaderboardWithAvatars);
  return leaderboardWithAvatars;
};

export const getHistory = async (userId) => {
  const res = await api.get(`/history/${userId}`);
  return res.data;
}; 