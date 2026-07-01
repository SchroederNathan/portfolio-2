# AGENTS.md

See `CLAUDE.md` and `README.md` for the full architecture, commands, and content model. This file only adds non-obvious operating notes.

## Cursor Cloud specific instructions

- **Package manager is `bun`** (installed at `~/.bun/bin`, on `PATH` via `~/.bashrc`). The startup update script runs `bun install`. Standard commands are in `README.md` / `CLAUDE.md`: `bun dev` (dev server, http://localhost:3000), `bun run build`, `bun start`, `bun run lint`.
- **No test runner is configured** — there is no `bun test`/`bun run test`. Validate changes via `bun run lint`, `bun run build`, and manually against the running dev server.
- **`bun run lint` currently fails on a pre-existing error** in `src/components/hero-section.tsx` (`react/no-unescaped-entities`). This is unrelated to environment setup; treat it as pre-existing when it appears and do not assume your change caused it.
- **Spotify env vars are optional.** The homepage music card calls `/api/spotify/top-track`, which needs `SPOTIFY_CLIENT_ID` / `SPOTIFY_CLIENT_SECRET` / `SPOTIFY_REFRESH_TOKEN`. Without them the card degrades gracefully; the rest of the site runs fully without any env vars.
- The WebGL light-rays background briefly shows a loading state before the shader initializes; this is normal, not a crash.
