import { useState, type CSSProperties } from "react";
import { LOCATIONS, type Location } from "@/data/regionalMap";

/**
 * "Where We Focus": the homepage's regional outlook.
 *
 * The map is a rendered night-satellite image of West Africa (public/images/regmap-bg.webp)
 * with the arcs, market lights and map labels baked in. The headline, copy, buttons and
 * country index are real HTML laid over it, in the site's own type and buttons, and the
 * image's edges fade into the section's navy so it reads as part of the page rather than a
 * picture dropped in. From 1280px up the section keeps the image's 1920×819 proportions and
 * the copy and index sit in the image's empty ocean and right margin (see .rm in
 * globals.css). Below that the copy stacks above a crop of the map.
 */

const IMG_W = 1920;
const IMG_H = 819;

type Market = Location & {
  /** Centre of the market's light in the image, in image pixels. */
  at: [x: number, y: number];
};

// In the order of the index: north to south along the coast, then inland.
const NODES: Record<string, [number, number]> = {
  Mauritania: [957, 129],
  Senegal: [820, 268],
  "The Gambia": [840, 342],
  "Guinea-Bissau": [830, 440],
  Guinea: [972, 447],
  "Sierra Leone": [946, 556],
  Liberia: [1159, 618],
  "Côte d’Ivoire": [1338, 608],
  Ghana: [1530, 581],
  "Burkina Faso": [1390, 446],
  Mali: [1251, 268],
  Niger: [1490, 330],
};

const MARKETS: Market[] = Object.entries(NODES).map(([name, at]) => ({
  ...LOCATIONS.find((l) => l.name === name)!,
  at,
}));
const HUB = MARKETS.findIndex((m) => m.name === "The Gambia");

/** Great-circle distance in km between capitals, rounded to the nearest 10. */
function distanceKm(a: { lon: number; lat: number }, b: { lon: number; lat: number }) {
  const r = Math.PI / 180;
  const h =
    Math.sin(((b.lat - a.lat) * r) / 2) ** 2 +
    Math.cos(a.lat * r) * Math.cos(b.lat * r) * Math.sin(((b.lon - a.lon) * r) / 2) ** 2;
  return Math.round((2 * 6371 * Math.asin(Math.sqrt(h))) / 10) * 10;
}
const KM = MARKETS.map((m) => distanceKm(MARKETS[HUB].capital, m.capital));

const pct = ([x, y]: [number, number]) => ({ left: `${(x / IMG_W) * 100}%`, top: `${(y / IMG_H) * 100}%` });

