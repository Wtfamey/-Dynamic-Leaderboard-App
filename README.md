<<<<<<< HEAD
# 🏆 Dynamic Leaderboard App

Welcome to the **Dynamic Leaderboard** project! 🚀

A modern, real-time leaderboard system where users can claim random points, climb the ranks, and see their progress in a beautiful, festive UI. Built with Node.js, Express, React, and MongoDB (or in-memory JSON for local dev). Perfect for competitions, hackathons, classrooms, or any fun ranking system! 🎉

---

## ✨ Features
- **User Selection & Creation**: Choose from 10+ users or add your own (with random avatars!)
- **Claim Points**: Award random points (1-10) to any user with a single click 🥇
- **Real-Time Leaderboard**: See ranks update instantly, with a special podium for the top 3
- **Claim History**: Track every point claim for each user
- **Modern UI/UX**: Festive colors, avatars, trophy icons, confetti, and responsive design
- **Easy Deployment**: Works locally or can be deployed to Netlify (frontend) and Render/Heroku (backend)

---

## 🛠️ Tech Stack
- **Frontend**: React, CSS Modules, Framer Motion, Axios
- **Backend**: Node.js, Express, (MongoDB ready, but uses in-memory JSON for local dev)
- **Avatars**: [DiceBear Avatars](https://www.dicebear.com/)
- **Deployment**: Netlify (frontend), Render/Heroku (backend)

---

## 🚀 Getting Started

### 1. Clone the Repo
```bash
git clone <your-repo-url>
cd leaderboard
```

### 2. Start the Backend
```bash
cd backend
npm install
npm start
```
- Runs on [http://localhost:4000](http://localhost:4000)

### 3. Start the Frontend
```bash
cd ../frontend
npm install
npm start
```
- Runs on [http://localhost:3000](http://localhost:3000)

---

## 🌍 Deployment

### Frontend (Netlify)
1. Build the app:
   ```bash
   npm run build
   ```
2. Deploy the `build` folder to Netlify (via Git or drag-and-drop at [netlify.com/drop](https://app.netlify.com/drop))

### Backend (Render/Heroku/Other)
- Deploy your backend separately (see their docs)
- Update the API URLs in `frontend/src/api/leaderboardApi.js` to your backend’s public URL

---

## 📸 Screenshots
> _Add your screenshots here!_

---

## 📝 API Endpoints
- `GET /users` — List all users
- `POST /users` — Add a new user (`{ name: "NewUser" }`)
- `POST /claim` — Claim random points for a user (`{ userId: 1 }`)
- `GET /leaderboard` — Get leaderboard with ranks
- `GET /history/:userId` — Get claim history for a user

---

## 💡 Customization Ideas
- Add dark mode 🌙
- Add user profile editing
- Add real-time updates with Socket.IO
- Add weekly/monthly resets
- Add notifications or sound effects

---

## 🙏 Credits
- UI/UX by [Your Name]
- Avatars by [DiceBear](https://www.dicebear.com/)
- Trophy icons by [Material Icons](https://fonts.google.com/icons)

---

## 🥳 Enjoy your leaderboard! Claim, compete, and celebrate! 🥳 
=======
# -Dynamic-Leaderboard-App
A modern, real-time leaderboard system where users can claim random points, climb the ranks, and see their progress in a beautiful, festive UI. Built with Node.js, Express, React, and MongoDB (or in-memory JSON for local dev). Perfect for competitions, hackathons, classrooms, or any fun ranking system! 🎉
>>>>>>> e63e06cc042637ff1d2044c310e56a92eebc2d3b
