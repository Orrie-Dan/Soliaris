import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { LOCATIONS, type Location } from "@/data/regionalMap";
import { COUNTRIES, LOCATOR, VIEW, project } from "@/data/westAfricaMap";

/**
 * "Where We Focus": the homepage's regional outlook.
 *
 * Real geodata throughout: NASA Blue Marble shaded relief + bathymetry for the terrain and ocean
 * (public/images/regmap.webp, pre-toned from regmap-satellite.jpg) and Natural Earth country borders on top
 * (src/data/westAfricaMap.ts), both built for the same 1920×860 frame by
 * scripts/build-africa-map.mjs. Arcs run from Banjul to each market's capital at their real
 * coordinates; markers and countries can be picked on the map or in the index.
 * From 1280px the section takes the map's frame, with the copy over the Atlantic and the index
 * in the right margin (see .rm in globals.css). Below that the copy stacks above a crop of the map.
 */

const IMAGERY = "/images/regmap.webp";
const W = VIEW.w;
const H = VIEW.h;
const GOLD = "#F6B727";
const CYAN = "#3FD9E8";

/** Where a market's name sits relative to its capital. */
type Side = "l" | "r" | "t" | "b";
/**
 * Where the information card opens relative to the capital on wide screens (t/b = above/below,
 * l/r = left/right). Chosen per market so the card never covers The Gambia or the hub.
 */
type Place = "r" | "tr" | "trw" | "br" | "tl" | "t" | "b" | "bl" | "hub";

type Market = Location & {
  iso: string;
  side: Side;
  place: Place;
  /** Capital in map pixels. */
  at: [x: number, y: number];
};

// In the order of the index: north to south along the coast, then inland.
const PLACES: [name: string, iso: string, side: Side, place: Place][] = [
  ["Mauritania", "MRT", "t", "r"],
  ["Senegal", "SEN", "r", "trw"],
  ["The Gambia", "GMB", "l", "hub"],
  ["Guinea-Bissau", "GNB", "l", "br"],
  ["Guinea", "GIN", "l", "r"],
  ["Sierra Leone", "SLE", "l", "r"],
  ["Liberia", "LBR", "l", "tr"],
  ["Côte d’Ivoire", "CIV", "b", "tl"],
  ["Ghana", "GHA", "r", "t"],
  ["Burkina Faso", "BFA", "b", "b"],
  ["Mali", "MLI", "t", "b"],
  ["Niger", "NER", "r", "bl"],
];

const MARKETS: Market[] = PLACES.map(([name, iso, side, place]) => {
  const loc = LOCATIONS.find((l) => l.name === name)!;
  return { ...loc, iso, side, place, at: project(loc.capital.lon, loc.capital.lat) };
});
const HUB = MARKETS.findIndex((m) => m.iso === "GMB");
const MARKET_BY_ISO = new Map(MARKETS.map((m, i) => [m.iso, i]));

/** Great-circle distance in km between capitals, rounded to the nearest 10. */
function distanceKm(a: { lon: number; lat: number }, b: { lon: number; lat: number }) {
  const r = Math.PI / 180;
  const h =
    Math.sin(((b.lat - a.lat) * r) / 2) ** 2 +
    Math.cos(a.lat * r) * Math.cos(b.lat * r) * Math.sin(((b.lon - a.lon) * r) / 2) ** 2;
  return Math.round((2 * 6371 * Math.asin(Math.sqrt(h))) / 10) * 10;
}
const KM = MARKETS.map((m) => distanceKm(MARKETS[HUB].capital, m.capital));

/* ---------- static geometry ---------- */

const LAND = COUNTRIES.map((c) => c.d).join("");
const GAMBIA = COUNTRIES.find((c) => c.id === "GMB")!.d;
const OTHERS = COUNTRIES.filter((c) => !MARKET_BY_ISO.has(c.id));
// The Gambia last, so it sits on top of Senegal for clicks.
const MARKET_SHAPES = COUNTRIES.filter((c) => MARKET_BY_ISO.has(c.id))
  .map((c) => ({ ...c, index: MARKET_BY_ISO.get(c.id)! }))
  .sort((a, b) => Number(a.index === HUB) - Number(b.index === HUB));

