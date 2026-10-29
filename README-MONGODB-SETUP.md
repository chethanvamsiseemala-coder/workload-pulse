# Workload Pulse — MongoDB backend setup

This project has a Vite/React frontend in the repository root and an Express/Mongoose API in `backend/`.

## 1. Prerequisites

- Node.js 20 or newer
- npm
- A MongoDB Atlas account (or a local MongoDB server)

## 2. Create the MongoDB database

1. In MongoDB Atlas, create a free cluster.
2. Create a database user with a strong password. This is separate from your Atlas website login.
3. In Network Access, allow your current IP while developing. For a deployed backend, configure network access appropriately for your hosting provider; avoid opening access broadly unless you understand the risk.
4. Select **Connect → Drivers → Node.js** and copy the connection string.
5. Replace the username/password placeholders and use `workload_pulse` as the database name, for example:

   `mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/workload_pulse?retryWrites=true&w=majority`

   URL-encode special characters in the password. Never commit the real connection string.

## 3. Start the backend

Open a terminal at the project root:

```bash
cd backend
npm install
```

Copy `backend/.env.example` to `backend/.env`, then fill in `MONGODB_URI` with your real connection string. Keep `PORT=5000` and the listed `CORS_ORIGIN` values for local development.

```bash
npm run dev
```

Expected logs include `MongoDB connected: workload_pulse` and `Workload Pulse API listening on port 5000`.

Test `http://localhost:5000/api/health` in a browser. It should return JSON with `"status":"ok"`.

## 4. Point the frontend at Express

In a second terminal at the project root (not inside `backend`):

```bash
npm install
```

Create a root `.env.local` file:

```env
VITE_API_BASE_URL=http://localhost:5000/api/tasks
VITE_GEMINI_API_KEY=
```

Restart Vite whenever you change an environment file:

```bash
npm run dev
```

Open the local URL Vite prints, usually `http://localhost:5173`. The deployed Vercel site does not automatically use your local backend; deployment is covered below.

## 5. Verify CRUD

Use the UI to create a task, refresh the page, update its status, and delete it. Data should remain in MongoDB after refresh and after restarting the backend. You can also inspect the `tasks` collection in Atlas.

API endpoints:

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/api/health` | Health check |
| GET | `/api/tasks` | List tasks |
| POST | `/api/tasks` | Create a task |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

Task fields: `title`, `category`, `duedate` (`YYYY-MM-DD`), `hours` (greater than 0 and at most 100), `status`, and optional `isDemo`.

## 6. Deploy the API and connect Vercel

1. Deploy the `backend` directory to a Node-compatible host (for example Render or Railway). Set its build/install command to `npm install` and start command to `npm start`, with the backend directory as the root directory if the host supports that setting.
2. Add `MONGODB_URI`, `NODE_ENV=production`, and `CORS_ORIGIN=https://workload-pulse-one.vercel.app` as backend environment variables. Add your local origin too only if you still need local development.
3. Verify the deployed backend's `/api/health` URL.
4. In Vercel → Project → Settings → Environment Variables, add `VITE_API_BASE_URL` with the full deployed API URL ending in `/api/tasks`, for example `https://YOUR-BACKEND-DOMAIN/api/tasks`.
5. Redeploy the frontend after setting the variable. Vite variables are baked into the build; changing the variable alone does not update an existing deployment.

Do not put `MONGODB_URI` in Vercel's frontend environment variables or any variable starting with `VITE_`. Frontend variables are exposed to the browser.

## Common errors

- **`MONGODB_URI is missing`**: ensure the file is named `backend/.env`, not `.env.example`, and run the backend from `backend/`.
- **Atlas `IP not allowed` / connection timeout**: add the current development IP in Atlas Network Access and verify the connection string.
- **Authentication failed**: use the database user credentials, not your Atlas login; URL-encode special password characters.
- **Frontend cannot connect**: check the backend is running, then check `VITE_API_BASE_URL` and restart Vite.
- **CORS blocked**: make `CORS_ORIGIN` exactly match the frontend origin, with no trailing slash; comma-separate multiple origins.
- **404 on update/delete**: the frontend must send MongoDB's `_id` (the frontend normalizer maps `_id` to `id`).
- **Old mock data**: data already stored by MockAPI does not automatically migrate. Export it and import/seed it separately if you need to keep it.
