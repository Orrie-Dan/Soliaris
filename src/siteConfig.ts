/**
 * Company contact details shown on the Contact page and in the footer.
 * PLACEHOLDERS — replace every value below with the real details before launch.
 */
export const CONTACT = {
  email: "info@soliaris.com",
  phone: "+220 000 0000",
  address: ["Street address", "Banjul, The Gambia"],
};

/**
 * Public site address, used for canonical links, social-share tags and the sitemap.
 * PLACEHOLDER — set VITE_SITE_URL (no trailing slash) in Vercel once the domain is known.
 */
export const SITE_URL = ((import.meta.env.VITE_SITE_URL as string | undefined) ?? "https://www.example.com").replace(/\/+$/, "");

/** Image shown when a page is shared (WhatsApp, LinkedIn, X…). 1200×630. */
export const SHARE_IMAGE = "/images/share.jpg";

/** Last-updated date shown on the legal pages. */
export const LEGAL_UPDATED = "1 November 2026";

/** Formspree endpoint (https://formspree.io/f/<id>), set in .env as VITE_FORM_ENDPOINT. */
export const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT as string | undefined;
