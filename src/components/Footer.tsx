import { Link } from "react-router";
import { CONTACT } from "@/siteConfig";

/** Footer links, grouped (the header keeps the flat list). */
const GROUPS = [
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/what-we-do", label: "What We Do" },
      { href: "/impact", label: "Impact" },
    ],
  },
  {
    title: "Work with us",
    links: [
      { href: "/opportunities", label: "Opportunities" },
      { href: "/partnerships", label: "Partnerships" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export default function Footer({ active }: { active?: string }) {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-deep text-white">
      {/* soft teal glow, top right */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(circle, #079B87 0%, transparent 65%)" }}
      />

      <div className="relative mx-auto max-w-site px-6 lg:px-10">
        {/* ---------- brand + link columns ---------- */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-8 pb-8 pt-10 lg:gap-12 lg:pt-12 lg:grid-cols-[1.6fr_1fr_1fr_1.2fr]">
          <div className="col-span-2 lg:col-span-1">
            <Link to="/" aria-label="Soliaris Africa Ltd — home" className="inline-flex items-center gap-3.5">
              {/* the logo's Africa mark, cropped from the full logo (its navy lettering wouldn't read on dark) */}
              <span className="block h-[48px] w-[45px] shrink-0 overflow-hidden">
                <img src="/images/soliaris-logo.webp" alt="" loading="lazy" width={440} height={160} className="h-[48px] w-auto max-w-none" />
              </span>
              <span className="font-heading leading-none">
                <span className="block text-[22px] font-extrabold tracking-[0.02em]">SOLIARIS</span>
                <span className="mt-1 block text-[12px] font-bold tracking-[0.32em] text-white/70">AFRICA LTD</span>
              </span>
            </Link>
            <p className="m-0 mt-4 max-w-[320px] text-[14px] leading-[1.7] text-white/60">
              Exploring energy generation, grid infrastructure and regional partnerships, rooted in The Gambia.
            </p>
            <Link
              to="/contact"
              className="mt-5 inline-flex items-center gap-2.5 rounded-full bg-gold px-5 py-2.5 text-[13.5px] font-bold text-navy transition-colors hover:bg-[#ffc843]"
            >
              Get in Touch <Arrow />
            </Link>
          </div>

          {GROUPS.map((g) => (
            <nav key={g.title} aria-label={g.title}>
              <p className="m-0 mb-3.5 text-[11px] font-bold tracking-[0.24em] text-tealBright">{g.title.toUpperCase()}</p>
              <ul className="m-0 list-none space-y-2 p-0">
                {g.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      to={l.href}
                      aria-current={active === l.href ? "page" : undefined}
                      className={`text-[15px] transition-colors hover:text-gold ${active === l.href ? "text-gold" : "text-white/80"}`}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="col-span-2 lg:col-span-1">
            <p className="m-0 mb-3.5 text-[11px] font-bold tracking-[0.24em] text-tealBright">REACH US</p>
            <address className="space-y-2 text-[15px] not-italic leading-[1.5] text-white/80">
              <p className="m-0">The Gambia&nbsp;&nbsp;·&nbsp;&nbsp;West Africa</p>
              <p className="m-0">
                <a href={`mailto:${CONTACT.email}`} className="transition-colors hover:text-gold">{CONTACT.email}</a>
              </p>
              <p className="m-0">
                <a href={`tel:${CONTACT.phone.replace(/\s+/g, "")}`} className="transition-colors hover:text-gold">{CONTACT.phone}</a>
              </p>
            </address>
          </div>
        </div>

        {/* ---------- legal ---------- */}
        <div className="flex flex-wrap items-center justify-between gap-5 border-t border-white/10 py-4">
          <p className="m-0 text-xs text-white/50">© 2026 SOLIARIS AFRICA LTD — Powering a Brighter Africa.</p>
          <div className="flex items-center gap-[22px]">
            <Link to="/privacy" className="text-xs text-white/50 transition-colors hover:text-white">Privacy Policy</Link>
            <Link to="/terms" className="text-xs text-white/50 transition-colors hover:text-white">Terms of Use</Link>
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              aria-label="Back to top"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-gold hover:text-gold"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
                <path d="M12 19V5M6 11l6-6 6 6" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
