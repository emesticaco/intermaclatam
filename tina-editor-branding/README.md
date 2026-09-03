# TinaCMS editor branding

Rebrands the TinaCMS `/admin` editor so clients see your agency's panel rather than TinaCMS. Drop-in: copy this folder into any TinaCMS project, add two lines to `tina/config.tsx`, done.

Built for and verified against **tinacms 3.9.1, 3.10.0 and 3.12.1** — including a clean-room install onto a stock `create-tina-app` Next.js starter.

---

## What it changes

| # | Before | After |
|---|---|---|
| 1 | Tina's "llama + tinacms" logotype in the slide-out nav | your wordmark |
| 2 | — | short product label beside the wordmark, e.g. "WebPanel" |
| 3 | Tina's llama mark in the collapsed toolbar | your square mark |
| 4 | Browser tab: `TinaCMS` + Tina's hashed favicon | your title + your favicon |
| 5 | Sidebar footer: `TinaCMS v3.12.1` | `Your Panel v3.12.1` |

Plus: removes the **CLOUD** section ("Project Config", "User Management", "Support") from the sidebar nav. All three deep-link into app.tina.io — *your* account — which is not somewhere a client's editor should be sent.

## Why it's a DOM patch

TinaCMS exposes no supported API for any of the branding. It is applied as a client-side patch driven by a `MutationObserver`, installed from `cmsCallback`. **Nothing in the `tinacms` package is forked or patched**, so upgrades stay routine.

`hideCloudMenu` is the exception — that one uses Tina's supported plugin manager and touches no DOM.

Everything runs only in the browser and only on `/admin`.

---

## Install on a fresh Next.js starter

**1. Scaffold** (skip if you have a project already):

```bash
npx create-tina-app@latest      # choose "Next.js Starter"
cd <your-project>
```

**2. Copy this folder** to the project root:

```bash
cp -r /path/to/tina-editor-branding ./tina-editor-branding
```

**3. Put your brand assets in `public/brand/`:**

```bash
mkdir -p public/brand
cp tina-editor-branding/assets/*.svg public/brand/
```

