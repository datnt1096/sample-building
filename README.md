# Sample Building

A full-stack rental building catalog: a public Next.js site for browsing buildings and apartments, plus an admin area to manage buildings with nested apartments, policies, and image uploads. The Rails API serves JSON over `/api/v1` and stores data in PostgreSQL with Active Storage for images.

## Tech stack

| Part | Stack |
|------|--------|
| **Frontend** (`frontend/`) | [Next.js](https://nextjs.org/) 16 (App Router), React 19, TypeScript, Tailwind CSS 4 |
| **Backend** (`backend/`) | [Rails](https://rubyonrails.org/) 8.1 (API-only), PostgreSQL, Active Storage, Puma, `rack-cors` |
| **Infrastructure** | Docker Compose (Postgres 18, frontend on port 3000, backend on port 3001) |

The frontend runs with **Bun** inside Docker (`bun dev`). You can use **npm** locally if you prefer.

## Project structure

```
sample-building/
├── docker-compose.yml      # Postgres + frontend + backend services
├── README.md
├── frontend/               # Next.js public site + admin UI
│   ├── app/
│   │   ├── page.tsx                    # Home: gallery, search, building list
│   │   ├── buildings/[id]/page.tsx     # Building detail (apartments, policies)
│   │   └── admin/                      # Admin CRUD (token in localStorage)
│   ├── components/         # Shared UI (search, cards, admin forms)
│   ├── lib/                  # API clients (public + admin)
│   ├── hooks/
│   └── public/home/          # Static gallery images for the home page
└── backend/                # Rails JSON API
    ├── app/
    │   ├── controllers/api/v1/         # Public + admin building endpoints
    │   ├── models/                     # Building, Apartment, BuildingPolicy
    │   └── controllers/concerns/       # JSON serialization (camelCase)
    ├── config/
    │   ├── routes.rb
    │   ├── database.yml                # Points at `db` host in Docker
    │   └── initializers/cors.rb
    └── db/
        ├── migrate/
        └── schema.rb
```

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) and Docker Compose, **or**
- Local: Ruby 4.x, Bundler, PostgreSQL, Node.js 20+ (or Bun), and matching DB settings in `backend/config/database.yml` if not using Docker

## Installation

### 1. Environment files

Copy the example env files and set the values below.

**Backend** — `backend/.env` (from `backend/.env.example`):

```bash
cp backend/.env.example backend/.env
```

| Variable | Description |
|----------|-------------|
| `ADMIN_SECRET_TOKEN` | Secret string for admin API access. Use a long random value in real deployments. The admin UI sends this as `Authorization: Bearer <token>`. |

Rails loads `backend/.env` in development/test via `dotenv-rails` (see `Gemfile`).

**Frontend** — `frontend/.env` (from `frontend/.env.example`):

```bash
cp frontend/.env.example frontend/.env
```

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_API_URL` | Base URL of the Rails API **as seen from the browser**. With Docker Compose use `http://localhost:3001` (host port mapped to the backend container). |

### 2. Run with Docker Compose (recommended)

From the repository root:

```bash
# Build and start Postgres, backend, and frontend
docker compose up
```

On first run, prepare the database inside the backend container:

```bash
docker compose exec --rm backend bundle exec rails db:prepare
```

| Service | URL |
|---------|-----|
| Public site | http://localhost:3000 |
| Rails API | http://localhost:3001 |
| PostgreSQL | `localhost:5432` (user `postgres`, password `password`) |

Stop services:

```bash
docker compose down
```

### 3. Run locally (without Docker)

**Database** — ensure PostgreSQL is running and update `backend/config/database.yml` (`host`, `username`, `password`) for your machine instead of `host: db`.

**Backend:**

```bash
cd backend
cp .env.example .env   # if not done yet
bundle install
bin/rails db:prepare
bin/rails server       # default http://localhost:3000
```

If the frontend still points at port 3001, either run Rails on 3001 or set `NEXT_PUBLIC_API_URL=http://localhost:3000` in `frontend/.env`.

**Frontend:**

```bash
cd frontend
cp .env.example .env   # if not done yet
bun install            # or: npm install
bun dev                # or: npm run dev
```

Open http://localhost:3000.

## Public site

- **Home** (`/`) — image gallery, full building list, and name search (`/?q=...`).
- **Search** — typing debounces 300ms and shows up to 10 suggestions (`GET /api/v1/buildings?q=...&limit=10`). Press Enter or the search icon to filter the list on the same page without `limit`.
- **Building detail** (`/buildings/:id`) — cover image, description, apartments, and policies. Missing or invalid IDs show an inline “not found” message.

## Admin area

Open **http://localhost:3000/admin** (redirects to `/admin/buildings`).

### Authentication

There is no user login screen. On first visit, a modal asks for the **admin secret token** (same value as `ADMIN_SECRET_TOKEN` in `backend/.env`). The token is stored in the browser `localStorage` and sent on every admin request. Use **Change token** or **Log out** in the header to clear or replace it. A `401` response clears the token and shows the modal again.

### What you can do

| Screen | Actions |
|--------|---------|
| **Buildings list** (`/admin/buildings`) | View all buildings, delete (with confirmation), open edit, create new |
| **New building** (`/admin/buildings/new`) | Create a building with cover image, metadata, and nested apartments / policies |
| **Edit building** (`/admin/buildings/:id/edit`) | Update fields, upload new images, add or remove nested **apartments** and **building policies** |

Nested records are saved with Rails nested attributes. Removing an existing apartment or policy in the form marks it with `_destroy` so the API deletes it on save. Creates and updates use **multipart/form-data** for file uploads.

### Admin API (reference)

All admin routes require `Authorization: Bearer <ADMIN_SECRET_TOKEN>`:

- `GET/POST /api/v1/admin/buildings`
- `GET/PATCH/DELETE /api/v1/admin/buildings/:id`

Public read-only API (no token):

- `GET /api/v1/buildings` — optional `q` (name search), optional `limit` (only applied when `q` is present)
- `GET /api/v1/buildings/:id`

## Development commands

```bash
# Frontend lint
cd frontend && npm run lint

# Frontend typecheck
cd frontend && npx tsc --noEmit

# Backend console
docker compose exec backend bin/rails console
```

## Known limitations and notes

1. **`db/seeds.rb` is empty** — there is no sample data out of the box. Create buildings via the admin UI or add your own seeds.
2. **Admin token in `localStorage`** — suitable for local/demo use only; not a full auth system for production.
3. **CORS** — `config/initializers/cors.rb` allows `http://localhost:3000` only. Add production frontend origins before deploying.
4. **Image URLs** — Active Storage blob URLs are built from the incoming request in development. With Docker, the API is exposed on port **3001**; keep `NEXT_PUBLIC_API_URL` aligned so the browser can load images.
5. **Docker backend** — `docker-compose.yml` does not run `db:prepare` automatically; run it once after the first `up` (see above).
6. **Production** — configure `action_controller.default_url_options` (or equivalent) for Active Storage in production, harden `ADMIN_SECRET_TOKEN`, and restrict admin access (VPN, separate host, or proper auth).

If you hit issues, confirm Postgres is up, migrations have run, both `.env` files are set, and the frontend can reach the API URL from your browser (not only from inside the Docker network).
