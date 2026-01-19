# gnazar.io

A modern personal website built with TanStack Start, MDX-flavored markdown, and a lightweight
design system.

[![Netlify Status](https://api.netlify.com/api/v1/badges/1c90c9c9-3db9-47ac-9c24-a9ee73daa365/deploy-status)](https://app.netlify.com/sites/gnazario/deploys)

## Stack

- TanStack Start (React Router) + Vite + TypeScript
- MDX content in `content/blog` and `content/projects`
- Global styling in `src/styles.css`

## Local development (bun)

```bash
bun install
bun run dev
```

Other useful commands:

```bash
bun run lint
bun run lint:fix
bun run format
bun run format:check
bun run build
bun run preview
```

## Content workflow

- Blog posts live in `content/blog/*.mdx` with frontmatter fields:
  `title`, `date`, `summary`, `tags`, `published`.
- Project entries live in `content/projects/*.mdx` with frontmatter fields:
  `title`, `summary`, `year`, `role`, `featured`, `links`.
