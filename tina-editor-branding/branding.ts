/* -------------------------------------------------------------------------
 * Portable TinaCMS editor branding
 *
 * Rebrands the TinaCMS `/admin` editor: sidebar logotype, the icon marks, the
 * version line, and the browser tab title + favicon. Also removes the CLOUD
 * section from the sidebar nav.
 *
 * TinaCMS exposes no supported API for any of the branding, so it is applied
 * as a client-side DOM patch driven by a MutationObserver. Nothing in the
 * `tinacms` package is forked or patched. `hideCloudMenu` is the exception —
 * that one uses the supported plugin manager.
 *
 * Entry point is `cmsCallback` in your Tina config, which Tina invokes on
 * boot. Everything here runs only in the browser and only on /admin.
 *
 * Fragile by nature, in two different ways:
 *   - the logo swap keys off the path data of Tina's own brand SVGs;
 *   - the version line keys off the literal string "TinaCMS v".
 * A release that redraws the marks or rewords the sidebar will silently stop
 * the branding from applying — nothing throws, the Tina defaults just come
 * back. Run `node check-marks.mjs` after every tinacms upgrade.
 *
 * Failing that way round is deliberate: matching too loosely rebrands Tina's
 * UI icons, which costs the editor real usability, whereas matching too
 * strictly only costs some branding.
 *
 * See README.md for installation and troubleshooting.
 * ---------------------------------------------------------------------- */

import type { TinaCMS } from "tinacms";

/*
 * Tina renders its brand as vector paths, not text — the sidebar header span
 * has an empty textContent — so a mark can only be identified by the drawing
 * itself.
 *
 * It has to be the path data specifically, NOT the viewBox: Tina lays its UI
 * icons out on the same 32x32 grid as its llama, so `viewBox="0 0 32 32"`
 * matches the trash, drag-handle and add-item icons just as well as the brand
 * mark, and keying off it rebrands every icon in the form editor.
 *
 * These prefixes are the opening path of the two icon components in
 * tinacms/dist/index.js:
 *   TinaExtendedIcon — full "llama + tinacms" logotype, slide-out nav header
 *   TinaIcon         — llama mark, collapsed top toolbar
 *
 * Verified against tinacms 3.9.1, 3.10.0 and 3.12.1.
 */
export const DEFAULT_MARKS = {
  wordmarkPathPrefix: "M115.685 110.921",
  iconPathPrefix: "M18.6466 14.5553",
} as const;

export type EditorBrandingOptions = {
  /** Wide horizontal lockup, used for Tina's full logotype slot. */
  wordmarkSrc: string;
  /** Square mark, used for Tina's llama icon slots. */
  iconSrc: string;
  /** Browser tab title, and the replacement for "TinaCMS" in the version line. */
  title: string;
  /**
   * Short label appended beside the wordmark, e.g. "WebPanel". Tina's own
   * logotype reads "tinacms"; most brand wordmarks carry no product name, so
   * this fills that gap. Omit to append nothing.
   */
  brandText?: string;
  /** Tab favicon. Defaults to `iconSrc`. */
  faviconSrc?: string;
  /**
   * Sizing for the wordmark slot. Keep it generous enough to stay legible and
   * tight enough that logo + brandText clear the nav's close button — Tina's
   * header span is ~272px wide.
   */
  wordmarkHeight?: string;
  wordmarkMaxWidth?: string;
  /** The product name Tina prints in its version line. */
  tinaLabel?: string;
  /** Override when a tinacms upgrade moves the brand path data. */
  marks?: { wordmarkPathPrefix: string; iconPathPrefix: string };
};

type TinaMark = "wordmark" | "icon";

let brandingInstalled = false;

/**
 * Install the editor branding. Safe to call more than once — Tina can invoke
 * `cmsCallback` again after a login or branch switch — only the first call
 * does anything.
 */
