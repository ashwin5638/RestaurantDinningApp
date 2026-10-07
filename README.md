# Savory — Restaurant Booking App

A full-stack MERN application for a restaurant: browse the seasonal menu, read the story, register/login and book a table online.

- **Frontend** — React 19 + Vite, React Router, GSAP animations, `react-icons`
- **Backend** — Express 5 REST API, Mongoose (MongoDB), JWT auth, bcrypt
- **Style** — plain CSS (per-component `index.css`), no CSS framework

---

## Table of contents

- [Project structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Getting started](#getting-started)
- [Environment variables](#environment-variables)
- [Frontend routes](#frontend-routes)
- [API reference](#api-reference)
- [Data models](#data-models)
- [Available scripts](#available-scripts)
- [Security notes](#security-notes)

---

## Project structure

```
restaurant/
├── client/                     # React SPA (Vite)
│   ├── index.html              # HTML shell, default SEO/OG tags
│   ├── vite.config.js          # dev server, port 5173, /api proxy → :5000
│   ├── public/                 # static assets served at /
│   │   ├── 404.html            # static fallback 404 page
│   │   ├── manifest.json
│   │   └── robots.txt
│   └── src/
│       ├── main.jsx            # React entry point
│       ├── App.jsx             # route table + protected routes
│       ├── ProtectedRoute/     # client-side auth guard (token check)
│       ├── components/         # one folder per page
│       │   ├── Home/           #   hero, story, stats, popular dishes (GSAP)
│       │   ├── MenuCard/       #   searchable + filterable menu grid
│       │   ├── About/
│       │   ├── Contact/        #   contact form with validation
│       │   ├── BookTable/      #   reservation form (protected)
│       │   ├── Login/  Register/  Logout/
│       │   ├── Navigation/     #   responsive nav + mobile drawer
│       │   ├── Footer/
│       │   └── NotFound/       #   in-app 404 + noindex SEO tags
│       ├── data/menuData.json  # bundled menu data (no API call needed)
│       ├── services/
│       │   ├── api.js          # API_BASE from VITE_API_URL
│       │   └── seo.js          # useSeo() hook for per-page meta tags
│       └── assets/             # images imported by CSS/JSX
│
├── server/                     # Express API (CommonJS, MVC layout)
│   ├── index.js                # entry: loads .env, connects DB, listens
│   └── src/
│       ├── app.js              # express app, CORS, JSON, routes, error handler
│       ├── config/db.js        # mongoose connection
│       ├── routes/             # authRoutes, bookingRoutes
│       ├── controllers/        # authController, bookingController
│       ├── services/           # bookingService (business logic)
│       ├── models/             # User, Booking schemas
│       ├── middleware/         # auth (JWT), rate limit, error handling
│       └── utils/token.js      # generateToken / verifyToken
│
└── .gitignore
```

**Conventions**

- Every page lives in `components/<Name>/index.jsx` with its own `index.css`.
- CSS is global (plain files), so class names are kept unique per component.
- Menu data ships with the bundle — no request is made to fetch it.

---

## Prerequisites

| Tool   | Version | Notes                              |
| ------ | ------- | ---------------------------------- |
| Node   | 20+     | Vite 7 requires Node 20.19+ / 22+ |
| npm    | 10+     | ships with Node                    |
| MongoDB | 6+     | local instance or MongoDB Atlas    |

---

## Getting started

**1. Install dependencies**

```bash
cd client && npm install
cd ../server && npm install
```

**2. Configure the backend**

```bash
cd server
# edit .env — see the table below
```

Minimal `server/.env`:

```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
JWT_SECRET=<random 64+ char string>
MONGODB_URI=mongodb+srv://<user>:<pass>@<cluster>/<db>?retryWrites=true&w=majority
```

`CLIENT_URL` accepts several origins, so a local frontend and a deployed one
can both call the API:

```env
CLIENT_URL=https://client-tawny-alpha-70.vercel.app,http://localhost:5173
# or, to allow every Vercel preview deployment:
CLIENT_URL=https://*.vercel.app,http://localhost:5173
```

**3. Run both apps** (in two separate terminals)

```bash
# terminal 1 — API on http://localhost:5000
cd server
npm run dev          # nodemon, or: npm start

# terminal 2 — SPA on http://localhost:5173
cd client
npm run dev
```

Open **http://localhost:5173** — Vite proxies `/api/*` to the backend, so no
frontend configuration is needed in development.

**Production build**

```bash
cd client && npm run build   # output in client/dist
cd server && npm start
```

---

## Environment variables

### Server (`server/.env`)

| Variable       | Required | Default               | Description                                     |
| -------------- | -------- | --------------------- | ----------------------------------------------- |
| `PORT`         | no       | `5000`                | API listen port                                 |
| `NODE_ENV`     | no       | `development`         | `development` also returns stack traces on error |
| `CLIENT_URL`   | no       | `http://localhost:5173` | Comma-separated list of allowed CORS origins (wildcards like `https://*.vercel.app` are supported) |
| `JWT_SECRET`   | **yes**  | —                     | Secret used to sign access tokens (min 64 chars) |
| `MONGODB_URI`  | **yes**  | —                     | MongoDB connection string                       |

### Client (`client/.env`, optional)

| Variable      | Required | Default | Description                                          |
| ------------- | -------- | ------- | ---------------------------------------------------- |
| `VITE_API_URL` | no      | `''`    | API origin. Empty = same origin (uses the dev proxy) |

---

## Frontend routes

| Path         | Component   | Access      | Description                        |
| ------------ | ----------- | ----------- | ---------------------------------- |
| `/`          | → `/home`   | public      | permanent redirect                 |
| `/home`      | `Home`      | public      | hero, story, stats, popular dishes |
| `/menucard`  | `MenuCard`  | public      | search + category filter menu      |
| `/about`     | `About`     | public      | story, values, stats               |
| `/contact`   | `Contact`   | public      | contact details + message form     |
| `/register`  | `Register`  | public      | create account                     |
| `/login`     | `Login`     | public      | sign in (stores JWT in localStorage) |
| `/logout`    | `Logout`    | public      | clears the token, redirects to login |
| `/book`      | `BookTable` | **protected** | reservation form                 |
| `*`          | `NotFound`  | public      | 404 page with `noindex`            |

Protected routes are wrapped in `ProtectedRoute`, which redirects to
`/login` when no token is present.

---

## API reference

Base URL: `http://localhost:5000/api`

| Method | Endpoint   | Auth  | Body                                                      | Success | Description              |
| ------ | ---------- | ----- | --------------------------------------------------------- | ------- | ------------------------ |
| `POST` | `/register` | —    | `username`, `email`, `password` (min 6 chars)             | `201`   | create an account        |
| `POST` | `/login`    | —    | `email`, `password`                                        | `200`   | returns `{ token }` (1 h) |
| `POST` | `/book`     | Bearer | `booking_date`, `booking_time`, `guests` (1–20), `requests?` | `201`   | create a reservation     |

Auth header:

```http
Authorization: Bearer <token>
```

Errors return `{ "message" | "error": "..." }` with the matching HTTP status;
`429` means the rate limit (20 requests / 15 min per IP on auth endpoints) was hit.

**Example**

```bash
TOKEN=$(curl -s -X POST http://localhost:5000/api/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"you@example.com","password":"secret123"}' | jq -r .token)

curl -X POST http://localhost:5000/api/book \
  -H 'Content-Type: application/json' \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"booking_date":"2026-10-12","booking_time":"19:30","guests":4,"requests":"window seat"}'
```

---

## Data models

**User**

| Field      | Type   | Notes                        |
| ---------- | ------ | ---------------------------- |
| `username` | String | required, trimmed            |
| `email`    | String | required, unique, lowercased |
| `password` | String | bcrypt hash (cost 10)        |
| `createdAt` / `updatedAt` | Date | added by `timestamps` |

**Booking**

| Field          | Type     | Notes                              |
| -------------- | -------- | ---------------------------------- |
| `user`         | ObjectId | ref → `User`, required             |
| `booking_date` | Date     | required                           |
| `booking_time` | String   | required, `HH:MM`                  |
| `guests`       | Number   | required, min 1 (validated ≤ 20)   |
| `requests`     | String   | optional, trimmed                  |
| `createdAt` / `updatedAt` | Date | added by `timestamps` |

---

## Available scripts

### `client/`

| Script            | Command         | Description                              |
| ----------------- | --------------- | ---------------------------------------- |
| `npm run dev`     | `vite`          | dev server on :5173 with `/api` proxy    |
| `npm start`       | `vite`          | alias of `dev`                           |
| `npm run build`   | `vite build`    | production bundle → `client/dist`        |
| `npm run preview` | `vite preview`  | preview the production build             |

### `server/`

| Script          | Command             | Description                    |
| --------------- | ------------------- | ------------------------------ |
| `npm run dev`   | `nodemon index.js`  | auto-restart on file changes   |
| `npm start`     | `node index.js`     | production start               |

---

## Deploying (Vercel + Render)

**Frontend — Vercel**

| Setting        | Value                                             |
| -------------- | ------------------------------------------------- |
| Root directory | `client`                                          |
| Build command  | `npm run build`                                   |
| Output         | `dist`                                            |
| Env variable   | `VITE_API_URL=https://restaurentdinningapp.onrender.com` |

**Backend — Render**

| Setting       | Value                                             |
| ------------- | ------------------------------------------------- |
| Start command | `npm start` (run in `server/`)                    |
| Env variables | `MONGODB_URI`, `JWT_SECRET`, `NODE_ENV=production`, `CLIENT_URL` |

`CLIENT_URL` must list **every** origin that calls the API, otherwise the
browser reports:

```
Access to fetch at 'https://...onrender.com/api/login' from origin
'https://...vercel.app' has been blocked by CORS policy
```

Fix: set `CLIENT_URL=https://client-tawny-alpha-70.vercel.app` (add
`,http://localhost:5173` for local work) and redeploy the service.

---

## Security notes

Implemented:

- Passwords hashed with **bcrypt** (cost factor 10); login returns a generic
  "invalid email or password" message to avoid user enumeration.
- **JWT** signed with `JWT_SECRET`, 1-hour expiry; verified by the
  `authentication` middleware (`Bearer` scheme required).
- **CORS** restricted to `CLIENT_URL` instead of `*`.
- **Rate limiting** on `/api/register` and `/api/login`
  (20 requests / 15 min per IP, in-memory).
- **Body size limit** of 10 kB (`express.json({ limit: '10kb' })`).
- Server-side validation for email format, password length, guest count and
  booking date/time shape.
- Stack traces are only exposed when `NODE_ENV=development`.
- `.env` is git-ignored — never commit secrets.

Recommended for production:

- Serve the API over **HTTPS** and add security headers (`helmet`).
- Move the token from `localStorage` to an **httpOnly, SameSite cookie**.
- Add a MongoDB **index** on `booking_date` if you list bookings often.
- Replace the canonical URL in `client/index.html` with your real domain.
- Use a managed rate limiter (Redis) if you run more than one instance.
