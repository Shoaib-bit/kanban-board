# Kanban Board (React + TypeScript + Vite)

This repository is a frontend for a Kanban-style task board built with React, TypeScript and Vite. It provides a small, focused UI for creating, updating, deleting and moving tasks across columns (for example: Todo, In Progress, Done). The frontend expects a backend API for authentication and task persistence; the API base URL is configured via an environment variable.

## Key features

- Drag & drop between columns (using `@hello-pangea/dnd`)
- Forms with validation (`react-hook-form` + `yup`)
- TypeScript types for tasks and users
- Axios HTTP client with automatic Authorization header
- Simple auth flow (login/signup) and route guards

## Project structure (quick tour)

- `src/main.tsx` — application entry point
- `src/App.tsx` — top-level component and router
- `src/pages/web/HomePage.tsx` — main Kanban board page
- `src/pages/auth/LoginPage.tsx`, `src/pages/auth/SignupPage.tsx` — auth screens
- `src/components/TaskList.tsx`, `src/components/AddTask.tsx`, `src/components/UpdateTask.tsx`, `src/components/DeleteTask.tsx` — task UI components
- `src/context/AuthContext.tsx` — authentication context/provider
- `src/lib/http.ts` — axios instance (reads `import.meta.env.VITE_API_URL`)
- `src/lib/helper.ts` — auth helpers (token storage, logout, getAccessToken)
- `src/hooks/*` — custom hooks for tasks: `useGetTasks`, `useAddTask`, `useUpdateTask`, `useDeleteTask`
- `src/router` — routing and route guards
- `src/types` — TypeScript types for `Task` and `User`

Open these files to understand how UI, state, and HTTP calls are wired together.

## Environment variables

This project uses Vite environment variables. Create a `.env` file at the project root (or use `.env.local`) and set the following:

- `VITE_API_URL` (required) — Base URL of the backend API the frontend will call. Example:

```
VITE_API_URL=http://localhost:4000/api
```

Notes:

- Vite exposes only variables prefixed with `VITE_` to the client. Do not place secrets in client-side env vars.
- After changing `.env`, restart the dev server so Vite picks up the new values.

## Install and run (development)

1. Install dependencies

```bash
npm install
```

2. Create `.env` with `VITE_API_URL` set to your backend

3. Start the dev server

```bash
npm run dev
```

By default Vite serves at http://localhost:5173. To run on a different port in a bash-like shell (WSL/Git Bash):

```bash
PORT=3000 npm run dev
```

On Windows Command Prompt (cmd.exe):

```bash
set PORT=3000 && npm run dev
```

## Build and preview (production)

```bash
npm run build
npm run preview
```

`npm run build` runs the TypeScript build (`tsc -b`) and `vite build`. `npm run preview` serves the production bundle locally for checks.

## Linting

```bash
npm run lint
```

## How the frontend communicates with the backend

- The axios instance in `src/lib/http.ts` uses `import.meta.env.VITE_API_URL` as `baseURL`.
- Authorization tokens are read via helpers in `src/lib/helper.ts` and attached to outgoing requests.
- If the API returns 401 Unauthorized, the helper logic will call `logout()` to clear stored auth and redirect to login.

## Quick local backend options (for development)

If you don't have a backend ready, use a simple mock:

- json-server (quick mock REST API):

```bash
# install (globally or dev dependency)
npm install -g json-server

# create a simple db.json and run
json-server --watch db.json --port 4000
```

Then set `VITE_API_URL` to `http://localhost:4000` (or `http://localhost:4000/api` depending on your mock routing).

- Or write a tiny Express mock to match the endpoints the frontend expects.

## Common issues & troubleshooting

- Vite env not updating after editing `.env`: restart the dev server.
- CORS errors calling the backend: enable CORS on the backend or set up a dev proxy.
- 401 responses: inspect token storage and logout logic in `src/lib/helper.ts` and `src/context/AuthContext.tsx`.
- Port conflicts on Windows: change the `PORT` variable or close the process using the port.

## Scripts (from `package.json`)

- `npm run dev` — start Vite dev server
- `npm run build` — build production bundle (runs `tsc -b` first)
- `npm run preview` — preview production build locally
- `npm run lint` — run ESLint

## Next steps (suggestions)

- Add an `examples/` folder with a minimal backend or `db.json` to speed onboarding.
- Add a `docker-compose.yml` that starts both frontend and a mock backend for easier local setup.
- Add unit/integration tests for hooks (`useGetTasks`, `useAddTask`) with mocked HTTP calls.

---

If you'd like, I can add a sample `db.json` and a `json-server` example or scaffold a tiny Express backend that implements the endpoints this frontend expects.
