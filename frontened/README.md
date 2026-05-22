# Frontend (React + Vite)

This folder contains the **frontend** of the MERN stack application. It is built with **React 19**, **Vite**, **Tailwind CSS**, and **React Router v6**.

## Features
- Modern UI with Tailwind CSS v4 (via `@tailwindcss/vite`).
- Context API (`UserContext`) to manage state and interact with the backend API.
- CRUD interface for users (Add, List, Delete).
- Responsive design using Tailwind utilities.
- Ready for **Vercel** static‑site deployment.

## Prerequisites
- Node.js 20 (or the version specified in `package.json`).
- A running backend API (see the `backened` folder) and the environment variable `VITE_BACKEND_URL` pointing to it.

## Setup
```bash
cd frontened
npm install
```
Create a `.env` file (optional) if you need local environment variables. For development you can rely on the default `VITE_BACKEND_URL` pointing to `http://localhost:4000/user-api`.

## Development
```bash
npm run dev   # starts Vite dev server at http://localhost:5173
```
The app will automatically reload on changes.

## Build
```bash
npm run build   # creates the production bundle in the `dist/` folder
```
The `dist/` directory contains a fully static site ready for hosting.

## Vercel Deployment
1. In the Vercel dashboard, **Create a new project** and select this repository.
2. Set the **Root Directory** to `frontened`.
3. Vercel auto‑detects Vite and will run `npm install && npm run build`.
4. Add an environment variable:
   - **Key**: `VITE_BACKEND_URL`
   - **Value**: `https://<your-backend-project>.vercel.app/user-api`
5. Deploy – Vercel will serve the built static assets from `dist/`.

## Notes
- The frontend expects the backend API to be reachable at the URL defined in `VITE_BACKEND_URL`.
- If you change the API URL locally, update the `.env` file or the Vite env variable accordingly.
- Tailwind CSS v4 is configured via `@tailwindcss/vite`; no additional PostCSS config is required.
