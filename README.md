# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

````js
export default defineConfig([
  globalIgnores(['dist']),
  {
    ## Kanban Board (React + TypeScript + Vite)

    This repository is a Kanban board frontend built with React, TypeScript and Vite. The project expects a separate backend API (URL provided via environment variable) for authentication and task operations.

    ### Quick start

    1. Install dependencies

       ```bash
       npm install
       ```

    2. Create an environment file

       - Copy the example env file (if present) or create a new `.env` in the project root.
       - Add the backend API base URL using the key VITE_API_URL. Example:

       ```env
       VITE_API_URL=http://localhost:4000/api
       ```

       The frontend reads this value in `src/lib/http.ts` to configure axios:

       - `src/lib/http.ts` uses `import.meta.env.VITE_API_URL` as the axios baseURL.

    3. Run the dev server

       ```bash
       npm run dev
       ```

       Vite will start the development server (default http://localhost:5173). If your backend is on a different origin, ensure CORS is enabled on the backend or run the frontend with a proxy.

    4. Build for production

       ```bash
       npm run build
       npm run preview   # preview the production build locally
       ```

    5. Linting

       ```bash
       npm run lint
       ```

    ### Backend notes

    - This frontend expects an API whose base URL is provided in `VITE_API_URL`.
    - The HTTP client is in `src/lib/http.ts` and automatically adds an Authorization header when `getAccessToken()` (from `src/lib/helper.ts`) returns a token.
    - On receiving a 401 from the API the client calls `logout()` from `src/lib/helper.ts` which will clear stored auth and redirect as implemented.

    If you don't yet have a backend, you can run a simple mock server for development. Example using json-server (not included by default):

    ```bash
    # install globally or as a dev dependency
    npm install -g json-server

    # create a db.json with tasks/users and run
    json-server --watch db.json --port 4000
    ```

    Adjust `VITE_API_URL` to point to `http://localhost:4000` (or the correct path, e.g. `http://localhost:4000/api`).

    ### Windows / WSL tips

    - On Windows, using WSL2 with an Ubuntu shell usually provides better POSIX compatibility. If you use Git Bash or PowerShell, commands above still work.
    - If the dev server's port is blocked, try running with a different port:

      ```bash
      # set Vite port on the fly
      PORT=3000 npm run dev
      ```

      On Windows Command Prompt you would use `set PORT=3000 && npm run dev`.

    ### Common issues & troubleshooting

    - Missing VITE_API_URL / axios errors: ensure `.env` is present and restarted the dev server after editing `.env` files. Vite only picks up env vars at server start.
    - CORS errors when calling the backend: enable CORS on the backend or set up a development proxy.
    - 401 responses: the frontend will call `logout()` on 401. Check the stored token logic in `src/lib/helper.ts`.
    - Module or type errors when building: run `npm run build` and fix TypeScript errors reported by `tsc` (the build script runs `tsc -b`).

    ### Project scripts

    Available npm scripts (from `package.json`):

    - `npm run dev` — start Vite dev server
    - `npm run build` — compile TypeScript and build production assets
    - `npm run preview` — locally preview the production build
    - `npm run lint` — run ESLint across the project

    ### Where to look in the code

    - Frontend entry: `src/main.tsx`
    - App component: `src/App.tsx`
    - HTTP client & auth helpers: `src/lib/http.ts`, `src/lib/helper.ts`
    - Pages: `src/pages` and `src/pages/web` (home) and `src/pages/auth` (login/signup)

    ### Next steps / suggestions

    - Add a `docker-compose` or simple backend example in `examples/` to make local setup easier for new contributors.
    - Add a small `make` or npm script to run both frontend and backend for local dev.

    If you'd like, I can also:

    - Add a sample `db.json` and example `json-server` configuration for quick local testing.
    - Create a minimal Express backend example that matches the API surface expected by the frontend.

    Requirements coverage:

    - Update README with install & run steps: Done
    - Explain backend requirement and env var: Done (VITE_API_URL)
    - Add Windows/WSL run tips: Done
````
