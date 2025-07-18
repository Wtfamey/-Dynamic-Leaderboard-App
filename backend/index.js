const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// In-memory data
let users = [
  { id: 1, name: 'Rahul', totalPoints: 0 },
  { id: 2, name: 'Kamal', totalPoints: 0 },
  { id: 3, name: 'Sanak', totalPoints: 0 },
  { id: 4, name: 'Amit', totalPoints: 0 },
  { id: 5, name: 'Priya', totalPoints: 0 },
  { id: 6, name: 'Neha', totalPoints: 0 },
  { id: 7, name: 'Vikas', totalPoints: 0 },
  { id: 8, name: 'Sonia', totalPoints: 0 },
  { id: 9, name: 'Ravi', totalPoints: 0 },
  { id: 10, name: 'Anjali', totalPoints: 0 },
];
let nextUserId = 11;
let claimHistory = [];
let nextHistoryId = 1;

// Helper: get leaderboard with rank
function getLeaderboard() {
  const sorted = [...users].sort((a, b) => b.totalPoints - a.totalPoints);
  return sorted.map((user, idx) => ({
    ...user,
    rank: idx + 1,
  }));
}

// GET /users - list all users
app.get('/users', (req, res) => {
  res.json(users);
});

// POST /users - add a new user
app.post('/users', (req, res) => {
  const { name } = req.body;
  if (!name || typeof name !== 'string') {
    return res.status(400).json({ error: 'Name is required' });
  }
  const newUser = { id: nextUserId++, name, totalPoints: 0 };
  users.push(newUser);
  res.status(201).json(newUser);
});

// POST /claim - claim random points for a user
app.post('/claim', (req, res) => {
  const { userId } = req.body;
  const user = users.find(u => u.id === userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  const points = Math.floor(Math.random() * 10) + 1;
  user.totalPoints += points;
  const history = {
    id: nextHistoryId++,
    userId: user.id,
    points,
    claimedAt: new Date().toISOString(),
  };
  claimHistory.push(history);
  res.json({
    userId: user.id,
    name: user.name,
    points,
    totalPoints: user.totalPoints,
    leaderboard: getLeaderboard(),
  });
});

// GET /leaderboard - get sorted leaderboard
app.get('/leaderboard', (req, res) => {
  res.json(getLeaderboard());
});

// GET /history/:userId - get claim history for a user
app.get('/history/:userId', (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const history = claimHistory.filter(h => h.userId === userId);
  res.json(history);
});

app.listen(PORT, () => {
  console.log(`Leaderboard backend running on http://localhost:${PORT}`);
}); 