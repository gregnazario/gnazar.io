# Agent Guidelines

## Package manager

- Use `bun` instead of `npm` for installs and scripts.
- Preferred commands:
  - `bun install`
  - `bun run dev`
  - `bun run build`
  - `bun run lint`
  - `bun run lint:fix`
  - `bun run format`
  - `bun run format:check`
  - `bun run start`

## Linting and formatting

- Use Biome for linting and formatting (`bun run lint`, `bun run format`).

## Content and structure

- Blog posts live in `content/blog` and projects live in `content/projects`.
- Routes are in `app/` (Next.js App Router).
