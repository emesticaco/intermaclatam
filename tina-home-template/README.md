# Home page template for TinaCMS

A complete, editable landing page for a TinaCMS + Next.js App Router project: the `home` collection, the five components that render it, its content, brand tokens, typography and images.

Drop it into another Tina project and you get the Intermac LATAM home page working end to end, then rebrand it.

**Scope: the `home` collection only.** Header and footer live in a separate `global` collection and are *not* included — see [What's not included](#whats-not-included).

---

## What it renders

| Section | Component | Content |
|---|---|---|
| Hero, with the quoting card overlaid | `HeroSection` + `QuotingTool` | `hero`, `quoting` |
| "Empresas que confían en nosotros" logo strip | `PartnerLogos` | `partners` |
| "Por qué elegirnos" bento grid | `FeaturesSection` | `features` |
| FAQ accordion | `FAQSection` | `faq` |

Every section is click-to-edit in the Tina sidebar via `tinaField()`, including individual list items.

## What's in the box

```
tina-home-template/
  README.md
  tina/home-collection.ts       the collection schema (267 lines)
  components/
    HomeSections.tsx            client boundary — calls useTina, renders the four sections
    HeroSection.tsx
    QuotingTool.tsx             5 inline SVG icons + two full layouts
    PartnerLogos.tsx
    FeaturesSection.tsx         position-keyed bento styling
    FAQSection.tsx
  lib/media.tsx                 next/image wrapper — required, see below
  types/home.ts                 hand-written content types
  content/home.json             the Spanish copy
  styles/tokens.css             fonts + brand custom properties
  public/uploads/assets/img/    6 images referenced by the content
```

Requires `tinacms`, `next`, `react`, and Tailwind v4. No other dependencies.

---

## Install

**1. Copy the pieces into your project.** Paths assume a `src/`-less layout (the Tina Next.js starter); adjust if yours uses `src/`.

```bash
cp -r tina-home-template/components/*        components/
cp    tina-home-template/lib/media.tsx       lib/
cp    tina-home-template/types/home.ts       types/
cp    tina-home-template/tina/home-collection.ts  tina/collection/
cp    tina-home-template/content/home.json   content/pages/
cp -r tina-home-template/public/uploads      public/
```

The components import each other relatively (`../lib/media`, `../types/home`), so they work without any path alias as long as `components/`, `lib/` and `types/` stay siblings.

**2. Register the collection** in `tina/config.tsx`:

```ts
import Home from "./collection/home-collection";

const config = defineConfig({
  // ...
  schema: {
    collections: [Home /* , your other collections */],
  },
});
```

**3. Append the styles** to your global stylesheet:

```bash
cat tina-home-template/styles/tokens.css >> styles.css
```

`tokens.css` does not include `@import "tailwindcss"` — your scaffold already has it.

**3b. Load the fonts** in `app/layout.tsx`, inside `<head>`:

```tsx
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
<link
  href="https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&family=Montserrat:wght@300;400;500;600;700&display=swap"
  rel="stylesheet"
/>
```

The fonts are deliberately **not** loaded by `@import` inside `tokens.css`. CSS requires `@import` to precede every other rule, so appending the file to an existing stylesheet would put the import in an illegal position and the build fails outright with `@import rules must precede all rules`. A `<link>` is order-independent.

**4. Wire the page.** In `app/page.tsx`:

```tsx
import client from "../tina/__generated__/client";
import HomeSections from "@/components/HomeSections";
import type { HomeContent } from "@/types/home";

export default async function Home() {
  const home = await client.queries.home({ relativePath: "home.json" });

  return (
    <main>
      <HomeSections
        home={{
          query: home.query,
          variables: home.variables,
          data: home.data as { home: HomeContent },
        }}
      />
    </main>
  );
}
```

**Pass the whole `{query, variables, data}` envelope, not just `data`.** That trio is exactly what `useTina` needs; drop `query` or `variables` and the sidebar stops live-updating.

**5. Allow the media host** in `next.config.ts`, if you use the Tina Cloud media store:

```ts
images: {
  remotePatterns: [{ protocol: "https", hostname: "assets.tina.io" }],
},
```

**6. Run it:**

```bash
pnpm dev     # site on /, editor on /admin
```

---

## Rebranding

### Colours

The custom properties in `tokens.css` are **not** wired into Tailwind's theme — they sit in plain `:root`, so no `bg-primary` utility is generated. The components hardcode hex literals in arbitrary-value classes instead (`bg-[#0071b9]`, `text-[#005892]`, …).

So rebranding is a find-and-replace across `components/`. The full palette, by frequency:

| Hex | Uses | Role |
|---|---|---|
| `#717882` | 13 | muted body text |
| `#005892` | 11 | deep brand blue — headings, mobile card titles |
| `#404751` | 9 | body text |
| `#181c20` | 9 | near-black headings |
| `#c0c7d2` | 7 | borders |
| `#6b7280` | 7 | placeholder text |
| `#f8f9ff` | 4 | page background |
| `#00516f` | 3 | text on the cyan card |
| `#f2f2f2`, `#e9f1ff` | 2 each | light fills |
| `#54c7ff` | 2 | cyan accent card |
| `#0071b9` | 1 | primary blue |
| `#f1f3fa`, `#eceef4`, `#e6e8ef`, `#d0e4ff`, `#3db9f5`, `#29abe2`, `#1a9bd0`, `#001b2c` | 1 each | one-off fills and accents |

Wiring these into a Tailwind v4 `@theme` block first, then swapping the components to semantic utilities, is the better long-term move — but it's a behavioural change, so it isn't done here.

### Typography

Ubuntu for headings, Montserrat for body, loaded by CSS `@import` from Google Fonts. The `body`/`h1–h6` rules in `tokens.css` set the cascade, but the components *also* name the families inline — `font-['Montserrat']` 25 times, `font-['Ubuntu']` 12 times. Change the fonts in `tokens.css` **and** find-and-replace those 37 occurrences, or the components will keep asking for the old families.

Switching to `next/font` means the same 37 edits, replacing the literals with the CSS variable `next/font` generates.

### Images

Six images in `public/uploads/assets/img/`, referenced by path from `content/home.json`:

| Field | File |
|---|---|
| `hero.background` | `intermac-seguro-viaje-familiar-desktop.jpg` |
| `hero.backgroundMobile` | `intermac-assistance-senior-couple-hiking-travel-assistance-mobile.webp` |
| `features.items[0].icon` / `.image` | `iconos/red-medica-icon.svg` / `intermac-hospital.jpg` |
| `features.items[1].icon` / `.image` | `iconos/atencion-icon.svg` / `intermac-atencion-multi-idioma.jpeg` |

Replace the files or re-upload through the Tina media manager. Values are stored as plain root-relative paths, which is what keeps a later swap to a different media store a config-only change.

**The other image fields are deliberately empty strings** — all five `partners.logos[].src` and the icons on features 3–5. That is not an oversight; the original assets were lost. Which brings us to:

### `lib/media.tsx` is required

`Media` renders a `next/image` **only when a source is actually set**, and returns `null` otherwise. `next/image` throws on an empty `src`, and this content has 11 empty image fields, so swapping `Media` for a bare `next/image` crashes the page.

It also defaults `fill={true}`, so **every call site must supply its own positioned container**. That's why you see `relative h-11 w-36` / `absolute inset-0` wrappers throughout — and the wrapper carries the `data-tina-field`, so the editing hotspot survives the image being absent.

---

## How the layout works

### Two layouts, not one responsive one

Hero, Features, FAQ and QuotingTool each ship **complete desktop and mobile markup** as `hidden md:block` / `md:hidden` siblings, rather than one fluid layout. That's roughly half the line count, and it pairs one-to-one with the schema: fields labelled *(escritorio)* and *(móvil)* — `title`/`titleMobile`, `heading`/`headingMobile`, `items`/`itemsMobile`.

The point is editorial, not visual: an editor can write genuinely shorter mobile copy instead of relying on truncation. If you collapse the markup to a single responsive layout, drop the paired fields from the schema too or you'll leave editors with fields that do nothing.

### The features bento is styled by position

`FeaturesSection` keys card styling off array index via `DESKTOP_SLOTS` (5 entries) and `MOBILE_SLOTS` (4). Slot 0 is a wide two-column card with an image; slot 1 is the deep blue card; slot 4 is grey. Editors can reword and reorder freely — **a sixth card falls back to the plain white style**, it does not break.

If you want a different number of cards, edit the slot tables, not the components' JSX.

### FAQ `mobileOnly`

`FAQSection` splits `items` into two lists. `mobileOnly: true` hides an entry on desktop rather than dropping it, so mobile can carry extra questions without a second collection.

---

## What's not included

- **Header and footer.** They belong to a `global` collection (site logo, nav links, CTA, social) that this template deliberately leaves out. `HomeSections` renders a fragment — wrap it in your own layout.
- **The quoting logic.** `QuotingTool` is presentation only; the schema comment says so explicitly ("La lógica de cotización vive en el código"). Every field is a label or placeholder. Wire it to a real quoting API yourself.
- **The editor branding.** That's a separate package — see `tina-editor-branding/`.

## Gotchas

- **Field names are the contract.** The schema, `types/home.ts`, `content/home.json` and the components all agree on them. Translate the *labels* freely; renaming a *field* means changing all four.
- **`match: { include: "home" }`** on the collection scopes it to a single file in `content/pages`, and `ui.router: () => "/"` is what makes Tina's contextual "edit this page" link work. Keep both.
- **`allowedActions: { create: false, delete: false }`** stops an editor deleting the only page the site has.
- The components are a **snapshot**, not a shared library. If you improve them here, they won't flow back to the project they came from.
