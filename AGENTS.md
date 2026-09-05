# Repository Guidelines

## Project Structure & Module Organization

This repository is a Vue 3 + TypeScript single-page client built with Vite. Entry points are `src/main.ts` and `src/App.vue`. Organize changes by responsibility:

- `src/views/`: route-level pages, grouped by feature (`main`, `video`, `space`, `creativity`, `error`).
- `src/components/`: reusable Vue components, grouped by feature.
- `src/api/`: Axios API modules, grouped by backend domain; use the shared client in `src/api/axios.ts`.
- `src/stores/`: Pinia stores; `src/router/`: route definitions and navigation guards.
- `src/types/` and `src/utils/`: shared types and helpers.
- `src/assets/`: styles, icons, and bundled images; `public/`: files served unchanged.

## Build, Test, and Development Commands

Run `npm install`, then:

- `npm run dev` — start Vite on port `9999` with API, auth, WebSocket, and HLS proxies.
- `npm run build` — type-check and create the production bundle in `dist/`.
- `npm run type-check` — run `vue-tsc` without bundling.
- `npm run lint` — run ESLint and apply safe fixes.
- `npm run format` — format files under `src/` with Prettier.
- `npm run preview` — serve the built bundle locally.

The proxy expects the backend at `localhost:8000` and WebSocket service at `localhost:8600`.

## Coding Style & Naming Conventions

Use two spaces, UTF-8, final newlines, no semicolons, and single quotes, matching `.editorconfig` and `.prettierrc.json`. Use PascalCase for Vue components, camelCase for functions and variables, and descriptive domain names for API modules and stores (for example, `VideoInfoAPI.ts` and `useVideoStore`). Prefer TypeScript types and the `@/` alias.

## Testing Guidelines

No test framework or test files are currently configured. Run `npm run type-check`, `npm run lint`, and `npm run build`; manually verify affected routes and API flows with the local backend. If adding tests, use `src/**/__tests__/` and `*.test.ts` naming.

## Commit & Pull Request Guidelines

Keep commits small and focused, with concise imperative subjects (for example, `Fix video detail loading`). Pull requests should explain the user-visible change, identify affected routes or API modules, list validation commands, link issues, and include screenshots or recordings for UI changes. Call out required backend or environment changes.

## Security & Configuration Tips

Keep local values in `.env.development`; never commit credentials, tokens, or private media URLs. Review Axios interceptors, authentication, WebSocket paths, and upload code carefully because they affect user data.
