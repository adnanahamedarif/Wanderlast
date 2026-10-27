<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Commands

- `npm run dev` / `npm run build` / `npm run start` / `npm run lint`. **npm only** — `package-lock.json`, no workspace/monorepo.
- There is no test runner and no `typecheck` script. `next build` runs TypeScript; for a fast check use `npx tsc --noEmit`.
- Verify changes with: `npx tsc --noEmit && npm run lint && npm run build` (all pass on a clean tree).

## Stack quirks (Next.js 16.4.3)

- Bundled docs for this version: `node_modules/next/dist/docs/` — trust them over training data (see block above).
- `cacheComponents: true` is enabled in `next.config.ts`: Cache Components mode **removes** route segment configs (`dynamic`, `revalidate`, `fetchCache`) and changes data-fetching/caching APIs. Read the bundled caching docs before touching either.
- React Compiler is on (`reactCompiler: true` + `babel-plugin-react-compiler`): components must be render-pure — no side effects or prop mutation in render.
- Tailwind v4 with **no config file**: theme tokens live in `src/app/globals.css` (`@theme inline` + CSS variables). CSS is wired through the `@tailwindcss/turbopack` loader rule in `next.config.ts`; don't add a `tailwind.config.*`.

## shadcn / UI

- `components.json`: style `base-nova`, RSC enabled. Primitives are **Base UI** (`@base-ui/react`), *not* Radix — don't import `@radix-ui/*`.
- Add components with `npx shadcn add <name>` (aliases map to `@/components`, `@/lib/utils`, `@/components/ui`).
- `cn` comes from the `cn` npm package; `src/lib/utils.ts` only re-exports it, and existing components import `import { cn } from "cn"` directly. Follow that pattern.

## Layout of the code

- App Router in `src/app/` (single route `/`), components in `src/components/`, helpers in `src/lib/`. Path alias `@/*` → `./src/*`.
- Root layout uses the generated global type `LayoutProps<"/">` — don't hand-write `children` prop types in layouts/pages.
- Static images live in `public/assets/`; global styles/fonts (Josefin Sans via `next/font`) are set up in `src/app/layout.tsx`.
