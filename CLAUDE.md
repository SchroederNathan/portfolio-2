# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager: **bun** (see `bun.lock`; the most recent commit was a full move to bun).

- `bun dev` — start Next.js dev server at http://localhost:3000
- `bun run build` — production build (Next.js 16, React 19, React Compiler enabled)
- `bun start` — run the production build
- `bun run lint` — ESLint via `eslint-config-next` (core-web-vitals + typescript)

There is no test runner configured.

## Architecture

Next.js App Router portfolio site (`nathanschroeder.dev`). Single root layout, mostly statically rendered, with a handful of API routes for music integration.

### Routing surface (`src/app/`)

- `/` — `page.tsx` composes `HeroSection`, `ProjectsContainer`, `ShowcaseContainer`, `ExperienceContainer`, `MusicCard`, each wrapped in `Reveal` with staggered delays.
- `/projects` and `/projects/[slug]` — project list + detail. Detail pages call `generateStaticParams()` from `src/data/projects.ts` and read MDX bodies from `src/content/projects/{slug}.mdx` via `fs.readFileSync` at build time, rendered with `next-mdx-remote/rsc` and a custom `mdxComponents` map.
- `/playground/[slug]` — interactive experiments. Slugs come from `src/data/playground.ts`; each slug maps to a React component in `experimentComponents` inside `playground-page-content.tsx`. Adding a new experiment requires both a data entry **and** a component import in that map.
- `/og` — OG image route.
- `sitemap.ts` and `robots.ts` — generated from the data files.
- `/api/spotify/{top-track,track,callback}` and `/api/itunes/track` — see "Music card data flow" below.

### Content/data model

`src/data/*.ts` are the source of truth for what shows up on the site (`projects.ts`, `showcase.ts`, `playground.ts`). They are plain TS arrays of typed items; `sitemap.ts` and the dynamic route pages both import from them, so adding/removing items here automatically updates routing, sitemap, and listings.

Project long-form copy lives in `src/content/projects/{slug}.mdx` — the slug must match the entry in `projects.ts` or the detail page 404s.

### Sections (`src/components/{projects,showcase,playground,experience}/`)

Each section folder follows the same shape: a `container.tsx` (client component, owns layout + interaction state) and a `card.tsx`. Showcase additionally uses `src/hooks/useHorizontalScroll.ts` for its horizontal scroller and runs a dual-mode play behavior: on hover for pointer devices, on "centered card" for touch devices (detected via `matchMedia("(hover: none) and (pointer: coarse)")`).

### Music card data flow (`src/components/music-card.tsx` + `src/app/api/`)

`<MusicCard spotifyTopTrack />` (used on the homepage) hits `/api/spotify/top-track`, which:
1. Refreshes a Spotify access token using `SPOTIFY_CLIENT_ID` / `SPOTIFY_CLIENT_SECRET` / `SPOTIFY_REFRESH_TOKEN`.
2. Fetches the user's `short_term` top track (cached 1h via `next: { revalidate: 3600 }`).
3. Searches iTunes for the same track to get a 30s `preview_url` and high-res artwork (Spotify previews are gone for most tracks; iTunes is the playable source).
4. Falls back to Spotify data if iTunes has no match.

`/api/spotify/callback` is a one-shot helper to exchange an OAuth `code` for a `refresh_token` to seed `SPOTIFY_REFRESH_TOKEN` — not used at runtime.

Album artwork comes from `is1-ssl.mzstatic.com`, which is whitelisted in `next.config.ts` `images.remotePatterns`.

### Visuals & styling

- **Tailwind v4** via `@tailwindcss/postcss` — config lives in `src/app/globals.css` using `@theme inline` rather than a JS config. Theme tokens: `background`, `foreground`, `muted`, `primary` (orange `#F97316`), plus `font-sans` (Satoshi) and `font-exposure`.
- **Dark mode** via `next-themes` with `attribute="class"`, mounted in `ThemeProvider` (`src/components/theme-provider.tsx`).
- **Fonts**: Satoshi is loaded via `next/font/local` in `layout.tsx`. The Exposure variable font is **not** loaded via next/font — it's declared as 42 individual `@font-face` rules (21 optical sizes × normal/italic) in `src/app/exposure-fonts.css`. To use a specific optical size, set `style={{ fontFamily: "Exposure-50" }}` (negative grades use `Exposure-NN`, positive use `ExposureNN`, no separator). `Exposure-50` is preloaded in `layout.tsx` with `font-display: block` to prevent FOUT on the hero title.
- **Animations**: `motion` (Framer Motion successor) — almost every visible element is wrapped in a `Reveal` (`src/components/ui/reveal.tsx`) which animates opacity, blur, rotation, and y-offset together. Staggered via `delay` prop.
- **Background**: `LightRaysWrapper` renders an OGL-based WebGL shader (`src/components/ui/light-rays.tsx`) fixed behind all content. It's dynamically imported with `ssr: false`.
- **React Compiler** is enabled (`reactCompiler: true` in `next.config.ts`, `babel-plugin-react-compiler` in devDeps) — avoid manually adding `useMemo`/`useCallback` where the compiler will handle it.

### Path alias

`@/*` → `./src/*` (configured in `tsconfig.json`).

## Environment variables

Required for the music card to work in dev:
- `SPOTIFY_CLIENT_ID`
- `SPOTIFY_CLIENT_SECRET`
- `SPOTIFY_REFRESH_TOKEN` (obtain via `/api/spotify/callback` flow)
- `SPOTIFY_REDIRECT_URI` (optional; defaults to the prod URL)

`.env` and `.env.local` exist locally and are gitignored.
