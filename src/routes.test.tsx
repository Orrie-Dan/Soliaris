import { describe, expect, it } from "vitest";
import { paths, render } from "./entry-server";
import { headTags, resolveMeta } from "./usePageMeta";
import { SITE_URL } from "./siteConfig";

// Smoke tests: every page renders (as the build pre-renders it) with its own <head> tags.

const titleOf = (head: string) => head.match(/<title>(.*?)<\/title>/)?.[1];

describe("pages", () => {
  it.each(paths)("%s renders with a heading, header, footer and its own title", (path) => {
    const { html, head } = render(path);
    expect(html).toMatch(/<h1[\s>]/);
    expect(html).toContain("<header");
    expect(html).toContain("<footer");
    expect(head).toContain(`<link rel="canonical" href="${SITE_URL}${path}" />`);
    expect(head).not.toContain("noindex");
  });

  it("gives every page a distinct title", () => {
    const titles = paths.map((p) => titleOf(render(p).head));
    expect(titles.every(Boolean)).toBe(true);
    expect(new Set(titles).size).toBe(paths.length);
  });

  it("renders the not-found page for unknown URLs, marked noindex", () => {
    const { html, head } = render("/no-such-page", { noindex: true });
    expect(html).toContain("NOT FOUND");
    expect(titleOf(head)).toBe("Page Not Found | SOLIARIS AFRICA LTD");
    expect(head).toContain('<meta name="robots" content="noindex" />');
    expect(head).not.toContain("canonical");
  });
});

describe("headTags", () => {
  it("escapes text placed in attributes", () => {
    const head = headTags(resolveMeta("/x", 'A "quoted" <title>', "Tom & Jerry"));
    expect(head).toContain("A &quot;quoted&quot; &lt;title>");
    expect(head).toContain("Tom &amp; Jerry");
    expect(head).not.toContain('"quoted"');
  });
});
