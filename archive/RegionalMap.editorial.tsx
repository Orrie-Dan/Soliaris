import { useEffect, useMemo, useRef, useState } from "react";
import { GEO_COUNTRIES, LOCATIONS } from "@/data/regionalMap";
import CountryFlag from "@/components/CountryFlag";

/**
 * "Where We Focus" — interactive regional outlook on the homepage, drawn as an editorial map.
 *
 * Matte land on a framed ocean with coastal depth contours; the study region is solid,
 * neighbouring countries are hatched. The Gambia is gold, the selected market a flat teal,
 * and a dashed line gives the straight-line distance from Banjul to its capital.
 * Geography lives in a "base" space (equirectangular degrees, x scaled by cos 13°) and is
 * fitted into the frame; "Country focus" animates that fit down to the selected country.
 * Land is drawn in base space under one transform; lines, symbols and type are projected
 * to screen space each render so they stay crisp at any zoom.
 */

const COS = Math.cos((13 * Math.PI) / 180);
const N = LOCATIONS.length;
const HUB = LOCATIONS[0];

type BBox = [lonMin: number, lonMax: number, latMin: number, latMax: number];
// Wide Atlantic margin on the west so the offshore labels (The Gambia, Guinea-Bissau, Sierra Leone) fit.
const REGION: BBox = [-24.5, 16.2, 2.6, 27.5];
// Senegambia context: the generalized outlines get blocky if we zoom much tighter.
const GAMBIA: BBox = [-19, -10, 10, 17.5];

const GOLD = "#F6B727";
const TEAL = "#0EC3A6";
const OCEAN = "#042039";
const LAND = "#12324F";
const LAND_HOVER = "#183E60";
const CONTEXT_LAND = "#0A2640";
// Teal at ~34% over LAND, but opaque so the coastal contours underneath never show through.
const SELECTED_LAND = "#11636C";
const CONTOUR = "#5B93BA";

/** Coastal depth contours: [distance from the coast in px, opacity]. */
const CONTOURS: [number, number][] = [[44, 0.08], [30, 0.14], [19, 0.22], [11, 0.32], [5, 0.45]];

/** Desktop layout used by the map fit; keep in sync with the lg: classes of the text column, card and stats bar. */
const COL_W = 420;
const COL_GAP = 48;
const STATS_H = 92;
const STATS_BOTTOM = 56;

type View = { s: number; tx: number; ty: number };
type Rect = { x: number; y: number; w: number; h: number };
type Mode = "regional" | "focus";

const bx = (lon: number) => lon * COS;
const by = (lat: number) => -lat;

function fit(b: BBox, r: Rect): View {
  const x0 = bx(b[0]), x1 = bx(b[1]), y0 = by(b[3]), y1 = by(b[2]);
  const s = Math.min(r.w / (x1 - x0), r.h / (y1 - y0));
  return { s, tx: r.x + r.w / 2 - ((x0 + x1) / 2) * s, ty: r.y + r.h / 2 - ((y0 + y1) / 2) * s };
}

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- static geometry (computed once) ---------- */

const GEO_INDEX = new Map(LOCATIONS.map((l, i) => [l.geo, i]));
// Togo and Benin aren't markets but belong to the region, so they're drawn solid rather than hatched.
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
/** Every country as one path: the contours stroke its outline, which only shows along the coast. */
const ALL_LAND = COUNTRY_SHAPES.map((c) => c.d).join("");

const GRATICULE = [
  ...[-30, -25, -20, -15, -10, -5, 0, 5, 10, 15, 20, 25, 30].map((lon) => `M${bx(lon)},${by(40)}V${by(-10)}`),
  ...[-5, 0, 5, 10, 15, 20, 25, 30, 35].map((lat) => `M${bx(-40)},${by(lat)}H${bx(40)}`),
].join("");

