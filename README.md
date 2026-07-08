# ShowVerse

ShowVerse is a full-stack movie booking app with a modern React frontend, a scalable Express API, Clerk authentication, and MongoDB persistence.

## Live Apps

- Frontend (Vercel): [https://show-verse.vercel.app/](https://show-verse.vercel.app/)
- Backend (Render): [https://showverse-backend.onrender.com/](https://showverse-backend.onrender.com/)
- Backend health: [https://showverse-backend.onrender.com/api/health](https://showverse-backend.onrender.com/api/health)

## Highlights

- Browse movies and available shows
- Seat selection and booking flow
- Favorites and booking history for users
- Admin dashboard for show management
- Clerk-powered authentication
- Stripe webhook endpoint support
- Inngest event endpoint support

## Architecture

```text
Vercel (React + Vite) ---> Render (Express API) ---> MongoDB Atlas
          |                        |
          +---- Clerk auth --------+
```

## Tech Stack

- Frontend: React 19, Vite 6, React Router, Tailwind CSS 4, Clerk React, Axios
- Backend: Node.js (ESM), Express 5, Mongoose, Clerk Express, Inngest, Stripe, Nodemailer
- Infrastructure: Vercel (frontend), Render (API), MongoDB Atlas (DB)

## Repository Structure

```text
ShowVerse/
  client/                  # Frontend app (React + Vite)
  server/                  # Backend app (Express + MongoDB)
  README.md
```

## Quick Start (Local)

### 1) Install dependencies

```bash
git clone <your-repo-url>
cd ShowVerse
cd client && npm install
cd ../server && npm install
```

### 2) Configure environment variables

#### Frontend (`client/.env`)

```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
VITE_BASE_URL=http://localhost:3000
VITE_CURRENCY=$
VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p/original
```

For local frontend + deployed backend testing:

```env
VITE_BASE_URL=https://showverse-backend.onrender.com
```

#### Backend (`server/.env`)

```env
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/ShowVerse?retryWrites=true&w=majority
CLERK_SECRET_KEY=sk_test_...
TMDB_API_KEY=...
CORS_ORIGINS=http://localhost:5173,https://show-verse.vercel.app
PORT=3000
```

Optional variables:
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `SMTP_USER`
- `SMTP_PASS`
- `SENDER_EMAIL`

### 3) Run apps

Terminal 1:

```bash
cd server
npm run server
```

Terminal 2:

```bash
cd client
npm run dev
```

## Deployment Guide

### Backend (Render)

1. Create a new Render Web Service from this repo
2. Set root directory to `server`
3. Build command: `npm install`
4. Start command: `npm start`
5. Add required environment variables
6. Ensure MongoDB Atlas network access allows Render

Verify:
- `GET /` returns `Server is Live!`
- `GET /api/health` returns `success: true` and `database: connected`

### Frontend (Vercel)

1. Import repository in Vercel
2. Set root directory to `client`
3. Build command: `npm run build`
4. Output directory: `dist`
5. Add all required `VITE_*` environment variables
6. Deploy and use the generated `.vercel.app` domain

## Clerk Configuration

- Frontend uses `VITE_CLERK_PUBLISHABLE_KEY`
- Backend uses `CLERK_SECRET_KEY`
- Never expose `CLERK_SECRET_KEY` to client apps

For admin access, set Clerk private metadata:

```json
{
  "role": "admin"
}
```

## API Reference (Core)

Base URL: `https://showverse-backend.onrender.com`

- `GET /` - Service liveness
- `GET /api/health` - Service and DB health
- `GET /api/show/all` - All shows
- `GET /api/show/:movieId` - Shows by movie
- `GET /api/admin/is-admin` - Admin check (auth required)
- `GET /api/user/favorites` - User favorites (auth required)

## Troubleshooting

- Blank frontend:
  - Check `VITE_CLERK_PUBLISHABLE_KEY` exists in frontend env
- API timeout / empty backend behavior:
  - Validate `MONGODB_URI` and Atlas network access
- CORS errors:
  - Add frontend domain to `CORS_ORIGINS`
- Auth failures on protected routes:
  - Verify `CLERK_SECRET_KEY` in backend environment
- Missing `/api/health`:
  - Redeploy backend with latest commit

## Security Checklist

- Do not commit real secrets in `.env` files
- Rotate keys immediately if accidentally exposed
- Keep `CLERK_SECRET_KEY` server-side only

## License

ISC