The bundled assets are Emestica's — replace them with the client's. See [Asset requirements](#asset-requirements).

**4. Wire it into `tina/config.tsx`.** Add the import, then add `cmsCallback` as the first key of the existing `defineConfig` call. In the stock starter that looks like this — the two additions are marked:

```ts
import { defineConfig } from "tinacms";
import {                                              // ← add
  installEditorBranding,                              // ← add
  hideCloudMenu,                                      // ← add
} from "../tina-editor-branding/branding";            // ← add
import nextConfig from '../next.config'

import Post from "./collection/post";
// ...the starter's other collection imports

const config = defineConfig({
  cmsCallback: (cms) => {                             // ← add
    installEditorBranding({                           // ← add
      wordmarkSrc: "/brand/tina-sidebar-logo.svg",    // ← add
      iconSrc: "/brand/favicon.svg",                  // ← add
      title: "Emestica WebPanel",                     // ← add
      brandText: "WebPanel",                          // ← add
    });                                               // ← add
    hideCloudMenu(cms);                               // ← add
    return cms;                                       // ← add
  },                                                  // ← add

  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID!,
  // ...the rest of your existing config
});

export default config;
```

`cmsCallback` must return `cms`.

The starter maps `@/*` to the project root, so `@/tina-editor-branding/branding` also resolves. The relative path is used here because it works in projects without that alias.

**5. Verify the version-coupled signatures:**

```bash
node tina-editor-branding/check-marks.mjs
```

**6. Run it:**

```bash
pnpm dev     # then open /admin
```

---

## Options

| Option | Required | Default | Purpose |
|---|---|---|---|
| `wordmarkSrc` | yes | — | Wide lockup for Tina's logotype slot |
| `iconSrc` | yes | — | Square mark for Tina's llama icon slots |
| `title` | yes | — | Browser tab title, and the replacement for "TinaCMS" in the version line |
| `brandText` | no | none | Short label beside the wordmark. Omit to append nothing |
| `faviconSrc` | no | `iconSrc` | Tab favicon |
| `wordmarkHeight` | no | `"1.5rem"` | Wordmark slot height |
| `wordmarkMaxWidth` | no | `"60%"` | Caps wordmark width so it clears the nav's close button |
| `tinaLabel` | no | `"TinaCMS"` | The product name Tina prints in its version line |
| `marks` | no | `DEFAULT_MARKS` | Override when a tinacms upgrade moves the brand path data |

`installEditorBranding` is safe to call more than once — Tina can invoke `cmsCallback` again after a login or a branch switch. Only the first call does anything.

## Asset requirements

**Wordmark** (`wordmarkSrc`) — a wide horizontal lockup. Emestica's is 302×51 (5.9:1). It sits in a slot roughly 272 px wide that also has to fit `brandText` and the nav's close button, hence the `wordmarkMaxWidth` cap. Don't use a stacked or square logo here.

**Square mark** (`iconSrc`) — rendered at roughly 20–32 px, so it has to read at small sizes. This is also the default favicon.

Both should be SVG. Intrinsic dimensions don't matter: the code measures the slot Tina laid out and pins the replacement to it. That is deliberate — see [Troubleshooting](#troubleshooting).

---

## Version coupling

Tina draws its brand as vector paths, not text — the sidebar header span has an empty `textContent` — so the marks can only be identified by the drawing itself. `branding.ts` matches on the opening path data of two internal components:

```
TinaExtendedIcon  →  "M115.685 110.921"   (the llama + wordmark logotype)
TinaIcon          →  "M18.6466 14.5553"   (the llama mark)
```

These are internal to the `tinacms` bundle. **A release that redraws them makes the branding silently stop applying** — nothing throws, Tina's own logo just comes back.

That failure direction is deliberate. Matching too loosely rebrands Tina's UI icons, which costs the editor real usability; matching too strictly only costs some branding.

**After every `tinacms` upgrade:**

```bash
node tina-editor-branding/check-marks.mjs
```

It reads the installed bundle, extracts the current path data for both components, and exits non-zero with the new values if they've moved. Paste them into `DEFAULT_MARKS` in `branding.ts` (or pass `marks` per-project) and re-run.

Use the **leading coordinate pair only** — long enough to be unique, short enough to survive cosmetic path rewrites.

---

## Verification checklist

After installing, open `/admin` and confirm:

- [ ] Slide-out nav shows your wordmark, with `brandText` beside it and not overlapping the close button
- [ ] Collapsed toolbar shows your square mark
- [ ] Browser tab shows your title and your favicon
- [ ] Sidebar footer reads `Your Panel v3.12.1`, not `TinaCMS v3.12.1`
- [ ] **No CLOUD section** in the nav
- [ ] **Form control icons are NOT rebranded** — open any document, expand a list field, and check the trash, drag-handle and add-item icons are still Tina's own

That last one is the regression that matters. See below.

---

## Troubleshooting

### Every icon in the form editor turned into my logo

You matched on `viewBox` instead of path data. Tina lays its UI icons out on the same 32×32 grid as its llama, so `viewBox="0 0 32 32"` matches the trash, drag-handle and add-item icons just as well as the brand mark. On one global-settings form that meant 18 elements matched where 2 were wanted, 8 of them inside buttons — leaving the editor's controls unreadable.

Match on the opening `d` of the SVG's first `<path>`. No UI icon shares it.

### The mark renders at the wrong size, or three marks stack in the corner

An unsized `<img>` falls back to the asset's intrinsic dimensions. A 50×50 favicon dropped into a 20×26 slot renders as overlapping marks.

`replaceMark` measures the SVG's bounding box *before* hiding it and pins the replacement to that box, so any asset lands in the slot Tina laid out. If you're seeing this, you've probably bypassed `replaceMark`.

### The branding flashes on and then disappears

Something is re-rendering after the observer disconnected, or `cmsCallback` ran before the DOM was parsed. `branding.ts` handles both — a `readyState` gate for the second, and a `MutationObserver` on `document.body` for the first. Every pass is idempotent, guarded by the `data-tina-branded` / `data-tina-brand-text` flags and by value checks, so observing its own mutations doesn't loop.

### Nothing happened at all

1. Run `node tina-editor-branding/check-marks.mjs`.
2. Confirm `cmsCallback` returns `cms`.
3. Confirm the asset paths resolve — open `/brand/tina-sidebar-logo.svg` directly in the browser. They are served from `public/`, so the leading `/` matters.

---

## Known limitation

Tina has a further 20×26 llama used in transient loading and edit-mode states. It's rendered inline and could not be pinned to a stable signature, so it is deliberately left unbranded rather than matched by `viewBox` again — a llama flashing during a load costs far less than rebranding the controls the editor needs.

## Files

```
tina-editor-branding/
  README.md          this file
  branding.ts        installEditorBranding() + hideCloudMenu()
  check-marks.mjs    verifies the version-coupled signatures
  assets/
    favicon.svg              square Emestica mark
    tina-sidebar-logo.svg    wide Emestica wordmark
```

`branding.ts` imports `TinaCMS` as a type from `tinacms` and otherwise has no dependencies.
