import { useEffect, useMemo, useRef, useState } from "react";
import { GEO_COUNTRIES, LOCATIONS } from "@/data/regionalMap";
import CountryFlag from "@/components/CountryFlag";

/**
 * "Where We Focus": the homepage's regional outlook.
 *
 * A framed card: a light panel listing the markets on the left, and a dark dotted map on the
 * right with a pin on every capital and dashed arcs from Banjul (home base). Hovering or
 * clicking a market flies the map to it; the +/− buttons zoom and the globe resets the view.
 * Geography lives in a "base" space (equirectangular degrees, x scaled by cos 13°) drawn under
 * one transform; pins, arcs and labels are projected to screen space so they stay crisp.
 */

const COS = Math.cos((13 * Math.PI) / 180);
const N = LOCATIONS.length;
const HUB = LOCATIONS[0];

type BBox = [lonMin: number, lonMax: number, latMin: number, latMax: number];
const REGION: BBox = [-18.5, 15, 3.8, 24];
const GAMBIA: BBox = [-19, -10, 10, 17.5];

const GOLD = "#F6B727";
const TEAL = "#0EC3A6";
const MAP_BG = "#031B33"; // deep

type View = { s: number; tx: number; ty: number };
type Rect = { x: number; y: number; w: number; h: number };

const bx = (lon: number) => lon * COS;
const by = (lat: number) => -lat;

function fit(b: BBox, r: Rect): View {
  const x0 = bx(b[0]), x1 = bx(b[1]), y0 = by(b[3]), y1 = by(b[2]);
  const s = Math.min(r.w / (x1 - x0), r.h / (y1 - y0));
  return { s, tx: r.x + r.w / 2 - ((x0 + x1) / 2) * s, ty: r.y + r.h / 2 - ((y0 + y1) / 2) * s };
}

/** Scale a view by k about a screen point. */
const zoomAbout = (v: View, k: number, cx: number, cy: number): View => ({
  s: v.s * k,
  tx: cx - (cx - v.tx) * k,
  ty: cy - (cy - v.ty) * k,
});

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- static geometry (computed once) ---------- */

const GEO_INDEX = new Map(LOCATIONS.map((l, i) => [l.geo, i]));
// Togo and Benin aren't markets but belong to the region, so they get region dots.
const REGION_EXTRA = new Set(["Togo", "Benin"]);

const COUNTRY_SHAPES = GEO_COUNTRIES.map((c) => {
  const pts = c.rings.flat();
  return {
    name: c.name,
    index: GEO_INDEX.get(c.name),
    inRegion: GEO_INDEX.has(c.name) || REGION_EXTRA.has(c.name),
    box: [
      Math.min(...pts.map((p) => p[0])),
      Math.max(...pts.map((p) => p[0])),
      Math.min(...pts.map((p) => p[1])),
      Math.max(...pts.map((p) => p[1])),
    ] as BBox,
    d: c.rings
      .map((r) => r.map(([lon, lat], i) => `${i ? "L" : "M"}${bx(lon).toFixed(3)},${by(lat).toFixed(3)}`).join("") + "Z")
      .join(""),
  };
});
const SHAPE_BY_INDEX = new Map(COUNTRY_SHAPES.filter((c) => c.index !== undefined).map((c) => [c.index!, c]));

/** Zoom box for a market: the country's bounds with room around it. */
function focusBox(i: number): BBox {
  const shape = SHAPE_BY_INDEX.get(i);
  if (i === 0 || !shape) return GAMBIA;
  const [l0, l1, a0, a1] = shape.box;
  const w = Math.max((l1 - l0) * 1.7, 8), h = Math.max((a1 - a0) * 1.7, 6);
  const cx = (l0 + l1) / 2, cy = (a0 + a1) / 2;
  return [cx - w / 2, cx + w / 2, cy - h / 2, cy + h / 2];
}

/** Great-circle distance in km, rounded to the nearest 10. */
function distanceKm(a: { lon: number; lat: number }, b: { lon: number; lat: number }) {
  const r = Math.PI / 180;
  const h =
    Math.sin(((b.lat - a.lat) * r) / 2) ** 2 +
    Math.cos(a.lat * r) * Math.cos(b.lat * r) * Math.sin(((b.lon - a.lon) * r) / 2) ** 2;
  return Math.round((2 * 6371 * Math.asin(Math.sqrt(h))) / 10) * 10;
}
const KM = LOCATIONS.map((l) => distanceKm(HUB.capital, l.capital));

