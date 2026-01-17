# WebTechPie Backend

Backend service for the [WebTechPie](https://webtechpie.com) platform, built with NestJS and MongoDB.
It exposes RESTful APIs for authentication, pages content, plans, core UI configuration, teams, solutions,
and contact management.

> Base API URL (local): `http://localhost:8080/api/v1/`  
> Base API URL (prod): `https://app-webtechpie-be.adaptable.app/api/v1`

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture Overview](#architecture-overview)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Running](#running)
- [API Overview](#api-overview)
  - [Root](#root)
  - [Auth](#auth)
  - [Pages](#pages)
  - [Core](#core)
  - [Plan](#plan)
  - [Solutions](#solutions)
  - [Teams](#teams)
  - [Contact](#contact)
- [Testing & Linting](#testing--linting)
- [Deployment](#deployment)
- [Roadmap / TODO](#roadmap--todo)
- [Contributing](#contributing)

---

## Features

- OAuth2 authentication (Google & GitHub)
- JWT-based sessions (access + refresh tokens)
- Admin-only private API endpoints
- CMS-like content for:
  - Landing, solutions, portfolio, community pages
  - Core navigation and social links
  - Plans and pricing
  - Teams and team members
  - Contact form submissions
- Centralized validation and exception handling
- Swagger/OpenAPI documentation at `/docs`
- Postman collection for manual testing

---

## Tech Stack

- Runtime: Node.js
- Framework: [NestJS](https://nestjs.com/)
- Language: TypeScript
- Database: MongoDB (via Mongoose)
- Auth:
  - OAuth2 providers: Google, GitHub
  - JWT with `passport-jwt`
- Validation: `class-validator`, `class-transformer`, NestJS pipes
- API Docs: `@nestjs/swagger` (Swagger UI)
- Testing: Jest (unit + e2e)
- Tooling: ESLint, Prettier

---

## Architecture Overview

- `src/app.module.ts` – root module; wires feature modules, MongoDB, configuration, and global filters.
- `src/main.ts` – application bootstrap, global prefix, CORS, validation, exception handling, Swagger.
- Feature modules under `src/features`:
  - `auth` – OAuth, JWT, admin guard.
  - `pages` – landing/solutions/portfolio/community content.
  - `core` – navigation, portfolio configuration.
  - `plan` – plans and pricing.
  - `solutions` – solutions information.
  - `teams` – teams and team members.
  - `contact` – contact form submissions.

Global API prefix: `api/v1/` (set in `src/config/app.config.ts`).  
All paths in the API overview are relative to this prefix.

---

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- npm or Yarn
- MongoDB (local or remote)
- Google OAuth credentials (Client ID/Secret)
- GitHub OAuth credentials (Client ID/Secret) if GitHub login is used

### Installation

```bash
git clone https://github.com/webtechpie/webtechpie-be.git
cd webtechpie-be

# using npm
npm install

# or using yarn
yarn install
```

### Configuration

The application reads configuration from environment variables (via `@nestjs/config`).

Common variables:

- `PORT`  
  HTTP port to listen on. Default: `8080`.

- `MONGODB_URI`  
  MongoDB connection string.  
  Default if not set: `mongodb://localhost:27017/webtechpie`

- `JWT_SECRET`  
  Secret used to sign JWT tokens.  
  Default (development only): `dev-secret-change-me`

- `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_CALLBACK_URL`  
  Google OAuth app credentials and callback URL.

- `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`, `GITHUB_CALLBACK_URL`  
  GitHub OAuth credentials and callback URL.

Create a `.env` file in the project root and set these values as needed.  
An existing `.env.example` (if present) can be used as a template.

### Running

Development:

```bash
# using npm
npm run start:dev

# or using yarn
yarn start:dev
```

The server will be available at:

- Local: `http://localhost:8080`
- Base API: `http://localhost:8080/api/v1/`
- Swagger docs: `http://localhost:8080/docs`

Production:

```bash
npm run build
npm run start:prod
```

### CORS

CORS is enabled with a fixed list of allowed origins (see `src/utils/data.ts`), including:

- `http://localhost:3000`
- `https://webtechpie.com`
- `https://www.webtechpie.com`
- `http://webtechpie.io`

Allowed methods: `GET,HEAD,PUT,PATCH,POST,DELETE`.

---

## API Overview

All paths below are relative to `/api/v1`.
Use Swagger at `/docs` for detailed schemas and examples.

### Root

Controller: `src/app.controller.ts`

| Method | Path | Auth   | Description                    |
|--------|------|--------|--------------------------------|
| GET    | `/`  | Public | Health check / welcome string |

Returns a simple `"Hello World!"` string by default.

---

### Auth

Controller: `src/features/auth/auth.controller.ts`  
Tag: `auth`  
Base path: `/auth`

#### OAuth

| Method | Path                    | Auth    | Description                                |
|--------|-------------------------|---------|--------------------------------------------|
| GET    | `/auth/google`          | Public  | Initiate Google OAuth flow                 |
| GET    | `/auth/google/callback` | Google  | Handle Google callback, issue JWT tokens   |
| GET    | `/auth/github`          | Public  | Initiate GitHub OAuth flow                 |
| GET    | `/auth/github/callback` | GitHub  | Handle GitHub callback, issue JWT tokens   |

Successful OAuth callback returns:

```json
{
  "statusCode": 200,
  "data": { "email": "...", "firstName": "...", "lastName": "...", "picture": "..." },
  "tokens": {
    "accessToken": "<jwt>",
    "refreshToken": "<jwt>"
  },
  "message": "User successfully authenticated with Google"
}
```

#### Session Status

| Method | Path         | Auth       | Description                             |
|--------|--------------|------------|-----------------------------------------|
| GET    | `/auth/me`   | Bearer JWT | Get profile of current user             |
| PATCH  | `/auth/me`   | Bearer JWT | Update profile of current user          |
| GET    | `/auth/status` | Bearer JWT | Returns auth status and user (if any)   |

Response:

```json
{ "isAuthenticated": true, "user": { /* user document */ } }
```

or:

```json
{ "isAuthenticated": false }
```

#### Admin-only Private API

JWT payload contains an `isAdmin` boolean, and an `AdminGuard` restricts access.

| Method | Path              | Auth                        | Description                          |
|--------|-------------------|-----------------------------|--------------------------------------|
| POST   | `/auth/admin/ping`| Bearer JWT + `isAdmin=true` | Simple admin-only test/private API   |

Example response:

```json
{
  "statusCode": 200,
  "message": "Admin access granted",
  "user": {
    "userId": "...",
    "email": "...",
    "isAdmin": true
  }
}
```

Use this endpoint as a template for implementing further admin-only APIs.

---

### Pages

Controller: `src/features/pages/pages.controller.ts`  
Tag: `pages`  
Base path: `/pages`

| Method | Path               | Auth   | Description                        |
|--------|--------------------|--------|------------------------------------|
| GET    | `/pages/landing`   | Public | Returns landing page content       |
| GET    | `/pages/solutions` | Public | Returns solutions page content     |
| GET    | `/pages/portfolio` | Public | Returns portfolio page metadata    |
| POST   | `/pages`           | Public | Create a new page document         |
| GET    | `/pages/community` | Public | Returns community page content     |

Payload for creating a page is described by `CreatePageDto` and includes:
`title`, `name`, `descriptions`, `meta`, `body`, etc.

---

### Core

Controller: `src/features/core/core.controller.ts`  
Tag: `core`  
Base path: `/core`

| Method | Path                 | Auth   | Description                               |
|--------|----------------------|--------|-------------------------------------------|
| GET    | `/core/navigations`  | Public | Navigation (primary, footer, social)      |
| POST   | `/core/portfolio`    | Public | Create portfolio entry                     |
| GET    | `/core/portfolio`    | Public | List portfolio entries                     |

---

### Plan

Controller: `src/features/plan/plan.controller.ts`  
Tag: `plan`  
Base path: `/plan`

| Method | Path           | Auth   | Description                  |
|--------|----------------|--------|------------------------------|
| GET    | `/plan`        | Public | List plans                   |
| POST   | `/plan/create` | Public | Create new plan entry        |

Plans are simple pricing/feature bundles (basic/pro, etc).

---

### Solutions

Controller: `src/features/solutions/solutions.controller.ts`  
Tag: `solutions`  
Base path: `/solutions`

| Method | Path          | Auth   | Description                        |
|--------|---------------|--------|------------------------------------|
| GET    | `/solutions`  | Public | Returns solutions highlights/info  |

---

### Teams

Controller: `src/features/teams/teams.controller.ts`  
Tag: `teams`  
Base path: `/teams`

| Method | Path              | Auth   | Description                         |
|--------|-------------------|--------|-------------------------------------|
| GET    | `/teams`          | Public | Returns teams summary text          |
| GET    | `/teams/members`  | Public | Returns list of team members        |
| POST   | `/teams/member`   | Public | Add a team member (raw payload)     |

`POST /teams/member` currently accepts an arbitrary JSON payload and passes it to the service.

---

### Contact

Controller: `src/features/contact/contact.controller.ts`  
Tag: `contact`  
Base path: `/contact`

| Method | Path        | Auth   | Description                     |
|--------|-------------|--------|---------------------------------|
| POST   | `/contact`  | Public | Create a contact submission     |
| GET    | `/contact`  | Public | List all contact submissions    |

Typical request body:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+919876543210",
  "company": "Freelancer",
  "designation": "Software Engineer",
  "location": "Noida, India",
  "subject": "General Inquiry",
  "message": "I am interested in your services"
}
```

---

## Testing & Linting

### Testing

Jest is configured via `package.json` and `test/jest-e2e.json`.

```bash
# unit tests
npm test

# watch mode
npm run test:watch

# coverage
npm run test:cov

# e2e tests
npm run test:e2e
```

### Linting / Formatting

Linting script:

```bash
npm run lint
```

Note: the project currently uses ESLint v9 with a legacy `.eslintrc.js` file.
ESLint 9 expects the new `eslint.config.js` format, so `npm run lint` may fail
until the configuration is migrated.

Prettier formatting:

```bash
npm run format
```

---

## Deployment

Current production deployment:

- Prod API base URL: `https://app-webtechpie-be.adaptable.app/api/v1`
- Provider: Adaptable
- Plan: Free
- Domain: `app-webtechpie-be.adaptable.app`

Deployment typically consists of:

1. Building the app with `npm run build`.
2. Supplying environment variables (MongoDB URI, OAuth credentials, JWT secret) in the hosting platform.
3. Running `npm run start:prod`.

---

## Roadmap / TODO

Planned and recommended improvements:

### Tooling & Quality

- Migrate ESLint configuration to `eslint.config.js` to match ESLint 9.
- Increase TypeScript strictness and address any type gaps.
- Expand unit and e2e test coverage across all feature modules.

### Authentication & Security

- Add refresh token rotation and revocation (server-side tracking).
- Expose admin-only endpoints for:
  - Promoting/demoting admins.
  - Listing users and their roles.
- Enforce a strong `JWT_SECRET` from environment only in all environments.
- Optionally add rate limiting for public endpoints (`/contact`, `/auth/*`).

### API & Features

- Pages:
  - Add update/delete endpoints.
  - Add `GET /pages/:name` for flexible page lookup.
- Core:
  - Add update endpoints for navigation and portfolio configuration.
  - Introduce feature flags for frontend behavior.
- Plans:
  - Add update/delete plan endpoints and categorization.
- Teams:
  - Replace raw payload in `POST /teams/member` with a DTO + validation.
  - Add update/delete endpoints for team members.
- Contact:
  - Add pagination and filtering to `GET /contact`.
  - Add endpoint to mark contacts as “handled” or “resolved”.

### Operations & Docs

- Add Dockerfile and optional `docker-compose` for API + MongoDB.
- Document deployment steps for common environments (e.g., Docker, Adaptable).
- Keep Swagger and the Postman collection in sync with API evolution.

---

## Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a feature branch:

   ```bash
   git checkout -b feature/your-feature
   ```

3. Make your changes and add tests where appropriate.
4. Commit your changes:

   ```bash
   git commit -m "Add your feature"
   ```

5. Push to your branch:

   ```bash
   git push origin feature/your-feature
   ```

6. Open a Pull Request with a clear description and, if possible, screenshots or API examples.
