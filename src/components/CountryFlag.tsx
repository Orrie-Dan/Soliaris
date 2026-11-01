import type { ReactNode } from "react";

/** Simplified national flags (3:2) for the regional outlook card, keyed by `Location.geo`. */

function star(cx: number, cy: number, r: number) {
  const pts = Array.from({ length: 10 }, (_, i) => {
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    const rr = i % 2 ? r * 0.382 : r;
    return `${(cx + rr * Math.cos(a)).toFixed(2)},${(cy + rr * Math.sin(a)).toFixed(2)}`;
  });
  return `M${pts.join("L")}Z`;
}

const hBands = (colors: string[]) =>
  colors.map((c, i) => <rect key={i} x="0" y={(i * 20) / colors.length} width="30" height={20 / colors.length} fill={c} />);
const vBands = (colors: string[]) =>
  colors.map((c, i) => <rect key={i} x={(i * 30) / colors.length} y="0" width={30 / colors.length} height="20" fill={c} />);

const FLAGS: Record<string, ReactNode> = {
  Gambia: (
    <>
      <rect width="30" height="20" fill="#3A7728" />
      <rect width="30" height="6.5" fill="#CE1126" />
      <rect y="6.5" width="30" height="7" fill="#FFFFFF" />
      <rect y="7.5" width="30" height="5" fill="#0C1C8C" />
    </>
  ),
  Senegal: (
    <>
      {vBands(["#00853F", "#FDEF42", "#E31B23"])}
      <path d={star(15, 10, 3.2)} fill="#00853F" />
    </>
  ),
  Mauritania: (
    <>
      <rect width="30" height="20" fill="#D01C1F" />
      <rect y="3" width="30" height="14" fill="#00A95C" />
      <circle cx="15" cy="10.6" r="4.6" fill="#FFD700" />
      <circle cx="15" cy="8.9" r="4.4" fill="#00A95C" />
      <path d={star(15, 8.6, 1.9)} fill="#FFD700" />
    </>
  ),
  Mali: <>{vBands(["#14B53A", "#FCD116", "#CE1126"])}</>,
  Niger: (
    <>
      {hBands(["#E05206", "#FFFFFF", "#0DB02B"])}
      <circle cx="15" cy="10" r="2.2" fill="#E05206" />
    </>
  ),
  "Burkina Faso": (
    <>
      {hBands(["#EF2B2D", "#009E49"])}
      <path d={star(15, 10, 3.6)} fill="#FCD116" />
    </>
  ),
  "Guinea-Bissau": (
    <>
      <rect width="30" height="10" fill="#FCD116" />
      <rect y="10" width="30" height="10" fill="#009E49" />
      <rect width="10" height="20" fill="#CE1126" />
      <path d={star(5, 10, 3)} fill="#000000" />
    </>
  ),
  Guinea: <>{vBands(["#CE1126", "#FCD116", "#009460"])}</>,
  "Sierra Leone": <>{hBands(["#1EB53A", "#FFFFFF", "#0072C6"])}</>,
  Liberia: (
    <>
      {hBands(Array.from({ length: 11 }, (_, i) => (i % 2 ? "#FFFFFF" : "#BF0A30")))}
      <rect width="9.1" height="9.1" fill="#002868" />
      <path d={star(4.55, 4.7, 2.9)} fill="#FFFFFF" />
    </>
  ),
  "Côte d'Ivoire": <>{vBands(["#F77F00", "#FFFFFF", "#009E60"])}</>,
  Ghana: (
    <>
      {hBands(["#CE1126", "#FCD116", "#006B3F"])}
      <path d={star(15, 10, 3)} fill="#000000" />
    </>
  ),
  Nigeria: <>{vBands(["#008751", "#FFFFFF", "#008751"])}</>,
};

export default function CountryFlag({ geo, className }: { geo: string; className?: string }) {
  const flag = FLAGS[geo];
  if (!flag) return null;
  return (
    <svg viewBox="0 0 30 20" className={className} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {flag}
    </svg>
  );
}