// Arcs from Banjul, bowed to the north of the straight line.
const [HX, HY] = MARKETS[HUB].at;
const ARCS = MARKETS.map((m) => {
  const [x, y] = m.at;
  const dx = x - HX, dy = y - HY, len = Math.hypot(dx, dy);
  if (!len) return "";
  let nx = dy / len, ny = -dx / len;
  if (ny > 0 || (ny === 0 && nx > 0)) { nx = -nx; ny = -ny; }
  const k = Math.min(0.28 * len, 110);
  const cx = (HX + x) / 2 + nx * k, cy = (HY + y) / 2 + ny * k;
  return `M${HX.toFixed(1)},${HY.toFixed(1)}Q${cx.toFixed(1)},${cy.toFixed(1)} ${x.toFixed(1)},${y.toFixed(1)}`;
});
// Arcs grow out in order of distance from Banjul.
const ORDER = MARKETS.map((_, i) => i).sort((a, b) => KM[a] - KM[b]);
const DELAY = MARKETS.map((_, i) => ORDER.indexOf(i));

// 5° graticule, shown over the ocean only.
const range = (a: number, b: number, s: number) => Array.from({ length: Math.round((b - a) / s) + 1 }, (_, i) => a + i * s);
const GRATICULE = [
  ...range(-35, 10, 5).map((lon) => `M${project(lon, 0)[0].toFixed(1)},0V${H}`),
  ...range(5, 20, 5).map((lat) => `M0,${project(0, lat)[1].toFixed(1)}H${W}`),
].join("");

const pct = ([x, y]: [number, number]) => ({ left: `${(x / W) * 100}%`, top: `${(y / H) * 100}%` });
const ATLANTIC = project(-18, 5);

/* ---------- zoom ---------- */

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/** Each market's bounding box in map pixels, read from its border path. */
const BOX = MARKETS.map((m) => {
  const d = COUNTRIES.find((c) => c.id === m.iso)!.d;
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  for (const [, x, y] of d.matchAll(/(-?[\d.]+),(-?[\d.]+)/g)) {
    x0 = Math.min(x0, +x); x1 = Math.max(x1, +x);
    y0 = Math.min(y0, +y); y1 = Math.max(y1, +y);
  }
  return [x0, y0, x1, y1] as const;
});

/** A camera: the frame point (as fractions) held at the view's centre, and the zoom. */
type Cam = { cx: number; cy: number; s: number };
type Zoom = { s: number; tx: number; ty: number };

/**
 * Where a zoomed country sits on screen: between the copy and the index on wide screens, the
 * middle of the crop on narrow ones.
 */
const focusX = (wide: boolean) => (wide ? 0.61 : 0.55);

/** The full map. */
const homeCam = (wide: boolean): Cam => ({ cx: focusX(wide), cy: 0.5, s: 1 });

/** The camera that fits market i into the open part of the map. */
function camFor(i: number): Cam {
  const [x0, y0, x1, y1] = BOX[i];
  return {
    cx: (x0 + x1) / 2 / W,
    cy: (y0 + y1) / 2 / H,
    s: clamp(Math.min((0.42 * W) / (x1 - x0), (0.6 * H) / (y1 - y0)), 1, 2.4),
  };
}

/** Camera → scale and offset of the stage, clamped so the imagery always fills the frame. */
function toZoom({ cx, cy, s }: Cam, wide: boolean): Zoom {
  return { s, tx: clamp(focusX(wide) - cx * s, 1 - s, 0), ty: clamp(0.5 - cy * s, 1 - s, 0) };
}

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

/**
 * A flight between two cameras: the centre glides across while the zoom changes in log space,
 * easing out a little mid-way on long hops so the move reads as one sweep.
 */