export const installEditorBranding = (options: EditorBrandingOptions) => {
  if (brandingInstalled || typeof window === "undefined") {
    return;
  }
  brandingInstalled = true;

  const {
    wordmarkSrc,
    iconSrc,
    title,
    brandText,
    faviconSrc = iconSrc,
    wordmarkHeight = "1.5rem",
    wordmarkMaxWidth = "60%",
    tinaLabel = "TinaCMS",
    marks = DEFAULT_MARKS,
  } = options;

  const versionLabelPrefix = `${tinaLabel} v`;
  const logoAlt = `${title} logo`;

  /** Identify a Tina brand mark by its drawing, or null for anything else. */
  const classifyMark = (svg: SVGElement): TinaMark | null => {
    const d = svg.querySelector("path")?.getAttribute("d") ?? "";
    if (d.startsWith(marks.wordmarkPathPrefix)) return "wordmark";
    if (d.startsWith(marks.iconPathPrefix)) return "icon";
    return null;
  };

  /**
   * "TinaCMS v3.12.1" -> "<title> v3.12.1".
   *
   * Rewrites the text node itself rather than the element, so it can't
   * clobber an ancestor that happens to share the same textContent. Runs
   * before the logo swap: once the version line no longer contains
   * "TinaCMS", the logo matcher can't mistake it for the sidebar header.
   */
  const relabelVersion = () => {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const targets: Text[] = [];

    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      if (node.nodeValue?.includes(versionLabelPrefix)) {
        targets.push(node as Text);
      }
    }

    targets.forEach((textNode) => {
      textNode.nodeValue =
        textNode.nodeValue?.split(versionLabelPrefix).join(`${title} v`) ?? null;
    });
  };

  /**
   * Hide one Tina brand SVG and drop an <img> in its place.
   *
   * The SVG is hidden rather than removed so React's reconciliation is left
   * alone, and the replacement inherits the SVG's own class list — Tina sizes
   * and spaces these marks with utility classes (`h-8 w-auto`, `mr-2`, …), so
   * reusing them keeps the swap aligned with whatever layout Tina intended.
   *
   * Returns null when the mark was already swapped on an earlier pass, which
   * is what keeps the MutationObserver from stacking images.
   */
  const replaceMark = (svg: SVGElement, src: string, alt: string) => {
    if (svg.dataset.tinaBranded === "true") return null;

    // Measure before hiding: the replacement has to occupy the slot Tina laid
    // out, and the incoming asset's own dimensions have nothing to do with it.
    const rect = svg.getBoundingClientRect();

    svg.dataset.tinaBranded = "true";
    svg.style.display = "none";

    const img = document.createElement("img");
    img.src = src;
    img.alt = alt;

    const className = svg.getAttribute("class");
    if (className) img.className = className;

    // Not every mark carries sizing classes, and an unsized <img> falls back
    // to the asset's intrinsic size — which is how a 50x50 favicon once
    // rendered into a 20x26 slot. Pinning the measured box keeps any future
    // asset, whatever its dimensions, inside the same space.
    if (rect.width > 0 && rect.height > 0) {
      img.style.width = `${rect.width}px`;
      img.style.height = `${rect.height}px`;
      img.style.objectFit = "contain";
    }

    img.style.display = "inline-block";
    img.style.verticalAlign = "middle";

    svg.insertAdjacentElement("afterend", img);
    return img;
  };

  /** Swap every Tina brand mark for the configured equivalent. */
  const applyCustomLogo = () => {
    const svgs = Array.from(document.querySelectorAll<SVGElement>("svg"));

    svgs.forEach((svg) => {
      if (svg.dataset.tinaBranded === "true") return;
      const kind = classifyMark(svg);
      if (!kind) return;

      if (kind === "wordmark") {
        const img = replaceMark(svg, wordmarkSrc, logoAlt);
        if (!img) return;

        // Tina's logotype stacks a llama against the wordmark, so its `h-8`
        // buys a lot of height for little width. A plain wordmark at the same
        // height is far wider and pushes the label into the close button, so
        // this slot is sized explicitly rather than inheriting Tina's classes.
        // Capping width keeps that true for whatever asset is dropped in next.
        img.style.height = wordmarkHeight;
        img.style.width = "auto";
        img.style.maxWidth = wordmarkMaxWidth;

        if (!brandText) return;

        const host = svg.parentElement;
        if (host && !host.querySelector("[data-tina-brand-text]")) {
          const label = document.createElement("span");
          label.textContent = brandText;
          label.dataset.tinaBrandText = "true";
          label.style.marginLeft = "0.25rem";
          label.style.fontWeight = "600";
          label.style.whiteSpace = "nowrap";
          host.appendChild(label);
        }
        return;
      }

      replaceMark(svg, iconSrc, logoAlt);
    });
  };

  /**
   * public/admin/index.html is generated by the Tina CLI with a hashed
   * favicon filename and <title>TinaCMS</title>, and is gitignored — so both
   * are repointed at runtime instead of via a post-build step.
   */
  const applyDocumentBranding = () => {
    if (document.title !== title) {
      document.title = title;
    }

    if (!document.head) return;

    let icon = document.head.querySelector<HTMLLinkElement>('link[rel="icon"]');
    if (!icon) {
      icon = document.createElement("link");
      icon.rel = "icon";
      document.head.appendChild(icon);
    }
    if (icon.getAttribute("href") !== faviconSrc) {
      icon.setAttribute("href", faviconSrc);
      icon.setAttribute("type", "image/svg+xml");
    }
  };

  const applyBranding = () => {
    relabelVersion();
    applyCustomLogo();
    applyDocumentBranding();
  };

  const init = () => {
    if (!document.body) return;

    // Tina re-renders the sidebar constantly (navigation, form state, saves),
    // which would wipe a one-shot edit. Every pass is idempotent — guarded by
    // the data-* flags and value checks — so observing our own mutations
    // doesn't loop.
    const observer = new MutationObserver(applyBranding);
    observer.observe(document.body, { childList: true, subtree: true });
    applyBranding();

    const cleanup = () => {
      observer.disconnect();
      window.removeEventListener("beforeunload", cleanup);
    };
    window.addEventListener("beforeunload", cleanup);
  };

  // cmsCallback can fire before the DOM is parsed.
  if (
    document.readyState === "complete" ||
    document.readyState === "interactive"
  ) {
    init();
  } else {
    const onReady = () => {
      init();
      window.removeEventListener("DOMContentLoaded", onReady);
    };
    window.addEventListener("DOMContentLoaded", onReady);
  }
};

