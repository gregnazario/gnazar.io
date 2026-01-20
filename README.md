# gnazar.io

A modern personal website built with TanStack Start, MDX-flavored markdown, and a lightweight
design system.

[![Netlify Status](https://api.netlify.com/api/v1/badges/1c90c9c9-3db9-47ac-9c24-a9ee73daa365/deploy-status)](https://app.netlify.com/sites/gnazario/deploys)

## Stack

- **Framework:** TanStack Start (React Router) + Vite + TypeScript
- **Content:** MDX in `content/blog` and `content/projects`
- **Styling:** Custom CSS in `src/styles.css`
- **Linting/Formatting:** Biome
- **Testing:** Vitest (unit) + Playwright (E2E)
- **Hosting:** Netlify

## Features

| Category | Features |
|----------|----------|
| **PWA** | Installable, offline support, service worker |
| **SEO** | Sitemap, robots.txt, JSON-LD, canonical URLs, meta tags |
| **Social** | Open Graph cards, Twitter cards, generated images |
| **Accessibility** | WCAG compliant, skip links, focus indicators, reduced motion |
| **Performance** | Font preloading, caching headers, optimized assets |
| **Security** | CSP, HSTS, security.txt, all security headers |
| **AI/LLM** | llms.txt for AI assistants |
| **i18n** | hreflang, content-language declarations |
| **CI/CD** | Automated tests, Lighthouse CI, Dependabot |
| **DX** | Pre-commit hooks, lint-staged |

## Local Development

```bash
bun install
bun run dev
```

## Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | Start development server |
| `bun run build` | Build for production |
| `bun run preview` | Preview production build |
| `bun run lint` | Run linter |
| `bun run lint:fix` | Fix lint issues |
| `bun run format` | Format code |
| `bun run format:check` | Check formatting |
| `bun run test` | Run unit tests (watch mode) |
| `bun run test:run` | Run unit tests once |
| `bun run test:coverage` | Run tests with coverage |
| `bun run test:e2e` | Run E2E tests |
| `bun run test:e2e:ui` | Run E2E tests with UI |
| `bun run generate:icons` | Generate PWA icons |
| `bun run generate:og` | Generate OG images |
| `bun run generate:assets` | Generate all assets |

## Content

### Blog Posts

Located in `content/blog/*.mdx` with frontmatter:

```yaml
title: Post Title
date: 2026-01-20
summary: A brief summary
tags: [tag1, tag2]
published: true
```

### Projects

Located in `content/projects/*.mdx` with frontmatter:

```yaml
title: Project Title
summary: A brief summary
year: 2026
role: Your role
featured: true
links:
  - label: GitHub
    url: https://github.com/...
```

## Project Structure

```
├── content/
│   ├── blog/           # Blog posts (MDX)
│   └── projects/       # Project entries (MDX)
├── e2e/                # Playwright E2E tests
├── public/
│   ├── .well-known/    # security.txt
│   ├── icons/          # PWA icons
│   └── ...             # Static assets
├── scripts/            # Build scripts
├── src/
│   ├── components/     # React components
│   ├── lib/            # Utilities
│   ├── routes/         # TanStack file-based routes
│   ├── server/         # Server-side code
│   └── test/           # Test setup
└── ...
```

## Special Files

| File | Purpose |
|------|---------|
| `/robots.txt` | Search engine directives |
| `/sitemap.xml` | Dynamic sitemap |
| `/rss.xml` | Blog RSS feed |
| `/llms.txt` | AI assistant context |
| `/manifest.json` | PWA manifest |
| `/.well-known/security.txt` | Security contact info |
| `/humans.txt` | Site credits |

## License

MIT
