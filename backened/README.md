# Backend (Express API)

## Overview
This folder contains the **Express** backend for the MERN user‑management app. It provides RESTful endpoints for creating, reading, updating, and soft‑deleting users, connects to MongoDB Atlas, and includes CORS handling and robust error middleware.

## Prerequisites
- **Node.js** version **20** or newer
- A **MongoDB** connection string (Atlas or local)
- Environment variables defined in a `.env` file at the project root:
  - `DB_URL` – MongoDB connection string
  - `PORT` – optional, defaults to `4000`
  - `FRONTEND_URL` – URL of the deployed frontend (used for CORS in production)

## Setup
```bash
cd backened
npm install
```

## Development
```bash
npm run dev
# The server starts on http://localhost:4000
```

## Production (Vercel)
The backend is exported as a **Vercel serverless function** (`api/index.js`). Deploy the **`backened`** folder as a separate Vercel project. Set the same environment variables (`DB_URL`, `FRONTEND_URL`) in the Vercel dashboard.

## API Endpoints
| Method | Path | Description |
|--------|------|-------------|
| `POST`   | `/user-api/users` | Create a new user |
| `GET`    | `/user-api/users` | Get all active users |
| `GET`    | `/user-api/users/:id` | Get a user by its ID |
| `PUT`    | `/user-api/users/:id` | Update a user |
| `DELETE` | `/user-api/users/:id` | Soft‑delete a user (sets `status:false`) |
| `PATCH`  | `/user-api/users/:id` | Toggle active/inactive status |

---
*Built with **Express**, **Mongoose**, **CORS**, and **dotenv**.*
