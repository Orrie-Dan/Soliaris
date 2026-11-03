import { useEffect, useRef, useState } from "react";

export type Tab = { key: string; label: string; target: string };

/** A section counts as current once its top is within this many px of the viewport top (≥ the largest section scroll-margin). */
const ACTIVE_OFFSET = 180;

/**
 * Sticky in-page section nav from the approved design. Each tab is a plain #anchor link
 * (the browser scrolls and moves focus; sections set scroll-margin for the sticky bars),
 * and the tab for the section currently in view is highlighted as the page scrolls.
 */
export default function ScrollTabs({
  tabs,
  ariaLabel,
  gap = 42,
}: {
  tabs: Tab[];
  ariaLabel: string;
  gap?: number;
}) {
  const [active, setActive] = useState(tabs[0]?.key);
  const listRef = useRef<HTMLUListElement>(null);

  // when the strip is scrollable (narrow screens), slide the current tab into view
  useEffect(() => {
    const list = listRef.current;
    const link = list?.querySelector<HTMLElement>('[aria-current="location"]');
    if (!list || !link || list.scrollWidth <= list.clientWidth) return;
    const target = link.offsetLeft - (list.clientWidth - link.offsetWidth) / 2;
    list.scrollTo({ left: Math.max(0, target), behavior: "smooth" });
  }, [active]);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      let current = tabs[0]?.key;
      for (const t of tabs) {
        const el = document.getElementById(t.target);
        if (el && el.getBoundingClientRect().top <= ACTIVE_OFFSET) current = t.key;
      }
      // the last sections may never reach the top; at the bottom of the page, the last one counts
      const last = tabs[tabs.length - 1];
      const lastEl = last && document.getElementById(last.target);
      if (atBottom && lastEl && lastEl.getBoundingClientRect().top < window.innerHeight) current = last.key;
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [tabs]);

  return (
    <nav aria-label={ariaLabel} className="border-b border-hairline bg-white shadow-[0_4px_14px_rgba(6,41,86,0.04)]">
      <ul
        ref={listRef}
        className="tabstrip relative mx-auto m-0 flex max-w-site list-none gap-7 overflow-x-auto px-6 lg:gap-[var(--tab-gap)] lg:px-10"
        style={{ "--tab-gap": `${gap}px` } as React.CSSProperties}
      >
        {tabs.map((t) => (
          <li key={t.key} className="shrink-0">
            <a
              href={`#${t.target}`}
              aria-current={active === t.key ? "location" : undefined}
              className={`abtab inline-block ${active === t.key ? "active" : ""}`}
            >
              {t.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
