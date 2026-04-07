# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Interactive 3D portfolio for Naresh Sekar, built on Bruno Simon's folio-2025. Features a driveable 3D world (Three.js WebGPU + Rapier physics) where visitors explore career sections. Also includes a separate static profile page (`profile.html`) for SEO/social sharing.

## Commands

| Task | Command |
|------|---------|
| Dev server | `npm run dev` (runs at localhost with Vite, auto-opens browser) |
| Production build | `npm run build` (outputs to `docs/`) |
| Preview build | `npm run preview` |
| Tests | `npm test` (vitest with 100% coverage thresholds) |
| Lint | `npm run lint` |
| Format | `npm run format` |
| Fetch GitHub repos | `npm run fetch-repos` (requires `VITE_GITHUB_TOKEN` in `.env`) |
| Compress static assets | `npm run compress` |

## Architecture

There are **two separate apps** in this repo:

### 1. 3D Game World (Vite app)
- **Entry:** `sources/index.js` → `sources/Game/Game.js`
- **Vite root:** `sources/` (configured in `vite.config.js` with `root: 'sources/'`)
- **Static assets:** `static/` (served as Vite's `publicDir`)
- **Build output:** `docs/` (deployed to GitHub Pages)
- **Original folio-2025 code:** `sources/Game/` — singleton-based architecture with subsystems (Physics, Rendering, Inputs, World, Weather, etc.)

### 2. Custom 3D Game Layer (`src/`)
- **Entry:** `src/main.js` → `src/Game/Game.js`
- Extends the base world with portfolio-specific areas: `src/Game/World/Areas/` (Career, Skills, About, Contact, etc.)
- Each area extends `BaseArea.js` and places 3D objects + interactive points in the world
- UI components in `src/UI/` (HUD, Minimap, ContentPanel, LoadingScreen, MobileControls, Menu)
- Color palette and world config in `src/Data/`

### 3. Static Profile Page
- **Files:** `profile.html`, `js/`, `css/`
- Standalone HTML page (no Vite bundling) with its own Three.js background scene (`js/three-scene.js`)
- Content loaded from `resume.json` via `js/resume-loader.js`
- Synced to `static/` (for dev) and `docs/` (for deploy) via `npm run sync-profile`

## Key Data Files

- **`resume.json`** — Single source of truth for all portfolio content (personal info, career history, skills, publications, certifications, SEO metadata). Changes here propagate to both the 3D world and the profile page.
- **`src/Data/portfolioData.js`** — Maps resume sections to 3D world area configs
- **`src/Data/colorPalette.js`** / `src/Data/worldConfig.js` — Visual theming and world layout

## Testing

- Framework: Vitest with jsdom environment
- Test files: `tests/**/*.test.js`
- Setup file: `tests/setup.js`
- Coverage: 100% threshold on `js/main.js`, `js/resume-loader.js`, and `sources/Game/utilities/`
- 3D/WebGL code (`three-scene.js`, `src/`, `sources/Game/`) is excluded from coverage — requires GPU context

## Pre-commit Hook

The `.githooks/pre-commit` hook runs tests, builds, syncs profile files to `static/` and `docs/`, and stages the results. Commits will fail if tests fail.

## Build Pipeline

`npm run build` triggers `prebuild` which: fetches GitHub repos → syncs profile files → prerenders profile page → runs Vite build to `docs/`.

## Environment Variables

- `VITE_GITHUB_TOKEN` — GitHub PAT for fetching repo data (in `.env`, not committed)
- `VITE_LOG` — Enable console logging in dev
- `VITE_GAME_PUBLIC` — Expose game instance on `window.game`
