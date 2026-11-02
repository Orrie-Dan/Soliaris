import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router";
import HomePage from "@/pages/Home";
import AboutPage from "@/pages/About";
import WhatWeDoPage from "@/pages/WhatWeDo";
import OpportunitiesPage from "@/pages/Opportunities";
import ImpactPage from "@/pages/Impact";
import PartnershipsPage from "@/pages/Partnerships";
import ContactPage from "@/pages/Contact";
import PrivacyPage from "@/pages/Privacy";
import TermsPage from "@/pages/Terms";
import NewsArticlePage from "@/pages/NewsArticle";
import NotFoundPage from "@/pages/NotFound";
import { NEWS } from "@/data/news";

/**
 * Start each new page at the top, as Next.js did — unless the URL names a section
 * (e.g. /#news), in which case go to that section. In-page #hash links are left to the browser.
 */
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const target = hash && document.getElementById(decodeURIComponent(hash.slice(1)));
    // "instant" overrides the global `scroll-behavior: smooth`, so a new page doesn't animate into place.
    if (target) target.scrollIntoView({ behavior: "instant" });
    else window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    // only on page change: same-page #hash links are already scrolled by the browser
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);
  return null;
}

/**
 * Section fades: the content of each page section (not the hero, which has its own entrance,
 * and not background images or overlays, so dark sections never flash white) fades and rises in
 * as it enters the viewport, and fades up and out as it leaves. Styles are in globals.css
 * ([data-fx]). Elements only get hidden once this runs, so pre-rendered HTML shows everything.
 */
function SectionFade() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const els = Array.from(
      document.querySelectorAll<HTMLElement>(
        "#root > div > section:not(:first-of-type) > *, #root > div > footer > *"
      )
    ).filter((el) => !el.matches("img, video, picture, [aria-hidden='true']"));

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const el = e.target as HTMLElement;
          if (e.isIntersecting) el.dataset.fx = "in";
          else el.dataset.fx = e.boundingClientRect.top < 0 ? "above" : "below";
        }
      },
      { rootMargin: "-6% 0px -6% 0px" }
    );
    for (const el of els) {
      el.dataset.fx = "below";
      io.observe(el);
    }
    return () => {
      io.disconnect();
      for (const el of els) delete el.dataset.fx;
    };
  }, [pathname]);
  return null;
}

/** Every page; also the list pre-rendered to static HTML and listed in the sitemap. */
export const ROUTES: { path: string; Page: () => React.JSX.Element }[] = [
  { path: "/", Page: HomePage },
  { path: "/about", Page: AboutPage },
  { path: "/what-we-do", Page: WhatWeDoPage },
  { path: "/opportunities", Page: OpportunitiesPage },
  { path: "/impact", Page: ImpactPage },
  { path: "/partnerships", Page: PartnershipsPage },
  { path: "/contact", Page: ContactPage },
  { path: "/privacy", Page: PrivacyPage },
  { path: "/terms", Page: TermsPage },
  ...NEWS.map((item) => ({ path: `/news/${item.slug}`, Page: () => <NewsArticlePage item={item} /> })),
];

export default function App() {
  return (
    <>
      <ScrollToTop />
      <SectionFade />
      <Routes>
        {ROUTES.map(({ path, Page }) => (
          <Route key={path} path={path} element={<Page />} />
        ))}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
