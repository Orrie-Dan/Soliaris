// Turns the client build in dist/ into one static HTML file per page, plus 404.html,
// sitemap.xml and robots.txt. Runs after `vite build` and `vite build --ssr` (see package.json).
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const dist = `${root}dist/`;
const ssrDir = `${root}dist-ssr/`;

const { render, paths, SITE_URL } = await import(pathToFileURL(`${ssrDir}entry-server.js`).href);

// The template's own <title> and description are dev-server defaults; each page gets its own.
const template = (await readFile(`${dist}index.html`, "utf8"))
  .replace(/\s*<title>[\s\S]*?<\/title>/, "")
  .replace(/\s*<meta\s+name="description"[\s\S]*?\/>/, "");

const page = (url, opts) => {
  const { html, head } = render(url, opts);
  return template
    .replace(/\s*<\/head>/, () => `\n    ${head}\n  </head>`)
    .replace('<div id="root"></div>', () => `<div id="root">${html}</div>`);
};

for (const path of paths) {
  // "/about" → about.html, served at /about by Vercel's cleanUrls (vercel.json)
  const file = path === "/" ? "index.html" : `${path.slice(1)}.html`;
  await mkdir(dirname(`${dist}${file}`), { recursive: true });
  await writeFile(`${dist}${file}`, page(path));
  console.log(`prerendered ${path} → dist/${file}`);
}

// Vercel serves 404.html, with a 404 status, for any path without a file.
await writeFile(`${dist}404.html`, page("/404", { noindex: true }));
console.log("prerendered 404 → dist/404.html");

const urls = paths.map((p) => `  <url><loc>${SITE_URL}${p}</loc></url>`).join("\n");
await writeFile(
  `${dist}sitemap.xml`,
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
);
await writeFile(`${dist}robots.txt`, `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
console.log(`wrote sitemap.xml and robots.txt for ${SITE_URL}`);

await rm(ssrDir, { recursive: true, force: true });
