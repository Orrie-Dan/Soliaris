import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router";

const Arrow = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export type DetailItem = {
  eyebrow: string;
  title: ReactNode;
  copy: string;
  src: string;
  alt: string;
  pos?: string;
  overview: string;
  focus: { title: string; copy: string }[];
};

/**
 * Full-screen detail view for one item in a list (opportunity area, solution, …).
 * Rendered into <body> with the rest of the app made inert while open, so keyboard focus,
 * clicks and screen readers stay inside the dialog. Locks page scroll and returns focus on
 * close; Esc closes, ← / → step between items.
 */
export default function DetailView({
  item,
  index,
  total,
  note,
  ctaLabel,
  onClose,
  onStep,
}: {
  item: DetailItem;
  index: number;
  total: number;
  note?: string;
  ctaLabel: string;
  onClose: () => void;
  onStep: (dir: 1 | -1) => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // stepping to another item starts it from the hero
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: "instant" });
  }, [index]);

  useEffect(() => {
    const appRoot = document.getElementById("root");
    const prevOverflow = document.body.style.overflow;
    const prevFocus = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    appRoot?.setAttribute("inert", "");
    closeRef.current?.focus();
    return () => {
      appRoot?.removeAttribute("inert");
      document.body.style.overflow = prevOverflow;
      prevFocus?.focus();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") onStep(1);
      else if (e.key === "ArrowLeft") onStep(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onStep]);

  return createPortal(
    <div
      ref={scrollRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="detail-view-title"
      className="fixed inset-0 z-[100] overflow-y-auto bg-white"
    >
      {/* full-width hero (keyed so the entrance animation replays on step) */}
      <div key={`hero-${index}`} className="relative h-[52vh] min-h-[360px] overflow-hidden bg-deep lg:h-[62vh]">
        <img
          src={item.src}
          alt={item.alt}
          className="absolute inset-0 h-full w-full object-cover"
          style={item.pos ? { objectPosition: item.pos } : undefined}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(3,27,51,.92) 0%,rgba(3,27,51,.5) 40%,rgba(3,27,51,.15) 75%,rgba(3,27,51,.35) 100%)" }} aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto max-w-content px-6 pb-10 lg:px-10 lg:pb-14">
            <p className="eyebrow-dark heroFade d1 mb-4">{item.eyebrow}</p>
            <h2 id="detail-view-title" className="heroFade d2 m-0 mb-4 max-w-[760px] font-heading text-[34px] font-extrabold leading-[1.08] tracking-[-0.012em] text-white lg:text-[56px]">
              {item.title}
            </h2>
            <p className="heroFade d3 m-0 max-w-[520px] text-base leading-[1.7] text-white/90">{item.copy}</p>
          </div>
        </div>
      </div>

      <div key={`body-${index}`} className="mx-auto max-w-content px-6 pb-14 pt-16 lg:px-10 lg:pt-20">
        {/* overview */}
        <div className="mx-auto mb-16 max-w-[720px] text-center">
          <p className="eyebrow heroFade d1 mb-4">OVERVIEW</p>
          <p className="heroFade d2 m-0 text-[17px] leading-[1.8] text-ink">{item.overview}</p>
        </div>

        {/* focus areas */}
        <p className="eyebrow heroFade d2 mb-6">FOCUS AREAS</p>
        <ol className="heroFade d3 m-0 mb-16 grid list-none gap-6 p-0 md:grid-cols-3">
          {item.focus.map((f, i) => (
            <li key={f.title} className="lift-card rounded-md border border-cardline bg-white p-7">
              <span className="mb-5 block font-heading text-[13px] font-extrabold tracking-[0.24em] text-gold">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="m-0 mb-2 font-heading text-[18px] font-extrabold leading-[1.3] text-navy">{f.title}</h3>
              <p className="m-0 text-[14px] leading-[1.65] text-inkSoft">{f.copy}</p>
            </li>
          ))}
        </ol>

        {/* CTA strip */}
        <div className="heroFade d4 mb-12 flex flex-wrap items-center justify-between gap-8 rounded-md bg-deep px-7 py-9 lg:px-12">
          <div className="max-w-[560px]">
            <h3 className="m-0 mb-2 font-heading text-[24px] font-extrabold leading-[1.2] text-white">
              Interested in <span className="text-gold">working together?</span>
            </h3>
            <p className="m-0 text-[14px] leading-[1.65] text-white/80">
              {note ?? "Tell us about your project or partnership idea and we'll take the conversation from there."}
            </p>
          </div>
          <Link to="/contact" className="btn-gold">
            {ctaLabel}
            <Arrow size={15} />
          </Link>
        </div>

        {/* prev / next */}
        <div className="flex items-center justify-between border-t border-cardline pt-6">
          <button type="button" className="learnmore cursor-pointer border-0 bg-transparent p-0" onClick={() => onStep(-1)}>
            <span className="inline-flex rotate-180"><Arrow size={13} /></span>
            PREVIOUS
          </button>
          <span className="text-xs font-bold tracking-[0.2em] text-inkSoft">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
          <button type="button" className="learnmore cursor-pointer border-0 bg-transparent p-0" onClick={() => onStep(1)}>
            NEXT
            <Arrow size={13} />
          </button>
        </div>
      </div>

      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="fixed right-5 top-5 z-10 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border-0 bg-white/90 text-navy shadow-[0_6px_18px_rgba(6,41,86,0.18)] transition-colors hover:bg-gold"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
    </div>,
    document.body
  );
}
