import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import App, { ROUTES } from "./App";
import { headTags, resolveMeta, takeSsrMeta } from "./usePageMeta";
import { SITE_URL } from "./siteConfig";

/** Build-time only (scripts/prerender.mjs): renders one URL to HTML plus its <head> tags. */
export function render(url: string, { noindex = false } = {}) {
  const html = renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>
  );
  const { title, description } = takeSsrMeta();
  return { html, head: headTags(resolveMeta(url, title, description), { noindex }) };
}

export const paths = ROUTES.map((r) => r.path);
export { SITE_URL };
