# Workload Pulse

A frontend hackathon project for final-year engineering students who need to see when overlapping deadlines exceed their weekly effort capacity.

## Stack
- React + Vite
- MockAPI for real asynchronous CRUD
- LocalStorage for refresh resilience and theme persistence
- Lucide React icons
- Optional Google Gemini API for workload re-balancing suggestions

## MockAPI
Resource endpoint used by default:
`https://6aa2d7d9ccb3db9689a7133a.mockapi.io/api/v1/tasks`

Expected fields:
- `id` — MockAPI generated ID
- `title` — task title
- `category` — Academic | Career | Personal
- `duedate` — YYYY-MM-DD
- `hours` — number
- `status` — Not Started | In Progress | Completed

## Run locally
```bash
npm install
npm run dev
```
Open the Vite URL shown in the terminal.

## Deploy
Use Vercel or Netlify. Build command: `npm run build`. Output directory: `dist`.

## Optional Gemini
Copy `.env.example` to `.env.local` and add `VITE_GEMINI_API_KEY`.
Without a key, the AI modal uses a resilient local fallback so the demo still works.

## AI-tool disclosure
This project was developed with assistance from ChatGPT and AI-assisted coding workflows. All team members should read and understand the files they are responsible for before judging.
