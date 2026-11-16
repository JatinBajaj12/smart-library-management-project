# Smart Library Management System
React + Vite + Tailwind + Zustand | Express + Socket.IO | MongoDB + Mongoose | JWT + bcrypt + Zod | Docker | GitHub Actions

## Run with Docker
    docker compose up --build
App: http://localhost:5173 | API: http://localhost:5000/api. The DB is seeded on first start.
Demo logins: `admin@library.com / admin123`, `student@library.com / student123`

## Run locally
    cd server && npm install && npm run dev   # needs MongoDB at MONGO_URI (see .env)
    cd client && npm install && npm run dev

## Pages
`/login` (auth), `/dashboard`, `/books` (admin), `/catalog` (student)

## Real-time
Server emits `bookAdded`, `bookUpdated`, `bookDeleted`, `notification` only after successful DB writes. Sockets authenticate with the JWT; the client auto-reconnects and refetches books on reconnect.

## Deployment
1. **MongoDB Atlas**: create a free cluster, allow network access, copy the connection string.
2. **Backend (Render, Docker web service)**: root directory `server`. Env vars: `MONGO_URI`, `JWT_SECRET` (long random), `CLIENT_URL` (your Vercel URL, comma-separate multiple), `PORT`.
3. **Frontend (Vercel)**: root directory `client`, framework Vite. Env vars: `VITE_API_URL=https://<render-app>.onrender.com/api`, `VITE_SOCKET_URL=https://<render-app>.onrender.com`.
4. Push to GitHub; `.github/workflows/ci.yml` runs install, backend check, and frontend build on every push.