/** Unlabelled-region names, set quietly. */
const PLACE_LABELS: { name: string; lon: number; lat: number; region: boolean; rotate?: number }[] = [
  // Togo is too narrow for a horizontal name, so it runs up the country.
  { name: "TOGO", lon: 1.05, lat: 8.0, region: true, rotate: -90 },
  { name: "BENIN", lon: 2.3, lat: 10.1, region: true },
  { name: "ALGERIA", lon: 0.5, lat: 25.4, region: false },
  { name: "CHAD", lon: 18.6, lat: 15.5, region: false },
  { name: "CAMEROON", lon: 12.3, lat: 5.3, region: false },
];
const WATER_LABELS = [
  { lines: ["Atlantic", "Ocean"], lon: -19.9, lat: 9.6 },
  { lines: ["Gulf of Guinea"], lon: 1.4, lat: 3.6 },
];

/** Zoom box for "Country focus": the country's bounds with room around it. */
function focusBox(i: number): BBox {
  const shape = SHAPE_BY_INDEX.get(i);
  if (i === 0 || !shape) return GAMBIA;
  const [l0, l1, a0, a1] = shape.box;
  const w = Math.max((l1 - l0) * 1.5, 7), h = Math.max((a1 - a0) * 1.5, 5);
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

const fmtLon = (v: number) => (v === 0 ? "0°" : `${Math.abs(v)}°${v < 0 ? "W" : "E"}`);
const fmtLat = (v: number) => (v === 0 ? "0°" : `${Math.abs(v)}°${v < 0 ? "S" : "N"}`);

/** Map type: [font size px, letter spacing em] per size class. */
const TYPE = {
  desktop: { l: [12, 0.26], m: [10.5, 0.2], s: [9.5, 0.16] },
  mobile: { l: [9.5, 0.18], m: [9, 0.14], s: [8.5, 0.12] },
} as const;

/* ---------- icons ---------- */

const ICONS = {
  bolt: "M13 2 4 14h7l-1 8 9-12h-7l1-8z",
  pylon: "M12 2 7 22M12 2l5 20M4 6h16M6.5 10.5h11M4 6v2.5M20 6v2.5M6.5 10.5V13M17.5 10.5V13M9.9 10.5l6 11M14.1 10.5l-6 11",
  people:
    "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  layers: "M12 2 2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  pin: "M12 22s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12zM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5",
  handshake:
    "m11 17 2 2a1 1 0 1 0 3-3M14 14l2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4M21 3l1 11h-2M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3M3 4h8",
};

const Icon = ({ name, size = 18, className }: { name: keyof typeof ICONS; size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d={ICONS[name]} />
  </svg>
);

const Arrow = ({ flip = false }: { flip?: boolean }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true" style={flip ? { transform: "scaleX(-1)" } : undefined}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const FEATURES = [
  { icon: "bolt", label: ["Power", "generation"] },
  { icon: "pylon", label: ["Grid", "connectivity"] },
  { icon: "people", label: ["Regional", "partnerships"] },
] as const;

const STATS = [
  { icon: "layers", label: ["Energy development", "opportunities"] },
  { icon: "pylon", label: ["Grid integration", "and reliability"] },
  { icon: "handshake", label: ["Regional", "collaboration"] },
] as const;

/* ---------- component ---------- */

export default function RegionalMap() {
  const boxRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  // read in an effect (not here) so pre-rendering works; nothing is drawn until the box is measured anyway
  const [isDesktop, setIsDesktop] = useState(false);
  const [selected, setSelected] = useState(1);
  const [hovered, setHovered] = useState<number | null>(null);
  const [mode, setMode] = useState<Mode>("regional");
  const [view, setView] = useState<View | null>(null);
  const viewRef = useRef<View | null>(null);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setSize({ w: Math.round(entry.contentRect.width), h: Math.round(entry.contentRect.height) });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => setIsDesktop(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // The map frame: right of the text column and above the stats bar on desktop, the whole box on mobile.
  const rect = useMemo<Rect | null>(() => {
    if (!size.w || !size.h) return null;
    if (isDesktop) {
      const gutter = Math.max(40, (size.w - 1360) / 2 + 40);
      const left = gutter + COL_W + COL_GAP;
      const right = size.w - Math.max(32, (size.w - 1360) / 2 + 32);
      const top = 40;
      return { x: left, y: top, w: right - left, h: size.h - top - STATS_BOTTOM - STATS_H - 36 };
    }
    return { x: 16, y: 8, w: size.w - 32, h: size.h - 56 };
  }, [size, isDesktop]);

  const focus = mode === "focus";
  // What the view is fitted to; a change of target animates, a resize snaps.
  const targetKey = focus ? `focus-${selected}` : "regional";
  const lastTarget = useRef(targetKey);

  useEffect(() => {
    if (!rect) return;
    const to = fit(focus ? focusBox(selected) : REGION, rect);
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
      const t = Math.min(1, (now - start) / 1100);
      const e = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      const s = Math.exp(ls0 + (ls1 - ls0) * e);
      apply({ s, tx: cx - (w0.x + (w1.x - w0.x) * e) * s, ty: cy - (w0.y + (w1.y - w0.y) * e) * s });
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
    // targetKey encodes focus + selected
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetKey, rect]);

  const select = (i: number) => setSelected(i);
  const step = (delta: number) => select((selected + delta + N) % N);

  const loc = LOCATIONS[selected];
  const type = isDesktop ? TYPE.desktop : TYPE.mobile;

  const P = (lon: number, lat: number) =>
    view ? [bx(lon) * view.s + view.tx, by(lat) * view.s + view.ty] : [0, 0];

  /* ----- distance line, Banjul → selected capital ----- */
  const banjul = P(HUB.capital.lon, HUB.capital.lat);
  const cap = P(loc.capital.lon, loc.capital.lat);
  let distance = null as null | { d: string; x: number; y: number; angle: number; km: number };
  if (selected !== 0) {
    const dx = cap[0] - banjul[0], dy = cap[1] - banjul[1];
    const len = Math.hypot(dx, dy) || 1;
    let angle = (Math.atan2(dy, dx) * 180) / Math.PI;
    if (angle > 90) angle -= 180;
    if (angle < -90) angle += 180;
    // label sits just above the line's midpoint
    let nx = -dy / len, ny = dx / len;
    if (ny > 0) { nx = -nx; ny = -ny; }
    distance = {
      d: `M${banjul[0].toFixed(1)},${banjul[1].toFixed(1)}L${cap[0].toFixed(1)},${cap[1].toFixed(1)}`,
      x: (banjul[0] + cap[0]) / 2 + nx * 7,
      y: (banjul[1] + cap[1]) / 2 + ny * 7,
      angle,
      km: distanceKm(HUB.capital, loc.capital),
    };
  }

  /* ----- frame furniture: graticule ticks, scale bar ----- */
  const ticks = { lon: [] as { v: number; x: number }[], lat: [] as { v: number; y: number }[] };
  let scale = null as null | { km: number; px: number };
  if (view && rect) {
    const stepDeg = [1, 2, 5, 10].find((k) => k * view.s >= 70) ?? 10;
    const lonAt = (x: number) => (x - view.tx) / view.s / COS;
    const latAt = (y: number) => -(y - view.ty) / view.s;
    for (let v = Math.ceil(lonAt(rect.x) / stepDeg) * stepDeg; v <= lonAt(rect.x + rect.w); v += stepDeg) {
      ticks.lon.push({ v, x: bx(v) * view.s + view.tx });
    }
    for (let v = Math.ceil(latAt(rect.y + rect.h) / stepDeg) * stepDeg; v <= latAt(rect.y); v += stepDeg) {
      ticks.lat.push({ v, y: by(v) * view.s + view.ty });
    }
    const pxPerKm = view.s / 111.32;
    const km = [1000, 500, 250, 200, 100, 50, 25].find((k) => k * pxPerKm <= (isDesktop ? 130 : 90)) ?? 25;
    scale = { km, px: km * pxPerKm };
  }

  const baseTransform = view ? `translate(${view.tx} ${view.ty}) scale(${view.s})` : undefined;
  const oceanHalo = { stroke: OCEAN, strokeWidth: 3, strokeLinejoin: "round" as const, style: { paintOrder: "stroke" } };
  // Small screens get a locator map: only the large countries are named (the card below names the selection).
  const showLabel = (i: number) => isDesktop || LOCATIONS[i].size === "l";

  return (
    <section id="regmap" aria-labelledby="regmap-title" className="relative overflow-hidden bg-deep text-white">
      <div className="relative flex flex-col lg:block lg:h-[900px]">
        {/* ---------- narrative + controls ---------- */}
        <div
          className="relative z-10 order-1 px-6 pb-6 pt-20 lg:absolute lg:left-[max(2.5rem,calc((100%-1360px)/2+2.5rem))] lg:top-[72px] lg:w-[420px] lg:p-0"
        >
          <p className="eyebrow-dark m-0 mb-6 tracking-[0.3em]">WHERE WE FOCUS</p>
          <h2 id="regmap-title" className="m-0 mb-6 font-heading text-[44px] font-extrabold leading-[1.04] tracking-[-0.025em] text-white lg:text-[54px]">
            Our Reach.<br /><span className="whitespace-nowrap text-gold">Beyond Borders.</span>
          </h2>
          <p className="m-0 mb-8 max-w-[420px] text-[16px] leading-[1.65] text-white/80">
            Rooted in The Gambia. Exploring opportunities to power growth and strengthen energy
            infrastructure across West Africa.
          </p>
          <div role="group" aria-label="Map view" className="inline-flex rounded-full border border-white/20 bg-white/[0.04] p-1">
            {(["regional", "focus"] as const).map((m) => (
              <button
                key={m}
                type="button"
                aria-pressed={mode === m}
                onClick={() => setMode(m)}
                className={`flex items-center gap-2 whitespace-nowrap rounded-full px-3.5 py-2.5 font-body text-[13px] font-semibold sm:gap-2.5 sm:text-[13.5px] transition-colors duration-200 sm:px-6 ${
                  mode === m ? "bg-gold text-navy shadow-[0_6px_20px_rgba(246,183,39,0.25)]" : "text-white/80 hover:text-white"
                }`}
              >
                <Icon name={m === "regional" ? "layers" : "pin"} size={17} />
                {m === "regional" ? "Regional outlook" : "Country focus"}
              </button>
            ))}
          </div>
        </div>

        {/* ---------- map ---------- */}
        <div ref={boxRef} className="relative order-2 h-[330px] sm:h-[520px] lg:absolute lg:inset-0 lg:h-full">
          {view && rect && (
            <svg
              width={size.w}
              height={size.h}
              className="absolute inset-0 font-body"
              role="group"
              aria-label="Map of West Africa showing The Gambia, the selected country and the distance between their capitals"
            >
              <defs>
                <clipPath id="rm-frame">
                  <rect x={rect.x} y={rect.y} width={rect.w} height={rect.h} />
                </clipPath>
                {/* constant 5px hatching for land outside the region, whatever the zoom */}
                <pattern id="rm-hatch" patternUnits="userSpaceOnUse" width="5" height="5" patternTransform={`scale(${1 / view.s}) rotate(45)`}>
                  <rect width="5" height="5" fill={CONTEXT_LAND} />
                  <path d="M0 0V5" stroke="#FFFFFF" strokeOpacity=".07" strokeWidth="1.2" />
                </pattern>
              </defs>

              <g clipPath="url(#rm-frame)">
                <rect x={rect.x} y={rect.y} width={rect.w} height={rect.h} fill={OCEAN} />

                {/* base-space layer: contours, graticule, land, borders */}
                <g transform={baseTransform} aria-hidden="true">
                  {CONTOURS.map(([dist, opacity]) => (
                    <g key={dist} fill="none" strokeLinejoin="round">
                      <path d={ALL_LAND} stroke={CONTOUR} strokeOpacity={opacity} strokeWidth={dist * 2 + 1} vectorEffect="non-scaling-stroke" />
                      <path d={ALL_LAND} stroke={OCEAN} strokeWidth={dist * 2 - 1} vectorEffect="non-scaling-stroke" />
                    </g>
                  ))}
                  <path d={GRATICULE} fill="none" stroke="#FFFFFF" strokeOpacity=".06" strokeWidth="1" strokeDasharray="2 3" vectorEffect="non-scaling-stroke" />
                  {COUNTRY_SHAPES.map((c) => {
                    const i = c.index;
                    const interactive = i !== undefined;
                    const isHub = i === 0;
                    const isSelected = interactive && !isHub && i === selected;
                    const fill = isHub ? GOLD : isSelected ? SELECTED_LAND : !c.inRegion ? "url(#rm-hatch)" : interactive && i === hovered ? LAND_HOVER : LAND;
                    return (
                      <path
                        key={c.name}
                        d={c.d}
                        className={`rm-fade ${interactive ? "cursor-pointer" : ""}`}
                        fill={fill}
                        stroke={isHub ? "#FFE08A" : isSelected ? TEAL : "#FFFFFF"}
                        strokeOpacity={isHub || isSelected ? 1 : c.inRegion ? 0.22 : 0.1}
                        strokeWidth={isSelected ? 1.5 : 0.8}
                        strokeLinejoin="round"
                        vectorEffect="non-scaling-stroke"
                        onMouseEnter={interactive ? () => setHovered(i) : undefined}
                        onMouseLeave={interactive ? () => setHovered(null) : undefined}
                        onClick={interactive ? () => select(i) : undefined}
                      />
                    );
                  })}
                </g>

                {/* water and place names */}
                <g aria-hidden="true" className="pointer-events-none" textAnchor="middle">
                  {WATER_LABELS.map((w) => {
                    const [x, y] = P(w.lon, w.lat);
                    return (
                      <text key={w.lines[0]} x={x} y={y} className="font-serif" fontStyle="italic" fontSize={isDesktop ? 13 : 10.5} letterSpacing=".08em" fill={CONTOUR} fillOpacity=".75">
                        {w.lines.map((line, n) => (
                          <tspan key={line} x={x} dy={n ? "1.3em" : 0}>{line}</tspan>
                        ))}
                      </text>
                    );
                  })}
                  {isDesktop &&
                    PLACE_LABELS.map((p) => {
                      const [x, y] = P(p.lon, p.lat);
                      return (
                        <text key={p.name} x={x} y={y} transform={p.rotate ? `rotate(${p.rotate} ${x} ${y})` : undefined} fontSize={p.region ? 8.5 : 9.5} fontWeight="600" letterSpacing=".2em" fill="#FFFFFF" fillOpacity={p.region ? 0.4 : 0.22}>
                          {p.name}
                        </text>
                      );
                    })}
                </g>

                {/* distance from Banjul */}
                {distance && (
                  <g key={selected} className="rm-reveal pointer-events-none" aria-hidden="true">
                    <path d={distance.d} fill="none" stroke={GOLD} strokeWidth="1.4" strokeDasharray="5 4" strokeLinecap="round" />
                    {isDesktop && (
                    <text
                      transform={`translate(${distance.x.toFixed(1)} ${distance.y.toFixed(1)}) rotate(${distance.angle.toFixed(1)})`}
                      textAnchor="middle"
                      className="font-serif"
                      fontStyle="italic"
                      fontSize={isDesktop ? 12 : 10.5}
                      fill={GOLD}
                      stroke={LAND}
                      strokeWidth="3"
                      strokeLinejoin="round"
                      style={{ paintOrder: "stroke" }}
                    >
                      {distance.km.toLocaleString("en-US")} km
                    </text>
                    )}
                  </g>
                )}

                {/* capitals: ring-and-dot symbols; the selected capital is named */}
                {LOCATIONS.map((l, i) => {
                  const [x, y] = P(l.capital.lon, l.capital.lat);
                  const isSelected = i === selected && i !== 0;
                  const nameLeft = x + 90 > rect.x + rect.w;
                  return (
                    <g key={l.capital.name} className="pointer-events-none" transform={`translate(${x.toFixed(1)} ${y.toFixed(1)})`} aria-hidden="true">
                      <circle r={isSelected ? 4 : 3.2} fill={i === 0 ? "#3B2A05" : OCEAN} stroke={i === 0 ? "#3B2A05" : "#FFFFFF"} strokeOpacity={isSelected ? 1 : 0.75} strokeWidth="1" />
                      <circle r={isSelected ? 1.8 : 1.3} fill={i === 0 ? GOLD : "#FFFFFF"} />
                      {isSelected && isDesktop && (
                        <text x={nameLeft ? -8 : 8} y="4" textAnchor={nameLeft ? "end" : "start"} className="font-serif" fontStyle="italic" fontSize={isDesktop ? 12 : 10.5} fill="#FFFFFF">
                          {l.capital.name}
                        </text>
                      )}
                    </g>
                  );
                })}

                {/* country names (also the keyboard targets) */}
                {LOCATIONS.map((l, i) => {
                  if (!showLabel(i)) return null;
                  const [x, y] = P(l.lon, l.lat);
                  const isHub = i === 0;
                  const isSelected = i === selected && !isHub;
                  const [fs0, track] = type[l.size];
                  const fs = isHub ? fs0 + 2 : isSelected ? fs0 + 1.5 : fs0;
                  const label = l.name.toUpperCase();
                  const end = l.anchor === "end";
                  const w = label.length * fs * (0.66 + track);
                  return (
                    <g
                      key={l.name}
                      className="rm-marker cursor-pointer outline-none"
                      transform={`translate(${x.toFixed(1)} ${y.toFixed(1)})`}
                      role="button"
                      tabIndex={0}
                      aria-label={`Show ${l.name}`}
                      aria-pressed={i === selected}
                      onClick={() => select(i)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          select(i);
                        }
                      }}
                      onMouseEnter={() => setHovered(i)}
                      onMouseLeave={() => setHovered(null)}
                      onFocus={() => setHovered(i)}
                      onBlur={() => setHovered(null)}
                    >
                      <rect className="rm-focus" x={end ? -w - 6 : -w / 2 - 6} y={-fs - 4} width={w + 12} height={isHub ? fs * 2.6 + 8 : fs + 10} rx="3" fill="none" stroke={GOLD} strokeWidth="1.2" />
                      <text
                        className="rm-fade"
                        textAnchor={end ? "end" : "middle"}
                        fontSize={fs}
                        fontWeight={isHub || isSelected ? 800 : 600}
                        letterSpacing={`${track}em`}
                        fill={isHub ? GOLD : "#FFFFFF"}
                        fillOpacity={isHub || isSelected ? 1 : i === hovered ? 0.95 : 0.62}
                        {...(end ? oceanHalo : {})}
                      >
                        {label}
                      </text>
                      {isHub && (
                        <text textAnchor="end" y={fs + 3} className="font-serif" fontStyle="italic" fontSize={isDesktop ? 12 : 10.5} fill="#FFFFFF" fillOpacity=".75" {...oceanHalo}>
                          Banjul · home base
                        </text>
                      )}
                    </g>
                  );
                })}
              </g>

              {/* frame, graticule ticks, scale bar, north arrow */}
              <g aria-hidden="true" className="pointer-events-none" fill="#FFFFFF" fontSize="9.5" letterSpacing=".04em" style={{ fontVariantNumeric: "tabular-nums" }}>
                <rect x={rect.x + 0.5} y={rect.y + 0.5} width={rect.w - 1} height={rect.h - 1} fill="none" stroke="#FFFFFF" strokeOpacity=".22" />
                {ticks.lon.map((t) => (
                  <g key={`lon${t.v}`}>
                    <path d={`M${t.x},${rect.y}v6M${t.x},${rect.y + rect.h}v-6`} stroke="#FFFFFF" strokeOpacity=".35" />
                    {isDesktop && (
                      <text x={t.x} y={rect.y + rect.h + 16} textAnchor="middle" fillOpacity=".4">{fmtLon(t.v)}</text>
                    )}
                  </g>
                ))}
                {ticks.lat.map((t) => (
                  <g key={`lat${t.v}`}>
                    <path d={`M${rect.x},${t.y}h6M${rect.x + rect.w},${t.y}h-6`} stroke="#FFFFFF" strokeOpacity=".35" />
                    {isDesktop && (
                      <text x={rect.x - 8} y={t.y + 3.5} textAnchor="end" fillOpacity=".4">{fmtLat(t.v)}</text>
                    )}
                  </g>
                ))}
                {scale && (
                  <g transform={`translate(${rect.x + 18} ${rect.y + rect.h - 20})`}>
                    <rect width={scale.px / 2} height="4" fillOpacity=".7" />
                    <rect x={scale.px / 2} width={scale.px / 2} height="4" fill="none" stroke="#FFFFFF" strokeOpacity=".7" />
                    <text y="-6" fillOpacity=".55">0</text>
                    <text x={scale.px} y="-6" textAnchor="end" fillOpacity=".55">{scale.km} km</text>
                  </g>
                )}
                <g transform={`translate(${rect.x + 24} ${rect.y + 22})`} fillOpacity=".6">
                  <text textAnchor="middle" fontSize="10" fontWeight="700">N</text>
                  <path d="M0 5 4 17 0 14.5-4 17Z" />
                </g>
              </g>
            </svg>
          )}

          {/* key */}
          <div className="pointer-events-none absolute bottom-1 left-4 right-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-[10.5px] text-white/75 lg:bottom-auto lg:left-auto lg:right-[calc(max(2rem,calc((100%-1360px)/2+2rem))+14px)] lg:top-[54px] lg:justify-start lg:gap-x-5 lg:rounded-[3px] lg:border lg:border-white/15 lg:bg-[#042039]/90 lg:px-4 lg:py-2.5 lg:text-[11.5px]">
            <span className="flex items-center gap-2"><i className="h-2.5 w-2.5 bg-gold" />Home base</span>
            <span className="flex items-center gap-2"><i className="h-2.5 w-2.5 border border-tealBright bg-[#11636C]" />Selected market</span>
            <span className="flex items-center gap-2">
              <svg width="9" height="9" viewBox="-4.5 -4.5 9 9" aria-hidden="true"><circle r="3.6" fill="none" stroke="#fff" strokeOpacity=".75" /><circle r="1.4" fill="#fff" /></svg>
              Capital
            </span>
            <span className="flex items-center gap-2"><i className="w-5 border-t-[1.5px] border-dashed border-gold" />Distance from Banjul</span>
          </div>
        </div>

        {/* ---------- detail card ---------- */}
        <div
          className="relative z-10 order-3 px-6 pb-6 pt-6 lg:absolute lg:bottom-[56px] lg:left-[max(2.5rem,calc((100%-1360px)/2+2.5rem))] lg:w-[420px] lg:p-0"
        >
          <div className="rounded-2xl border border-white/10 bg-[#062640]/75 p-6 shadow-[0_24px_60px_rgba(0,0,0,0.35)] backdrop-blur-md">
            <div className="mb-5 flex items-center justify-between">
              <p className="m-0 text-[11px] font-bold tracking-[0.24em] text-tealBright">REGIONAL ENERGY OUTLOOK</p>
              <span className="font-heading text-sm font-bold tracking-[0.06em] text-white/60">
                {String(selected + 1).padStart(2, "0")} / {N}
              </span>
            </div>
            <div aria-live="polite">
              <div className="mb-4 flex items-center gap-4">
                <CountryFlag geo={loc.geo} className="h-11 w-16 shrink-0 rounded-md shadow-[0_6px_16px_rgba(0,0,0,0.35)]" />
                <div className="min-w-0">
                  <h3 className="m-0 font-heading text-[26px] font-extrabold leading-tight text-white">{loc.name}</h3>
                  <p className="m-0 mt-0.5 text-[14px] text-white/70">
                    West Africa · {selected === 0 ? "Home base" : "Regional outlook"}
                  </p>
                </div>
              </div>
              <p className="m-0 min-h-[72px] text-[14.5px] leading-[1.6] text-white/85">{loc.description}</p>
            </div>
            <ul className="m-0 mt-5 grid list-none grid-cols-3 p-0">
              {FEATURES.map((f, n) => (
                <li key={f.icon} className={`flex flex-col items-center gap-2 text-center sm:flex-row sm:gap-2.5 sm:text-left ${n ? "border-l border-white/10 sm:pl-3" : "sm:pr-3"}`}>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 text-gold">
                    <Icon name={f.icon} size={17} />
                  </span>
                  <span className="text-[11.5px] leading-[1.35] text-white/80">
                    {f.label[0]}<br />{f.label[1]}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex items-center gap-2">
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous country"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/25 text-white/85 transition-colors hover:border-gold hover:text-gold"
              >
                <Arrow flip />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next country"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/25 text-white/85 transition-colors hover:border-gold hover:text-gold"
              >
                <Arrow />
              </button>
              <div className="mx-2 hidden min-w-0 flex-1 items-center sm:flex justify-center gap-[3px] overflow-hidden" aria-hidden="true">
                {LOCATIONS.map((l, i) => (
                  <span
                    key={l.name}
                    className={`h-[3px] shrink-0 rounded-full transition-all duration-300 ${i === selected ? "w-4 bg-gold" : "w-[7px] bg-white/25"}`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() => setMode(focus ? "regional" : "focus")}
                className="ml-auto flex shrink-0 items-center gap-2 rounded-full bg-gold px-4 py-2.5 text-[13px] font-bold text-navy shadow-[0_6px_20px_rgba(246,183,39,0.25)] transition-colors hover:bg-[#ffc843]"
              >
                {focus ? "View region" : "Explore country"}
                <Arrow flip={focus} />
              </button>
            </div>
          </div>
        </div>

        {/* ---------- stats ---------- */}
        <div
          className="relative z-10 order-4 px-6 pb-14 lg:absolute lg:bottom-[56px] lg:left-[calc(max(2.5rem,calc((100%-1360px)/2+2.5rem))+468px)] lg:right-[max(2rem,calc((100%-1360px)/2+2rem))] lg:h-[92px] lg:p-0"
        >
          <ul className="m-0 grid h-full list-none grid-cols-2 gap-y-5 rounded-2xl border border-white/10 bg-[#062640]/70 p-5 backdrop-blur-md lg:flex lg:items-center lg:px-0 lg:py-0">
            <li className="flex items-center gap-3 lg:flex-1 lg:justify-center">
              <Icon name="bolt" size={30} className="shrink-0 text-gold" />
              <span className="leading-tight">
                <strong className="block font-heading text-[24px] font-extrabold text-white">{N}</strong>
                <span className="text-[12px] text-white/80">West African countries</span>
              </span>
            </li>
            {STATS.map((s) => (
              <li key={s.icon} className="flex items-center gap-3 lg:flex-1 lg:justify-center lg:border-l lg:border-white/15">
                <Icon name={s.icon} size={30} className="shrink-0 text-gold" />
                <span className="text-[12.5px] leading-[1.45] text-white/85">
                  {s.label[0]}<br />{s.label[1]}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ---------- disclaimer ---------- */}
      <div className="border-t border-white/10 bg-[#021527]">
        <div className="mx-auto flex max-w-site flex-wrap justify-between gap-x-8 gap-y-1 px-6 py-4 text-[11px] leading-[1.5] text-white/55 lg:px-10">
          <p className="m-0">
            <strong className="text-gold">Illustrative concept only.</strong> Distances are straight-line
            between capitals, not existing SOLIARIS transmission lines or power exports.
          </p>
          <p className="m-0">Geographic boundaries: Natural Earth (generalized)</p>
        </div>
      </div>
    </section>
  );
}
