# Dependency Security Upgrade Design

## Goal

Update all direct Bun dependencies to current releases, eliminate actionable `bun audit` findings where the dependency graph permits, and adapt application code/configuration for breaking changes introduced by the upgrades.

## Scope

- Preserve the existing user changes in `.gitignore`, `package.json`, `bun.lock`, and `content/templates/`.
- Upgrade direct dependencies, including major versions, using Bun.
- Resolve vulnerable transitive packages through upstream upgrades first and narrowly scoped `overrides` only when required and compatible.
- Change application code only when a dependency upgrade causes a verified typecheck, build, test, or runtime compatibility failure.
- Do not perform unrelated refactors or content changes.

## Dependency strategy

1. Reconcile `package.json` with the latest compatible releases and regenerate `bun.lock` using Bun.
2. Inspect every remaining audit advisory and its dependency path.
3. Prefer upgrading the vulnerable parent package.
4. If an advisory remains because a parent has an overly broad dependency range, add an exact minimum-safe `overrides` entry and verify the resulting install, build, and tests.
5. Avoid overrides that violate peer dependency contracts or force incompatible major versions.

## Compatibility strategy

Validation failures will be fixed at the narrowest affected boundary. Likely compatibility surfaces include Vite, TypeScript, React, TanStack Start/Router, Netlify’s TanStack plugin, OpenAI, Vitest, and browser/test tooling. Each behavior-changing fix will be covered by a focused regression test before implementation where practical.

## Verification

Run, in order as applicable:

- `bun audit`
- `bun run lint`
- `bun run format:check`
- `bun run build`
- `bun run test:run`
- `bun run test:e2e`
- `bun run validate`
- a final `bun audit`

The result should have no actionable audit findings and all available project checks passing. Any advisory that cannot be removed without an upstream release will be reported with its package path and rationale.

## Constraints

- Use Bun rather than npm.
- Do not overwrite unrelated uncommitted work.
- Do not add secrets or AI attribution.
