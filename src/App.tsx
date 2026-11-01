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
      <Routes>
        {ROUTES.map(({ path, Page }) => (
          <Route key={path} path={path} element={<Page />} />
        ))}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
