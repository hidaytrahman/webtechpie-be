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