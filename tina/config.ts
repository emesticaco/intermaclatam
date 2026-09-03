import { defineConfig } from "tinacms";
import {
  installEditorBranding,
  hideCloudMenu,
} from "../tina-editor-branding/branding";

// Vercel exposes the deployed branch; fall back to main for local work.
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

/*
 * The editor branding and the CLOUD-section removal now live in
 * ../tina-editor-branding, a self-contained package shared across projects.
 * Its README documents the options, the version-coupled SVG signatures the
 * logo swap depends on, and the check to run after every tinacms upgrade:
 *
 *   node tina-editor-branding/check-marks.mjs
 */

export default defineConfig({
  cmsCallback: (cms) => {
    installEditorBranding({
      wordmarkSrc: "/brand/tina-sidebar-logo.svg",
      iconSrc: "/brand/favicon.svg",
      title: "Emestica WebPanel",
      brandText: "WebPanel",
    });
    hideCloudMenu(cms);
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
