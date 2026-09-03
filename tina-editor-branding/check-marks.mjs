#!/usr/bin/env node
/**
 * Verify the version-coupled SVG signatures used by branding.ts.
 *
 * The logo swap identifies Tina's brand marks by the opening path data of the
 * TinaExtendedIcon and TinaIcon components. Those are internal to the tinacms
 * bundle, so an upgrade can move them — and when it does, nothing throws. The
 * branding silently stops applying and Tina's own logo comes back.
 *
 * Run this after every `tinacms` upgrade:
 *
 *   node tina-editor-branding/check-marks.mjs
 *
 * Exits 0 when the configured prefixes still match, 1 when they don't —
 * printing the current values to paste into DEFAULT_MARKS.
 */

import { readFileSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));

/** Walk up from `start` looking for node_modules/tinacms/dist/index.js. */
const findTinaBundle = (start) => {
  let dir = resolve(start);
  for (;;) {
    const candidate = join(dir, "node_modules", "tinacms", "dist", "index.js");
    if (existsSync(candidate)) return candidate;
    const parent = dirname(dir);
    if (parent === dir) return null;
    dir = parent;
  }
};

/** Read the expected prefixes out of branding.ts so there is one source of truth. */
const readConfiguredMarks = () => {
  const file = join(HERE, "branding.ts");
  if (!existsSync(file)) return null;
  const src = readFileSync(file, "utf8");
  const grab = (key) =>
    src.match(new RegExp(`${key}:\\s*"([^"]+)"`))?.[1] ?? null;
  const wordmark = grab("wordmarkPathPrefix");
  const icon = grab("iconPathPrefix");
  return wordmark && icon
    ? { wordmarkPathPrefix: wordmark, iconPathPrefix: icon }
    : null;
};

/** Pull the first `d: "..."` that follows a component declaration. */
const firstPathData = (src, componentName) => {
  const at = src.indexOf(`const ${componentName} =`);
  if (at < 0) return null;
  const m = src.slice(at, at + 4000).match(/\bd:\s*"([^"]+)"/);
  return m ? m[1] : null;
};

const bundle = findTinaBundle(process.cwd()) ?? findTinaBundle(HERE);
if (!bundle) {
  console.error(
    "✗ Could not find node_modules/tinacms/dist/index.js.\n" +
      "  Run this from inside a project with tinacms installed."
  );
  process.exit(1);
}

let version = "unknown";
try {
  const pkg = join(dirname(dirname(bundle)), "package.json");
  version = JSON.parse(readFileSync(pkg, "utf8")).version;
} catch {
  /* version is cosmetic */
}

const src = readFileSync(bundle, "utf8");

const actual = {
  wordmarkPathPrefix: firstPathData(src, "TinaExtendedIcon"),
  iconPathPrefix: firstPathData(src, "TinaIcon"),
};

const expected = readConfiguredMarks() ?? {
  wordmarkPathPrefix: "M115.685 110.921",
  iconPathPrefix: "M18.6466 14.5553",
};

console.log(`tinacms ${version}`);
console.log(`bundle  ${bundle}\n`);

const rows = [
  ["TinaExtendedIcon (wordmark)", "wordmarkPathPrefix"],
  ["TinaIcon (square mark)", "iconPathPrefix"],
];

let failed = false;

for (const [label, key] of rows) {
  const want = expected[key];
  const got = actual[key];

  if (got === null) {
    console.log(`✗ ${label}`);
    console.log(`    component not found in the bundle — Tina may have renamed it`);
    failed = true;
    continue;
  }
  if (got.startsWith(want)) {
    console.log(`✓ ${label}`);
    console.log(`    "${want}" still matches`);
    continue;
  }
  console.log(`✗ ${label}`);
  console.log(`    configured: "${want}"`);
  console.log(`    actual:     "${got.slice(0, 40)}"`);
  failed = true;
}

if (failed) {
  console.log(
    "\nThe branding will silently stop applying. Update DEFAULT_MARKS in\n" +
      "branding.ts with the actual values above, then re-run this check.\n\n" +
      "Use the leading coordinate pair only — enough to be unique, short\n" +
      "enough to survive cosmetic path rewrites."
  );
  process.exit(1);
}

console.log("\nBoth signatures match. The logo swap will apply.");
