# portfolio-v2

Personal site for Nathan Schroeder — [nathanschroeder.dev](https://nathanschroeder.dev).

Next.js 16 (App Router) + React 19 + Tailwind v4, with a Spotify-driven music card, MDX project pages, and a WebGL light-rays background.

## Stack

- **Next.js 16** with the App Router and React Compiler enabled
- **React 19** + TypeScript (strict)
- **Tailwind v4** via `@tailwindcss/postcss`, theme tokens declared in `globals.css` with `@theme inline`
- **motion** for reveal/transition animations
- **next-themes** for dark/light mode
- **next-mdx-remote** for project detail pages
- **ogl** for the WebGL light-rays background shader
- **bun** as the package manager

## Getting started

```bash
bun install
bun dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command         | What it does                              |
| --------------- | ----------------------------------------- |
| `bun dev`       | Start the Next.js dev server              |
| `bun run build` | Production build                          |
| `bun start`     | Run the production build                  |
| `bun run lint`  | ESLint (`eslint-config-next`, TS + CWV)   |

## Project layout

```
src/
  app/                  Routes, layout, global CSS, sitemap, robots, OG, API routes
  components/           UI components, grouped by section (projects/, showcase/, etc.)
  content/projects/     MDX bodies for project detail pages (slug must match data/projects.ts)
  data/                 Source of truth for projects, showcase items, playground items
  hooks/                Shared client hooks
  lib/                  Small utilities (cn, etc.)
public/
  fonts/                Satoshi + 42 Exposure optical-size variants
  images/, videos/      Project art and showcase clips
```

Path alias: `@/*` → `./src/*`.

## Content

- **Projects** — add an entry to `src/data/projects.ts` and a matching `src/content/projects/{slug}.mdx`. The detail route, sitemap, and listing pick it up automatically.
- **Showcase** — add an entry to `src/data/showcase.ts` and drop the video in `public/videos/`.
- **Playground** — add an entry to `src/data/playground.ts` **and** register the React component in the `experimentComponents` map inside `src/components/playground/playground-page-content.tsx`.

## Music card

The homepage music card calls `/api/spotify/top-track`, which:

1. Refreshes a Spotify token from a stored refresh token.
2. Fetches the user's top track (`short_term`, cached 1h).
3. Looks the track up on iTunes for a playable 30s preview and high-res artwork (Spotify previews are unavailable for most tracks).

To make it work locally, set these in `.env.local`:

```
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
SPOTIFY_REFRESH_TOKEN=
# optional, defaults to the prod redirect:
SPOTIFY_REDIRECT_URI=http://localhost:3000/api/spotify/callback
```

To mint a refresh token, hit Spotify's authorize endpoint with the `user-top-read` scope pointing at `/api/spotify/callback` — the route returns the `refresh_token` for you to save as `SPOTIFY_REFRESH_TOKEN`.

## Fonts

Satoshi is loaded via `next/font/local`. The Exposure variable font is declared as individual `@font-face` rules for each optical size in `src/app/exposure-fonts.css`. Use a specific size by setting:

```tsx
<h1 style={{ fontFamily: "Exposure-50" }}>...</h1>
```

Naming convention: negative grades use a hyphen (`Exposure-50`), positive grades don't (`Exposure50`).

## Deploy

Hosted on Vercel. Pushing to `main` deploys to production.
