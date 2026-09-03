import type { Collection } from "tinacms";

/**
 * The "home" collection.
 *
 * A fixed-section landing page: hero, quoting form labels, partner logos,
 * a features bento and an FAQ accordion. Every field is optional — Tina
 * generates them all nullable, and the components render around gaps.
 *
 * Copy that differs between breakpoints is modelled as two sibling fields
 * labelled "(escritorio)" / "(móvil)" rather than one field the CSS hides,
 * so an editor can write shorter mobile copy. The components pair with this
 * one-to-one: each has a desktop and a mobile block.
 *
 * Labels are Spanish. Translate them for a non-Spanish client; the field
 * *names* must not change without also updating the components and content.
 */
const Home: Collection = {
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
};

export default Home;
