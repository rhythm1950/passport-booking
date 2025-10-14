# Integration README

Date: 2025-10-14

This document explains how to run the local integration/dev environment for the booking API and a few important conventions.

Setup
- Ensure Node.js and npm are installed (repo contains `package-lock.json`, use npm).
- Install deps: `npm install`
- Enable mocks in development (optional): set `VITE_API_DEBUG=true` in your `.env` or start MSW manually.
- Start dev server: `npm run dev`

Date format
- Backend expects dates in the format: `DD:MM:YYYY HH:mm:ss` (e.g., `25:8:2025 11:39:23`). Use `src/lib/date.ts`'s `toBackendDateTime` helper.

401 behavior
- The API client includes a response interceptor that, on HTTP 401, will:
  - Clear stored tokens (localStorage keys `access_token` and `refresh_token`).
  - Redirect the browser to `/login`.

Files added in this integration branch
- `src/lib/api.ts` — axios instance + interceptors + token helpers
- `src/features/*/service.ts` — booking and bag service endpoints
- `src/hooks/useApiHooks.ts` — react-query hooks for the above
- `src/schemas.ts` — zod schemas for forms and OTP purposes
- `src/mocks/*` — MSW handlers and browser starter
