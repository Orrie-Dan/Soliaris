import { useEffect } from "react";
import { useLocation } from "react-router";
import { SHARE_IMAGE, SITE_URL } from "@/siteConfig";

const SITE = "SOLIARIS AFRICA LTD";
const DEFAULT_TITLE = `${SITE} — Powering a Brighter Africa`;
const DEFAULT_DESCRIPTION =
  "SOLIARIS AFRICA LTD is a Gambian company dedicated to developing reliable, sustainable and modern energy infrastructure across The Gambia and the wider West African region.";

export type PageMeta = { title: string; description: string; url: string };

/** Full title, description and absolute URL for a page. */
export function resolveMeta(path: string, title?: string, description?: string): PageMeta {
  return {
    title: title ? `${title} | ${SITE}` : DEFAULT_TITLE,
    description: description ?? DEFAULT_DESCRIPTION,
    url: SITE_URL + (path === "/" ? "/" : path),
  };
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

/** Per-page <head> tags written into the pre-rendered HTML (see scripts/prerender.mjs). */
export function headTags(meta: PageMeta, { noindex = false } = {}): string {
  const image = SITE_URL + SHARE_IMAGE;
  return [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    noindex ? `<meta name="robots" content="noindex" />` : `<link rel="canonical" href="${esc(meta.url)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${SITE}" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:url" content="${esc(meta.url)}" />`,
    `<meta property="og:image" content="${esc(image)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(meta.title)}" />`,
    `<meta name="twitter:description" content="${esc(meta.description)}" />`,
    `<meta name="twitter:image" content="${esc(image)}" />`,
  ].join("\n    ");
}

/** Meta of the page being rendered on the server; read by the pre-render step after each render. */
let ssrMeta: { title?: string; description?: string } = {};
export const takeSsrMeta = () => {
  const m = ssrMeta;
  ssrMeta = {};
  return m;
};

/**
 * Sets the page's title, description, canonical link and share tags. On the server the
 * values are recorded for the pre-rendered HTML; in the browser they're updated on navigation.
 */
export default function usePageMeta(title?: string, description?: string) {
  const { pathname } = useLocation();
  // Build-time pre-render only: pages are rendered one at a time, synchronously, and the
  // result is read straight after (entry-server.tsx), so this write can't leak between pages.
  // eslint-disable-next-line react-hooks/globals
  if (import.meta.env.SSR) ssrMeta = { title, description };

  useEffect(() => {
    const meta = resolveMeta(pathname, title, description);
    document.title = meta.title;
    const set = (selector: string, attr: string, value: string) =>
      document.querySelector(selector)?.setAttribute(attr, value);
    set('meta[name="description"]', "content", meta.description);
    set('meta[property="og:title"]', "content", meta.title);
    set('meta[property="og:description"]', "content", meta.description);
    set('meta[property="og:url"]', "content", meta.url);
    set('meta[name="twitter:title"]', "content", meta.title);
    set('meta[name="twitter:description"]', "content", meta.description);
    set('link[rel="canonical"]', "href", meta.url);
  }, [pathname, title, description]);
}
