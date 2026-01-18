# gnazar.io

A modern personal website built with Next.js App Router, MDX, and a lightweight
design system.

[![Netlify Status](https://api.netlify.com/api/v1/badges/1c90c9c9-3db9-47ac-9c24-a9ee73daa365/deploy-status)](https://app.netlify.com/sites/gnazario/deploys)

## Stack

- Next.js App Router + TypeScript
- MDX content in `content/blog` and `content/projects`
- Global styling in `app/globals.css`

## Local development (bun)

```bash
bun install
bun run dev
```

Other useful commands:

```bash
bun run lint
bun run build
bun run start
```

## Content workflow

- Blog posts live in `content/blog/*.mdx` with frontmatter fields:
  `title`, `date`, `summary`, `tags`, `published`.
- Project entries live in `content/projects/*.mdx` with frontmatter fields:
  `title`, `summary`, `year`, `role`, `featured`, `links`.
