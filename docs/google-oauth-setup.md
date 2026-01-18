# Google OAuth Setup Guide

## Error: redirect_uri_mismatch
If you're seeing a "Error 400: redirect_uri_mismatch" error, this means the callback URL configured in your Google Cloud Console doesn't match the one used by the application.

## How to Fix

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Navigate to APIs & Services > Credentials
4. Find and edit your OAuth 2.0 Client ID
5. Under "Authorized redirect URIs", add the following URL:
   ```
   http://localhost:8080/api/v1/auth/google/callback
   ```
   This must match exactly with the GOOGLE_CALLBACK_URL in your .env file

## Local Environment Setup

1. Copy `.env.example` to create a new `.env` file
2. Update the following variables in your `.env` file:
   ```
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GOOGLE_CALLBACK_URL=http://localhost:8080/api/v1/auth/google/callback
   ```

## Important Notes

- The callback URL must be exactly the same in both places
- Make sure there are no trailing slashes
- The URL is case-sensitive
- If you're using a different port or domain, update both the Google Cloud Console and your .env file accordingly

## Implementation Guide: End-to-End Flow

This section documents the full Google OAuth flow between the Next.js frontend (`http://localhost:3000`) and this NestJS backend (`http://localhost:8080/api/v1`), and how tokens are issued and returned.

### High-Level Flow

1. User clicks “Sign in with Google” in the frontend.
2. Frontend redirects the browser to the backend:
   - `GET http://localhost:8080/api/v1/auth/google`
3. Backend uses Passport Google strategy to send the user to Google consent.
4. Google authenticates the user and redirects back to:
   - `GET http://localhost:8080/api/v1/auth/google/callback?code=...&scope=...`
5. Backend:
   - Exchanges the `code` for Google tokens and profile (handled by Passport).
   - Finds or creates the user in MongoDB.
   - Issues **its own** JWT `accessToken` and `refreshToken`.
   - Redirects the browser to the frontend callback:
     - `http://localhost:3000/auth/callback?accessToken=...&refreshToken=...`
6. Frontend `/auth/callback` page reads the tokens from the query string, stores them, and redirects the user to `/dashboard`.

### Backend Endpoints

All paths shown below are under the global prefix `api/v1`, so the full routes start with `http://localhost:8080/api/v1`.

- **Start Google login (front-end uses this)**
  - `GET /auth/google`
  - Controller: `AuthController.googleAuth`
  - Guard: `AuthGuard('google')`
  - Responsibility: send the user to Google’s consent screen.

- **Google callback (core of the flow)**
  - `GET /auth/google/callback`
  - Controller: `AuthController.googleAuthRedirect`
  - Guard: `AuthGuard('google')`
  - Responsibility:
    - Runs after Google redirects back with `code`.
    - Uses Passport + `GoogleStrategy` to exchange `code` for Google tokens and profile.
    - Validates/persists the user in the database via `AuthService.validateUser`.
    - Generates JWT access/refresh tokens via `TokenService.generateTokens`.
    - Redirects to the frontend callback URL with `accessToken` and `refreshToken` as query params.

### Key Backend Components

- **Google Strategy**
  - File: `src/features/auth/strategies/google.strategy.ts`
  - Uses environment variables:
    - `GOOGLE_CLIENT_ID`
    - `GOOGLE_CLIENT_SECRET`
    - `GOOGLE_CALLBACK_URL`
  - Handles:
    - Exchanging the authorization `code` for Google tokens.
    - Normalizing the Google profile to a user object.
    - Calling `AuthService.validateUser(user)` to upsert the user in MongoDB.

- **AuthService**
  - File: `src/features/auth/auth.service.ts`
  - Methods:
    - `validateUser(details: any)`:
      - Finds user by `email`.
      - Updates or creates the user document.
      - Determines `isAdmin` based on a hardcoded admin email.
    - `findUser(email: string)` and local login/signup helpers.

- **TokenService (JWT creation)**
  - File: `src/features/auth/token.service.ts`
  - Method: `generateTokens(user: any)`:
    - Builds JWT payload: `{ sub, email, isAdmin }`.
    - Issues:
      - `accessToken` — default expiry `15m` (configured in `AuthModule`).
      - `refreshToken` — expiry `7d`.

- **AuthController callback implementation**
  - File: `src/features/auth/auth.controller.ts`
  - Method:
    ```ts
    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
      const user = req.user;
      const tokens = this.tokenService.generateTokens(user);

      const frontendCallback =
        process.env.FRONTEND_AUTH_CALLBACK_URL ||
        'http://localhost:3000/auth/callback';

      const redirectUrl = `${frontendCallback}?accessToken=${encodeURIComponent(
        tokens.accessToken,
      )}&refreshToken=${encodeURIComponent(tokens.refreshToken)}`;

      res.redirect(302, redirectUrl);
    }
    ```

### Required Environment Variables

Set these in `.env` (or your deployment environment):

- Google OAuth:
  - `GOOGLE_CLIENT_ID=your_google_client_id`
  - `GOOGLE_CLIENT_SECRET=your_google_client_secret`
  - `GOOGLE_CALLBACK_URL=http://localhost:8080/api/v1/auth/google/callback`

- JWT configuration:
  - `JWT_SECRET=your_jwt_secret`

- Frontend callback:
  - `FRONTEND_AUTH_CALLBACK_URL=http://localhost:3000/auth/callback`
    - If not set, the backend defaults to `http://localhost:3000/auth/callback`.

- Database (example, already used elsewhere):
  - `MONGODB_URI=mongodb://localhost:27017/webtechpie`

### Frontend Expectations

The frontend page at `/auth/callback` should:

1. Read tokens from the query string:
   - `accessToken`
   - `refreshToken`
2. Store them (e.g. cookies, localStorage, or a secure token store).
3. Redirect the user to `/dashboard` or another post-login route.

Example (Next.js, using `searchParams`):

```ts
const accessToken = searchParams.get('accessToken');
const refreshToken = searchParams.get('refreshToken');
// Store tokens and then navigate to /dashboard
```

With this setup, the full Google sign-in flow ends at the frontend `/auth/callback` route with both tokens in the query string, ready for the UI to persist and use them for authenticated API calls.
