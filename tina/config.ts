import { defineConfig } from "tinacms";

// Vercel exposes the deployed branch; fall back to main for local work.
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

/* -------------------------------------------------------------------------
 * Editor branding
 *
 * TinaCMS exposes no supported API for replacing the sidebar logo, the
 * version line, the tab title or the favicon, so these are applied as a
 * client-side DOM patch driven by a MutationObserver. Nothing in the
 * `tinacms` package is forked or patched.
 *
 * Entry point is `cmsCallback` below, which Tina invokes once on boot.
 * Everything here runs only in the browser and only on /admin.
 *
 * Fragile by nature, in two different ways:
 *   - the logo swap keys off the `viewBox` of Tina's own brand SVGs;
 *   - the version line keys off the literal string "TinaCMS v".
 * A release that redraws the marks or rewords the sidebar will silently stop
 * the branding from applying — nothing throws, the Tina defaults just come
 * back. Re-check after every tinacms / @tinacms/cli upgrade.
 * ---------------------------------------------------------------------- */

/** Wide "Emestica" wordmark, used for Tina's full logotype slot. */
const SIDEBAR_LOGO_SRC = "/brand/tina-sidebar-logo.svg";
/** Square mark, used for Tina's llama icon slots and as the favicon. */
const BRAND_ICON_SRC = "/brand/favicon.svg";
const FAVICON_SRC = BRAND_ICON_SRC;
/** Sits next to the logo, which already carries the "Emestica" wordmark. */
const BRAND_TEXT = "WebPanel";
/** Tab title, and the replacement for "TinaCMS" in the version line. */
const BRAND_TITLE = "Emestica WebPanel";
const TINA_LABEL = "TinaCMS";
const VERSION_LABEL_PREFIX = `${TINA_LABEL} v`;

/*
 * Tina renders its brand as vector paths, not text — the sidebar header span
 * has an empty textContent — so the marks can only be identified by the
 * geometry of the SVG that draws them. As of tinacms 3.9.1 there are three:
 *   "0 0 1020 254" — full "llama + tinacms" logotype, slide-out nav header
 *   "0 0 32 32"    — llama icon, collapsed top toolbar
 *   "0 0 20 26"    — llama icon, "Enter edit mode" modal
 */
const TINA_WORDMARK_VIEWBOX = "0 0 1020 254";
const TINA_ICON_VIEWBOXES = new Set(["0 0 32 32", "0 0 20 26"]);

let brandingInstalled = false;