const PIN = "M0 0C-1.6-4.6-8-8.4-8-14.4a8 8 0 1 1 16 0C8-8.4 1.6-4.6 0 0Z";

const PinIcon = ({ className }: { className?: string }) => (
  <svg width="9" height="11" viewBox="-9 -23 18 24" aria-hidden="true" className={className}>
    <path d={PIN} fill="currentColor" />
    <circle cy="-14.4" r="3" fill={MAP_BG} />
  </svg>
);

const ctrlBtn =
  "flex h-9 w-9 items-center justify-center rounded-[10px] bg-white text-navy shadow-[0_6px_18px_rgba(0,0,0,0.3)] transition-colors hover:bg-gold disabled:opacity-40 disabled:hover:bg-white";

/* ---------- component ---------- */

export default function RegionalMap() {
  const boxRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const hoverTimer = useRef<number | undefined>(undefined);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [active, setActive] = useState<number | null>(null);
  const [hoverPin, setHoverPin] = useState<number | null>(null);
  const [zoom, setZoom] = useState(1);
  const [view, setView] = useState<View | null>(null);
  const viewRef = useRef<View | null>(null);
  const [clock, setClock] = useState<string | null>(null);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setSize({ w: Math.round(entry.contentRect.width), h: Math.round(entry.contentRect.height) });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Banjul runs on GMT; set after mount so pre-rendering stays deterministic.
  useEffect(() => {
    const tick = () =>
      setClock(new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "UTC" }));
    tick();
    const id = window.setInterval(tick, 15000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => () => window.clearTimeout(hoverTimer.current), []);

  const rect = useMemo<Rect | null>(() => {
    if (!size.w || !size.h) return null;
    const pad = size.w < 640 ? 20 : 48;
    return { x: pad, y: pad, w: size.w - pad * 2, h: size.h - pad * 2 - 24 };
  }, [size]);

  // What the view is fitted to; a change of target animates, a resize snaps.
  const targetKey = `${active ?? "region"}@${zoom}`;
  const lastTarget = useRef(targetKey);

  useEffect(() => {
    if (!rect) return;
    const base = fit(active === null ? REGION : focusBox(active), rect);
    const to = zoomAbout(base, zoom, rect.x + rect.w / 2, rect.y + rect.h / 2);
    const from = viewRef.current;
    const targetChanged = lastTarget.current !== targetKey;
    lastTarget.current = targetKey;
    const apply = (v: View) => {
      viewRef.current = v;
      setView(v);
    };
    if (!from || !targetChanged || prefersReducedMotion()) {
      apply(to);
      return;
    }
    const cx = rect.x + rect.w / 2, cy = rect.y + rect.h / 2;
    const w0 = { x: (cx - from.tx) / from.s, y: (cy - from.ty) / from.s };
    const w1 = { x: (cx - to.tx) / to.s, y: (cy - to.ty) / to.s };
    const ls0 = Math.log(from.s), ls1 = Math.log(to.s);
    const start = performance.now();
    let raf = 0;
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / 1000);
      const e = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      const s = Math.exp(ls0 + (ls1 - ls0) * e);
      apply({ s, tx: cx - (w0.x + (w1.x - w0.x) * e) * s, ty: cy - (w0.y + (w1.y - w0.y) * e) * s });
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
    // targetKey encodes active + zoom
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetKey, rect]);

  const select = (i: number | null) => {
    window.clearTimeout(hoverTimer.current);
    setActive(i);
    setZoom(1);
  };
  // Hovering the list flies the map; a short delay keeps a quick sweep over the list from jittering it.
  const hoverSelect = (i: number) => {
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => select(i), 140);
  };
  const selectFromMap = (i: number) => {
    select(i);
    const list = listRef.current;
    const item = list?.children[i] as HTMLElement | undefined;
    if (list && item) list.scrollTo({ top: item.offsetTop - list.clientHeight / 2 + item.offsetHeight / 2, behavior: "smooth" });
  };

  const P = (lon: number, lat: number) => (view ? [bx(lon) * view.s + view.tx, by(lat) * view.s + view.ty] : [0, 0]);
  const banjul = P(HUB.capital.lon, HUB.capital.lat);

  const arcs = LOCATIONS.map((l, i) => {
    if (i === 0) return null;
    const [x1, y1] = P(l.capital.lon, l.capital.lat);
    const [x0, y0] = banjul;
    const dx = x1 - x0, dy = y1 - y0;
    const len = Math.hypot(dx, dy) || 1;
    // bow every arc upward, like a flight path
    let nx = -dy / len, ny = dx / len;
    if (ny > 0) { nx = -nx; ny = -ny; }
    const bow = len * 0.22;
    const cx = (x0 + x1) / 2 + nx * bow, cy = (y0 + y1) / 2 + ny * bow;
    // the curve's midpoint, for the distance label
    const mx = 0.25 * x0 + 0.5 * cx + 0.25 * x1, my = 0.25 * y0 + 0.5 * cy + 0.25 * y1;
    return { d: `M${x0.toFixed(1)},${y0.toFixed(1)}Q${cx.toFixed(1)},${cy.toFixed(1)} ${x1.toFixed(1)},${y1.toFixed(1)}`, mx, my };
  });

  const baseTransform = view ? `translate(${view.tx} ${view.ty}) scale(${view.s})` : undefined;
  const lit = hoverPin ?? active;

  /** Pill label next to a pin, flipped left near the right edge. */
  const pill = (i: number, text: string, hub = false) => {
    const [x, y] = P(LOCATIONS[i].capital.lon, LOCATIONS[i].capital.lat);
    const left = x > size.w - 210;
    return (
      <div
        key={`pill-${i}`}
        className={`pointer-events-none absolute z-10 whitespace-nowrap rounded-full px-2.5 py-1 text-[9.5px] font-bold tracking-[0.16em] shadow-[0_6px_18px_rgba(0,0,0,0.35)] ${
          hub ? "bg-gold text-navy" : "bg-tealBright text-navy"
        }`}
        style={{ left: x, top: y - 15, transform: `translate(${left ? "calc(-100% - 14px)" : "14px"}, -50%)` }}
      >
        {text}
      </div>
    );
  };

  return (
    <section id="regmap" aria-labelledby="regmap-title" className="bg-deep px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-site rounded-[24px] border border-white/10 bg-navy p-2.5 shadow-[0_40px_100px_rgba(0,0,0,0.45)] sm:p-3">
        <div className="grid gap-2.5 sm:gap-3 lg:h-[780px] lg:grid-cols-[400px_1fr]">
          {/* ---------- panel: intro + market list ---------- */}
          <div className="flex min-h-0 flex-col overflow-hidden rounded-[18px] border border-white/10 bg-deep">
            <div className="px-6 pb-5 pt-7 sm:px-7">
              <p className="m-0 mb-4 flex items-center gap-2 text-[10.5px] font-bold tracking-[0.22em] text-gold">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                WHERE WE FOCUS · {N} MARKETS
              </p>
              <h2 id="regmap-title" className="m-0 mb-4 font-serif text-[40px] leading-[1.02] tracking-[-0.02em] text-white sm:text-[44px]">
                Our reach. <span className="text-gold">Beyond borders.</span>
              </h2>
              <p className="m-0 text-[14px] leading-[1.6] text-white/70">
                Rooted in The Gambia, exploring opportunities to power growth and strengthen energy
                infrastructure across West Africa. <span className="hidden lg:inline">Hover a country to fly there.</span>
                <span className="lg:hidden">Tap a country to fly there.</span>
              </p>
            </div>

            <ul
              ref={listRef}
              className="rm-scroll relative m-0 max-h-[380px] min-h-0 flex-1 list-none space-y-2.5 overflow-y-auto px-3.5 pb-3.5 pt-1 sm:px-4 lg:max-h-none"
              onMouseLeave={() => window.clearTimeout(hoverTimer.current)}
            >
              {LOCATIONS.map((l, i) => {
                const isActive = i === active;
                const isLit = i === lit;
                return (
                  <li key={l.name}>
                    <button
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => select(i)}
                      onMouseEnter={() => hoverSelect(i)}
                      onFocus={() => select(i)}
                      className={`group flex w-full gap-3.5 rounded-[14px] border border-white/10 bg-white/[0.04] p-2.5 text-left outline-none ring-gold transition-[background-color,box-shadow,transform] duration-200 hover:-translate-y-px hover:bg-white/[0.08] hover:shadow-[0_10px_24px_rgba(0,0,0,0.25)] focus-visible:ring-2 ${
                        isActive ? "bg-white/[0.08] ring-2" : isLit ? "ring-1" : ""
                      }`}
                    >
                      <span className="flex w-[72px] shrink-0 items-center justify-center self-stretch overflow-hidden rounded-[10px] bg-white/[0.06]">
                        <CountryFlag geo={l.geo} className="h-[38px] w-[57px] rounded-[3px] shadow-[0_2px_6px_rgba(0,0,0,0.18)]" />
                      </span>
                      <span className="min-w-0 flex-1 py-0.5 pr-1.5">
                        <span className="mb-1 flex items-center gap-1.5 text-[9.5px] font-semibold tracking-[0.14em] text-white/55">
                          <PinIcon className={i === 0 ? "text-gold" : "text-tealBright"} />
                          {l.capital.name.toUpperCase()}, {l.name.toUpperCase()}
                        </span>
                        <span className="block text-[15px] font-semibold leading-tight text-white">{l.name}</span>
                        <span className="mt-1.5 flex items-baseline justify-between gap-2 text-[11.5px] text-white/55">
                          <span>{i === 0 ? "Home base" : "Regional outlook"}</span>
                          <span className="font-semibold text-gold">
                            {i === 0 ? "SOLIARIS HQ" : `${KM[i].toLocaleString("en-US")} km from Banjul`}
                          </span>
                        </span>
                        <span className={`grid transition-[grid-template-rows] duration-300 ${isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                          <span className="overflow-hidden">
                            <span className="block pt-2 text-[12.5px] leading-[1.55] text-white/75">{l.description}</span>
                          </span>
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* ---------- map ---------- */}
          <div
            ref={boxRef}
            className="relative h-[440px] overflow-hidden rounded-[18px] sm:h-[560px] lg:h-auto"
            style={{ background: `radial-gradient(120% 90% at 40% 45%, #0A3566 0%, #062956 50%, ${MAP_BG} 100%)` }}
          >
            {view && rect && (
              <svg
                width={size.w}
                height={size.h}
                className="absolute inset-0 font-body"
                role="group"
                aria-label="Dotted map of West Africa with a pin on each market's capital and arcs from Banjul"
              >
                <defs>
                  {/* constant 7px dot grid in screen space, whatever the zoom */}
                  {([
                    ["rm-dots", "#FFFFFF", 0.34],
                    ["rm-dots-dim", "#FFFFFF", 0.11],
                    ["rm-dots-hub", GOLD, 1],
                    ["rm-dots-sel", TEAL, 0.95],
                    ["rm-dots-hover", "#FFFFFF", 0.6],
                  ] as const).map(([id, color, op]) => (
                    <pattern key={id} id={id} patternUnits="userSpaceOnUse" width="7" height="7" patternTransform={`scale(${1 / view.s})`}>
                      <circle cx="3.5" cy="3.5" r="1.25" fill={color} fillOpacity={op} />
                    </pattern>
                  ))}
                </defs>

                {/* land */}
                <g transform={baseTransform}>
                  {COUNTRY_SHAPES.map((c) => {
                    const i = c.index;
                    const interactive = i !== undefined;
                    const fill =
                      i === 0 ? "url(#rm-dots-hub)"
                      : interactive && i === active ? "url(#rm-dots-sel)"
                      : interactive && i === hoverPin ? "url(#rm-dots-hover)"
                      : c.inRegion ? "url(#rm-dots)"
                      : "url(#rm-dots-dim)";
                    return (
                      <path
                        key={c.name}
                        d={c.d}
                        fill={fill}
                        stroke={interactive && i === active ? TEAL : "#FFFFFF"}
                        strokeOpacity={interactive && i === active ? 0.6 : c.inRegion ? 0.07 : 0.03}
                        strokeWidth="1"
                        strokeLinejoin="round"
                        vectorEffect="non-scaling-stroke"
                        className={interactive ? "cursor-pointer" : undefined}
                        onMouseEnter={interactive ? () => setHoverPin(i) : undefined}
                        onMouseLeave={interactive ? () => setHoverPin(null) : undefined}
                        onClick={interactive ? () => selectFromMap(i) : undefined}
                        aria-hidden="true"
                      />
                    );
                  })}
                </g>

                {/* arcs from Banjul; the active one is gold and flows */}
                <g fill="none" strokeLinecap="round" className="pointer-events-none" aria-hidden="true">
                  {arcs.map((a, i) =>
                    a && i !== active ? (
                      <path key={i} d={a.d} stroke="#FFFFFF" strokeOpacity={i === hoverPin ? 0.85 : 0.38} strokeWidth="1.1" strokeDasharray="3 4" />
                    ) : null,
                  )}
                  {active !== null && arcs[active] && (
                    <g key={active} className="rm-reveal">
                      <path d={arcs[active]!.d} stroke={GOLD} strokeWidth="1.8" strokeDasharray="5 5" className="rm-flow" />
                      <text
                        x={arcs[active]!.mx}
                        y={arcs[active]!.my - 9}
                        textAnchor="middle"
                        className="font-serif"
                        fontStyle="italic"
                        fontSize="13"
                        fill={GOLD}
                        stroke={MAP_BG}
                        strokeWidth="4"
                        strokeLinejoin="round"
                        style={{ paintOrder: "stroke" }}
                      >
                        {KM[active].toLocaleString("en-US")} km
                      </text>
                    </g>
                  )}
                </g>

                {/* pins: drawn back to front so the lit one sits on top */}
                {LOCATIONS.map((_, i) => i)
                  .sort((a, b) => Number(a === lit || a === 0) - Number(b === lit || b === 0))
                  .map((i) => {
                    const l = LOCATIONS[i];
                    const [x, y] = P(l.capital.lon, l.capital.lat);
                    const big = i === 0 || i === lit;
                    return (
                      <g
                        key={l.name}
                        transform={`translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${big ? 1.15 : 0.9})`}
                        className="cursor-pointer outline-none"
                        role="button"
                        tabIndex={-1}
                        aria-label={`Show ${l.name}`}
                        onMouseEnter={() => setHoverPin(i)}
                        onMouseLeave={() => setHoverPin(null)}
                        onClick={() => selectFromMap(i)}
                      >
                        <ellipse cy="0.5" rx="4" ry="1.6" fill="#000" fillOpacity=".35" />
                        <path d={PIN} fill={i === 0 ? GOLD : i === active ? TEAL : "#FFFFFF"} fillOpacity={i === 0 || i === lit ? 1 : 0.85} stroke="#FFFFFF" strokeOpacity=".9" strokeWidth={i === 0 || i === active ? 1.4 : 0} />
                        <circle cy="-14.4" r="3.1" fill={MAP_BG} />
                      </g>
                    );
                  })}
              </svg>
            )}

            {/* pin labels */}
            {view && pill(0, "SOLIARIS HQ · BANJUL", true)}
            {view && lit !== null && lit !== 0 &&
              pill(lit, `${LOCATIONS[lit].capital.name} · ${LOCATIONS[lit].name}`.toUpperCase())}

            {/* key */}
            <div className="pointer-events-none absolute left-3 top-3 flex flex-wrap items-center gap-x-4 gap-y-1 rounded-full border border-white/10 bg-deep/80 px-3.5 py-2 text-[10.5px] text-white/75 backdrop-blur sm:left-4 sm:top-4">
              <span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-full bg-gold" />Home base</span>
              <span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-full bg-tealBright" />Selected</span>
              <span className="hidden items-center gap-1.5 sm:flex"><i className="w-5 border-t-[1.5px] border-dashed border-white/70" />Distance from Banjul</span>
            </div>

            {/* status pill */}
            <div className="pointer-events-none absolute bottom-3 left-3 rounded-full bg-white px-3 py-1.5 text-[9.5px] font-bold tracking-[0.16em] text-navy shadow-[0_6px_18px_rgba(0,0,0,0.3)] sm:bottom-4 sm:left-4" style={{ fontVariantNumeric: "tabular-nums" }}>
              {N} MARKETS{clock ? ` · ${clock} GMT` : ""}
            </div>

            {/* zoom controls */}
            <div className="absolute bottom-3 right-3 flex flex-col gap-2 sm:bottom-4 sm:right-4">
              <button type="button" aria-label="Zoom in" className={ctrlBtn} disabled={zoom >= 4} onClick={() => setZoom((z) => Math.min(4, z * 1.5))}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
              </button>
              <button type="button" aria-label="Zoom out" className={ctrlBtn} disabled={zoom <= 0.67} onClick={() => setZoom((z) => Math.max(0.67, z / 1.5))}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true"><path d="M5 12h14" /></svg>
              </button>
              <button type="button" aria-label="Show the whole region" className={ctrlBtn} onClick={() => select(null)}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <p className="mx-auto mt-4 max-w-site px-2 text-[11px] leading-[1.5] text-white/50">
        <strong className="text-gold">Illustrative concept only.</strong> Arcs show straight-line distances between
        capitals, not existing SOLIARIS transmission lines or power exports. Boundaries: Natural Earth (generalized).
      </p>
    </section>
  );
}