/* -------------------------------------------------------------------------
 * Hiding the sidebar's CLOUD section
 *
 * Tina registers "Project Config", "User Management" and "Support" as
 * `cloud-config` plugins whenever the editor talks to Tina Cloud rather than
 * the local filesystem, and renders them under a CLOUD heading in the nav.
 * All three deep-link into app.tina.io — the agency's account — which is not
 * somewhere a client's editor should be sent.
 *
 * Unlike the branding above this one has a supported API, so nothing here
 * touches the DOM: the plugins are removed through the plugin manager and the
 * heading goes with them.
 * ---------------------------------------------------------------------- */

const CLOUD_PLUGIN_TYPE = "cloud-config";

export const hideCloudMenu = (cms: TinaCMS) => {
  const cloudPlugins = cms.plugins.getType(CLOUD_PLUGIN_TYPE);
  const removeAll = () =>
    cloudPlugins.all().forEach((plugin) => cloudPlugins.remove(plugin));

  removeAll();

  // Tina adds these during client setup, which can run again after a login or
  // a branch switch, so a one-shot removal would let them reappear. Removing
  // dispatches `plugin:remove:*` rather than `plugin:add:*`, so subscribing to
  // the add event cannot re-enter.
  cms.events.subscribe(`plugin:add:${CLOUD_PLUGIN_TYPE}`, removeAll);
};