const Arrow = () => (
  <svg className="rm-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export default function RegionalMap() {
  // The Gambia is in focus by default, as in the artwork; null is the regional outlook.
  const [active, setActive] = useState<number | null>(HUB);
  const [hover, setHover] = useState<number | null>(null);
  // The note only opens once someone has picked something.
  const [picked, setPicked] = useState(false);

  const lit = hover ?? active;
  const noteIdx = hover ?? (picked ? active : null);
  const note = noteIdx === null ? null : MARKETS[noteIdx];

  const pick = (i: number | null) => {
    setPicked(true);
    setActive(i);
  };
  const hoverProps = (i: number) => ({
    onMouseEnter: () => setHover(i),
    onMouseLeave: () => setHover(null),
    onFocus: () => setHover(i),
    onBlur: () => setHover(null),
  });

  return (
    <section id="regmap" aria-labelledby="regmap-title" className="rm relative flex flex-col overflow-hidden bg-deep">
      {/* ---------- map ---------- */}
      <div className="rm-window relative order-2 mt-10 aspect-[1110/819] overflow-hidden">
        <div className="rm-stage absolute top-0 h-full">
          <img
            src="/images/regmap-bg.webp"
            width={IMG_W}
            height={IMG_H}
            loading="lazy"
            decoding="async"
            alt="Satellite-style map of West Africa with arcs from The Gambia to Mauritania, Senegal, Guinea-Bissau, Guinea, Sierra Leone, Liberia, Côte d’Ivoire, Ghana, Burkina Faso, Mali and Niger"
            className="absolute inset-0 h-full w-full select-none"
            style={{ filter: "saturate(.88) brightness(.9)" }}
            draggable={false}
          />

          {/* the lit market's light pulses */}
          {lit !== null && (
            <span key={lit} className="rm-pulse-at pointer-events-none absolute" style={pct(MARKETS[lit].at)} aria-hidden="true">
              <span className="rm-ring" />
              <span className="rm-ring" style={{ animationDelay: "1s" }} />
            </span>
          )}

          {/* hit areas over each light in the artwork */}
          {MARKETS.map((m, i) => (
            <button
              key={m.name}
              type="button"
              aria-label={m.name}
              aria-pressed={i === active}
              tabIndex={-1}
              onClick={() => pick(i)}
              {...hoverProps(i)}
              className="rm-hit absolute rounded-full outline-none"
              style={pct(m.at)}
            />
          ))}
        </div>

        {/* blend the image into the navy: top and bottom always, and on wide screens the left
            (behind the copy) and right (behind the index) as well */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "linear-gradient(to bottom,#031B33 0%,rgba(3,27,51,0) 18%,rgba(3,27,51,0) 80%,#031B33 100%)" }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 hidden xl:block"
          style={{
            background:
              "linear-gradient(90deg,rgba(3,27,51,.94) 0%,rgba(3,27,51,.72) 22%,rgba(3,27,51,.25) 36%,rgba(3,27,51,0) 46%,rgba(3,27,51,0) 78%,rgba(3,27,51,.7) 90%,rgba(3,27,51,.92) 100%)",
          }}
          aria-hidden="true"
        />
      </div>

      {/* ---------- copy ---------- */}
      <div className="rm-copy relative z-20 order-1 mx-auto w-full max-w-site px-6 pt-20 sm:px-10">
        <p className="eyebrow-dark mb-[22px]">WHERE WE FOCUS</p>
        <h2 id="regmap-title" className="rm-title m-0 mb-6 font-heading text-[42px] font-extrabold uppercase leading-[1.04] tracking-[-0.014em] text-white">
          The Gambia
          <br />
          <span className="text-gold">and beyond</span>
        </h2>
        <p className="rm-text m-0 mb-8 max-w-[460px] text-[15px] leading-[1.7] text-white/90">
          Our home is The Gambia, and our vision extends across West Africa. We focus on energy
          development opportunities that support regional integration, economic growth, and a more
          secure energy future.
        </p>
        <div className="flex flex-wrap gap-3">
          <button type="button" aria-pressed={active === HUB} onClick={() => pick(HUB)} className="btn-gold">
            COUNTRY FOCUS <Arrow />
          </button>
          <button type="button" aria-pressed={active === null} onClick={() => pick(null)} className="btn-goldline">
            REGIONAL OUTLOOK
          </button>
        </div>
      </div>

      {/* ---------- country index ---------- */}
      <nav aria-label="Markets" className="rm-index relative z-20 order-3 mx-auto mt-8 w-full max-w-site px-6 sm:px-10">
        <ol className="rm-list relative m-0 flex list-none gap-2 overflow-x-auto p-0 pb-2">
          <span className="rm-track hidden" aria-hidden="true" />
          {lit !== null && lit > 0 && (
            <span
              className="rm-track-lit hidden"
              style={{ "--from": lit - 1, "--to": lit } as CSSProperties}
              aria-hidden="true"
            />
          )}
          {MARKETS.map((m, i) => {
            const on = i === lit;
            const before = lit !== null && i === lit - 1;
            return (
              <li key={m.name} className="rm-item shrink-0">
                <button
                  type="button"
                  aria-pressed={i === active}
                  onClick={() => pick(i)}
                  {...hoverProps(i)}
                  className={`rm-link relative flex items-center gap-3 whitespace-nowrap rounded-full border px-3.5 py-2 font-heading text-[12.5px] font-semibold uppercase tracking-[0.06em] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-gold ${
                    on ? "rm-on border-gold text-white" : "border-white/15 text-white/75 hover:text-white"
                  }`}
                >
                  <span className={`rm-dot hidden ${on ? "rm-dot-on" : before ? "rm-dot-before" : ""}`} aria-hidden="true" />
                  {m.name}
                </button>
              </li>
            );
          })}
        </ol>
      </nav>

      {/* ---------- note for the market in focus ---------- */}
      <div className="rm-note-slot relative z-30 order-4 mx-auto w-full max-w-site px-6 sm:px-10" aria-live="polite">
        {note && noteIdx !== null && (
          <div
            key={note.name}
            className={`rm-note mt-4 max-w-[340px] rounded-xl border border-white/10 bg-deep/90 p-4 shadow-[0_12px_32px_rgba(0,0,0,0.45)] backdrop-blur ${note.at[1] > 450 ? "rm-note-up" : ""}`}
            style={{ "--nx": `${(note.at[0] / IMG_W) * 100}%`, "--ny": `${(note.at[1] / IMG_H) * 100}%` } as CSSProperties}
          >
            <p className="m-0 mb-1.5 font-heading text-[10.5px] font-bold tracking-[0.18em] text-gold">
              {noteIdx === HUB ? "HOME BASE · BANJUL" : `${note.capital.name.toUpperCase()} · ${KM[noteIdx].toLocaleString("en-US")} KM`}
            </p>
            <p className="m-0 text-[12.5px] leading-[1.55] text-white/85">{note.description}</p>
          </div>
        )}
      </div>

      <p className="rm-legal relative z-20 order-5 mx-auto m-0 w-full max-w-site px-6 pb-6 pt-6 text-[11px] leading-[1.5] text-white/45 sm:px-10">
        <strong className="text-gold/80">Illustrative concept only.</strong> Arcs show the regional outlook, not existing
        SOLIARIS transmission lines or power exports.
      </p>
    </section>
  );
}
