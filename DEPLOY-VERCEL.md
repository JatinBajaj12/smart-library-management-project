# Deploy Smart Library to Vercel (Docker containers)

Vercel runs the two Dockerfiles as one project: `client/` (frontend) and `server/` (backend).
`vercel.json` sends `/api/...` (including the socket at `/api/socket.io`) to the backend and everything else to the frontend.

## 1. Database (MongoDB Atlas, free)
1. Create a free cluster at https://www.mongodb.com/atlas and a database user.
2. Network Access -> Add IP Address -> `0.0.0.0/0` (Vercel has no fixed IP).
3. Copy the connection string, e.g. `mongodb+srv://USER:PASS@cluster0.xxxxx.mongodb.net/smart_library_db`.

## 2. Push the project to GitHub
Put the whole `smart-library` folder (the one containing `vercel.json`) in a GitHub repo.

## 3. Create the Vercel project
1. vercel.com -> Add New -> Project -> import the repo. Root Directory: the repo root.
2. If it does not pick up `vercel.json` automatically, run once in the project folder: `npx vercel link` then `vercel project update --framework container`.
3. Add these Environment Variables (Production):

| Name | Value |
|------|-------|
| `MONGO_URI` | your Atlas connection string |
| `JWT_SECRET` | a long random text |
| `CLIENT_URL` | your Vercel URL, e.g. `https://smart-library.vercel.app` |
| `SOCKET_PATH` | `/api/socket.io` |

4. Deploy (`npx vercel --prod` or push to GitHub).

## 4. Check
- `https://YOUR-APP.vercel.app` opens the login page.
- Login: `admin@library.com` / `admin123` (created automatically on first start).

## Notes
- Idle backend instances sleep after about 5 minutes, so the first request after a break can be slow.
- Socket connections close when a function reaches its max duration; the app reconnects and reloads the books automatically.
- Live updates are kept in memory. If Vercel runs more than one backend instance, some users may miss a live update until they refresh.
- Local use is unchanged: `docker compose up --build`, then open http://localhost:8080.
