# Noridoc: frontend src

Path: @/v4/frontend/src

### Overview

- Root of the cuedesk React single-page application
- Defines the routing architecture, auth boundary, and application entry point

### How it fits into the larger codebase

- This is the browser entry point for the entire cuedesk frontend. The build outputs are served as the web app and also bundled into the Chrome extension (`@/extension-dist/`)
- The sidecar native app (`@/v4/sidecar/`) renders a separate route tree (`SidecarAppRoutes`) that bypasses both landing pages and auth
- Auth is provided by Clerk. When `REACT_APP_CLERK_PUBLISHABLE_KEY` is set, the auth gate requires sign-in before showing app routes. When unset (local dev), app routes render directly
- The frontend consumes the v5 backend (`@/v5/backend/`) via REST and WebSocket

### Core Implementation

- **`index.tsx`** -- Application entry point. Owns the `BrowserRouter` and the top-level `Root` component that splits traffic into two layers:

```
BrowserRouter
  └─ Root
       ├─ /              → redirect to /sales
       ├─ /sales         → LandingPage (public, no auth)
       ├─ /never-blank   → LandingPage (public, no auth)
       ├─ /teams         → LandingPage (public, no auth)
       └─ /*             → ClerkProvider → AuthGate → App
```

- **`App.tsx`** -- Renders either `SidecarAppRoutes` or `AppRoutes` depending on `REACT_APP_MODE`. Does NOT own a router -- it expects to be rendered inside one. `AppRoutes` wraps all authenticated routes in `SessionProvider` and `AppShell`
- **Sidecar bypass** -- When `REACT_APP_MODE === "sidecar"`, `Root` returns `<App />` directly, skipping the landing page routes entirely

### Things to Know

- The `BrowserRouter` was moved from `App.tsx` to `index.tsx` to enable public routes (landing pages) that live outside the auth boundary. This means `App` and `AppRoutes` must always be rendered inside an existing router context -- tests use `MemoryRouter` for this
- The three landing page routes (`/sales`, `/never-blank`, `/teams`) exist for A/B demand validation testing. They all render the same `LandingPage` component today
- `ClerkProvider` is only instantiated on the `/*` catch-all route, so landing pages never load Clerk JS

Created and maintained by Nori.