const installBranding = () => {
  if (brandingInstalled || typeof window === "undefined") {
    return;
  }
  brandingInstalled = true;

  /**
   * "TinaCMS v3.9.1" -> "Emestica WebPanel v3.9.1".
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
      if (node.nodeValue?.includes(VERSION_LABEL_PREFIX)) {
        targets.push(node as Text);
      }
    }

    targets.forEach((textNode) => {
      textNode.nodeValue =
        textNode.nodeValue?.split(VERSION_LABEL_PREFIX).join(`${BRAND_TITLE} v`) ??
        null;
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
    svg.dataset.tinaBranded = "true";
    svg.style.display = "none";

    const img = document.createElement("img");
    img.src = src;
    img.alt = alt;

    const className = svg.getAttribute("class");
    if (className) img.className = className;
    img.style.display = "inline-block";
    img.style.verticalAlign = "middle";

    svg.insertAdjacentElement("afterend", img);
    return img;
  };

  /** Swap every Tina brand mark for the Emestica equivalent. */
  const applyCustomLogo = () => {
    const svgs = Array.from(document.querySelectorAll<SVGElement>("svg[viewBox]"));

    svgs.forEach((svg) => {
      if (svg.dataset.tinaBranded === "true") return;
      const viewBox = svg.getAttribute("viewBox") ?? "";

      if (viewBox === TINA_WORDMARK_VIEWBOX) {
        if (!replaceMark(svg, SIDEBAR_LOGO_SRC, "Emestica logo")) return;

        // The logotype already reads "tinacms"; the Emestica wordmark carries
        // no product name, so the label is appended alongside it.
        const host = svg.parentElement;
        if (host && !host.querySelector("[data-tina-brand-text]")) {
          const brandText = document.createElement("span");
          brandText.textContent = BRAND_TEXT;
          brandText.dataset.tinaBrandText = "true";
          brandText.style.marginLeft = "0.25rem";
          brandText.style.fontWeight = "600";
          host.appendChild(brandText);
        }
        return;
      }

      if (TINA_ICON_VIEWBOXES.has(viewBox)) {
        replaceMark(svg, BRAND_ICON_SRC, "Emestica logo");
      }
    });
  };

  /**
   * public/admin/index.html is generated by the Tina CLI with a hashed
   * favicon filename and <title>TinaCMS</title>, and is gitignored — so both
   * are repointed at runtime instead of via a post-build step.
   */
  const applyDocumentBranding = () => {
    if (document.title !== BRAND_TITLE) {
      document.title = BRAND_TITLE;
    }

    if (!document.head) return;

    let icon = document.head.querySelector<HTMLLinkElement>('link[rel="icon"]');
    if (!icon) {
      icon = document.createElement("link");
      icon.rel = "icon";
      document.head.appendChild(icon);
    }
    if (icon.getAttribute("href") !== FAVICON_SRC) {
      icon.setAttribute("href", FAVICON_SRC);
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

export default defineConfig({
  cmsCallback: (cms) => {
    installBranding();
    return cms;
  },

  branch,

  // From app.tina.io → project settings
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },

  // Tina Cloud media store. When we move to self-hosted this is the one
  // media block that gets swapped for the Supabase Storage store —
  // the stored values stay plain paths, so content files don't change.
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
  },

  schema: {
    collections: [
      // ---------------------------------------------------------------
      // Global chrome — header + footer, shared across every page
      // ---------------------------------------------------------------
      {
        name: "global",
        label: "Configuración global",
        path: "content/global",
        format: "json",
        ui: {
          global: true,
          allowedActions: { create: false, delete: false },
        },
        fields: [
          {
            type: "object",
            name: "header",
            label: "Encabezado",
            fields: [
              { type: "image", name: "logo", label: "Logo" },
              {
                type: "string",
                name: "logoAlt",
                label: "Texto alternativo del logo",
              },
              {
                type: "object",
                name: "navLinks",
                label: "Enlaces de navegación",
                list: true,
                ui: {
                  itemProps: (item) => ({ label: item?.label }),
                },
                fields: [
                  { type: "string", name: "label", label: "Texto" },
                  { type: "string", name: "href", label: "Enlace" },
                ],
              },
              {
                type: "string",
                name: "loginLabel",
                label: "Texto del botón Ingresar",
              },
              {
                type: "string",
                name: "ctaLabel",
                label: "Texto del botón de asistencia (escritorio)",
              },
              {
                type: "string",
                name: "ctaLabelMobile",
                label: "Texto del botón de asistencia (móvil)",
              },
              {
                type: "string",
                name: "ctaHref",
                label: "Enlace del botón de asistencia (ej. tel:+...)",
              },
              { type: "image", name: "phoneIcon", label: "Ícono de teléfono" },
              { type: "image", name: "menuIcon", label: "Ícono de menú (móvil)" },
            ],
          },
          {
            type: "object",
            name: "footer",
            label: "Pie de página",
            fields: [
              { type: "image", name: "logo", label: "Logo" },
              {
                type: "string",
                name: "tagline",
                label: "Descripción",
                ui: { component: "textarea" },
              },
              {
                type: "object",
                name: "links",
                label: "Enlaces",
                list: true,
                ui: {
                  itemProps: (item) => ({ label: item?.label }),
                },
                fields: [
                  { type: "string", name: "label", label: "Texto" },
                  { type: "string", name: "href", label: "Enlace" },
                ],
              },
              {
                type: "string",
                name: "copyright",
                label: "Aviso de derechos de autor",
              },
              {
                type: "object",
                name: "social",
                label: "Redes sociales",
                list: true,
                ui: {
                  itemProps: (item) => ({ label: item?.name }),
                },
                fields: [
                  { type: "string", name: "name", label: "Nombre" },
                  { type: "string", name: "href", label: "Enlace" },
                  { type: "image", name: "icon", label: "Ícono" },
                ],
              },
            ],
          },
        ],
      },

      // ---------------------------------------------------------------
      // Home page
      // ---------------------------------------------------------------
      {
        name: "home",
        label: "Página de inicio",
        path: "content/pages",
        format: "json",
        match: { include: "home" },
        ui: {
          allowedActions: { create: false, delete: false },
          router: () => "/",
        },
        fields: [
          {
            type: "object",
            name: "hero",
            label: "Portada",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Título (escritorio)",
                ui: { component: "textarea" },
              },
              {
                type: "string",
                name: "subtitle",
                label: "Subtítulo (escritorio)",
                ui: { component: "textarea" },
              },
              {
                type: "string",
                name: "titleMobile",
                label: "Título (móvil)",
                ui: { component: "textarea" },
              },
              {
                type: "string",
                name: "subtitleMobile",
                label: "Subtítulo (móvil)",
                ui: { component: "textarea" },
              },
              {
                type: "image",
                name: "background",
                label: "Imagen de fondo (escritorio)",
              },
              {
                type: "image",
                name: "backgroundMobile",
                label: "Imagen de fondo (móvil)",
              },
            ],
          },
          {
            type: "object",
            name: "quoting",
            label: "Cotizador",
            description:
              "Solo los textos del formulario. La lógica de cotización vive en el código.",
            fields: [
              { type: "string", name: "titleMobile", label: "Título (móvil)" },
              {
                type: "string",
                name: "destinationLabel",
                label: "Etiqueta: Origen y Destino",
              },
              {
                type: "string",
                name: "destinationPlaceholder",
                label: "Placeholder: destino",
              },
              { type: "string", name: "datesLabel", label: "Etiqueta: Fechas" },
              {
                type: "string",
                name: "datesPlaceholder",
                label: "Placeholder: fechas",
              },
              {
                type: "string",
                name: "passengersLabel",
                label: "Etiqueta: Pasajeros",
              },
              {
                type: "string",
                name: "passengersPlaceholder",
                label: "Placeholder: pasajeros",
              },
              { type: "string", name: "ctaLabel", label: "Botón (escritorio)" },
              { type: "string", name: "ctaLabelMobile", label: "Botón (móvil)" },
              {
                type: "string",
                name: "couponPlaceholder",
                label: "Placeholder: cupón",
              },
              { type: "string", name: "priceLabel", label: "Texto: Desde solo" },
              { type: "string", name: "priceAmount", label: "Precio" },
              { type: "string", name: "priceUnit", label: "Unidad (ej. /día)" },
              { type: "string", name: "originLabel", label: "Etiqueta: Origen" },
              {
                type: "string",
                name: "originPlaceholder",
                label: "Placeholder: origen",
              },
              {
                type: "string",
                name: "destinationLabelMobile",
                label: "Etiqueta: Destino (móvil)",
              },
              {
                type: "string",
                name: "destinationPlaceholderMobile",
                label: "Placeholder: destino (móvil)",
              },
              {
                type: "string",
                name: "departureLabel",
                label: "Etiqueta: Salida",
              },
              {
                type: "string",
                name: "returnLabel",
                label: "Etiqueta: Regreso",
              },
            ],
          },
          {
            type: "object",
            name: "partners",
            label: "Empresas aliadas",
            fields: [
              { type: "string", name: "heading", label: "Título" },
              {
                type: "object",
                name: "logos",
                label: "Logos",
                list: true,
                ui: {
                  itemProps: (item) => ({ label: item?.alt }),
                },
                fields: [
                  { type: "image", name: "src", label: "Imagen" },
                  { type: "string", name: "alt", label: "Texto alternativo" },
                  { type: "number", name: "width", label: "Ancho (px)" },
                  { type: "number", name: "height", label: "Alto (px)" },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "features",
            label: "Por qué elegirnos",
            fields: [
              {
                type: "string",
                name: "heading",
                label: "Título (escritorio)",
              },
              { type: "string", name: "headingMobile", label: "Título (móvil)" },
              {
                type: "string",
                name: "subheading",
                label: "Subtítulo",
                ui: { component: "textarea" },
              },
              {
                type: "object",
                name: "items",
                label: "Tarjetas (escritorio)",
                list: true,
                ui: {
                  itemProps: (item) => ({ label: item?.title }),
                },
                fields: [
                  { type: "string", name: "title", label: "Título" },
                  {
                    type: "string",
                    name: "body",
                    label: "Descripción",
                    ui: { component: "textarea" },
                  },
                  { type: "image", name: "icon", label: "Ícono" },
                  {
                    type: "image",
                    name: "image",
                    label: "Imagen (solo tarjeta destacada)",
                  },
                  {
                    type: "string",
                    name: "ctaLabel",
                    label: "Texto del enlace (opcional)",
                  },
                  {
                    type: "string",
                    name: "ctaHref",
                    label: "Destino del enlace (opcional)",
                  },
                ],
              },
              {
                type: "object",
                name: "itemsMobile",
                label: "Tarjetas (móvil)",
                list: true,
                ui: {
                  itemProps: (item) => ({ label: item?.title }),
                },
                fields: [
                  { type: "string", name: "title", label: "Título" },
                  {
                    type: "string",
                    name: "body",
                    label: "Descripción",
                    ui: { component: "textarea" },
                  },
                  { type: "image", name: "icon", label: "Ícono" },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "faq",
            label: "Preguntas frecuentes",
            fields: [
              { type: "string", name: "heading", label: "Título" },
              {
                type: "string",
                name: "subheading",
                label: "Subtítulo (escritorio)",
              },
              {
                type: "string",
                name: "subheadingMobile",
                label: "Subtítulo (móvil)",
              },
              {
                type: "object",
                name: "items",
                label: "Preguntas",
                list: true,
                ui: {
                  itemProps: (item) => ({ label: item?.question }),
                },
                fields: [
                  { type: "string", name: "question", label: "Pregunta" },
                  {
                    type: "string",
                    name: "answer",
                    label: "Respuesta",
                    ui: { component: "textarea" },
                  },
                  {
                    type: "boolean",
                    name: "defaultOpen",
                    label: "Abierta por defecto",
                  },
                  {
                    type: "boolean",
                    name: "mobileOnly",
                    label: "Mostrar solo en móvil",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
});