function flight(a: Cam, b: Cam) {
  const d = Math.hypot(b.cx - a.cx, b.cy - a.cy) * Math.min(a.s, b.s);
  const dip = clamp(d * 0.6, 0, 0.4);
  const ms = Math.round(clamp(450 + d * 700, 450, 950));
  const at = (t: number): Cam => {
    const e = ease(t);
    const s = Math.exp(Math.log(a.s) + (Math.log(b.s) - Math.log(a.s)) * e) * (1 - dip * Math.sin(Math.PI * t));
    return { cx: a.cx + (b.cx - a.cx) * e, cy: a.cy + (b.cy - a.cy) * e, s: Math.max(1, s) };
  };
  return { ms, at };
}

/** The tour goes round the region in a loop: up the coast, across the Sahel, back along the Gulf. */
const TOUR = ["GMB", "SEN", "MRT", "MLI", "NER", "BFA", "GHA", "CIV", "LBR", "SLE", "GIN", "GNB"].map((iso) => MARKET_BY_ISO.get(iso)!);
const nextStop = (i: number | null) => TOUR[(TOUR.indexOf(i ?? -1) + 1) % TOUR.length];

/** How long the tour stays on each market, flight included. */
const TOUR_MS = 6000;

export default function RegionalMap() {
  // The Gambia is in focus by default; picking a market on the map or in the index moves the focus.
  const [active, setActive] = useState<number | null>(HUB);
  const [hover, setHover] = useState<number | null>(null);
  // The note only opens once someone has picked something.
  const [picked, setPicked] = useState(false);
  // Arcs draw in the first time the map scrolls into view.
  const [shown, setShown] = useState(false);
  // The tour only advances while the map is on screen.
  const [inView, setInView] = useState(false);
  const [touring, setTouring] = useState(false);
  // Wide layout (copy over the Atlantic) centres zoomed countries a little further right.
  const [wide, setWide] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setShown(true);
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        setInView(e.isIntersecting);
        if (e.isIntersecting) setShown(true);
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1280px)");
    const update = () => setWide(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Tour: step to the next market, pausing while someone hovers a market.
  useEffect(() => {
    if (!touring || !inView || hover !== null) return;
    const t = setTimeout(() => setActive(nextStop), TOUR_MS);
    return () => clearTimeout(t);
  }, [touring, inView, hover, active]);

  const lit = hover ?? active;
  const allLit = lit === null || lit === HUB;
  const noteIdx = hover ?? (picked ? active : null);
  const note = noteIdx === null ? null : MARKETS[noteIdx];

  // The map zooms onto the picked market (not the hovered one, so the map doesn't jump around).
  const zoomed = picked && active !== null;
  const target = zoomed ? camFor(active) : homeCam(wide);
  // Where the map comes to rest, used to choose the card's side.
  const rest = toZoom(target, wide);
  const onScreen = ([x, y]: [number, number]) => [(x / W) * rest.s + rest.tx, (y / H) * rest.s + rest.ty] as const;

  // Fly the camera to the target. It runs outside React: each frame writes --zs/--tx/--ty on the
  // section, which the stage, the labels' counter-scale and the card's position all read, so
  // they move in lockstep. --fly is the flight's length, which the card waits out.
  const cam = useRef<Cam | null>(null);
  const { cx: gx, cy: gy, s: gs } = target;
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const goal = { cx: gx, cy: gy, s: gs };
    const put = (c: Cam) => {
      const z = toZoom(c, wide);
      el.style.setProperty("--zs", z.s.toFixed(4));
      el.style.setProperty("--tx", z.tx.toFixed(4));
      el.style.setProperty("--ty", z.ty.toFixed(4));
      cam.current = c;
    };
    const from = cam.current;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!from || still) {
      el.style.setProperty("--fly", "0ms");
      el.style.setProperty("--card", "0ms");
      put(goal);
      return;
    }
    const { ms, at } = flight(from, goal);
    el.style.setProperty("--fly", `${ms}ms`);
    // The card opens as the map settles rather than after it stops, so a click answers sooner.
    el.style.setProperty("--card", `${Math.round(ms * 0.6)}ms`);
    // Promote the stage to its own layer only while it moves: a promoted layer is drawn once
    // and then stretched, which blurs the map when zoomed in. Once it stops, it's redrawn sharp.
    el.classList.add("rm-flying");
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - t0) / ms);
      put(at(t));
      if (t < 1) raf = requestAnimationFrame(tick);
      else el.classList.remove("rm-flying");
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      el.classList.remove("rm-flying");
    };
  }, [gx, gy, gs, wide]);

  const pick = (i: number) => {
    setTouring(false);
    setPicked(true);
    setActive(i);
  };
  const reset = () => {
    setTouring(false);
    setPicked(false);
    setActive(HUB);
  };
  const toggleTour = () => {
    if (touring) {
      setTouring(false);
      return;
    }
    setTouring(true);
    setActive(picked ? nextStop(active) : HUB);
    setPicked(true);
  };
  const hoverProps = (i: number) => ({
    onMouseEnter: () => setHover(i),
    onMouseLeave: () => setHover(null),
    onFocus: () => setHover(i),
    onBlur: () => setHover(null),
  });
  const mapPick = (i: number) => ({
    onClick: () => pick(i),
    onMouseEnter: () => setHover(i),
    onMouseLeave: () => setHover(null),
  });

  return (
    <section
      ref={ref}
      id="regmap"
      aria-labelledby="regmap-title"
      className={`rm relative flex flex-col overflow-hidden bg-deep ${shown ? "rm-shown" : ""}`}
      onKeyDown={(e) => {
        if (e.key === "Escape" && zoomed) reset();
      }}
    >
      {/* ---------- map ---------- */}
      <div className="rm-window relative order-2 mt-10 overflow-hidden">
        <div className="rm-stage absolute top-0 h-full">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="absolute inset-0 h-full w-full select-none"
            role="img"
            aria-label="Satellite map of West Africa with connections from The Gambia to Mauritania, Senegal, Guinea-Bissau, Guinea, Sierra Leone, Liberia, Côte d’Ivoire, Ghana, Burkina Faso, Mali and Niger"
          >
            <defs>
              <radialGradient id="rm-halo" cx={HX} cy={HY} r="150" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor={GOLD} stopOpacity=".35" />
                <stop offset="1" stopColor={GOLD} stopOpacity="0" />
              </radialGradient>
              <filter id="rm-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="rm-soft" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="5" />
              </filter>
              <filter id="rm-soft-lg" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="9" />
              </filter>
              <mask id="rm-sea-hard" maskUnits="userSpaceOnUse" x="0" y="0" width={W} height={H}>
                <rect width={W} height={H} fill="#fff" />
                <path d={LAND} fill="#000" />
              </mask>
            </defs>

            {/* satellite base (NASA Blue Marble shaded relief + bathymetry), land in natural colour and
                the ocean darkened, pre-toned by scripts/bake-map-imagery.py */}
            <image href={IMAGERY} width={W} height={H} preserveAspectRatio="none" />
            {/* clicking the open map (ocean or a country outside the outlook) zooms back out */}
            <rect
              width={W}
              height={H}
              fill="transparent"
              onClick={zoomed ? reset : undefined}
              className={zoomed ? "cursor-zoom-out" : ""}
            />
            <path d={GRATICULE} fill="none" stroke="#9AD4F5" strokeOpacity=".07" strokeWidth="1" mask="url(#rm-sea-hard)" />
            {/* soft cyan light along the coast, on the water side only */}
            <g mask="url(#rm-sea-hard)" fill="none" strokeLinejoin="round">
              <path d={LAND} stroke="#5FD3F5" strokeOpacity=".14" strokeWidth="16" filter="url(#rm-soft-lg)" />
              <path d={LAND} stroke="#8FE6FF" strokeOpacity=".28" strokeWidth="2.5" filter="url(#rm-soft)" />
            </g>

            {/* borders of the neighbouring countries */}
            <g fill="none" stroke="#fff" strokeOpacity=".22" strokeWidth=".8" strokeLinejoin="round">
              {OTHERS.map((c) => <path key={c.id} d={c.d} />)}
            </g>

            {/* glow under the selected country's border */}
            {lit !== null && lit !== HUB && (
              <path
                key={`g${lit}`}
                d={MARKET_SHAPES.find((c) => c.index === lit)!.d}
                className="rm-sel-glow pointer-events-none"
                fill="none"
                stroke={CYAN}
                strokeWidth="5"
                filter="url(#rm-soft)"
              />
            )}
            {/* The Gambia's glow, always on */}
            <path d={GAMBIA} fill={GOLD} stroke={GOLD} strokeWidth="10" opacity=".55" filter="url(#rm-soft)" className="pointer-events-none" />

            {/* the markets */}
            <g strokeLinejoin="round">
              {MARKET_SHAPES.map((c) => {
                const hub = c.index === HUB;
                const on = c.index === lit && !hub;
                return (
                  <path
                    key={c.id}
                    d={c.d}
                    {...mapPick(c.index)}
                    className={`rm-country ${hub ? "rm-country-hub" : on ? "rm-country-on" : ""}`}
                  />
                );
              })}
            </g>

            <circle cx={HX} cy={HY} r="150" fill="url(#rm-halo)" className="pointer-events-none" />

            {/* connections from Banjul */}
            <g fill="none" strokeLinecap="round" className="pointer-events-none">
              {/* soft glow under the lines */}
              <g filter="url(#rm-soft)">
                {ARCS.map((d, i) =>
                  d ? (
                    <path
                      key={i}
                      d={d}
                      pathLength={1}
                      className="rm-arc"
                      stroke={i % 2 ? CYAN : GOLD}
                      strokeOpacity={allLit ? 0.4 : i === lit ? 0.75 : 0.08}
                      strokeWidth={!allLit && i === lit ? 9 : 6}
                      style={{ "--d": `${DELAY[i] * 110}ms` } as CSSProperties}
                    />
                  ) : null,
                )}
              </g>
              {ARCS.map((d, i) =>
                d ? (
                  <path
                    key={i}
                    d={d}
                    pathLength={1}
                    className="rm-arc"
                    stroke={!allLit && i === lit ? (i % 2 ? "#9BEFF8" : "#FFD873") : i % 2 ? CYAN : GOLD}
                    strokeOpacity={allLit ? 0.95 : i === lit ? 1 : 0.45}
                    strokeWidth={!allLit && i === lit ? 3 : 2}
                    style={{ "--d": `${DELAY[i] * 110}ms` } as CSSProperties}
                  />
                ) : null,
              )}
              {/* light travelling out along the arcs in focus */}
              {shown &&
                ARCS.map((d, i) =>
                  d && (lit === HUB || i === lit) ? (
                    <circle key={`${lit}-${i}`} r="2.6" fill="#fff" className="rm-spark" filter="url(#rm-glow)">
                      <animateMotion dur="2.4s" begin={`${lit === HUB ? DELAY[i] * 0.2 : 0}s`} repeatCount="indefinite" path={d} />
                    </circle>
                  ) : null,
                )}
            </g>

            {/* destination markers */}
            <g>
              {MARKETS.map((m, i) => {
                if (i === HUB) return null;
                const on = i === lit;
                return (
                  <g key={m.iso} className="rm-mk" style={{ "--d": `${DELAY[i] * 110 + 900}ms` } as CSSProperties}>
                    <circle cx={m.at[0]} cy={m.at[1]} r="14" fill="transparent" className="cursor-pointer" {...mapPick(i)} />
                    <circle
                      cx={m.at[0]}
                      cy={m.at[1]}
                      r={on ? 5.5 : 4}
                      fill={on ? "#fff" : i % 2 ? CYAN : GOLD}
                      stroke="#031B33"
                      strokeWidth="1.2"
                      filter="url(#rm-glow)"
                      className="pointer-events-none transition-all duration-300"
                    />
                  </g>
                );
              })}
              {/* the hub at Banjul */}
              <g className="pointer-events-none">
                <circle cx={HX} cy={HY} r="15" fill="#031B33" fillOpacity=".55" stroke={GOLD} strokeOpacity=".7" strokeWidth="1.2" />
                <circle cx={HX} cy={HY} r="9" fill={GOLD} filter="url(#rm-glow)" />
                <circle cx={HX} cy={HY} r="4" fill="#fff" />
              </g>
            </g>
          </svg>

          {/* labels: HTML so they keep their size when the map is scaled down */}
          <span className="rm-ocean rm-fix pointer-events-none absolute" style={pct(ATLANTIC)} aria-hidden="true">
            Atlantic
            <br />
            Ocean
          </span>
          {MARKETS.map((m, i) =>
            i === HUB ? null : (
              <span
                key={m.iso}
                data-side={m.side}
                className={`rm-label rm-fix pointer-events-none absolute ${i === lit ? "rm-label-on" : ""}`}
                style={pct(m.at)}
                aria-hidden="true"
              >
                {m.name}
              </span>
            ),
          )}
          <span className="rm-hub rm-fix pointer-events-none absolute" style={pct(MARKETS[HUB].at)} aria-hidden="true">
            <svg viewBox="0 0 24 24" className="rm-pin" fill="currentColor" aria-hidden="true">
              <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
            </svg>
            The Gambia
          </span>

          {/* rings: always around the hub, and around the market in focus */}
          <span className="rm-pulse-at rm-fix pointer-events-none absolute" style={pct(MARKETS[HUB].at)} aria-hidden="true">
            <span className="rm-ring rm-ring-hub" />
            <span className="rm-ring rm-ring-hub" style={{ animationDelay: "1.1s" }} />
            <span className="rm-ring rm-ring-hub" style={{ animationDelay: "2.2s" }} />
          </span>
          {lit !== null && lit !== HUB && (
            <span key={`p${lit}`} className="rm-pulse-at rm-fix pointer-events-none absolute" style={pct(MARKETS[lit].at)} aria-hidden="true">
              <span className="rm-ring" />
              <span className="rm-ring" style={{ animationDelay: "1s" }} />
            </span>
          )}
        </div>

        {/* blend the map into the navy: top and bottom always, and on wide screens the left
            (behind the copy) and right (behind the index) as well */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "linear-gradient(to bottom,#031B33 0%,rgba(3,27,51,0) 12%,rgba(3,27,51,0) 86%,#031B33 100%)" }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 hidden xl:block"
          style={{
            background:
              "linear-gradient(90deg,rgba(3,27,51,.72) 0%,rgba(3,27,51,.42) 22%,rgba(3,27,51,.08) 32%,rgba(3,27,51,0) 36%,rgba(3,27,51,0) 83%,rgba(3,27,51,.62) 90%,rgba(3,27,51,.86) 100%)",
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
        <p className="rm-text m-0 max-w-[460px] text-[15px] leading-[1.7] text-white/90">
          Our home is The Gambia, and our vision extends across West Africa. We focus on energy
          development opportunities that support regional integration, economic growth, and a more
          secure energy future.
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={toggleTour}
            aria-pressed={touring}
            className="inline-flex items-center gap-2.5 rounded-full border border-gold bg-gold/10 px-4 py-2 font-heading text-[12px] font-bold uppercase tracking-[0.1em] text-white outline-none transition-colors hover:bg-gold/25 focus-visible:ring-2 focus-visible:ring-gold"
          >
            <svg viewBox="0 0 16 16" className="h-3 w-3 text-gold" fill="currentColor" aria-hidden="true">
              {touring ? <path d="M3.5 2h3v12h-3zM9.5 2h3v12h-3z" /> : <path d="M4 2.2v11.6a.6.6 0 0 0 .9.5l9.3-5.8a.6.6 0 0 0 0-1L4.9 1.7a.6.6 0 0 0-.9.5Z" />}
            </svg>
            {touring ? "Pause tour" : "Tour the region"}
          </button>
          {zoomed && (
            <button
              type="button"
              onClick={reset}
              className="rm-reset inline-flex items-center gap-2 rounded-full border border-white/25 px-4 py-2 font-heading text-[12px] font-bold uppercase tracking-[0.1em] text-white/80 outline-none transition-colors hover:border-white/60 hover:text-white focus-visible:ring-2 focus-visible:ring-gold"
            >
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
                <circle cx="7" cy="7" r="4.5" />
                <path d="M10.5 10.5 14 14M5 7h4" />
              </svg>
              Full map
            </button>
          )}
        </div>
      </div>

      {/* ---------- locator (wide screens) ---------- */}
      <div className="rm-locator pointer-events-none absolute z-20 hidden items-center gap-5" aria-hidden="true">
        <svg viewBox={`0 0 ${LOCATOR.w} ${LOCATOR.h}`} className="rm-locator-map">
          <g strokeLinejoin="round" strokeWidth=".6">
            {LOCATOR.countries.map((c) => (
              <path
                key={c.id}
                d={c.d}
                fill={c.id === "GMB" || MARKET_BY_ISO.has(c.id) ? GOLD : "rgba(255,255,255,.04)"}
                fillOpacity={c.id === "GMB" ? 1 : 0.75}
                stroke={MARKET_BY_ISO.has(c.id) ? GOLD : "#9FD0F0"}
                strokeOpacity={MARKET_BY_ISO.has(c.id) ? 0.9 : 0.45}
              />
            ))}
          </g>
        </svg>
        <span className="rm-locator-text">
          A more
          <br />
          connected
          <br />
          West Africa
        </span>
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
        {note && noteIdx !== null && (() => {
          const [nx] = onScreen(note.at);
          // Zoomed in, the hand-picked placements no longer apply: open the card on whichever
          // side of the capital has more room.
          const place = !zoomed || noteIdx === HUB ? note.place : nx > 0.62 ? "l" : "r";
          return (
          <div
            key={note.name}
            data-place={place}
            data-wait={noteIdx === hover ? undefined : ""}
            className="rm-note mt-4 max-w-[320px] overflow-hidden rounded-lg border border-white/10 bg-deep/85 px-4 pb-3.5 pt-3 shadow-[0_14px_36px_rgba(0,0,0,0.5)] backdrop-blur-md"
            style={{ "--fx": note.at[0] / W, "--fy": note.at[1] / H } as CSSProperties}
          >
            <div className="mb-1 flex items-baseline justify-between gap-3">
              <p className="m-0 font-heading text-[14px] font-extrabold uppercase tracking-[0.04em] text-white">{note.name}</p>
              <p className="m-0 whitespace-nowrap font-heading text-[10px] font-bold tracking-[0.16em] text-gold">
                {noteIdx === HUB ? "REGIONAL HUB" : `${KM[noteIdx].toLocaleString("en-US")} KM`}
              </p>
            </div>
            <p className="m-0 mb-2 font-heading text-[10px] font-semibold uppercase tracking-[0.16em] text-white/50">
              {noteIdx === HUB ? "Home base · Banjul" : `${note.capital.name} · from Banjul`}
            </p>
            <p className="m-0 text-[12.5px] leading-[1.55] text-white/85">{note.description}</p>
            {touring && hover === null && (
              <span
                key={active}
                className="rm-tour-bar absolute bottom-0 left-0 h-[2px] bg-gold/70"
                style={{ animationDuration: `calc(${TOUR_MS}ms - var(--fly, 0ms))` }}
                aria-hidden="true"
              />
            )}
          </div>
          );
        })()}
      </div>

      <p className="rm-legal relative z-20 order-5 mx-auto m-0 w-full max-w-site px-6 pb-6 pt-6 text-[11px] leading-[1.5] text-white/45 sm:px-10">
        <strong className="text-gold/80">Illustrative concept only.</strong> Arcs show the regional outlook, not existing
        SOLIARIS transmission lines or power exports. Imagery: NASA Blue Marble. Borders: Natural Earth.
      </p>
    </section>
  );
}
