import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";

export type NavLink = { href: string; label: string };

export const NAV_LINKS: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/what-we-do", label: "What We Do" },
  { href: "/opportunities", label: "Opportunities" },
  { href: "/impact", label: "Impact" },
  { href: "/partnerships", label: "Partnerships" },
  { href: "/contact", label: "Contact" },
];

/** Marketing labels used on the homepage hero, per the approved design. */
export const HOME_LINKS: NavLink[] = [
  { href: "/about", label: "Our Company" },
  { href: "/what-we-do", label: "What We Do" },
  { href: "/opportunities", label: "Opportunities" },
  { href: "/impact", label: "Impact" },
  { href: "/partnerships", label: "Partners" },
  { href: "/contact", label: "Contact" },
];

type HeaderProps = {
  /** Current page path, used to mark the active link. */
  active?: string;
  /** "overlay" renders transparent over a hero image; "solid" is the sticky white bar. */
  variant?: "solid" | "overlay";
  links?: NavLink[];
  cta?: { href: string; label: string };
};

export default function Header({
  active,
  variant = "solid",
  links = NAV_LINKS,
  cta = { href: "/contact", label: "Get in Touch" },
}: HeaderProps) {
  const overlay = variant === "overlay";
  const { pathname } = useLocation();
  // the mobile menu remembers the page it was opened on, so navigating anywhere closes it
  const [menuOpenOn, setMenuOpenOn] = useState<string | null>(null);
  const menuOpen = menuOpenOn === pathname;
  const setMenuOpen = (open: boolean) => setMenuOpenOn(open ? pathname : null);

  // close on Esc
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpenOn(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const ctaArrow = (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
  return (
    <header
      className={
        overlay
          ? "nav-overlay absolute inset-x-0 top-0 z-50 bg-transparent"
          : "sticky top-0 z-50 bg-white/95 shadow-[0_1px_0_rgba(6,41,86,0.08),0_6px_18px_rgba(6,41,86,0.05)] backdrop-blur"
      }
    >
      <nav
        aria-label="Main navigation"
        className={`mx-auto flex max-w-site items-center justify-between gap-6 px-6 lg:px-10 ${overlay ? "h-[88px]" : "h-[76px]"}`}
      >
        <Link to="/" aria-label="Soliaris Africa Ltd — home" className="flex shrink-0 items-center">
          <img
            src="/images/soliaris-logo.webp"
            alt="SOLIARIS AFRICA LTD — Powering a Brighter Africa"
            width={214}
            height={74}
            fetchPriority="high"
            className={
              overlay
                ? "h-[74px] w-auto drop-shadow-[0_0_10px_rgba(255,255,255,0.95)]"
                : "h-[50px] w-auto"
            }
          />
        </Link>
        <div className={`hidden items-center lg:flex ${overlay ? "gap-[30px]" : "gap-[26px]"}`}>
          {links.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              className={`navlink ${active === l.href ? "active" : ""}`}
            >
              {l.label}
            </Link>
          ))}
        </div>
        <div className="flex shrink-0 items-center gap-3">
          {/* the home bar's wider links leave no room for the CTA between lg and xl */}
          {renderCta(cta, ctaArrow, `btn-teal hidden shrink-0 sm:inline-flex ${overlay ? "lg:hidden xl:inline-flex" : ""}`)}
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(!menuOpen)}
            className={`flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border-0 lg:hidden ${
              overlay ? "bg-white/90 text-navy" : "bg-mist text-navy"
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
              {menuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </nav>

      {/* mobile menu (below lg, where the inline links are hidden) */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="absolute inset-x-0 top-full border-t border-hairline bg-white shadow-[0_12px_28px_rgba(6,41,86,0.12)] lg:hidden"
        >
          <ul className="m-0 list-none px-6 py-3">
            {links.map((l) => (
              <li key={l.href} className="border-b border-hairline last:border-b-0">
                <Link
                  to={l.href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={active === l.href ? "page" : undefined}
                  className={`block py-4 font-body text-[15px] font-semibold ${active === l.href ? "text-teal" : "text-navy"}`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="px-6 pb-6 sm:hidden">{renderCta(cta, ctaArrow, "btn-teal", () => setMenuOpen(false))}</div>
        </div>
      )}
    </header>
  );
}

function renderCta(
  cta: { href: string; label: string },
  arrow: React.ReactNode,
  className: string,
  onClick?: () => void
) {
  // In-page anchor: a plain <a> lets the browser scroll to the target (router Links don't).
  return cta.href.startsWith("#") ? (
    <a href={cta.href} className={className} onClick={onClick}>
      {cta.label}
      {arrow}
    </a>
  ) : (
    <Link to={cta.href} className={className} onClick={onClick}>
      {cta.label}
      {arrow}
    </Link>
  );
}
