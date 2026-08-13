# intermaclatam

Intermac LATAM website — B2C. Next.js 16 (App Router) + Tailwind v4, with page
content managed through **TinaCMS Cloud**.

## Setup

```bash
pnpm install
cp .env.example .env      # then fill in the two Tina Cloud values
pnpm dev                  # http://localhost:3000, editor at /admin
```

> **Put credentials in `.env`, not `.env.local`.**
> The TinaCMS CLI only reads `.env` / `.env.tina` — it ignores `.env.local`.
> Next.js reads both, so credentials in `.env.local` make `pnpm dev` look fine
> while `tinacms build` fails with a confusing `401 Unauthorized`.

Values come from [app.tina.io](https://app.tina.io) → your project:

| Variable | Notes |
|---|---|
| `NEXT_PUBLIC_TINA_CLIENT_ID` | Public identifier, safe to expose |
| `TINA_TOKEN` | Read-only content token — **secret** |

`pnpm dev` runs in local mode: content is read from and written to the working
tree, and no Tina Cloud login is required. `pnpm build` talks to Tina Cloud and
needs both variables set, plus the project connected to this repo in the Tina
dashboard.

## Scripts

| Script | Purpose |
|---|---|
| `pnpm dev` | Tina local mode + Next dev. Edits save to disk. |
| `pnpm dev:cloud` | Next dev against Tina Cloud instead of local content. |
| `pnpm build` | `tinacms build` then `next build`. |
| `pnpm lint` | ESLint. |

## Content model

Content lives in git as JSON and is edited at `/admin`. The schema is defined
in `tina/config.ts`.

| Collection | File | Covers |
|---|---|---|
| `global` | `content/global/index.json` | Header nav, CTAs, footer links, social |
| `home` | `content/pages/home.json` | Hero, quoting-tool labels, partners, features, FAQ |

Components under `src/components/` are presentational — they take content as
props. `src/app/page.tsx` fetches server-side and hands off to
`src/components/HomePage.tsx`, which calls `useTina` so the editor gets live
visual editing.

Sections whose copy differs between breakpoints (hero heading, features
heading, FAQ subtitle) expose both variants as separate fields, labelled
*(escritorio)* and *(móvil)*.

## Known issue: images

Every image field starts empty, and that is deliberate. The site was generated
from Figma with images hotlinked to ephemeral `figma.com/api/mcp/asset/…` URLs;
all 20 of them now return 404, and 10 were reused across unrelated slots (the
Facebook icon doubled as the quoting-tool location pin, for example). The
assets need re-sourcing and uploading through the CMS media manager.

Until then, `src/lib/media.tsx` renders nothing instead of calling
`next/image` with an empty `src`, which would throw. Pure UI chrome — the FAQ
chevron and quoting-tool field icons — uses inline SVG stand-ins.

Local uploads go to `public/uploads` (gitignored); production media is stored
by Tina Cloud and served from `assets.tina.io`.

## Roadmap

Self-hosted TinaCMS (Supabase auth, MongoDB data layer, Supabase Storage media)
remains the target; Cloud is the interim. The two differ in roughly five files
— `tina/config.ts` plus a database adapter, backend API route, media store and
auth provider. The schema, content files and component wiring are identical
either way, so the migration is a config swap rather than a rewrite.
