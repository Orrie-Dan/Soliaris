# SOLIARIS AFRICA LTD - Next.js Website: Complete Source

Project: Next.js 15.1.6 + TypeScript + Tailwind CSS 3.4 (App Router, fully static).
To rebuild manually: create each file below at its listed path inside a folder (e.g. `soliaris-next/`),
copy the binary assets listed in the Asset Manifest into `public/`, then run `npm install` and `npm run dev`.

## File tree
```
package.json
tsconfig.json
next.config.mjs
postcss.config.mjs
tailwind.config.ts
.gitignore
app/layout.tsx
app/globals.css
app/regmap.css
app/page.tsx
app/about/page.tsx
app/what-we-do/page.tsx
app/opportunities/page.tsx
app/opportunities/content.tsx
app/impact/page.tsx
app/partnerships/page.tsx
app/contact/page.tsx
app/contact/content.tsx
components/Header.tsx
components/Footer.tsx
components/Magnet.tsx
components/AutoVideo.tsx
components/ScrollTabs.tsx
components/RegionalMap.tsx
components/PartnerTimeline.tsx
public/regmap.js
public/images/*  (28 images - see Asset Manifest)
public/videos/*  (3 videos - see Asset Manifest)
```

---

## package.json

```json
{
  "name": "soliaris-africa",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "15.1.6",
    "react": "19.0.0",
    "react-dom": "19.0.0"
  },
  "devDependencies": {
    "@types/node": "22.10.5",
    "@types/react": "19.0.4",
    "@types/react-dom": "19.0.2",
    "autoprefixer": "10.4.20",
    "postcss": "8.4.49",
    "tailwindcss": "3.4.17",
    "typescript": "5.7.3"
  }
}
```

---

## tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

---

## next.config.mjs

```js
/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;
```

---

## postcss.config.mjs

```js
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;
```

---

## tailwind.config.ts

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#062956",
        deep: "#031B33",
        ocean: "#087F9B",
        teal: "#079B87",
        tealBright: "#0EC3A6",
        leaf: "#67AD59",
        gold: "#F6B727",
        goldDark: "#c7920f",
        mist: "#F5F7F9",
        ink: "#44566b",
        inkSoft: "#5b6b7a",
        hairline: "#e3e9ee",
        cardline: "#e6ecf1",
      },
      fontFamily: {
        heading: ["var(--font-manrope)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        serif: ["var(--font-baskerville)", "Georgia", "serif"],
      },
      maxWidth: {
        site: "1360px",
        content: "1280px",
      },
    },
  },
  plugins: [],
};
export default config;
```

---

## .gitignore

```text
node_modules/
.next/
out/
*.tsbuildinfo
next-env.d.ts
.DS_Store
```

---

## app/layout.tsx

```tsx
import type { Metadata } from "next";
import { Manrope, Inter, Libre_Baskerville } from "next/font/google";
import "./globals.css";
import "./regmap.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-manrope",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

const baskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-baskerville",
});

export const metadata: Metadata = {
  title: {
    default: "SOLIARIS AFRICA LTD — Powering a Brighter Africa",
    template: "%s | SOLIARIS AFRICA LTD",
  },
  description:
    "SOLIARIS AFRICA LTD is a Gambian company dedicated to developing reliable, sustainable and modern energy infrastructure across The Gambia and the wider West African region.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.variable} ${inter.variable} ${baskerville.variable} font-body antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
```

---

## app/globals.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  scroll-behavior: smooth;
}

body {
  @apply bg-white font-body text-navy;
  margin: 0;
}

@layer components {
  /* ---- shared typography ---- */
  .eyebrow {
    @apply flex items-center gap-3.5 font-body text-xs font-bold tracking-[0.2em] text-navy;
  }
  .eyebrow::after {
    content: "";
    width: 44px;
    height: 2px;
    @apply bg-teal;
  }
  .eyebrow-dark {
    @apply flex items-center gap-3.5 font-body text-[11px] font-bold tracking-[0.2em] text-white;
  }
  .eyebrow-dark::before {
    content: "";
    width: 28px;
    height: 2px;
    @apply bg-gold;
  }

  /* ---- buttons ---- */
  .btn-gold {
    @apply inline-flex items-center gap-2.5 rounded bg-gold px-7 py-4 font-heading text-sm font-bold tracking-[0.05em] text-navy transition-all duration-200;
  }
  .btn-gold:hover {
    @apply -translate-y-0.5 text-deep shadow-[0_10px_24px_rgba(246,183,39,0.35)];
  }
  .btn-teal {
    @apply inline-flex items-center gap-2 rounded-full bg-teal px-6 py-[13px] font-heading text-[13px] font-bold tracking-[0.04em] text-white transition-colors duration-200;
  }
  .btn-teal:hover {
    @apply bg-[#067f6f] text-white;
  }
  .btn-outline-light {
    @apply inline-flex items-center gap-2.5 rounded border-[1.5px] border-white/75 bg-transparent px-7 py-4 font-heading text-sm font-bold tracking-[0.05em] text-white transition-colors duration-200;
  }
  .btn-outline-light:hover {
    @apply border-gold text-gold;
  }

  /* ---- navigation ---- */
  .navlink {
    @apply whitespace-nowrap border-b-2 border-transparent px-0.5 py-1.5 font-body text-[13px] font-semibold tracking-[0.02em] text-navy transition-colors duration-200;
  }
  .navlink:hover {
    @apply text-teal;
  }
  .navlink.active {
    @apply border-teal text-teal;
  }
  .nav-overlay .navlink {
    color: #ffffff;
    text-shadow: 0 1px 10px rgba(3, 27, 51, 0.5);
  }
  .nav-overlay .navlink:hover,
  .nav-overlay .navlink.active {
    @apply text-gold;
    border-color: theme("colors.gold");
  }

  /* ---- cards ---- */
  .lift-card {
    @apply transition-all duration-300;
  }
  .lift-card:hover {
    @apply -translate-y-1.5 shadow-[0_18px_40px_rgba(6,41,86,0.12)];
  }
  .zoom-img {
    transition: transform 0.6s cubic-bezier(0.2, 0.7, 0.2, 1);
  }
  .lift-card:hover .zoom-img,
  .zoom-frame:hover .zoom-img {
    transform: scale(1.07);
  }
  .learnmore {
    @apply inline-flex items-center gap-2 font-heading text-xs font-bold tracking-[0.06em] text-goldDark transition-colors;
  }
  .lift-card:hover .learnmore {
    @apply text-navy;
  }
  .newstag {
    @apply self-start rounded-full border px-3 py-1.5 font-body text-[10.5px] font-bold tracking-[0.14em];
    color: #c7920f;
    border-color: rgba(246, 183, 39, 0.27);
    background: rgba(246, 183, 39, 0.06);
  }

  /* ---- hero entrance ---- */
  .heroFade {
    opacity: 0;
    transform: translateY(26px);
    animation: fadeUp 0.9s cubic-bezier(0.2, 0.7, 0.2, 1) forwards;
  }
  .d1 { animation-delay: 0.1s; }
  .d2 { animation-delay: 0.28s; }
  .d3 { animation-delay: 0.46s; }
  .d4 { animation-delay: 0.64s; }

  /* ---- magnet proximity items ---- */
  .magnet-item {
    transition: transform 0.35s ease-out;
    will-change: transform;
  }
}

/* ---- interior-page design classes (ported verbatim from the approved design) ---- */
.abtab{font:700 12px var(--font-inter),sans-serif;letter-spacing:.12em;color:#6b7c8d;background:none;border:none;border-bottom:2.5px solid transparent;padding:22px 2px 19px;cursor:pointer;transition:color .2s,border-color .2s;white-space:nowrap}
.abtab:hover{color:#062956}
.abtab.active{color:#062956;border-bottom-color:#062956}
.srow{border-bottom:1px solid #e9eef3}
.srow.rev .srfig{order:2}
.srow.rev .srcontent{order:1}
.srow.rev .srarrow{order:3}
.rownum{display:flex;align-items:center;gap:12px;margin:0 0 12px;font:800 12px var(--font-manrope),sans-serif;color:#F6B727;letter-spacing:.24em}
.rownum::after{content:"";width:34px;height:2px;background:#F6B727;opacity:.45}
.srow .srimg{transition:transform .6s cubic-bezier(.2,.7,.2,1)}
.srow:hover .srimg{transform:scale(1.06)}
.srow .srarrow{transition:all .3s}
.srow:hover .srarrow{background:#F6B727;border-color:#F6B727 !important;color:#062956;transform:translateX(6px)}
.srow:hover .learnmore svg{transform:translateX(4px)}
.learnmore svg{transition:transform .25s}
.storyimg{transition:transform .6s cubic-bezier(.2,.7,.2,1)}
.storyframe:hover .storyimg{transform:scale(1.05)}
.pill:hover svg{transform:scale(1.1)}
.pill svg{transition:transform .25s}
.fpill{font:700 12px var(--font-inter),sans-serif;letter-spacing:.08em;padding:11px 22px;border-radius:999px;border:1.5px solid rgba(255,255,255,.45);background:rgba(3,27,51,.35);color:#FFFFFF;cursor:pointer;transition:all .25s;white-space:nowrap}
.fpill:hover{border-color:#F6B727;color:#F6B727}
.fpill.active{background:#F6B727;border-color:#F6B727;color:#062956}
.ctab{font:700 12px var(--font-inter),sans-serif;letter-spacing:.08em;padding:11px 20px;border-radius:999px;border:1.5px solid #d4dde5;background:#FFFFFF;color:#44566b;cursor:pointer;transition:all .25s;white-space:nowrap}
.ctab:hover{border-color:#079B87;color:#079B87}
.ctab.active{background:#079B87;border-color:#079B87;color:#FFFFFF}
.fld{display:flex;flex-direction:column;gap:7px;flex:1 1 240px;min-width:220px}
.fld label{font:600 12px var(--font-inter),sans-serif;letter-spacing:.06em;color:#44566b}
.fld input,.fld select,.fld textarea{font:400 14px var(--font-inter),sans-serif;color:#062956;padding:13px 14px;border:1.5px solid #d4dde5;border-radius:4px;background:#FFFFFF;transition:border-color .2s,box-shadow .2s;width:100%;box-sizing:border-box}
.fld input:focus,.fld select:focus,.fld textarea:focus{outline:none;border-color:#079B87;box-shadow:0 0 0 3px rgba(7,155,135,.14)}
.fld textarea{resize:vertical;min-height:110px}
.errbox{background:#fdf2f2;border:1px solid #f0c9c9;color:#8a2f2f;font:500 13px/1.5 var(--font-inter),sans-serif;padding:12px 16px;border-radius:4px}
.okbox{background:#eefaf4;border:1px solid #bfe8d2;color:#13613f;font:500 13.5px/1.6 var(--font-inter),sans-serif;padding:16px 18px;border-radius:4px}
.ptrack{position:absolute;left:8%;right:8%;top:32px;height:2px;background:#dbe3ea}
.pfill{position:absolute;left:0;top:0;height:100%;width:0;background:#079B87;transition:width 1.6s cubic-bezier(.4,0,.2,1)}
.lit .pfill{width:100%}
.pstage{flex:1 1 200px;min-width:180px;position:relative;text-align:center;padding:0 16px}
.sicon{width:64px;height:64px;border-radius:50%;border:2px solid #dbe3ea;background:#FFFFFF;display:flex;align-items:center;justify-content:center;margin:0 auto;position:relative;transition:border-color .5s,box-shadow .5s}
.lit .s1 .sicon{transition-delay:.1s}
.lit .s2 .sicon{transition-delay:.5s}
.lit .s3 .sicon{transition-delay:.9s}
.lit .s4 .sicon{transition-delay:1.3s}
.lit .sicon{border-color:#079B87;box-shadow:0 0 0 6px rgba(7,155,135,.12)}
.pcat{position:relative;flex:1 1 420px;min-width:300px;height:280px;border-radius:6px;overflow:hidden;display:block}
.pcat .pcimg{transition:transform .6s cubic-bezier(.2,.7,.2,1)}
.pcat:hover .pcimg{transform:scale(1.07)}
.pcat .pcarrow{transition:all .3s}
.pcat:hover .pcarrow{background:#F6B727;border-color:#F6B727;color:#062956;transform:translateX(5px)}
@media (max-width:900px){ .ptrack{display:none} }
@media (prefers-reduced-motion:reduce){ .pfill{width:100%} }
.theme{flex:1 1 180px;min-width:170px;padding:8px 18px;transition:transform .25s}
.theme:hover{transform:translateY(-5px)}
.theme svg{transition:transform .25s}
.theme:hover svg{transform:scale(1.12)}

/* ---- homepage design classes (ported verbatim from the approved design) ---- */
.btn-goldline{display:inline-flex;align-items:center;gap:10px;border:1.5px solid #F6B727;color:#FFFFFF;font:700 14px var(--font-manrope),sans-serif;letter-spacing:.05em;padding:15px 28px;border-radius:4px;transition:background .2s,color .2s}
.btn-goldline:hover{background:rgba(246,183,39,.15);color:#FFFFFF}
.scrollPulse{animation:pulseDown 2.2s ease-in-out infinite}
@keyframes pulseDown{0%,100%{transform:translateY(0)}50%{transform:translateY(8px)}}
.pimg{transition:transform .6s cubic-bezier(.2,.7,.2,1)}
.pframe{transition:transform .35s ease-out;will-change:transform}
.pframe:hover .pimg{transform:skewX(7deg) translateX(-26px) scale(1.07)}
.ep{transition:flex-grow .55s cubic-bezier(.2,.7,.2,1),transform .35s ease-out;will-change:transform}
.ep .epimg{transition:transform .7s cubic-bezier(.2,.7,.2,1)}
.ep .epshade{transition:background .5s}
.ep:hover{flex-grow:1.45}
.ep:hover .epimg{transform:skewX(8deg) translateX(-80px) scale(1.09)}
.ep:hover .epshade{background:linear-gradient(to top,rgba(3,27,51,.92) 12%,rgba(3,27,51,.28) 55%,rgba(3,27,51,.12)) !important}
.ep:hover .eparrow{background:#F6B727;border-color:#F6B727;color:#062956;transform:translateX(6px)}
.eparrow{transition:all .3s}
.opp{overflow:hidden}
.opp .oppimg{transition:transform .7s cubic-bezier(.2,.7,.2,1)}
.opp:hover .oppimg{transform:scale(1.08)}
.opp:hover .eparrow{background:#F6B727;border-color:#F6B727;color:#062956}
.impactRow{transition:transform .25s}
.impactRow:hover{transform:translateX(6px)}

@keyframes fadeUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
  .heroFade {
    opacity: 1;
    transform: none;
  }
  .hero-video {
    display: none;
  }
  html {
    scroll-behavior: auto;
  }
}
```

---

## app/regmap.css

```css
/* Regional map (home section 4) - ported from the approved design; selectors live under #regmap's subtree */
/* ---- Section 4: interactive regional map ---- */

:root{--gold:#f6b727;--teal:#15d0c3;--navy:#041b30;--white:#f4f7f8}#regmap *{box-sizing:border-box}#regmap{margin:0;background:#031524;color:var(--white);font-family:Inter,ui-sans-serif,system-ui,-apple-system,Segoe UI,sans-serif}.shell{min-height:100vh;display:flex;flex-direction:column}.top{height:76px;display:flex;align-items:center;justify-content:space-between;padding:0 clamp(18px,4.8vw,78px);background:#061b2e;border-bottom:1px solid #ffffff17;position:relative;z-index:10}.brand{display:flex;gap:13px;align-items:center}.mark{width:40px;height:40px;border-radius:50%;background:conic-gradient(from 210deg,#067c99,#24ae86,#f6b727,#f6b727,#067c99);box-shadow:0 0 22px #15d0c32a}.brand strong{display:block;font-size:20px;letter-spacing:2.5px}.brand small{display:block;font-size:9px;letter-spacing:4px;color:#a9c3d2}.topnote{font-size:11px;letter-spacing:2px;color:#93b3c7}.badge{font-size:11px;border:1px solid #f6b72777;border-radius:30px;color:#ffd16b;padding:9px 14px}.stage{position:relative;flex:1;min-height:710px;overflow:hidden;background:radial-gradient(circle at 12% 13%,#edaf5970 0,transparent 19%),radial-gradient(circle at 76% 43%,#17645b 0,transparent 48%),linear-gradient(125deg,#133b59,#051f38 50%,#031727)}.map{position:absolute;inset:0;width:100%;height:100%}.country{fill:#163c31;stroke:#a4c9ae88;stroke-width:1.05;vector-effect:non-scaling-stroke;transition:fill .2s,stroke .2s;cursor:pointer}.country:nth-child(3n){fill:#1b4432}.country:nth-child(5n){fill:#254936}.country:hover,.country.selected{fill:#32705a;stroke:#e8f6df;stroke-width:1.8}.country.gambia{fill:#d6a42b;stroke:#ffe59b;stroke-width:2.5;filter:drop-shadow(0 0 8px #f6b727)}.ocean-lines{pointer-events:none;opacity:.25}.route{fill:none;stroke-width:2.4;stroke-linecap:round;opacity:.78;stroke-dasharray:7 9;animation:flow 1.6s linear infinite;filter:drop-shadow(0 0 4px currentColor)}.route.gold{stroke:#ffcb59;color:#ffbd43}.route.teal{stroke:#45e6d4;color:#22d7c4}.route.muted{opacity:.08;animation:none}.route.active{stroke-width:4;opacity:1}.node{cursor:pointer}.node circle{fill:#fff7da;stroke:#f6b727;stroke-width:3;filter:drop-shadow(0 0 8px #ffcf56)}.node text{fill:#fff;font-size:12px;font-weight:750;paint-order:stroke;stroke:#092234;stroke-width:3;stroke-linejoin:round;letter-spacing:.5px}.node.muted{opacity:.26}.hub{fill:#ffd05a;stroke:white;stroke-width:3;filter:drop-shadow(0 0 12px #f6b727)}.overlay{position:absolute;left:0;top:0;bottom:0;width:min(46%,640px);pointer-events:none;background:linear-gradient(90deg,#021b30f2 0%,#041d34e8 48%,#061d3188 78%,transparent)}.content{position:absolute;z-index:4;left:clamp(22px,5vw,82px);top:clamp(70px,15%,145px);max-width:410px;pointer-events:none}.rm-eyebrow{font-size:12px;letter-spacing:4px;font-weight:700;color:#65e3d5}.line{height:2px;background:var(--gold);width:66px;margin:18px 0 24px}#regmap h1{font-size:clamp(38px,4.5vw,72px);line-height:1.04;letter-spacing:-2.6px;margin:0 0 24px;font-weight:850}#regmap h1 em{font-style:normal;color:var(--teal)}.desc{font-size:clamp(14px,1.35vw,18px);line-height:1.65;color:#d2e1e8;margin:0 0 27px}.controls{pointer-events:auto;display:flex;gap:10px;flex-wrap:wrap}.btn{border:1px solid #f6b727a6;color:#f8f9f8;background:#071d30b8;border-radius:8px;padding:13px 18px;font-weight:750;cursor:pointer}.btn.primary,.btn.active{background:var(--gold);color:#102132}.btn:hover{filter:brightness(1.15)}.info{position:absolute;right:30px;bottom:80px;z-index:5;width:min(320px,calc(100% - 40px));background:#041b2de8;border:1px solid #6ba6a35e;box-shadow:0 20px 60px #0007;border-radius:14px;padding:23px;backdrop-filter:blur(14px)}.info .mini{color:#62dfcf;letter-spacing:2px;font-size:10px;font-weight:750}.info h2{font-size:24px;margin:8px 0}.info p{color:#c3d5db;font-size:13px;line-height:1.65;margin:0}.info .close{position:absolute;right:14px;top:11px;background:transparent;border:0;color:#b8c9d0;font-size:24px;cursor:pointer}.foot{position:absolute;bottom:0;left:0;right:0;padding:16px 30px;background:#021522d9;border-top:1px solid #ffffff22;z-index:6;display:flex;justify-content:space-between;gap:20px;font-size:11px;color:#a5c1ce}.foot strong{color:#f5c65c}.legend{position:absolute;right:28px;top:28px;z-index:4;display:flex;gap:18px;font-size:11px;letter-spacing:.4px;background:#051a2baf;border:1px solid #ffffff1b;border-radius:50px;padding:12px 17px}.legend span{display:flex;align-items:center;gap:7px}.dot{height:9px;width:9px;border-radius:50%;display:inline-block;background:var(--gold)}.dot.t{background:var(--teal)}@keyframes flow{to{stroke-dashoffset:-32}}@media(prefers-reduced-motion:reduce){.route{animation:none}}@media(max-width:760px){.top{height:64px}.topnote{display:none}.brand strong{font-size:15px}.badge{font-size:9px}.stage{min-height:900px}.overlay{width:100%;height:55%;bottom:auto;background:linear-gradient(#031c31fa,#041d31e0 70%,transparent)}.content{top:65px;max-width:calc(100% - 40px)}#regmap h1{font-size:45px}.desc{font-size:14px;max-width:380px}.map{top:270px;height:610px;width:155%;left:-18%}.legend{top:auto;bottom:282px;right:14px;font-size:10px}.info{right:15px;bottom:83px;width:calc(100% - 30px);padding:15px}.info h2{font-size:19px}.foot{font-size:9px;padding:12px 15px;line-height:1.4}}

/* Cinematic Atlantic-left / geographic map-right presentation */
.stage{background:linear-gradient(110deg,#061c32 0%,#0b334a 40%,#102f2d 70%,#081b2b 100%)}
.country{fill:#254b38;stroke:#c3d8c8b8;stroke-width:1.1;filter:drop-shadow(0 0 1px #9ed1a13b)}
.country:nth-child(3n){fill:#31563b}.country:nth-child(5n){fill:#3b5535}
.country.gambia{fill:#e8ae25;stroke:#fff0a3;stroke-width:2.7}
.overlay{width:39%;background:linear-gradient(90deg,#02192ad9 0%,#041d30bd 63%,#061d3140 91%,transparent)}
.content{left:clamp(26px,4vw,70px);max-width:min(365px,30vw);top:clamp(68px,13%,125px)}
#regmap h1{font-size:clamp(38px,4vw,62px)}
.desc{font-size:clamp(13px,1.12vw,16px)}
.route{stroke-width:2.7;stroke-dasharray:3 10;animation:flow 1.4s linear infinite;filter:drop-shadow(0 0 6px currentColor)}
.route.gold{stroke:#ffd15b}.route.teal{stroke:#36e2d6}
.node circle{filter:drop-shadow(0 0 9px #ffcd4e)}
.map{filter:saturate(.91)}
@media(max-width:760px){.overlay{width:100%;height:55%;background:linear-gradient(#031c31f5,#041d31d9 70%,transparent)}.content{max-width:calc(100% - 40px)}.map{top:270px;height:610px;width:155%;left:-18%}}
#regmap .stage{height:100%}
```

---

## app/page.tsx

```tsx
import Link from "next/link";
import Image from "next/image";
import Header, { HOME_LINKS } from "@/components/Header";
import Footer from "@/components/Footer";
import Magnet from "@/components/Magnet";
import RegionalMap from "@/components/RegionalMap";

const Arrow = ({ size = 14, width = 2.4 }: { size?: number; width?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={width} aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export default function HomePage() {
  return (
    <div className="relative bg-white">
      <Header
        variant="overlay"
        links={HOME_LINKS}
        cta={{ href: "/opportunities", label: "Explore Opportunities" }}
      />

      {/* ============ SECTION 1 · CINEMATIC HERO ============ */}
      <section aria-label="Powering a Brighter Africa" className="relative h-[820px] overflow-hidden bg-deep">
        <Image
          src="/images/home-hero-sunset.jpg"
          alt="Sunset over a large solar farm beside coastal wetlands, a winding river and a distant city"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "70% center" }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(3,27,51,.72) 0%,rgba(3,27,51,.25) 40%,rgba(3,27,51,.05) 72%)" }} aria-hidden="true" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(100deg,rgba(3,27,51,.55) 0%,rgba(3,27,51,.2) 42%,rgba(3,27,51,0) 66%)" }} aria-hidden="true" />
        <div className="absolute inset-x-0 top-0 h-[150px]" style={{ background: "linear-gradient(to bottom,rgba(3,27,51,.55),rgba(3,27,51,0))" }} aria-hidden="true" />

        <div className="absolute inset-0 mx-auto flex max-w-site flex-col justify-center px-6 lg:px-10">
          <div className="max-w-[760px] pt-[72px]">
            <div className="heroFade d1 mb-[18px] flex items-center gap-4">
              <span aria-hidden="true" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-[1.5px] border-white/80 bg-white/10">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="#FFFFFF" aria-hidden="true"><path d="M7 4.5v15l13-7.5z" /></svg>
              </span>
              <p className="m-0 text-[11px] font-bold leading-[1.8] tracking-[0.24em] text-white">
                THE ENERGY TRANSITION<br />IN MOTION
              </p>
            </div>
            <h1 className="heroFade d2 m-0 mb-4 font-heading text-[52px] font-extrabold leading-[0.98] tracking-[-0.015em] text-white lg:text-[82px]">
              POWERING A<br /><span className="text-gold">BRIGHTER AFRICA.</span>
            </h1>
            <p className="heroFade d3 m-0 mb-[26px] max-w-[460px] text-[16.5px] leading-[1.6] text-white/95">
              Developing the future of power in The Gambia and West Africa.
            </p>
            <div className="heroFade d4 flex flex-wrap gap-4">
              <a href="#energy-systems" className="btn-gold !rounded-md !px-[22px] !py-[13px] !text-[13.5px] !tracking-[0.01em]" style={{ background: "rgba(246,183,39,.92)" }}>
                Explore Our Solutions
                <Arrow />
              </a>
              <a href="#purpose" className="btn-goldline" style={{ padding: "12px 24px", fontSize: "13.5px", letterSpacing: ".01em", borderRadius: "6px" }}>
                Learn More
              </a>
            </div>
          </div>
        </div>

        {/* slide rail */}
        <div aria-hidden="true" className="absolute right-11 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-3.5 lg:flex">
          <span className="font-heading text-sm font-bold text-gold">01</span>
          <span className="h-[34px] w-[1.5px] bg-white/50" />
          <span className="font-heading text-xs font-semibold text-white/75">06</span>
          <span className="h-2.5" />
          <span className="h-[7px] w-[7px] rounded-full bg-gold" />
          {[0, 1, 2, 3, 4].map((i) => (
            <span key={i} className="h-[5px] w-[5px] rounded-full bg-white/45" />
          ))}
        </div>

        <a href="#purpose" aria-label="Scroll to explore" className="absolute bottom-10 right-11 hidden items-center gap-3.5 lg:flex">
          <span className="text-[10px] font-bold tracking-[0.26em] text-white/85">SCROLL TO EXPLORE</span>
          <span className="scrollPulse flex h-[42px] w-[42px] items-center justify-center rounded-full border-[1.5px] border-white/80">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.2" aria-hidden="true"><path d="M12 5v14M6 13l6 6 6-6" /></svg>
          </span>
        </a>
      </section>

      {/* ============ SECTION 2 · OUR PURPOSE ============ */}
      <Magnet id="purpose" selector=".pframe" radius={250} pull={0.12} grow={0.03} aria-label="Our purpose" className="bg-white px-6 py-[100px] pt-[110px] lg:px-10">
        <div className="mx-auto flex max-w-content flex-wrap items-center gap-14">
          <div className="min-w-[320px] flex-[1_1_400px]">
            <p className="eyebrow mb-[26px]">OUR PURPOSE</p>
            <h2 className="m-0 mb-[26px] font-heading text-[42px] font-extrabold leading-[1.02] tracking-[-0.015em] text-navy lg:text-[68px]">
              ENERGY<br />IS MORE<br /><span className="text-teal">THAN POWER.</span>
            </h2>
            <p className="m-0 max-w-[430px] text-base leading-[1.75] text-ink">
              Energy strengthens <strong className="text-navy">communities</strong>, supports{" "}
              <strong className="text-navy">growing economies</strong>, and creates opportunities for
              future generations. SOLIARIS AFRICA LTD is focused on advancing sustainable energy
              development and modern infrastructure.
            </p>
          </div>
          <div className="flex min-w-[320px] flex-[1_1_560px] items-center justify-end gap-[34px]">
            <div className="flex gap-4 overflow-hidden py-1.5">
              {[
                { src: "/images/purpose-pylons.jpg", alt: "High-voltage transmission towers at dusk" },
                { src: "/images/purpose-solar.jpg", alt: "Solar photovoltaic panels" },
                { src: "/images/purpose-city.jpg", alt: "Aerial view of a growing African city" },
              ].map((img) => (
                <figure key={img.src} className="pframe m-0 h-[390px] w-[184px] shrink-0 overflow-hidden rounded" style={{ transform: "skewX(-7deg)" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="pimg h-full object-cover" src={img.src} alt={img.alt} style={{ width: "150%", transform: "skewX(7deg) translateX(-26px)" }} />
                </figure>
              ))}
            </div>
            <div aria-hidden="true" className="flex shrink-0 gap-[18px]">
              <span className="w-px bg-[#d7dfe6]" />
              <div className="flex flex-col justify-center gap-6">
                <span className="text-[10px] font-bold tracking-[0.2em] text-[#6b7c8d]">PEOPLE</span>
                <span className="text-[10px] font-bold tracking-[0.2em] text-[#6b7c8d]">INFRASTRUCTURE</span>
                <span className="text-[10px] font-bold tracking-[0.2em] text-[#6b7c8d]">OPPORTUNITY</span>
                <span className="text-[10px] font-bold tracking-[0.2em] text-ocean">A CLEANER<br />TOMORROW</span>
              </div>
            </div>
          </div>
        </div>
      </Magnet>

      {/* ============ SECTION 3 · EXPLORE OUR ENERGY SYSTEMS ============ */}
      <Magnet id="energy-systems" selector=".ep" radius={330} pull={0.06} grow={0.02} aria-label="Explore our energy systems" className="overflow-hidden bg-deep pt-[54px]">
        <div className="mx-auto max-w-site px-6 pb-[34px] lg:px-10">
          <p className="eyebrow-dark m-0">EXPLORE OUR ENERGY SYSTEMS</p>
        </div>
        <div className="-mx-[70px] flex h-[500px] overflow-hidden">
          {[
            {
              href: "/what-we-do",
              src: "/images/panel-solar-wind.jpg",
              alt: "Solar panels at sunset with wind turbines in the background",
              title: <>SOLAR &amp;<br />WIND ENERGY</>,
              copy: "Renewable solutions for a more resilient Africa.",
              pad: "0 56px 44px 110px",
              goldArrow: false,
              border: true,
            },
            {
              href: "/what-we-do",
              src: "/images/panel-power.jpg",
              alt: "Industrial power plant structures in a tropical setting",
              title: <>POWER<br />DEVELOPMENT</>,
              copy: "Independent power projects for sustainable growth.",
              pad: "0 56px 44px 80px",
              goldArrow: true,
              border: true,
            },
            {
              href: "/what-we-do",
              src: "/images/panel-grid.jpg",
              alt: "Transmission towers and power lines silhouetted against an orange sunset sky",
              title: <>GRID &amp;<br />INFRASTRUCTURE</>,
              copy: "Stronger grids for brighter communities.",
              pad: "0 110px 44px 80px",
              goldArrow: false,
              border: false,
            },
          ].map((p, i) => (
            <Link
              key={i}
              href={p.href}
              className="ep relative min-w-[240px] flex-[1_1_0] overflow-hidden"
              style={{ transform: "skewX(-8deg)", borderRight: p.border ? "2px solid rgba(3,27,51,.9)" : undefined }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="epimg absolute inset-0 h-full object-cover" src={p.src} alt={p.alt} style={{ width: "140%", transform: "skewX(8deg) translateX(-80px)" }} />
              <span className="epshade absolute inset-0" style={{ background: "linear-gradient(to top,rgba(3,27,51,.96) 10%,rgba(3,27,51,.45) 52%,rgba(3,27,51,.22))" }} aria-hidden="true" />
              <span className="absolute inset-x-0 bottom-0 block" style={{ padding: p.pad, transform: "skewX(8deg)" }}>
                <span className="block font-heading text-[30px] font-extrabold leading-[1.1] tracking-[0.01em] text-white">{p.title}</span>
                <span className="mt-3 block max-w-[240px] text-sm leading-[1.55] text-white/80">{p.copy}</span>
                <span
                  className="eparrow mt-5 flex h-[46px] w-[46px] items-center justify-center rounded-full border-[1.5px]"
                  style={p.goldArrow ? { borderColor: "#F6B727", color: "#F6B727" } : { borderColor: "rgba(255,255,255,.75)", color: "#FFFFFF" }}
                >
                  <Arrow size={16} width={2.2} />
                </span>
              </span>
            </Link>
          ))}
        </div>
      </Magnet>

      {/* ============ SECTION 4 · THE GAMBIA AND BEYOND (interactive map) ============ */}
      <RegionalMap />

      {/* ============ SECTION 5 + 6 · OPPORTUNITIES & IMPACT ============ */}
      <section id="opportunities" aria-label="Development opportunities and impact" className="bg-white px-6 pt-[84px] lg:px-10">
        <div className="mx-auto grid max-w-content gap-12 md:grid-cols-2">
          <div className="flex min-w-[280px] flex-col justify-end pb-2">
            <p className="eyebrow mb-[22px]">OPPORTUNITIES, NOT PROMISES</p>
            <p className="m-0 max-w-[440px] text-base leading-[1.75] text-ink">
              We focus on identifying and advancing energy development opportunities across renewable
              energy, power generation, grid infrastructure, and related solutions.
            </p>
          </div>

          <div className="flex min-w-[280px] flex-wrap gap-5">
            {[
              {
                src: "/images/dev-priorities.jpg",
                alt: "Solar panels, wind turbines and a substation at sunset",
                pos: "center 40%",
                title: <>Development<br />Priorities</>,
                copy: "Exploring renewable energy, power generation and infrastructure opportunities in The Gambia and the wider region.",
              },
              {
                src: "/images/partner-industrial.jpg",
                alt: "Industrial energy plant structures",
                pos: "center",
                title: <>Partner<br />With Us</>,
                copy: "We work with governments, utilities, investors and industry partners to develop sustainable energy solutions.",
              },
            ].map((c, i) => (
              <Link key={i} href="/opportunities" className="opp relative block h-[300px] flex-[1_1_240px] rounded-md">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="oppimg absolute inset-0 h-full w-full rounded-md object-cover" src={c.src} alt={c.alt} style={{ objectPosition: c.pos }} />
                <span className="absolute inset-0 rounded-md" style={{ background: "linear-gradient(to top,rgba(3,27,51,.92) 8%,rgba(3,27,51,.35) 55%,rgba(3,27,51,.2))" }} aria-hidden="true" />
                <span className="absolute inset-x-0 bottom-0 block p-[26px] pb-7">
                  <span className="block font-heading text-2xl font-extrabold leading-[1.15] text-white">{c.title}</span>
                  <span className="mt-2.5 block text-[13px] leading-[1.55] text-white/80">{c.copy}</span>
                  <span className="eparrow mt-4 flex h-[42px] w-[42px] items-center justify-center rounded-full border-[1.5px] border-white/75 text-white">
                    <Arrow size={15} width={2.2} />
                  </span>
                </span>
              </Link>
            ))}
          </div>

          <figure className="relative m-0 min-h-[480px] min-w-[280px] overflow-hidden rounded-md">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/impact-composite.png"
              alt="Soliaris Africa sun symbol over sunlit African waterways and forest islands"
              className="absolute inset-0 h-full w-full object-cover"
              style={{ objectPosition: "56% 40%" }}
            />
          </figure>

          <div id="impact" className="flex min-w-[280px] flex-wrap items-center gap-[34px] rounded-md bg-mist px-[46px] py-11">
            <div className="min-w-[260px] flex-[1.5_1_300px]">
              <p className="m-0 mb-4 text-[11px] font-bold tracking-[0.2em] text-ocean">A BRIGHTER, MORE SUSTAINABLE TOMORROW</p>
              <h2 className="m-0 mb-4 font-heading text-[42px] font-extrabold leading-[1.05] tracking-[-0.012em] text-navy">
                OUR IMPACT<br /><span className="text-teal">GOES FURTHER</span>
              </h2>
              <p className="m-0 mb-6 max-w-[420px] text-[15px] leading-[1.65] text-ink">
                We are committed to a cleaner environment, stronger communities and long-term economic
                growth through responsible and sustainable energy development.
              </p>
              <Link href="/impact" className="btn-teal">
                Our Approach
                <Arrow />
              </Link>
            </div>
            <div className="flex min-w-[190px] flex-[1_1_190px] flex-col gap-5 border-l border-[#d9e1e8] pl-7">
              {[
                {
                  icon: <><path d="M5 20c0-8 5-13 14-15-1 9-6 14-14 15Z" /><path d="M5 20c2-5 6-9 10-11" /></>,
                  label: <>CLEANER ENERGY<br />SOLUTIONS</>,
                },
                {
                  icon: <><circle cx="8" cy="9" r="3" /><circle cx="16.5" cy="10" r="2.4" /><path d="M3.5 19c.5-3.4 2.4-5 4.5-5s4 1.6 4.5 5" /><path d="M14 18.5c.4-2.6 1.4-4 2.5-4s2.1 1.4 2.5 4" /></>,
                  label: <>STRONGER<br />COMMUNITIES</>,
                },
                {
                  icon: <><path d="M4 20h16" /><rect x="6" y="12" width="3" height="8" /><rect x="11" y="8" width="3" height="12" /><rect x="16" y="4" width="3" height="16" /></>,
                  label: <>ECONOMIC<br />OPPORTUNITY</>,
                },
                {
                  icon: <><path d="M12 21V11" /><path d="M12 11c-4 0-6-2.5-6-6 4 0 6 2.5 6 6Z" /><path d="M12 13c4 0 6-2.5 6-6-4 0-6 2.5-6 6Z" /><path d="M8 21h8" /></>,
                  label: <>A MORE RESILIENT<br />AFRICA</>,
                },
              ].map((row, i) => (
                <div key={i} className="impactRow flex items-center gap-3.5">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#079B87" strokeWidth="1.5" className="shrink-0" aria-hidden="true">
                    {row.icon}
                  </svg>
                  <span className="text-[11px] font-bold leading-[1.5] tracking-[0.1em] text-ink">{row.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="h-[70px]" />
      </section>

      {/* ============ SECTION 6B · NEWS & INSIGHTS ============ */}
      <section id="news" aria-label="News and insights" className="bg-mist px-6 pb-[100px] pt-[92px] lg:px-10">
        <div className="mx-auto max-w-content">
          <div className="mb-[46px] flex flex-wrap items-end justify-between gap-7">
            <div>
              <p className="eyebrow mb-5">NEWS &amp; INSIGHTS</p>
              <h2 className="m-0 font-heading text-[44px] font-extrabold leading-[1.12] tracking-[-0.012em] text-navy">
                THE LATEST FROM<br /><span className="text-teal">SOLIARIS AFRICA</span>
              </h2>
            </div>
            <p className="m-0 mb-1.5 max-w-[380px] text-[14.5px] leading-[1.7] text-ink">
              Company announcements, perspectives and updates as we work toward a brighter energy
              future for the region.
            </p>
          </div>
          <div className="flex flex-wrap items-stretch gap-6">
            {[
              {
                href: "/about",
                src: "/images/banjul-aerial.jpg",
                alt: "Aerial view of Banjul, The Gambia",
                tag: "COMPANY NEWS",
                tagStyle: undefined,
                title: "SOLIARIS AFRICA LTD established in The Gambia",
                copy: "A new Gambian energy development company with a regional vision — learn who we are and what we stand for.",
              },
              {
                href: "/what-we-do",
                src: "/images/solar-park-aerial.jpg",
                alt: "Aerial view of a utility-scale solar park",
                tag: "PERSPECTIVE",
                tagStyle: { color: "#087F9B", borderColor: "#087F9B33", background: "#087F9B0F" },
                title: "Our approach to sustainable energy development",
                copy: "From renewable generation to grid infrastructure — the sectors we focus on and how we intend to work.",
              },
              {
                href: "/partnerships",
                src: "/images/partnership-goldenhour.jpg",
                alt: "Industrial energy infrastructure at golden hour",
                tag: "ANNOUNCEMENT",
                tagStyle: { color: "#67AD59", borderColor: "#67AD5933", background: "#67AD590F" },
                title: "Open to partnership and investment conversations",
                copy: "We welcome developers, institutions and investors who share our vision for West Africa's energy future.",
              },
            ].map((n, i) => (
              <Link key={i} href={n.href} className="lift-card flex min-w-[280px] flex-[1_1_300px] flex-col overflow-hidden rounded-md border border-cardline bg-white text-inherit">
                <figure className="m-0 h-[190px] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="zoom-img h-full w-full object-cover" src={n.src} alt={n.alt} />
                </figure>
                <div className="flex flex-1 flex-col p-[26px] pb-7">
                  <span className="newstag" style={n.tagStyle}>{n.tag}</span>
                  <h3 className="m-0 mb-2.5 mt-3.5 font-heading text-lg font-extrabold leading-[1.35] text-navy">{n.title}</h3>
                  <p className="m-0 mb-[18px] flex-1 text-[13.5px] leading-[1.65] text-inkSoft">{n.copy}</p>
                  <span className="learnmore">
                    READ MORE
                    <Arrow size={13} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SECTION 7 · FINAL CTA ============ */}
      <section id="cta" aria-label="Partner for a brighter Africa" className="relative flex min-h-[430px] items-center overflow-hidden">
        <Image
          src="/images/river-sunset.jpg"
          alt="River winding through dark grassland at sunset"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg,rgba(3,27,51,.88) 0%,rgba(3,27,51,.66) 55%,rgba(3,27,51,.8) 100%)" }} aria-hidden="true" />
        <div className="relative mx-auto flex w-full max-w-content flex-wrap items-center justify-between gap-12 px-6 py-20 lg:px-10">
          <div className="min-w-[300px] flex-[1_1_440px]">
            <p className="eyebrow-dark mb-[22px]">PARTNER FOR A BRIGHTER AFRICA</p>
            <h2 className="m-0 font-heading text-[42px] font-extrabold leading-[1.04] tracking-[-0.014em] text-white lg:text-[60px]">
              LET&apos;S DEVELOP<br /><span className="text-gold">WHAT COMES NEXT.</span>
            </h2>
          </div>
          <div className="min-w-[280px] flex-[0_1_420px]">
            <p className="m-0 mb-[26px] text-[15px] leading-[1.7] text-white/90">
              SOLIARIS AFRICA LTD is open to strategic partnerships, investment opportunities and
              collaborative development across The Gambia and West Africa.
            </p>
            <Link href="/opportunities" className="btn-gold">
              EXPLORE OPPORTUNITIES
              <Arrow size={15} />
            </Link>
          </div>
        </div>
      </section>

      <Footer active="/" />
    </div>
  );
}
```

---

## app/about/page.tsx

```tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollTabs from "@/components/ScrollTabs";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "SOLIARIS AFRICA LTD is a Gambian company dedicated to developing reliable, sustainable and modern energy infrastructure across The Gambia and the wider West African region.",
};

const Arrow = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const CheckIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#079B87" strokeWidth="1.6" className="mt-0.5 shrink-0" aria-hidden="true">
    <circle cx="12" cy="12" r="9.5" />
    <path d="M8 12.5l2.6 2.6L16.5 9" />
  </svg>
);

export default function AboutPage() {
  return (
    <div id="top" className="bg-white">
      <Header active="/about" />

      {/* ============ HERO ============ */}
      <section
        aria-label="About Soliaris Africa"
        className="relative h-[620px] overflow-hidden"
        style={{ background: "linear-gradient(115deg,#031B33 0%,#04223d 55%,#06304f 100%)" }}
      >
        <Image
          src="/images/about-hero.jpg"
          alt="African woman engineer in a white safety helmet and protective glasses at an electrical substation"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "center 30%" }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(100deg,rgba(3,27,51,.88) 0%,rgba(3,27,51,.55) 42%,rgba(3,27,51,.08) 68%)" }} aria-hidden="true" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(3,27,51,.5),rgba(3,27,51,0) 40%)" }} aria-hidden="true" />
        <div className="relative mx-auto flex h-full max-w-site flex-col justify-center px-6 lg:px-10">
          <div className="max-w-[640px]">
            <p className="eyebrow-dark heroFade d1 mb-[26px]">ABOUT US</p>
            <h1 className="heroFade d2 m-0 mb-6 font-heading text-[44px] font-extrabold leading-[1.05] tracking-[-0.014em] text-white lg:text-[64px]">
              A STRONGER<br />ENERGY FUTURE<br /><span className="text-gold">FOR GENERATIONS</span>
            </h1>
            <p className="heroFade d3 m-0 max-w-[470px] text-[17px] leading-[1.7] text-white/90">
              SOLIARIS AFRICA LTD is a Gambian company dedicated to developing reliable, sustainable
              and modern energy infrastructure across The Gambia and the wider West African region.
            </p>
          </div>
        </div>
      </section>

      {/* ============ SECTION NAVIGATION ============ */}
      <div className="sticky top-[76px] z-40">
        <ScrollTabs
          ariaLabel="About page sections"
          tabs={[
            { key: "story", label: "OUR STORY", target: "story" },
            { key: "mission", label: "MISSION & VISION", target: "purpose-sec" },
            { key: "values", label: "OUR VALUES", target: "values" },
            { key: "gov", label: "GOVERNANCE", target: "governance" },
          ]}
        />
      </div>

      {/* ============ OUR STORY ============ */}
      <section id="story" aria-label="Our story" className="scroll-mt-[150px] bg-white px-6 pb-[100px] pt-[110px] lg:px-10">
        <div className="mx-auto flex max-w-content flex-wrap items-center gap-[70px]">
          <div className="min-w-[320px] flex-[1_1_400px]">
            <p className="eyebrow mb-7">OUR STORY</p>
            <h2 className="m-0 mb-7 font-serif text-[36px] font-bold leading-[1.18] tracking-[-0.01em] text-navy lg:text-5xl">
              Built for<br />Africa&apos;s Energy<br />Tomorrow
            </h2>
            <p className="m-0 mb-9 max-w-[440px] text-base leading-[1.75] text-ink">
              We are established to participate in the development of renewable energy, power
              generation, grid infrastructure and related projects that support national development
              and regional energy security. From our home in The Gambia, we are building the
              partnerships and capabilities to help power West Africa&apos;s growth.
            </p>
            <a href="#purpose-sec" className="btn-gold !px-[26px] !py-[15px] !text-[13px]">
              OUR APPROACH
              <Arrow />
            </a>
          </div>
          <figure className="storyframe m-0 h-[480px] min-w-[320px] flex-[1.15_1_480px] overflow-hidden rounded-md">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="storyimg h-full w-full object-cover"
              src="/images/solar-park-aerial.jpg"
              alt="Aerial view of a utility-scale solar park with rows of photovoltaic panels over green ground"
            />
          </figure>
        </div>
      </section>

      {/* ============ OUR PURPOSE ============ */}
      <section id="purpose-sec" aria-label="Mission, vision and values" className="scroll-mt-[150px] bg-mist px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-content">
          <p className="eyebrow mb-[54px]">OUR PURPOSE</p>
          <div className="flex flex-wrap">
            <div className="min-w-[280px] flex-[1_1_300px] py-1 pr-11">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#079B87" strokeWidth="1.5" aria-hidden="true">
                <circle cx="12" cy="12" r="9" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="12" cy="12" r="1.4" fill="#079B87" stroke="none" />
              </svg>
              <h3 className="mb-3.5 mt-5 font-heading text-xl font-extrabold text-navy">Our Mission</h3>
              <p className="m-0 text-[14.5px] leading-[1.75] text-ink">
                To advance reliable and sustainable energy infrastructure through strategic project
                development, innovative technologies and partnerships.
              </p>
            </div>
            <div id="values" className="min-w-[280px] flex-[1_1_300px] scroll-mt-[170px] border-l border-[#dbe3ea] px-11 py-1">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#079B87" strokeWidth="1.5" aria-hidden="true">
                <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              <h3 className="mb-3.5 mt-5 font-heading text-xl font-extrabold text-navy">Our Vision</h3>
              <p className="m-0 text-[14.5px] leading-[1.75] text-ink">
                To become a trusted energy and infrastructure development partner in The Gambia and
                across West Africa.
              </p>
            </div>
            <div className="min-w-[280px] flex-[1_1_300px] border-l border-[#dbe3ea] py-1 pl-11">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#079B87" strokeWidth="1.5" aria-hidden="true">
                <path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3Z" />
                <path d="M9 12l2 2 4-4.5" />
              </svg>
              <h3 className="mb-3.5 mt-5 font-heading text-xl font-extrabold text-navy">Our Values</h3>
              <p className="m-0 text-[14.5px] leading-[1.75] text-ink">
                Integrity, technical excellence, sustainability, safety and collaboration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ GOVERNANCE ============ */}
      <section id="governance" aria-label="Governance" className="scroll-mt-[150px] bg-white px-6 py-[100px] lg:px-10">
        <div className="mx-auto flex max-w-content flex-wrap items-start gap-[70px]">
          <div className="min-w-[320px] flex-[1_1_400px]">
            <p className="eyebrow mb-[26px]">GOVERNANCE</p>
            <h2 className="m-0 mb-6 font-serif text-[32px] font-bold leading-[1.2] text-navy lg:text-[40px]">
              Sound governance<br />from day one
            </h2>
            <p className="m-0 max-w-[470px] text-[15.5px] leading-[1.75] text-ink">
              As a newly incorporated Gambian company, SOLIARIS AFRICA LTD is committed to sound
              corporate governance, regulatory compliance and responsible business conduct as the
              foundation of every opportunity we pursue.
            </p>
          </div>
          <div className="flex min-w-[300px] flex-[1_1_400px] flex-col gap-[26px] pt-3">
            {[
              {
                title: "REGULATORY COMPLIANCE",
                copy: "Operating in line with Gambian law and the standards expected of international energy partners.",
              },
              {
                title: "TRANSPARENCY & ACCOUNTABILITY",
                copy: "Clear decision-making and honest communication with partners, institutions and communities.",
              },
              {
                title: "RESPONSIBLE BUSINESS CONDUCT",
                copy: "Safety, environmental care and ethical practice at the centre of how we develop every project.",
              },
            ].map((p) => (
              <div key={p.title} className="pill flex items-start gap-[18px]">
                <CheckIcon />
                <div>
                  <h3 className="m-0 mb-1.5 font-heading text-[15px] font-bold tracking-[0.03em] text-navy">{p.title}</h3>
                  <p className="m-0 text-sm leading-[1.65] text-inkSoft">{p.copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer active="/about" />
    </div>
  );
}
```

---

## app/what-we-do/page.tsx

```tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollTabs from "@/components/ScrollTabs";
import AutoVideo from "@/components/AutoVideo";

export const metadata: Metadata = {
  title: "What We Do",
  description:
    "From renewable generation to grid infrastructure, SOLIARIS AFRICA LTD develops and delivers energy projects that create lasting value.",
};

const Arrow = ({ size = 14, width = 2.4 }: { size?: number; width?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={width} aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const SOLUTIONS = [
  {
    id: "renewable",
    num: "01",
    title: <>RENEWABLE ENERGY</>,
    copy: "Solar PV, wind energy, hybrid systems and battery storage solutions for a more resilient energy supply.",
    src: "/images/solar-farm.jpg",
    alt: "Aerial view of a large solar farm at golden hour",
    pos: undefined as string | undefined,
  },
  {
    id: "power",
    num: "02",
    title: <>POWER GENERATION &amp; DEVELOPMENT</>,
    copy: "Independent power producer projects, power plant development and energy generation capacity for growing demand.",
    src: "/images/partner-industrial.jpg",
    alt: "Industrial power generation machinery",
    pos: undefined,
  },
  {
    id: "grid",
    num: "03",
    title: <>GRID &amp; ELECTRICAL INFRASTRUCTURE</>,
    copy: "Transmission and distribution networks, substations and grid interconnection for stronger, more reliable systems.",
    src: "/images/purpose-pylons.jpg",
    alt: "High-voltage transmission towers at dusk",
    pos: undefined,
  },
  {
    id: "epc",
    num: "04",
    title: <>ENGINEERING, PROCUREMENT &amp; CONSTRUCTION</>,
    copy: "Project engineering, equipment procurement, construction coordination and commissioning.",
    src: "/images/epc-steel.jpg",
    alt: "Steel framework and crane at an infrastructure construction site",
    pos: "center 45%",
  },
  {
    id: "smart",
    num: "05",
    title: <>SMART ENERGY SOLUTIONS</>,
    copy: "Smart metering, energy efficiency, monitoring and digital solutions for modern energy systems.",
    src: "/images/smart-infra.jpg",
    alt: "Engineer working on electrical control and automation panels",
    pos: undefined,
  },
  {
    id: "investment",
    num: "06",
    title: <>INVESTMENT &amp; PARTNERSHIPS</>,
    copy: "Co-development, investment structuring and strategic partnerships that bring energy projects to life.",
    src: "/images/investment-building.jpg",
    alt: "Modern teal glass commercial buildings",
    pos: undefined,
  },
];

export default function WhatWeDoPage() {
  return (
    <div id="top" className="bg-white">
      <Header active="/what-we-do" />

      {/* ============ HERO ============ */}
      <section aria-label="What we do" className="relative h-[560px] overflow-hidden bg-deep">
        <Image
          src="/images/wwd-hero-poster.jpg"
          alt="Soliaris engineer in a branded safety vest and white helmet facing an electrical substation at sunset"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <AutoVideo
          src="/videos/solar-farm-aerial.mp4"
          poster="/images/wwd-hero-poster.jpg"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: "center 35%" }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(100deg,rgba(3,27,51,.82) 0%,rgba(3,27,51,.45) 40%,rgba(3,27,51,.05) 65%)" }} aria-hidden="true" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(3,27,51,.5),rgba(3,27,51,0) 35%)" }} aria-hidden="true" />
        <div className="relative mx-auto flex h-full max-w-site flex-col justify-center px-6 lg:px-10">
          <div className="max-w-[640px]">
            <p className="eyebrow-dark heroFade d1 mb-[26px]">WHAT WE DO</p>
            <h1 className="heroFade d2 m-0 mb-[22px] font-heading text-[44px] font-extrabold leading-[1.06] tracking-[-0.014em] text-white lg:text-[62px]">
              INTEGRATED<br /><span className="text-gold">ENERGY SOLUTIONS</span>
            </h1>
            <p className="heroFade d3 m-0 max-w-[460px] text-[17px] leading-[1.7] text-white/90">
              From renewable generation to grid infrastructure, we develop and deliver energy
              projects that create lasting value.
            </p>
          </div>
        </div>
      </section>

      {/* ============ SECTOR NAVIGATION ============ */}
      <div className="sticky top-[76px] z-40">
        <ScrollTabs
          ariaLabel="Energy sectors"
          gap={34}
          tabs={[
            { key: "overview", label: "OVERVIEW", target: "overview" },
            { key: "renewable", label: "RENEWABLE ENERGY", target: "renewable" },
            { key: "power", label: "POWER GENERATION", target: "power" },
            { key: "grid", label: "GRID INFRASTRUCTURE", target: "grid" },
            { key: "epc", label: "EPC", target: "epc" },
            { key: "smart", label: "SMART ENERGY", target: "smart" },
            { key: "investment", label: "INVESTMENT", target: "investment" },
          ]}
        />
      </div>

      {/* ============ SOLUTIONS ROWS ============ */}
      <section id="overview" aria-label="Our energy solutions" className="scroll-mt-[150px] bg-white px-6 pb-10 pt-20 lg:px-10">
        <div className="mx-auto max-w-content">
          <p className="eyebrow mb-[18px]">OUR SOLUTIONS</p>
          <p className="m-0 mb-[30px] max-w-[640px] text-base leading-[1.75] text-ink">
            We pursue integrated energy solutions across six connected areas — from renewable
            generation and power development to the grids, engineering, technology and investment
            that bring projects to life.
          </p>

          {SOLUTIONS.map((s, i) => (
            <div
              key={s.id}
              id={s.id}
              className={`srow flex scroll-mt-[150px] flex-wrap items-center gap-12 py-12 ${i % 2 === 1 ? "rev" : ""} ${i === SOLUTIONS.length - 1 ? "!border-b-0" : ""}`}
            >
              <figure className="srfig m-0 h-[280px] min-w-[300px] flex-[0_1_480px] overflow-hidden rounded-md">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="srimg h-full w-full object-cover"
                  src={s.src}
                  alt={s.alt}
                  style={s.pos ? { objectPosition: s.pos } : undefined}
                />
              </figure>
              <div className="srcontent min-w-[300px] flex-[1_1_380px]">
                <p className="rownum">{s.num}</p>
                <h2 className="m-0 mb-3 font-heading text-[26px] font-extrabold leading-[1.2] tracking-[0.01em] text-navy">{s.title}</h2>
                <p className="m-0 mb-[18px] max-w-[460px] text-[15px] leading-[1.7] text-ink">{s.copy}</p>
                <a href="#cta-foot" className="learnmore !text-[13px]">
                  LEARN MORE
                  <Arrow />
                </a>
              </div>
              <span className="srarrow flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-full border-[1.5px] border-[#b9c6d2] text-navy" aria-hidden="true">
                <Arrow size={17} width={2.2} />
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ============ CTA BAND ============ */}
      <section id="cta-foot" aria-label="Work with us" className="relative flex min-h-[300px] items-center overflow-hidden bg-deep">
        <Image src="/images/river-sunset.jpg" alt="River winding through dark grassland at sunset" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg,rgba(3,27,51,.9) 0%,rgba(3,27,51,.7) 60%,rgba(3,27,51,.82) 100%)" }} aria-hidden="true" />
        <div className="relative mx-auto flex w-full max-w-content flex-wrap items-center justify-between gap-10 px-6 py-16 lg:px-10">
          <h2 className="m-0 font-heading text-[32px] font-extrabold leading-[1.1] tracking-[-0.01em] text-white lg:text-[40px]">
            READY TO DEVELOP<br /><span className="text-gold">ENERGY SOLUTIONS TOGETHER?</span>
          </h2>
          <Link href="/contact" className="btn-gold">
            GET IN TOUCH
            <Arrow size={15} />
          </Link>
        </div>
      </section>

      <Footer active="/what-we-do" />
    </div>
  );
}
```

---

## app/opportunities/page.tsx

```tsx
import type { Metadata } from "next";
import OpportunitiesContent from "./content";

export const metadata: Metadata = {
  title: "Development Opportunities",
  description:
    "SOLIARIS AFRICA LTD is actively exploring and developing energy infrastructure opportunities in The Gambia and the wider West African region.",
};

export default function OpportunitiesPage() {
  return <OpportunitiesContent />;
}
```

---

## app/opportunities/content.tsx

```tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AutoVideo from "@/components/AutoVideo";

const Arrow = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

type Sector = "all" | "renewable" | "power" | "grid" | "public";

const PILLS: { key: Sector; label: string }[] = [
  { key: "all", label: "ALL SECTORS" },
  { key: "renewable", label: "RENEWABLE ENERGY" },
  { key: "power", label: "POWER GENERATION" },
  { key: "grid", label: "GRID INFRASTRUCTURE" },
  { key: "public", label: "PUBLIC INFRASTRUCTURE" },
];

const CARDS: { tag: Sector; src: string; alt: string; title: string; copy: string }[] = [
  {
    tag: "renewable",
    src: "/images/solar-farm.jpg",
    alt: "Aerial view of a solar farm",
    title: "Renewable Energy Development",
    copy: "Utility-scale and distributed solar and wind opportunities.",
  },
  {
    tag: "power",
    src: "/images/power-plant.jpg",
    alt: "Industrial power generation plant",
    title: "Power Generation Infrastructure",
    copy: "New generation capacity and hybrid energy solutions.",
  },
  {
    tag: "grid",
    src: "/images/substation.jpg",
    alt: "Electrical substation",
    title: "Transmission & Substation Projects",
    copy: "Grid strengthening and interconnection opportunities.",
  },
  {
    tag: "public",
    src: "/images/purpose-city.jpg",
    alt: "Aerial view of a growing African city",
    title: "Public Infrastructure Initiatives",
    copy: "Energy-efficient lighting and smart public infrastructure.",
  },
];

export default function OpportunitiesContent() {
  const [filter, setFilter] = useState<Sector>("all");

  return (
    <div id="top" className="bg-white">
      <Header active="/opportunities" />

      {/* ============ HERO · BANJUL FLYOVER ============ */}
      <section aria-label="Development opportunities" className="relative h-[620px] overflow-hidden bg-deep">
        <div className="absolute right-0 top-0 h-full w-full lg:w-[66%]">
          <Image
            src="/images/banjul-aerial.jpg"
            alt="Aerial view of Banjul, The Gambia, stretching toward the Atlantic coast"
            fill
            priority
            sizes="66vw"
            className="object-cover"
          />
          <AutoVideo
            src="/videos/banjul-flyover.mp4"
            poster="/images/banjul-aerial.jpg"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg,#031B33 0%,#031B33 34%,rgba(3,27,51,.55) 52%,rgba(3,27,51,.05) 78%)" }} aria-hidden="true" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(3,27,51,.85) 0%,rgba(3,27,51,.2) 30%,rgba(3,27,51,0) 50%)" }} aria-hidden="true" />

        <div className="relative mx-auto flex h-full max-w-site flex-col justify-center px-6 lg:px-10">
          <div className="max-w-[600px] pb-[70px]">
            <p className="eyebrow-dark heroFade d1 mb-[26px]">DEVELOPMENT OPPORTUNITIES</p>
            <h1 className="heroFade d2 m-0 mb-[22px] font-heading text-[42px] font-extrabold leading-[1.07] tracking-[-0.014em] text-white lg:text-[56px]">
              UNLOCKING<br />ENERGY POTENTIAL<br /><span className="text-gold">ACROSS THE REGION</span>
            </h1>
            <p className="heroFade d3 m-0 max-w-[440px] text-base leading-[1.7] text-white/90">
              We are actively exploring and developing energy infrastructure opportunities in The
              Gambia and the wider West African region.
            </p>
          </div>
        </div>

        <div className="heroFade d4 absolute inset-x-0 bottom-[34px]">
          <div className="mx-auto flex max-w-site flex-wrap gap-3 px-6 lg:px-10" role="group" aria-label="Filter opportunities by sector">
            {PILLS.map((p) => (
              <button
                key={p.key}
                className={`fpill ${filter === p.key ? "active" : ""}`}
                onClick={() => setFilter(p.key)}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ============ KEY OPPORTUNITY AREAS ============ */}
      <section aria-label="Key opportunity areas" className="bg-mist px-6 pb-[100px] pt-[90px] lg:px-10">
        <div className="mx-auto max-w-content">
          <p className="eyebrow mb-3.5">KEY OPPORTUNITY AREAS</p>
          <p className="m-0 mb-11 max-w-[620px] text-[15px] leading-[1.7] text-ink">
            Sector opportunities we are exploring — areas of focus for development and partnership,
            not confirmed projects.
          </p>
          <div className="flex flex-wrap items-stretch gap-6">
            {CARDS.filter((c) => filter === "all" || filter === c.tag).map((c) => (
              <div key={c.tag} className="lift-card min-w-[250px] flex-[1_1_260px] overflow-hidden rounded-md border border-cardline bg-white">
                <figure className="m-0 h-[170px] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="zoom-img h-full w-full object-cover" src={c.src} alt={c.alt} />
                </figure>
                <div className="p-6 pb-[26px]">
                  <h2 className="m-0 mb-2.5 font-heading text-[17px] font-extrabold leading-[1.3] text-navy">{c.title}</h2>
                  <p className="m-0 mb-4 text-[13.5px] leading-[1.65] text-inkSoft">{c.copy}</p>
                  <Link href="/what-we-do" className="learnmore">
                    EXPLORE
                    <Arrow size={13} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ BOTTOM CTA · RIVER FLYOVER ============ */}
      <section id="cta-opp" aria-label="Partner with us" className="relative flex min-h-[420px] items-center overflow-hidden">
        <Image src="/images/river-sunset.jpg" alt="River winding through dark grassland at sunset" fill sizes="100vw" className="object-cover" />
        <AutoVideo
          src="/videos/river-flyover.mp4"
          poster="/images/river-sunset.jpg"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg,rgba(3,27,51,.88) 0%,rgba(3,27,51,.6) 55%,rgba(3,27,51,.78) 100%)" }} aria-hidden="true" />
        <div className="relative mx-auto flex w-full max-w-content flex-wrap items-center justify-between gap-12 px-6 py-20 lg:px-10">
          <h2 className="m-0 font-heading text-[36px] font-extrabold leading-[1.1] tracking-[-0.012em] text-white lg:text-[50px]">
            PARTNER WITH US<br />TO DEVELOP <span className="text-gold">AFRICA&apos;S<br />NEXT ENERGY PROJECTS</span>
          </h2>
          <Link href="/contact" className="btn-gold">
            GET IN TOUCH
            <Arrow size={15} />
          </Link>
        </div>
      </section>

      <Footer active="/opportunities" />
    </div>
  );
}
```

---

## app/impact/page.tsx

```tsx
import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Impact",
  description:
    "SOLIARIS AFRICA LTD is committed to developing energy solutions that support economic growth, strengthen communities and protect the environment for future generations.",
};

const THEMES = [
  {
    icon: (
      <>
        <path d="M5 20c0-8 5-13 14-15-1 9-6 14-14 15Z" />
        <path d="M5 20c2-5 6-9 10-11" />
      </>
    ),
    title: <>Cleaner Energy<br />Systems</>,
    copy: "Advancing renewable and low-carbon energy solutions.",
  },
  {
    icon: (
      <>
        <circle cx="12" cy="12" r="3.2" />
        <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M18.7 5.3l-2.1 2.1M7.4 16.6l-2.1 2.1" />
      </>
    ),
    title: <>Expanded<br />Energy Access</>,
    copy: "Supporting reliable power for more homes and businesses.",
  },
  {
    icon: (
      <>
        <path d="M4 20h16" />
        <rect x="6" y="12" width="3" height="8" />
        <rect x="11" y="8" width="3" height="12" />
        <rect x="16" y="4" width="3" height="16" />
      </>
    ),
    title: <>Economic<br />Development</>,
    copy: "Enabling growth, industry and opportunity.",
  },
  {
    icon: (
      <>
        <path d="M12 21V11" />
        <path d="M12 11c-4 0-6-2.5-6-6 4 0 6 2.5 6 6Z" />
        <path d="M12 13c4 0 6-2.5 6-6-4 0-6 2.5-6 6Z" />
        <path d="M8 21h8" />
      </>
    ),
    title: <>Environmental<br />Stewardship</>,
    copy: "Respecting ecosystems in every development decision.",
  },
  {
    icon: (
      <>
        <circle cx="8" cy="9" r="3" />
        <circle cx="16.5" cy="10" r="2.4" />
        <path d="M3.5 19c.5-3.4 2.4-5 4.5-5s4 1.6 4.5 5" />
        <path d="M14 18.5c.4-2.6 1.4-4 2.5-4s2.1 1.4 2.5 4" />
      </>
    ),
    title: <>Stronger<br />Communities</>,
    copy: "Putting people at the centre of energy development.",
  },
];

const COMMITMENTS = [
  "Promoting sustainable and low-carbon solutions",
  "Supporting local economic growth",
  "Respecting communities and the environment",
  "Working with partners to build long-term value",
];

export default function ImpactPage() {
  return (
    <div id="top" className="bg-white">
      <Header active="/impact" />

      {/* ============ HERO ============ */}
      <section
        aria-label="Sustainability and impact"
        className="relative h-[600px] overflow-hidden"
        style={{ background: "linear-gradient(110deg,#031B33 0%,#04223d 60%,#0a3350 100%)" }}
      >
        <div className="absolute right-0 top-0 h-full w-[44%]">
          <Image
            src="/images/impact-child.jpg"
            alt="Young African child with warm light on their face, looking toward the light"
            fill
            priority
            sizes="44vw"
            className="object-cover"
            style={{ objectPosition: "center 25%" }}
          />
        </div>
        <div className="absolute right-0 top-0 h-full w-[44%]" style={{ background: "linear-gradient(90deg,#04223d 0%,rgba(4,34,61,.3) 45%,rgba(4,34,61,0) 100%)" }} aria-hidden="true" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(3,27,51,.5),rgba(3,27,51,0) 40%)" }} aria-hidden="true" />
        <div className="relative mx-auto flex h-full max-w-site flex-col justify-center px-6 lg:px-10">
          <div className="max-w-[620px]">
            <p className="eyebrow-dark heroFade d1 mb-[26px]">OUR IMPACT</p>
            <h1 className="heroFade d2 m-0 mb-6 font-heading text-[42px] font-extrabold leading-[1.08] tracking-[-0.014em] text-white lg:text-[58px]">
              SUSTAINABLE ENERGY<br />FOR STRONGER<br /><span className="text-gold">COMMUNITIES</span>
            </h1>
            <p className="heroFade d3 m-0 max-w-[470px] text-[17px] leading-[1.7] text-white/90">
              We are committed to developing energy solutions that support economic growth,
              strengthen communities and protect the environment for future generations.
            </p>
          </div>
        </div>
      </section>

      {/* ============ IMPACT THEMES ============ */}
      <section aria-label="Impact themes" className="border-b border-[#eef2f6] bg-white px-6 py-[84px] lg:px-10">
        <div className="mx-auto flex max-w-content flex-wrap justify-between gap-3">
          {THEMES.map((t, i) => (
            <div key={i} className="theme">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#079B87" strokeWidth="1.5" aria-hidden="true">
                {t.icon}
              </svg>
              <h2 className="mb-2 mt-4 font-heading text-base font-extrabold text-navy">{t.title}</h2>
              <p className="m-0 text-[13px] leading-[1.6] text-inkSoft">{t.copy}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============ RESPONSIBLE DEVELOPMENT ============ */}
      <section aria-label="Responsible development" className="flex min-h-[560px] flex-wrap">
        <figure className="relative m-0 min-h-[380px] min-w-[320px] flex-[1_1_440px]">
          <Image
            src="/images/impact-commitment.jpg"
            alt="African technician in a safety vest installing a solar panel"
            fill
            sizes="50vw"
            className="object-cover"
            style={{ objectPosition: "center 30%" }}
          />
        </figure>
        <div className="relative flex min-w-[320px] flex-[1_1_440px] items-center overflow-hidden bg-deep">
          <svg viewBox="0 0 400 400" aria-hidden="true" className="absolute -top-10 right-[-60px] w-[420px] opacity-10">
            <g fill="none" stroke="#079B87" strokeWidth="1.2">
              <path d="M40,200 C40,110 110,40 200,40 C290,40 360,110 360,200 C360,290 290,360 200,360 C110,360 40,290 40,200 Z" />
              <path d="M70,200 C70,128 128,70 200,70 C272,70 330,128 330,200 C330,272 272,330 200,330 C128,330 70,272 70,200 Z" />
              <path d="M100,200 C100,145 145,100 200,100 C255,100 300,145 300,200 C300,255 255,300 200,300 C145,300 100,255 100,200 Z" />
              <path d="M130,200 C130,161 161,130 200,130 C239,130 270,161 270,200 C270,239 239,270 200,270 C161,270 130,239 130,200 Z" />
            </g>
          </svg>
          <div className="relative max-w-[560px] px-8 py-16 lg:px-[70px] lg:py-20">
            <p className="eyebrow-dark mb-6">OUR COMMITMENT</p>
            <h2 className="m-0 mb-[30px] font-serif text-[32px] font-bold leading-[1.22] text-white lg:text-[42px]">
              Responsible<br />Development for<br />a Brighter Africa
            </h2>
            <div className="flex flex-col gap-5">
              {COMMITMENTS.map((c) => (
                <div key={c} className="commit flex items-start gap-4">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#F6B727" strokeWidth="1.8" className="mt-px shrink-0" aria-hidden="true">
                    <circle cx="12" cy="12" r="9.5" />
                    <path d="M8 12.5l2.6 2.6L16.5 9" />
                  </svg>
                  <p className="m-0 text-[15px] font-medium leading-[1.6] text-white/90">{c}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer active="/impact" />
    </div>
  );
}
```

---

## app/partnerships/page.tsx

```tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PartnerTimeline from "@/components/PartnerTimeline";

export const metadata: Metadata = {
  title: "Partnerships",
  description:
    "SOLIARIS AFRICA LTD works with governments, utilities, investors, technology providers, and engineering partners to explore energy infrastructure opportunities across Africa.",
};

const Arrow = ({ size = 15, width = 2.4 }: { size?: number; width?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={width} aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const PARTNER_CATEGORIES = [
  {
    href: "/",
    src: "/images/purpose-city.jpg",
    alt: "Aerial view of a growing African city",
    pos: undefined as string | undefined,
    title: <>Governments &amp;<br />Public Institutions</>,
    copy: "Supporting national energy goals and public development priorities.",
  },
  {
    href: "/what-we-do",
    src: "/images/substation.jpg",
    alt: "Electrical substation infrastructure",
    pos: undefined,
    title: <>Utilities &amp;<br />Energy Companies</>,
    copy: "Collaborating on generation, grid and energy service opportunities.",
  },
  {
    href: "/opportunities",
    src: "/images/partnership-goldenhour.jpg",
    alt: "Handshake between partners in front of golden industrial infrastructure",
    pos: "center 40%",
    title: <>Investors &amp;<br />Financial Institutions</>,
    copy: "Exploring bankable energy development opportunities together.",
  },
  {
    href: "/what-we-do",
    src: "/images/partner-eng.jpg",
    alt: "Engineers in safety helmets reviewing plans",
    pos: undefined,
    title: <>Engineering &amp;<br />Technology Partners</>,
    copy: "Bringing proven technology and delivery capability to projects.",
  },
];

export default function PartnershipsPage() {
  return (
    <div id="top" className="bg-white">
      <Header active="/partnerships" />

      {/* ============ HERO ============ */}
      <section aria-label="Partnerships" className="relative h-[560px] overflow-hidden bg-deep">
        <Image
          src="/images/partnership-goldenhour.jpg"
          alt="Close-up handshake between two partners in front of golden industrial infrastructure"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "center 42%" }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(100deg,rgba(3,27,51,.88) 0%,rgba(3,27,51,.55) 42%,rgba(3,27,51,.12) 70%)" }} aria-hidden="true" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(3,27,51,.6),rgba(3,27,51,0) 45%)" }} aria-hidden="true" />
        <div className="relative mx-auto flex h-full max-w-site flex-col justify-center px-6 lg:px-10">
          <div className="max-w-[640px]">
            <p className="eyebrow-dark heroFade d1 mb-[26px]">PARTNERSHIPS</p>
            <h1 className="heroFade d2 m-0 mb-[22px] font-heading text-[46px] font-extrabold leading-[1.02] tracking-[-0.015em] text-white lg:text-[72px]">
              STRONGER<br /><span className="text-gold">TOGETHER</span>
            </h1>
            <p className="heroFade d3 m-0 mb-8 max-w-[500px] text-[16.5px] leading-[1.7] text-white/90">
              We work with governments, utilities, investors, technology providers, and engineering
              partners to explore energy infrastructure opportunities across Africa.
            </p>
            <Link href="/opportunities" className="btn-gold heroFade d4">
              EXPLORE PARTNERSHIP OPPORTUNITIES
              <Arrow />
            </Link>
          </div>
        </div>
      </section>

      {/* ============ PARTNERSHIP PROCESS ============ */}
      <section aria-label="How we partner" className="border-b border-[#eef2f6] bg-white px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-content">
          <p className="eyebrow mb-[54px]">HOW WE PARTNER</p>
          <PartnerTimeline />
        </div>
      </section>

      {/* ============ WHO WE PARTNER WITH ============ */}
      <section aria-label="Who we partner with" className="bg-mist px-6 pb-[100px] pt-[90px] lg:px-10">
        <div className="mx-auto max-w-content">
          <p className="eyebrow mb-11">WHO WE PARTNER WITH</p>
          <div className="flex flex-wrap gap-6">
            {PARTNER_CATEGORIES.map((c, i) => (
              <Link key={i} href={c.href} className="pcat">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="pcimg absolute inset-0 h-full w-full object-cover"
                  src={c.src}
                  alt={c.alt}
                  style={c.pos ? { objectPosition: c.pos } : undefined}
                />
                <span className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(3,27,51,.92) 10%,rgba(3,27,51,.35) 60%,rgba(3,27,51,.2))" }} aria-hidden="true" />
                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 px-7 py-[26px]">
                  <span>
                    <span className="block font-heading text-[22px] font-extrabold leading-[1.2] text-white">{c.title}</span>
                    <span className="mt-2 block text-[13px] leading-[1.55] text-white/80">{c.copy}</span>
                  </span>
                  <span className="pcarrow flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-[1.5px] border-white/75 text-white" aria-hidden="true">
                    <Arrow width={2.2} />
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA BAND ============ */}
      <section aria-label="Start the conversation" className="bg-deep px-6 py-[72px] lg:px-10">
        <div className="mx-auto flex max-w-content flex-wrap items-center justify-between gap-10">
          <h2 className="m-0 font-heading text-[32px] font-extrabold leading-[1.15] tracking-[-0.01em] text-white lg:text-[38px]">
            LET&apos;S START<br /><span className="text-gold">THE CONVERSATION.</span>
          </h2>
          <Link href="/contact" className="btn-gold">
            GET IN TOUCH
            <Arrow />
          </Link>
        </div>
      </section>

      <Footer active="/partnerships" />
    </div>
  );
}
```

---

## app/contact/page.tsx

```tsx
import type { Metadata } from "next";
import ContactContent from "./content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with SOLIARIS AFRICA LTD. We welcome inquiries from governments, development partners, investors, and industry stakeholders.",
};

export default function ContactPage() {
  return <ContactContent />;
}
```

---

## app/contact/content.tsx

```tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type InquiryTab = "general" | "part" | "proj";

const TABS: { key: InquiryTab; label: string; selectValue: string }[] = [
  { key: "general", label: "GENERAL INQUIRY", selectValue: "general" },
  { key: "part", label: "PARTNERSHIPS", selectValue: "partnerships" },
  { key: "proj", label: "PROJECT OPPORTUNITIES", selectValue: "projects" },
];

export default function ContactContent() {
  const [tab, setTab] = useState<InquiryTab>("general");
  const [form, setForm] = useState({
    name: "",
    org: "",
    email: "",
    country: "",
    type: "general",
    msg: "",
  });
  const [err, setErr] = useState("");
  const [sent, setSent] = useState(false);

  const pickTab = (t: (typeof TABS)[number]) => {
    setTab(t.key);
    setForm((f) => ({ ...f, type: t.selectValue }));
  };

  const set = (key: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = () => {
    const problems: string[] = [];
    if (!form.name.trim()) problems.push("your full name");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) problems.push("a valid email address");
    if (!form.msg.trim()) problems.push("a message");
    if (problems.length) {
      setErr(`Please provide ${problems.join(", ")}.`);
      return;
    }
    setErr("");
    setSent(true);
  };

  return (
    <div id="top" className="bg-white">
      <Header active="/contact" cta={{ href: "#contact-form", label: "Get in Touch" }} />

      {/* ============ CONTACT SPLIT ============ */}
      <section aria-label="Contact Soliaris Africa" className="flex min-h-[860px] flex-wrap">
        <figure className="relative m-0 min-h-[420px] min-w-[320px] flex-[1_1_400px] bg-deep">
          <Image
            src="/images/contact-hq.jpg"
            alt="Soliaris Africa Ltd headquarters building with palm trees at sunset"
            fill
            priority
            sizes="45vw"
            className="object-cover"
            style={{ objectPosition: "32% center" }}
          />
          <span className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(3,27,51,.3) 0%,rgba(3,27,51,0) 35%)" }} aria-hidden="true" />
        </figure>

        <div id="contact-form" className="min-w-[340px] flex-[1.25_1_520px] scroll-mt-[100px] bg-white px-8 py-16 lg:px-[70px] lg:py-[84px]">
          <p className="eyebrow mb-[22px]">GET IN TOUCH</p>
          <h1 className="m-0 mb-4 font-serif text-[32px] font-bold leading-[1.2] text-navy lg:text-[42px]">
            Let&apos;s Build a Brighter<br />Africa Together
          </h1>
          <p className="m-0 mb-[30px] max-w-[520px] text-[15px] leading-[1.7] text-ink">
            We welcome inquiries from governments, development partners, investors, and industry
            stakeholders.
          </p>

          <div className="mb-8 flex flex-wrap gap-2.5" role="group" aria-label="Inquiry type">
            {TABS.map((t) => (
              <button key={t.key} className={`ctab ${tab === t.key ? "active" : ""}`} onClick={() => pickTab(t)}>
                {t.label}
              </button>
            ))}
          </div>

          {!sent ? (
            <div className="flex max-w-[640px] flex-col gap-5">
              <div className="flex flex-wrap gap-5">
                <div className="fld">
                  <label htmlFor="cf-name">FULL NAME *</label>
                  <input id="cf-name" type="text" autoComplete="name" placeholder="Your full name" value={form.name} onChange={set("name")} />
                </div>
                <div className="fld">
                  <label htmlFor="cf-org">COMPANY / ORGANIZATION</label>
                  <input id="cf-org" type="text" autoComplete="organization" placeholder="Organization name" value={form.org} onChange={set("org")} />
                </div>
              </div>
              <div className="flex flex-wrap gap-5">
                <div className="fld">
                  <label htmlFor="cf-email">EMAIL *</label>
                  <input id="cf-email" type="email" autoComplete="email" placeholder="name@example.com" value={form.email} onChange={set("email")} />
                </div>
                <div className="fld">
                  <label htmlFor="cf-country">COUNTRY</label>
                  <input id="cf-country" type="text" autoComplete="country-name" placeholder="Country" value={form.country} onChange={set("country")} />
                </div>
              </div>
              <div className="fld basis-full">
                <label htmlFor="cf-type">INQUIRY TYPE</label>
                <select id="cf-type" value={form.type} onChange={set("type")}>
                  <option value="general">General Inquiry</option>
                  <option value="partnerships">Partnerships</option>
                  <option value="projects">Project Opportunities</option>
                  <option value="media">Media &amp; Other</option>
                </select>
              </div>
              <div className="fld basis-full">
                <label htmlFor="cf-msg">MESSAGE *</label>
                <textarea id="cf-msg" placeholder="Tell us about your inquiry" value={form.msg} onChange={set("msg")} />
              </div>
              {err && (
                <p className="errbox m-0" role="alert">
                  {err}
                </p>
              )}
              <p className="m-0">
                <button className="btn-gold" onClick={submit}>
                  SEND MESSAGE
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </button>
              </p>
              <p className="m-0 text-xs leading-[1.6] text-[#8a99a8]">
                This is a preview build — once the form backend is connected, submissions will be
                delivered securely to SOLIARIS AFRICA LTD.
              </p>
            </div>
          ) : (
            <div className="max-w-[640px]">
              <p className="okbox m-0 mb-5" role="status">
                <strong>Thank you — your form is complete and valid.</strong>
                <br />
                This is a preview build, so nothing was sent. On the live website, this submission
                will be delivered securely to the SOLIARIS AFRICA LTD team, who will respond to the
                email address you provided.
              </p>
              <button
                className="ctab"
                onClick={() => {
                  setSent(false);
                  setErr("");
                }}
              >
                SEND ANOTHER MESSAGE
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer active="/contact" />
    </div>
  );
}
```

---

## components/Header.tsx

```tsx
import Link from "next/link";
import Image from "next/image";

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
        <Link href="/" aria-label="Soliaris Africa Ltd — home" className="flex shrink-0 items-center">
          <Image
            src="/images/soliaris-logo.png"
            alt="SOLIARIS AFRICA LTD — Powering a Brighter Africa"
            width={214}
            height={74}
            priority
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
              href={l.href}
              className={`navlink ${active === l.href ? "active" : ""}`}
            >
              {l.label}
            </Link>
          ))}
        </div>
        <Link href={cta.href} className="btn-teal shrink-0">
          {cta.label}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </nav>
    </header>
  );
}
```

---

## components/Footer.tsx

```tsx
import Link from "next/link";
import Image from "next/image";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/what-we-do", label: "What We Do" },
  { href: "/opportunities", label: "Opportunities" },
  { href: "/impact", label: "Impact" },
  { href: "/partnerships", label: "Partnerships" },
  { href: "/contact", label: "Contact" },
];

export default function Footer({ active }: { active?: string }) {
  return (
    <footer className="relative overflow-hidden border-t border-hairline bg-white">
      {/* Sun-symbol watermark */}
      <svg
        viewBox="0 0 200 230"
        aria-hidden="true"
        className="absolute right-[120px] top-1/2 w-[190px] -translate-y-1/2 opacity-[0.06]"
      >
        <path
          d="M62,32 C78,22 94,20 106,24 C118,18 130,26 136,36 C142,48 150,58 160,68 C172,72 182,76 184,84 C178,92 170,96 162,102 C154,114 150,128 146,142 C142,158 136,170 128,182 C122,196 116,208 106,212 C98,214 92,206 90,194 C88,180 86,166 84,152 C80,142 72,136 62,132 C50,128 40,122 34,114 C26,106 20,96 18,86 C20,74 26,64 34,56 C42,46 52,38 62,32 Z"
          fill="#062956"
        />
      </svg>
      <div className="relative mx-auto flex max-w-site flex-wrap items-center justify-between gap-7 px-6 pt-11 lg:px-10">
        <Link href="/" aria-label="Soliaris Africa Ltd — home" className="shrink-0">
          <Image
            src="/images/soliaris-logo.png"
            alt="SOLIARIS AFRICA LTD — Powering a Brighter Africa"
            width={214}
            height={74}
            className="h-[58px] w-auto"
          />
        </Link>
        <div className="flex flex-wrap items-center gap-6">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className={`navlink ${active === l.href ? "active" : ""}`}>
              {l.label}
            </Link>
          ))}
        </div>
        <p className="m-0 shrink-0 text-[13px] font-semibold text-ink">
          The Gambia&nbsp;&nbsp;|&nbsp;&nbsp;West Africa
        </p>
      </div>
      <div className="relative mx-auto max-w-site px-6 pb-8 pt-6 lg:px-10">
        <div className="flex flex-wrap items-center justify-between gap-5 border-t border-hairline pt-5">
          <p className="m-0 text-xs text-inkSoft">
            © 2026 SOLIARIS AFRICA LTD — Powering a Brighter Africa.
          </p>
          <div className="flex gap-[22px]">
            <Link href="/" className="text-xs text-inkSoft hover:text-navy">Privacy Policy</Link>
            <Link href="/" className="text-xs text-inkSoft hover:text-navy">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

---

## components/Magnet.tsx

```tsx
"use client";

import { useEffect, useRef } from "react";

type MagnetProps = {
  /** CSS selector (within this wrapper) for the elements that react to the cursor. */
  selector: string;
  /** Distance in px at which an element starts following the cursor. */
  radius?: number;
  /** Fraction of the cursor offset applied as translation. */
  pull?: number;
  /** Extra scale applied at zero distance. */
  grow?: number;
  id?: string;
  className?: string;
  "aria-label"?: string;
  children: React.ReactNode;
};

/**
 * Proximity "magnet" hover effect from the approved design: each matching
 * element eases toward the cursor as it approaches, one by one.
 */
export default function Magnet({
  selector,
  radius = 250,
  pull = 0.1,
  grow = 0.03,
  id,
  className,
  children,
  ...rest
}: MagnetProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const sec = ref.current;
    if (!sec) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const items = Array.from(sec.querySelectorAll<HTMLElement>(selector));
    for (const el of items) {
      el.dataset.base = el.style.transform || "";
    }

    const onMove = (e: MouseEvent) => {
      for (const el of items) {
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < radius) {
          const s = 1 - dist / radius;
          el.style.transform =
            (el.dataset.base || "") +
            ` translate(${(dx * pull * s).toFixed(1)}px,${(dy * pull * s).toFixed(1)}px)` +
            ` scale(${(1 + grow * s).toFixed(3)})`;
        } else {
          el.style.transform = el.dataset.base || "";
        }
      }
    };
    const onLeave = () => {
      for (const el of items) {
        el.style.transform = el.dataset.base || "";
      }
    };

    sec.addEventListener("mousemove", onMove);
    sec.addEventListener("mouseleave", onLeave);
    return () => {
      sec.removeEventListener("mousemove", onMove);
      sec.removeEventListener("mouseleave", onLeave);
    };
  }, [selector, radius, pull, grow]);

  return (
    <section id={id} className={className} ref={ref as React.RefObject<HTMLElement>} {...rest}>
      {children}
    </section>
  );
}
```

---

## components/AutoVideo.tsx

```tsx
"use client";

import { useEffect, useRef } from "react";

/**
 * Muted, looping hero video that force-plays on mount (React quirk: the muted
 * attribute alone doesn't guarantee autoplay) and stays paused/hidden under
 * prefers-reduced-motion (the .hero-video class hides it via CSS; a poster
 * <img> behind it carries the still frame).
 */
export default function AutoVideo({
  src,
  poster,
  className = "",
  style,
}: {
  src: string;
  poster: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      v.pause();
      return;
    }
    v.play().catch(() => {});
  }, []);

  return (
    <video
      ref={ref}
      className={`hero-video ${className}`}
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
      style={style}
    />
  );
}
```

---

## components/ScrollTabs.tsx

```tsx
"use client";

import { useState } from "react";

export type Tab = { key: string; label: string; target: string };

/**
 * Sticky section-tab bar from the approved design: clicking a tab marks it
 * active and smooth-scrolls to its section.
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

  const go = (tab: Tab) => {
    setActive(tab.key);
    document.getElementById(tab.target)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="border-b border-hairline bg-white shadow-[0_4px_14px_rgba(6,41,86,0.04)]">
      <div
        role="tablist"
        aria-label={ariaLabel}
        className="mx-auto flex max-w-site flex-wrap overflow-x-auto px-6 lg:px-10"
        style={{ gap }}
      >
        {tabs.map((t) => (
          <button
            key={t.key}
            role="tab"
            aria-selected={active === t.key}
            className={`abtab ${active === t.key ? "active" : ""}`}
            onClick={() => go(t)}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}
```

---

## components/RegionalMap.tsx

```tsx
"use client";

import { useEffect, useRef } from "react";

/**
 * Interactive "Where We Focus" regional map, ported from the approved design.
 * The static SVG shell renders here; /regmap.js (vanilla, data + behaviour)
 * draws the countries, routes and markers into #terrain/#paths/#nodes and
 * wires the controls. The script is fetched and run in a function scope so it
 * can safely re-run on every mount (client-side navigation included).
 */
export default function RegionalMap() {
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return; // guard against StrictMode double-invoke
    ran.current = true;
    let cancelled = false;
    fetch("/regmap.js")
      .then((r) => r.text())
      .then((code) => {
        if (cancelled) return;
        // eslint-disable-next-line no-new-func
        new Function(code)();
      })
      .catch(() => {
        /* map stays as the static satellite backdrop if the script fails */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section
      id="regmap"
      aria-label="Where we focus — interactive regional outlook"
      className="relative overflow-hidden"
      style={{ height: 760, background: "#031524" }}
    >
      <div className="stage">
        <svg
          className="map"
          id="map"
          viewBox="0 0 1200 720"
          preserveAspectRatio="xMidYMid slice"
          role="img"
          aria-label="Interactive geographic map of West Africa with illustrative energy opportunity links from The Gambia"
        >
          <defs>
            <linearGradient id="sea" x1="0" x2="1" y1="0" y2="1">
              <stop stopColor="#0c4c71" />
              <stop offset=".6" stopColor="#073252" />
              <stop offset="1" stopColor="#061e37" />
            </linearGradient>
            <radialGradient id="sun">
              <stop stopColor="#ffc86b" stopOpacity=".45" />
              <stop offset="1" stopColor="#f6b727" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="oceanShade">
              <stop stopColor="#041a2b" stopOpacity=".48" />
              <stop offset=".72" stopColor="#051e32" stopOpacity=".28" />
              <stop offset="1" stopColor="#05283c" stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect width="1200" height="720" fill="url(#sea)" />
          <image
            href="/images/regmap-base.jpg"
            x="0"
            y="0"
            width="575"
            height="720"
            preserveAspectRatio="xMidYMid slice"
            opacity=".88"
          />
          <rect x="0" y="0" width="600" height="720" fill="url(#oceanShade)" />
          <circle cx="90" cy="35" r="260" fill="url(#sun)" />
          <g id="terrain"></g>
          <g id="paths"></g>
          <g id="nodes"></g>
        </svg>
        <div className="overlay"></div>
        <section className="content">
          <div className="rm-eyebrow">WHERE WE FOCUS</div>
          <div className="line"></div>
          <h1>
            THE GAMBIA
            <br />
            <em>AND BEYOND.</em>
          </h1>
          <p className="desc">
            Rooted in The Gambia. Exploring energy development, grid
            infrastructure and regional integration opportunities across West
            Africa.
          </p>
          <div className="controls">
            <button className="btn primary active" id="regional">
              Regional outlook ↗
            </button>
            <button className="btn" id="focus">
              Country focus ◎
            </button>
            <button className="btn" id="pause">
              Pause animation Ⅱ
            </button>
          </div>
        </section>
        <div className="legend">
          <span>
            <i className="dot"></i> Opportunity corridor
          </span>
          <span>
            <i className="dot t"></i> Regional outlook
          </span>
        </div>
        <aside className="info" id="info">
          <button className="close" id="close" aria-label="Close details">
            ×
          </button>
          <div className="mini">STRATEGIC ENERGY OUTLOOK</div>
          <h2 id="countryName">The Gambia</h2>
          <p id="countryDesc">
            Our starting point for exploring energy generation, grid
            infrastructure and future regional partnerships. Select a country
            marker to explore the regional outlook.
          </p>
        </aside>
        <footer className="foot">
          <div>
            <strong>Illustrative concept only.</strong> Animated connections
            are potential opportunities, not existing SOLIARIS transmission
            lines or power exports.
          </div>
          <div>Geographic boundaries: Natural Earth (generalized)</div>
        </footer>
      </div>
    </section>
  );
}
```

---

## components/PartnerTimeline.tsx

```tsx
"use client";

import { useEffect, useRef } from "react";

const STAGES = [
  {
    cls: "s1",
    icon: (
      <>
        <path d="M4 6h16v10H9l-5 4V6Z" />
        <path d="M8 11h8" />
      </>
    ),
    title: "1. Engage",
    copy: "Initial discussions and alignment on shared objectives.",
  },
  {
    cls: "s2",
    icon: (
      <>
        <circle cx="11" cy="11" r="6.5" />
        <path d="M16 16l4.5 4.5" />
      </>
    ),
    title: "2. Explore Opportunities",
    copy: "Technical and commercial evaluation of the opportunity.",
  },
  {
    cls: "s3",
    icon: (
      <>
        <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
        <circle cx="12" cy="12" r="4.5" />
      </>
    ),
    title: "3. Develop",
    copy: "Project structuring and the right partnership model.",
  },
  {
    cls: "s4",
    icon: (
      <>
        <circle cx="12" cy="12" r="9.5" />
        <path d="M8 12.5l2.6 2.6L16.5 9" />
      </>
    ),
    title: "4. Deliver",
    copy: "Implementation and long-term collaboration.",
  },
];

/** Partnership process timeline that lights up as it scrolls into view. */
export default function PartnerTimeline() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      el.classList.add("lit");
      return;
    }
    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          el.classList.add("lit");
          io.disconnect();
          break;
        }
      }
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div id="ptimeline" ref={ref} className="relative">
      <div className="ptrack" aria-hidden="true">
        <span className="pfill"></span>
      </div>
      <div className="flex flex-wrap gap-y-7">
        {STAGES.map((s) => (
          <div key={s.cls} className={`pstage ${s.cls}`}>
            <div className="sicon">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#079B87" strokeWidth="1.6" aria-hidden="true">
                {s.icon}
              </svg>
            </div>
            <h2 className="mb-2 mt-5 font-heading text-[17px] font-extrabold text-navy">{s.title}</h2>
            <p className="m-0 text-[13.5px] leading-[1.6] text-inkSoft">{s.copy}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## public/regmap.js

```js

const countries=[{"name":"Tanzania","geometry":{"type":"Polygon","coordinates":[[[33.90371119710453,-0.9500000000000001],[37.69868999999994,-3.0969899999999484],[37.7669,-3.6771200000000004],[39.20222,-4.67677],[38.74053999999995,-5.9089499999999475],[38.79977000000008,-6.475660000000005],[39.44,-6.839999999999861],[39.47000000000014,-7.099999999999966],[39.19468999999998,-7.703899999999976],[39.18652000000009,-8.48550999999992],[39.94960000000003,-10.098400000000026],[40.31659000000002,-10.317099999999868],[39.52099999999996,-10.89688000000001],[38.42755659358775,-11.285202325081656],[37.827639999999974,-11.26878999999991],[37.471289999999954,-11.568759999999997],[36.775150994622805,-11.594537448780805],[36.51408165868426,-11.720938002166735],[35.31239790216904,-11.439146416879147],[34.55998904799935,-11.520020033415925],[34.27999999999997,-10.160000000000025],[33.73972000000009,-9.417149999999992],[32.75937544122132,-9.23059905358906],[30.740009731422095,-8.34000593035372],[30.199996779101696,-7.079980970898163],[29.620032179490014,-6.520015150583426],[29.419992710088167,-5.939998874539434],[29.519986606572928,-5.419978936386315],[29.339997592900346,-4.4999834122940925],[29.753512404099865,-4.452389418153302],[30.752240000000086,-3.3593099999999936],[30.743010000000027,-3.034309999999948],[30.527660000000026,-2.807619999999986],[30.469670000000008,-2.4138299999999617],[30.75830895358311,-2.2872502579883687],[30.816134881317712,-1.6989140763453887],[30.419104852019245,-1.1346591121504161],[30.769860000000108,-1.0145499999999856],[33.90371119710453,-0.9500000000000001]]]}},{"name":"W. Sahara","geometry":{"type":"Polygon","coordinates":[[[-8.665589565454809,27.656425889592356],[-8.6872936670174,25.881056219988906],[-11.96941891117116,25.933352769468268],[-11.937224493853321,23.374594224536168],[-12.874221564169575,23.284832261645178],[-13.118754441774712,22.771220201096256],[-12.929101935263532,21.327070624267563],[-16.845193650773993,21.33332347257488],[-17.06342322434257,20.999752102130827],[-17.02042843267577,21.422310288981578],[-14.750954555713534,21.500600083903663],[-14.630832688851072,21.860939846274903],[-14.221167771857253,22.31016307218816],[-13.891110398809047,23.691009019459305],[-12.50096269372537,24.7701162785782],[-12.03075883630163,26.030866197203068],[-11.718219773800357,26.104091701760623],[-11.392554897497007,26.883423977154393],[-10.551262579785273,26.990807603456886],[-10.189424200877582,26.860944729107405],[-9.735343390328879,26.860944729107405],[-9.41303748212448,27.088476060488574],[-8.794883999049077,27.120696316022507],[-8.817828334986672,27.656425889592356],[-8.665589565454809,27.656425889592356]]]}},{"name":"Dem. Rep. Congo","geometry":{"type":"Polygon","coordinates":[[[29.339997592900346,-4.4999834122940925],[29.519986606572928,-5.419978936386315],[29.419992710088167,-5.939998874539434],[29.620032179490014,-6.520015150583426],[30.199996779101696,-7.079980970898163],[30.74001549655179,-8.340007419470915],[30.346086053190817,-8.238256524288218],[29.00291222506047,-8.407031752153472],[28.734866570762502,-8.526559340044578],[28.449871046672826,-9.164918308146085],[28.67368167492893,-9.605924981324932],[28.372253045370428,-11.793646742401393],[29.34154788586909,-12.360743910372413],[29.61600141777123,-12.178894545137311],[29.69961388521949,-13.257226657771831],[28.934285922976837,-13.248958428605135],[28.155108676879987,-12.272480564017897],[27.388798862423783,-12.132747491100666],[27.164419793412463,-11.608748467661075],[26.553087599399618,-11.924439792532127],[25.752309604604733,-11.784965101776358],[25.418118116973204,-11.330935967659961],[24.31451622894795,-11.26282642989927],[24.25715538910399,-10.951992689663657],[23.45679080576744,-10.867863457892483],[22.155268182064308,-11.084801120653772],[22.208753289486395,-9.894796237836509],[21.875181919042348,-9.523707777548566],[21.8018013851879,-8.90870655684298],[21.949130893652043,-8.305900974158277],[21.74645592620331,-7.920084730667149],[21.7281107927397,-7.290872491081302],[20.5147481625265,-7.2996058081386295],[20.6018229509383,-6.939317722199682],[20.091621534920648,-6.943090101756994],[20.037723016040218,-7.116361179231646],[19.41750247567316,-7.155428562044299],[19.01675174324967,-7.988245944860132],[18.464175652752687,-7.847014255406443],[17.472970004962235,-8.0685511206417],[16.8601908708452,-7.2222978654299865],[16.326528354567046,-5.877470391466268],[13.375597364971895,-5.8642412247995495],[12.32243167486351,-6.10009246177966],[12.182336866920252,-5.789930515163839],[12.436688266660868,-5.6843038875592455],[12.468004184629736,-5.248361504745005],[12.63161176926579,-4.991271254092936],[12.995517205465177,-4.781103203961884],[13.258240187237048,-4.882957452009165],[13.600234816144678,-4.50013844159097],[14.144956088933299,-4.510008640158716],[14.209034864975223,-4.793092136253598],[14.582603794013181,-4.97023894615014],[16.0062895036543,-3.535132744972529],[15.972803175529151,-2.7123922664536124],[16.407091912510054,-1.7409270157986825],[16.865306837642123,-1.2258163387132868],[17.523716261472856,-0.743830254726987],[17.638644646889986,-0.4248316381892465],[17.826540154703252,0.28892324462610475],[17.774191928791566,0.8556586775710854],[17.898835483479587,1.7418319767282782],[18.393792351971143,2.90044342692822],[18.54298221199778,4.201785183118318],[18.93231245288476,4.709506130385975],[19.46778364429315,5.03152781821278],[20.927591180106276,4.322785549329737],[22.405123732195538,4.029160061047321],[22.70412356943629,4.633050848810157],[22.841479526468106,4.710126247573484],[23.29721398285014,4.609693101414223],[24.410531040146253,5.10878408448913],[24.805028924262416,4.89724660890235],[25.12883344900328,4.92724477784779],[25.278798455514305,5.170408229997192],[25.650455356557472,5.256087754737123],[27.04406538260471,5.127852688004836],[27.37422610851749,5.233944403500061],[27.97997724784281,4.408413397637375],[28.428993768026913,4.287154649264494],[28.696677687298802,4.455077215996937],[29.1590784034465,4.389267279473231],[29.71599531425602,4.600804755060153],[29.953500197069474,4.173699042167684],[30.83385989759381,3.509165961110341],[30.77334679538004,2.339883327642127],[31.174149204235817,2.204465236821264],[30.46850752129029,1.5838054467797065],[29.875778842902434,0.5973798689763612],[29.819503208136638,-0.2053101538133717],[29.58783776217217,-0.587405694179381],[29.579466180140884,-1.3413131648856265],[29.291886834436614,-1.6200558406679872],[29.254834832483343,-2.2151099585089113],[29.117478875451553,-2.2922111954883846],[29.024926385216787,-2.8392579077301576],[29.276383904749053,-3.293907159034063],[29.339997592900346,-4.4999834122940925]]]}},{"name":"Somalia","geometry":{"type":"Polygon","coordinates":[[[41.58513,-1.6832500000000001],[40.993,-0.85829],[40.98105,2.7845199999999997],[42.128609999999995,4.23413],[42.76967,4.25259],[43.66086999999999,4.957550000000083],[44.96360000000001,5.00162],[47.78942,8.003],[48.93812951029645,9.451748968946617],[48.94820475850974,11.410617281697963],[50.25878000000001,11.67957],[50.73202,12.021900000000002],[51.1112,12.024640000000002],[51.04531,10.6409],[50.834179999999996,10.279720000000001],[50.55239,9.19874],[49.45270000000001,6.80466],[48.594550000000005,5.339110000000001],[46.56476,2.85529],[43.13597,0.2922],[42.04157000000001,-0.9191600000000001],[41.81095,-1.4464700000000001],[41.58513,-1.6832500000000001]]]}},{"name":"Kenya","geometry":{"type":"Polygon","coordinates":[[[39.20222,-4.67677],[37.7669,-3.6771200000000004],[37.69868999999994,-3.0969899999999484],[33.90371119710453,-0.9500000000000001],[33.893568969666944,0.1098135378618963],[34.6721,1.1769399999999999],[35.03599,1.90584],[34.47913,3.5556000000000836],[34.005,4.249884947362048],[35.29800711823298,5.506],[35.817447662353516,5.338232082790797],[35.817447662353516,4.7769656634618896],[36.159078632855646,4.447864127672769],[36.85509323800812,4.447864127672769],[38.120915,3.598605],[38.67114,3.6160700000000006],[39.55938425876585,3.42206],[39.85494,3.83879],[40.76848,4.257020000000001],[41.1718,3.9190899999999997],[41.85508309264397,3.918911920483727],[40.98105,2.7845199999999997],[40.993,-0.85829],[41.58513,-1.6832500000000001],[40.88477,-2.08255],[40.63785000000001,-2.49979],[40.26304000000001,-2.57309],[40.12119,-3.27768],[39.80006,-3.68116],[39.604890000000005,-4.3465300000000004],[39.20222,-4.67677]]]}},{"name":"Sudan","geometry":{"type":"Polygon","coordinates":[[[24.567369012152085,8.229187933785468],[23.805813429466752,8.666318874542526],[23.459012892355986,8.954285793488893],[23.394779087017184,9.265067857292223],[23.55724979014283,9.681218166538684],[23.554304233502194,10.089255275915308],[22.97754357269261,10.71446259199854],[22.876219999999932,11.384610000000123],[22.50869,11.679360000000031],[22.497619999999984,12.260240000000067],[22.288010000000043,12.646049999999946],[21.93680999999998,12.588180000000136],[22.296580000000006,13.372319999999945],[22.18329,13.78648000000004],[22.512020000000007,14.093179999999961],[22.30350999999996,14.326820000000055],[23.024590000000103,15.680720000000065],[23.886890000000108,15.610839999999996],[23.850000000000136,20.000000000000057],[25.000000000000114,20.003040000000055],[25.0,22.0],[36.86622999999997,22.0],[37.1887200000001,21.018850000000043],[36.969409999999925,20.83744000000013],[37.11470000000014,19.807960000000094],[37.4817900000001,18.61409000000009],[38.410089959473225,17.998307399970315],[37.90400000000011,17.427540000000022],[37.167470000000094,17.263140000000135],[36.852530000000115,16.956549999999993],[36.32321999999999,14.822490000000016],[36.42951000000005,14.422110000000032],[36.27022000000005,13.563330000000121],[35.86363,12.578280000000063],[35.26049000000006,12.08286000000004],[34.83163000000013,11.318960000000118],[34.73115000000013,10.910170000000107],[34.25745000000006,10.630089999999996],[33.961620000000096,9.583580000000097],[33.97498000000007,8.68455999999992],[33.963392794971185,9.464285229420625],[33.82496348090751,9.484060845715362],[33.84213085302815,9.981914637215993],[33.72195924818311,10.325262079630193],[33.206938084561784,10.720111638406593],[33.086766479716744,11.441141267476496],[33.206938084561784,12.179338268667095],[32.743419037302544,12.248007757149992],[32.67474954881965,12.02483191958072],[32.073891524594785,11.973329803218519],[32.31423473428475,11.68148447716652],[32.400071594888345,11.080626452941488],[31.850715687025513,10.531270545078826],[31.35286189552488,9.810240916008695],[30.837840731903384,9.70723668328452],[29.996639497988554,10.290927335388687],[29.61895731133285,10.084918869940225],[29.515953078608618,9.793073543888056],[29.000931914987177,9.60423245056029],[28.966597170745786,9.398223985111656],[27.970889587744352,9.398223985111656],[27.833550610778786,9.60423245056029],[27.112520981708883,9.638567194801624],[26.752006167173818,9.466893473594496],[26.477328213242515,9.552730334198088],[25.790633328413946,10.411098940233728],[25.069603699343986,10.273759963267992],[24.794925745412684,9.810240916008695],[24.53741516360202,8.91753756573172],[23.886979580860668,8.619729712933065],[24.567369012152085,8.229187933785468]]]}},{"name":"Chad","geometry":{"type":"Polygon","coordinates":[[[23.83766000000014,19.580470000000105],[23.886890000000108,15.610839999999996],[23.024590000000103,15.680720000000065],[22.30350999999996,14.326820000000055],[22.512020000000007,14.093179999999961],[22.18329,13.78648000000004],[22.296580000000006,13.372319999999945],[21.93680999999998,12.588180000000136],[22.288010000000043,12.646049999999946],[22.497619999999984,12.260240000000067],[22.50869,11.679360000000031],[22.876219999999932,11.384610000000123],[22.864165480244225,11.142395127807546],[22.23112918466876,10.97188873946061],[21.723821648859456,10.567055568885976],[21.000868361096167,9.475985215691509],[20.05968549976427,9.012706000194854],[19.09400800952602,9.07484691002584],[18.812009718509273,8.982914536978598],[18.911021762780507,8.630894680206353],[17.964929640380888,7.890914008002994],[16.705988396886255,7.5083275415299795],[16.290561557691888,7.754307359239419],[16.106231723706742,7.497087917506462],[15.279460483469109,7.421924546737969],[15.436091749745742,7.692812404811889],[14.97999555833769,8.796104234243472],[14.54446658698177,8.965861314322268],[13.954218377344006,9.549494940626687],[14.171466098699028,10.021378282099931],[14.62720055508106,9.920919297724538],[15.467872755605242,9.982336737503545],[14.92356489427496,10.891325181517473],[14.89336000000003,12.219049999999982],[14.495787387762846,12.85939626713733],[14.595781284247607,13.33042694747786],[13.95447675950561,13.353448798063766],[13.956698846094127,13.996691189016929],[13.540393507550789,14.367133693901224],[13.972170000000006,15.684370000000058],[15.247731154041844,16.627305813050782],[15.30044111497972,17.927949937405003],[15.685740594147774,19.957180080642388],[15.903246697664315,20.387618923417506],[15.487148064850146,20.730414537025638],[15.47106000000008,21.04845000000006],[15.096887648181848,21.30851878507491],[14.851300000000037,22.862950000000126],[15.860850000000084,23.409719999999993],[23.83766000000014,19.580470000000105]]]}},{"name":"South Africa","geometry":{"type":"Polygon","coordinates":[[[16.344976840895242,-28.5767050106977],[16.824017368240902,-28.08216155366447],[17.218928663815404,-28.35594329194681],[17.387497185951503,-28.78351409272978],[18.464899122804752,-29.04546192801728],[19.002127312911085,-28.972443129188868],[19.894734327888614,-28.461104831660776],[19.895767856534434,-24.76779021576059],[20.16572553882719,-24.91796192800077],[20.75860924651184,-25.86813648855145],[20.66647016773544,-26.477453301704923],[20.88960900237174,-26.828542982695915],[21.605896030369394,-26.726533705351756],[22.57953169118059,-25.979447523708146],[22.8242712745149,-25.50045867279477],[23.312096795350186,-25.26868987396572],[24.211266717228796,-25.670215752873574],[25.025170525825786,-25.7196700985769],[25.66466637543772,-25.486816094669713],[25.94165205252216,-24.69637338633322],[26.4857532081233,-24.616326592713104],[27.119409620886245,-23.574323011979775],[28.01723595552525,-22.82775359465908],[29.43218834810904,-22.091312758067588],[29.839036899542972,-22.102216485281176],[30.322883335091774,-22.271611830333935],[30.65986535006709,-22.151567478119915],[31.19140913262129,-22.2515096981724],[31.930588820124253,-24.36941659922254],[31.75240848158188,-25.484283949487413],[31.83777794772806,-25.84333180105135],[31.333157586397903,-25.66019052500895],[31.04407962415715,-25.731452325139443],[30.67660851412964,-26.398078301704608],[30.68596194837448,-26.743845310169533],[31.28277306491333,-27.285879408478998],[31.86806033705108,-27.177927341421277],[32.07166548028107,-26.73382008230491],[32.830120477028885,-26.742191664336197],[32.580264926897684,-27.470157566031816],[32.46213260267845,-28.301011244420557],[32.20338870619304,-28.75240488049007],[31.325561150851,-29.401977634398914],[30.05571618014278,-31.140269463832958],[28.2197558936771,-32.771952813448856],[27.464608188595975,-33.2269637997788],[26.419452345492825,-33.61495045342619],[25.90966434093349,-33.6670402971764],[25.780628289500697,-33.94464609144834],[25.172861769315972,-33.796851495093584],[24.677853224392123,-33.98717579522455],[23.594043409934642,-33.794474379208154],[22.988188917744736,-33.91643075941698],[22.574157342222236,-33.86408253350531],[21.542799106541025,-34.258838799782936],[20.689052768647002,-34.417175388325234],[20.071261020597632,-34.79513681410799],[19.61640506356457,-34.81916635512371],[19.193278435958717,-34.46259897230979],[18.85531456876987,-34.444305515278465],[18.42464318204938,-33.99787281670897],[18.377410922934615,-34.13652068454807],[18.24449913907992,-33.86775156019803],[18.250080193767445,-33.28143075941444],[17.92519046394844,-32.61129078545343],[18.247909783611192,-32.42913136162457],[18.22176150887148,-31.66163298922567],[17.56691775886887,-30.725721123987547],[16.344976840895242,-28.5767050106977]],[[29.32516645683259,-29.257386976846256],[28.541700066855498,-28.64750172293757],[28.074338413207784,-28.851468601193588],[27.532511020627478,-29.24271087007536],[26.999261915807637,-29.875953871379984],[27.749397006956485,-30.645105889612225],[28.107204624145425,-30.54573211031495],[28.29106937023991,-30.2262167294543],[28.84839969250774,-30.070050551068256],[29.32516645683259,-29.257386976846256]]]}},{"name":"Lesotho","geometry":{"type":"Polygon","coordinates":[[[28.541700066855498,-28.64750172293757],[29.32516645683259,-29.257386976846256],[28.84839969250774,-30.070050551068256],[28.29106937023991,-30.2262167294543],[28.107204624145425,-30.54573211031495],[27.749397006956485,-30.645105889612225],[26.999261915807637,-29.875953871379984],[27.532511020627478,-29.24271087007536],[28.074338413207784,-28.851468601193588],[28.541700066855498,-28.64750172293757]]]}},{"name":"Zimbabwe","geometry":{"type":"Polygon","coordinates":[[[31.19140913262129,-22.2515096981724],[30.65986535006709,-22.151567478119915],[30.322883335091774,-22.271611830333935],[29.839036899542972,-22.102216485281176],[29.43218834810904,-22.091312758067588],[28.794656202924216,-21.63945403410745],[28.021370070108617,-21.485975030200585],[27.72722781750326,-20.851801853114715],[27.724747348753255,-20.49905852629039],[27.296504754350508,-20.391519870691],[26.164790887158485,-19.29308562589494],[25.264225701608012,-17.736539808831417],[27.044427117630732,-17.938026218337434],[28.467906121542683,-16.468400160388846],[28.8258687680285,-16.389748630440614],[28.947463413211267,-16.04305144619444],[29.516834344203147,-15.644677829656388],[30.27425581230511,-15.507786960515213],[30.338954705534544,-15.880839125230246],[31.17306399915768,-15.860943698797874],[31.636498243951195,-16.071990248277885],[31.8520406430406,-16.319417006091378],[32.32823896661023,-16.392074069893752],[32.847638787575846,-16.713398125884616],[32.84986087416439,-17.97905730557718],[32.65488569512715,-18.672089939043495],[32.61199425632489,-19.419382826416275],[32.772707960752626,-19.715592136313298],[32.65974327976258,-20.304290052982317],[32.50869306817344,-20.395292250248307],[32.244988234188014,-21.116488539313693],[31.19140913262129,-22.2515096981724]]]}},{"name":"Botswana","geometry":{"type":"Polygon","coordinates":[[[29.43218834810904,-22.091312758067588],[28.01723595552525,-22.82775359465908],[27.119409620886245,-23.574323011979775],[26.4857532081233,-24.616326592713104],[25.94165205252216,-24.69637338633322],[25.66466637543772,-25.486816094669713],[25.025170525825786,-25.7196700985769],[24.211266717228796,-25.670215752873574],[23.312096795350186,-25.26868987396572],[22.8242712745149,-25.50045867279477],[22.57953169118059,-25.979447523708146],[21.605896030369394,-26.726533705351756],[20.88960900237174,-26.828542982695915],[20.66647016773544,-26.477453301704923],[20.75860924651184,-25.86813648855145],[20.16572553882719,-24.91796192800077],[19.895767856534434,-24.76779021576059],[19.89545779794068,-21.84915699634787],[20.88113406747587,-21.814327080983148],[20.910641310314535,-18.252218926672022],[21.655040317478978,-18.219146010005225],[23.1968583513393,-17.869038181227786],[23.579005568137717,-18.28126108162006],[24.217364536239213,-17.88934701911849],[24.520705193792537,-17.887124932529936],[25.08444339366457,-17.661815687737374],[25.264225701608012,-17.736539808831417],[26.164790887158485,-19.29308562589494],[27.296504754350508,-20.391519870691],[27.724747348753255,-20.49905852629039],[27.72722781750326,-20.851801853114715],[28.021370070108617,-21.485975030200585],[28.794656202924216,-21.63945403410745],[29.43218834810904,-22.091312758067588]]]}},{"name":"Namibia","geometry":{"type":"Polygon","coordinates":[[[19.89545779794068,-21.84915699634787],[19.894734327888614,-28.461104831660776],[19.002127312911085,-28.972443129188868],[18.464899122804752,-29.04546192801728],[17.387497185951503,-28.78351409272978],[17.218928663815404,-28.35594329194681],[16.824017368240902,-28.08216155366447],[16.344976840895242,-28.5767050106977],[15.601818068105816,-27.821247247022804],[15.21047244635946,-27.090955905874047],[14.408144158595833,-23.853014011329847],[14.385716586981149,-22.65665292734069],[14.257714064194175,-22.111208184499958],[13.86864220546866,-21.699036960539978],[13.35249799973744,-20.872834161057504],[12.608564080463621,-19.0453488094877],[11.794918654028066,-18.069129327061916],[11.734198846085121,-17.301889336824473],[12.814081251688407,-16.94134286872407],[13.462362094789967,-16.971211846588773],[14.05850141770901,-17.423380629142663],[18.263309360434164,-17.309950860262006],[18.956186964603603,-17.789094740472258],[21.377176141045567,-17.930636488519696],[24.033861525170778,-17.295843194246324],[24.682349074001507,-17.353410739819473],[25.07695031098226,-17.57882333747662],[25.08444339366457,-17.661815687737374],[24.520705193792537,-17.887124932529936],[24.217364536239213,-17.88934701911849],[23.579005568137717,-18.28126108162006],[23.1968583513393,-17.869038181227786],[21.655040317478978,-18.219146010005225],[20.910641310314535,-18.252218926672022],[20.88113406747587,-21.814327080983148],[19.89545779794068,-21.84915699634787]]]}},{"name":"Senegal","geometry":{"type":"Polygon","coordinates":[[[-16.71372880702347,13.594958604379855],[-17.126106736712615,14.373515733289224],[-17.62504269049066,14.729540513564073],[-17.18517289882223,14.919477240452862],[-16.463098110407884,16.13503611903846],[-16.12069007004193,16.455662543193384],[-15.623666144258692,16.369337063049812],[-15.135737270558819,16.587282416240782],[-14.577347581428981,16.59826365810281],[-13.435737677453062,16.03938304286619],[-12.170750291380301,14.616834214735505],[-12.12488745772126,13.994727484589788],[-11.927716030311615,13.422075100147396],[-11.55339779300543,13.141213690641067],[-11.51394283695059,12.442987575729418],[-12.203564825885634,12.465647691289405],[-12.27859900557344,12.354440008997287],[-12.499050665730564,12.332089952031057],[-13.217818162478238,12.575873521367967],[-15.54847693527401,12.628170070847347],[-16.677451951554573,12.384851589401052],[-16.841524624081273,13.15139394780256],[-15.931295945692211,13.130284125211332],[-15.141163295949468,13.509511623585238],[-14.712197231494628,13.298206691943777],[-14.277701788784555,13.280585028532244],[-13.844963344772408,13.505041612192002],[-14.046992356817482,13.79406789800045],[-14.376713833055788,13.625680243377374],[-14.687030808968487,13.630356960499784],[-15.08173539881382,13.876491807505985],[-15.39877031092446,13.86036876063092],[-15.624596320039942,13.62358734786956],[-16.71372880702347,13.594958604379855]]]}},{"name":"Mali","geometry":{"type":"Polygon","coordinates":[[[-11.456168585648271,12.076834214725338],[-11.55339779300543,13.141213690641067],[-11.927716030311615,13.422075100147396],[-12.12488745772126,13.994727484589788],[-12.170750291380301,14.616834214735505],[-11.834207526079467,14.79909699142894],[-11.666078253617854,15.388208319556298],[-11.349095017939504,15.411256008358478],[-10.650791388379417,15.132745876521426],[-10.086846482778213,15.330485744686271],[-9.700255092802706,15.264107367407362],[-9.55023840985939,15.486496893775438],[-5.537744309908447,15.501689764869257],[-5.315277268891933,16.20185374599184],[-5.488522508150439,16.325102037007966],[-6.453786586930335,24.956590684503425],[-4.923337368174231,24.974574082941],[1.8232275732590324,20.610809434486043],[2.06099083823392,20.142233384679486],[3.1466610042539003,19.693578599521445],[3.158133172222705,19.057364203360038],[4.267419467800039,19.155265204337],[4.2702099951438015,16.852227484601215],[3.7234216650634835,16.184283759012615],[3.6382589046464773,15.568119818580456],[1.3855281917468576,15.323561102759172],[1.0157833186984817,14.96818227788799],[-0.2662572900305804,14.924308986872148],[-0.5158544580003479,15.116157741755728],[-1.0663634912056636,14.973815009007765],[-2.001035122068771,14.559008287000893],[-2.1918245100903846,14.246417548067356],[-2.9676944645205765,13.79815033615151],[-3.1037068343127596,13.541266791228594],[-3.522802700199861,13.337661647998615],[-4.006390753587226,13.472485459848116],[-4.28040503581488,13.228443508349741],[-4.427166103523803,12.542645575404295],[-5.220941941743121,11.713858954307227],[-5.1978425765086484,11.37514577885014],[-5.470564947929006,10.951269842976048],[-5.404341599946974,10.370736802609146],[-6.050452032892267,10.096360785355444],[-6.205222947606431,10.524060777219134],[-6.666460944027548,10.430810655148449],[-6.8505065576350574,10.138993841996239],[-7.622759161804809,10.147236232946796],[-7.899589809592372,10.297382106970828],[-8.029943610048619,10.206534939001713],[-8.33537716310974,10.494811916541934],[-8.282357143578281,10.792597357623846],[-8.407310756860028,10.909256903522762],[-8.620321010767128,10.810890814655183],[-8.581305304386774,11.136245632364805],[-8.376304897484914,11.393645941610629],[-9.127473517279583,12.308060411015333],[-9.327616339546012,12.334286200403454],[-10.165213792348837,11.844083563682744],[-10.593223842806282,11.92397532800598],[-11.03655595543826,12.211244615116515],[-11.456168585648271,12.076834214725338]]]}},{"name":"Mauritania","geometry":{"type":"Polygon","coordinates":[[[-17.06342322434257,20.999752102130827],[-16.845193650773993,21.33332347257488],[-12.929101935263532,21.327070624267563],[-13.118754441774712,22.771220201096256],[-12.874221564169575,23.284832261645178],[-11.937224493853321,23.374594224536168],[-11.96941891117116,25.933352769468268],[-8.6872936670174,25.881056219988906],[-8.684399786809053,27.395744126896005],[-4.923337368174231,24.974574082941],[-6.453786586930335,24.956590684503425],[-5.488522508150439,16.325102037007966],[-5.315277268891933,16.20185374599184],[-5.537744309908447,15.501689764869257],[-9.55023840985939,15.486496893775438],[-9.700255092802706,15.264107367407362],[-10.086846482778213,15.330485744686271],[-10.650791388379417,15.132745876521426],[-11.349095017939504,15.411256008358478],[-11.666078253617854,15.388208319556298],[-11.834207526079467,14.79909699142894],[-12.170750291380301,14.616834214735505],[-13.435737677453062,16.03938304286619],[-14.577347581428981,16.59826365810281],[-15.135737270558819,16.587282416240782],[-15.623666144258692,16.369337063049812],[-16.12069007004193,16.455662543193384],[-16.463098110407884,16.13503611903846],[-16.549707810929064,16.673892116761962],[-16.270551723688357,17.166962795474873],[-16.14634741867485,18.108481553616656],[-16.37765112961327,19.593817246981985],[-16.277838100641517,20.0925206568147],[-16.536323614965468,20.567866319251493],[-17.06342322434257,20.999752102130827]]]}},{"name":"Benin","geometry":{"type":"Polygon","coordinates":[[[2.6917016943562544,6.258817246928629],[1.8652405127123188,6.142157701029731],[1.618950636409238,6.832038072126238],[1.664477573258381,9.12859039960938],[1.46304284018467,9.334624335157088],[1.425060662450136,9.825395412633],[0.7723356461714843,10.470808213742359],[0.8995630224740694,10.99733938236426],[1.2434696793764886,11.110510769083461],[1.4471781754710662,11.547719224488858],[1.9359855485198807,11.641150214072553],[2.49016360841793,12.233052069543675],[2.8486430192265857,12.23563589115821],[3.611180454125559,11.660167141155968],[3.572216424177469,11.32793935795152],[3.7971122575117136,10.734745591673105],[3.600070021182802,10.332186184119408],[3.7054382666259187,10.063210354040208],[2.912308383810256,9.137607937044322],[2.723792758809509,8.50684540448971],[2.6917016943562544,6.258817246928629]]]}},{"name":"Niger","geometry":{"type":"Polygon","coordinates":[[[14.851300000000037,22.862950000000126],[15.096887648181848,21.30851878507491],[15.47106000000008,21.04845000000006],[15.487148064850146,20.730414537025638],[15.903246697664315,20.387618923417506],[15.685740594147774,19.957180080642388],[15.30044111497972,17.927949937405003],[15.247731154041844,16.627305813050782],[13.972170000000006,15.684370000000058],[13.540393507550789,14.367133693901224],[13.956698846094127,13.996691189016929],[13.95447675950561,13.353448798063766],[14.595781284247607,13.33042694747786],[14.495787387762846,12.85939626713733],[14.213530714584635,12.802035427293347],[14.181336297266794,12.483656927943116],[13.995352817448293,12.461565253138303],[13.318701613018561,13.556356309457826],[13.083987257548813,13.596147162322495],[12.302071160540523,13.037189032437524],[11.527803175511394,13.328980007373588],[10.989593133191534,13.387322699431195],[10.701031935273706,13.246917832894084],[10.114814487354693,13.27725189864941],[9.524928012742947,12.851102199754479],[9.014933302454438,12.826659247280418],[7.804671258178786,13.343526923063747],[7.330746697630019,13.0980380314612],[6.820441928747754,13.115091254117518],[6.445426059605637,13.492768459522678],[5.443058302440136,13.865923977102227],[4.368343540066007,13.747481594289411],[4.107945997747322,13.531215725147831],[3.9672827490488487,12.956108710171575],[3.6806335791258107,12.552903347214226],[3.611180454125559,11.660167141155968],[2.8486430192265857,12.23563589115821],[2.49016360841793,12.233052069543675],[2.1544735042499212,11.940150051313339],[2.177107781593776,12.625017808477535],[1.0241032242974768,12.851825669806574],[0.9930456884900708,13.335749620003824],[0.429927605805517,13.988733018443924],[0.29564639649510127,14.444234930880654],[0.3748922054146817,14.92890818934613],[1.0157833186984817,14.96818227788799],[1.3855281917468576,15.323561102759172],[3.6382589046464773,15.568119818580456],[3.7234216650634835,16.184283759012615],[4.2702099951438015,16.852227484601215],[4.267419467800039,19.155265204337],[5.677565952180686,19.601206976799716],[8.572893100629784,21.565660712159143],[11.999505649471613,23.47166840259645],[13.581424594790462,23.04050608976928],[14.143870883855243,22.491288967371133],[14.851300000000037,22.862950000000126]]]}},{"name":"Nigeria","geometry":{"type":"Polygon","coordinates":[[[2.6917016943562544,6.258817246928629],[2.723792758809509,8.50684540448971],[2.912308383810256,9.137607937044322],[3.7054382666259187,10.063210354040208],[3.600070021182802,10.332186184119408],[3.7971122575117136,10.734745591673105],[3.572216424177469,11.32793935795152],[3.6806335791258107,12.552903347214226],[3.9672827490488487,12.956108710171575],[4.107945997747322,13.531215725147831],[4.368343540066007,13.747481594289411],[5.443058302440136,13.865923977102227],[6.445426059605637,13.492768459522678],[6.820441928747754,13.115091254117518],[7.330746697630019,13.0980380314612],[7.804671258178786,13.343526923063747],[9.014933302454438,12.826659247280418],[9.524928012742947,12.851102199754479],[10.114814487354693,13.27725189864941],[10.701031935273706,13.246917832894084],[10.989593133191534,13.387322699431195],[11.527803175511394,13.328980007373588],[12.302071160540523,13.037189032437524],[13.083987257548813,13.596147162322495],[13.318701613018561,13.556356309457826],[13.995352817448293,12.461565253138303],[14.181336297266794,12.483656927943116],[14.577177768622533,12.085360826053503],[14.415378859116684,11.572368882692075],[13.572949659894562,10.798565985553566],[12.753671502339216,8.717762762888995],[12.218872104550599,8.305824082874324],[11.74577436691851,6.981382961449754],[11.058787876030351,6.6444267846905944],[10.497375115611419,7.0553577742755635],[10.118276808318257,7.03876963950988],[9.522705926154401,6.453482367372117],[9.233162876023044,6.444490668153335],[8.500287713259695,4.7719829370268485],[7.462108188515941,4.412108262546241],[7.0825964697644395,4.4646890324032285],[6.6980721370806,4.240594183769517],[5.898172641634687,4.262453314628985],[5.3628048030908815,4.887970689305959],[5.033574252959369,5.611802476418234],[4.325607130560684,6.2706511499234665],[2.6917016943562544,6.258817246928629]]]}},{"name":"Cameroon","geometry":{"type":"Polygon","coordinates":[[[14.495787387762846,12.85939626713733],[14.89336000000003,12.219049999999982],[14.92356489427496,10.891325181517473],[15.467872755605242,9.982336737503545],[14.62720055508106,9.920919297724538],[14.171466098699028,10.021378282099931],[13.954218377344006,9.549494940626687],[14.54446658698177,8.965861314322268],[14.97999555833769,8.796104234243472],[15.436091749745742,7.692812404811889],[14.776545444404576,6.408498033062045],[14.536560092841114,6.2269587264206905],[14.47837243008047,4.732605495620447],[14.950953403389661,4.210389309094921],[15.036219516671252,3.8513672957471243],[15.405395948964383,3.33530060466434],[15.862732374747482,3.0135372989989833],[16.012852410555354,2.267639675298085],[15.940918816805066,1.7276726342802957],[14.33781253424658,2.2278746606494906],[12.951333855855609,2.32161570882694],[12.359380323952221,2.19281220133945],[11.75166548019979,2.3267575138399934],[9.649158155972628,2.2838660750377358],[9.795195753629457,3.073404445809117],[9.404366896206,3.734526882335203],[8.948115675501072,3.9041289331171356],[8.744923943729418,4.35221527751996],[8.48881554529089,4.495617377129918],[8.757532993208628,5.479665839047911],[9.233162876023044,6.444490668153335],[9.522705926154401,6.453482367372117],[10.118276808318257,7.03876963950988],[10.497375115611419,7.0553577742755635],[11.058787876030351,6.6444267846905944],[11.74577436691851,6.981382961449754],[12.218872104550599,8.305824082874324],[12.753671502339216,8.717762762888995],[13.572949659894562,10.798565985553566],[14.415378859116684,11.572368882692075],[14.577177768622533,12.085360826053503],[14.181336297266794,12.483656927943116],[14.213530714584635,12.802035427293347],[14.495787387762846,12.85939626713733]]]}},{"name":"Togo","geometry":{"type":"Polygon","coordinates":[[[0.8995630224740694,10.99733938236426],[0.7723356461714843,10.470808213742359],[1.425060662450136,9.825395412633],[1.46304284018467,9.334624335157088],[1.664477573258381,9.12859039960938],[1.618950636409238,6.832038072126238],[1.8652405127123188,6.142157701029731],[1.0601216976049272,5.928837388528876],[0.5703841487748491,6.914358628767189],[0.4909574723422451,7.411744289576475],[0.7120292496868785,8.31246450442383],[0.46119184734212126,8.677222601756014],[0.3675799902453889,10.19121287682718],[-0.04978471515994442,10.706917832883931],[0.023802524423700785,11.018681748900804],[0.8995630224740694,10.99733938236426]]]}},{"name":"Ghana","geometry":{"type":"Polygon","coordinates":[[[0.023802524423700785,11.018681748900804],[-0.04978471515994442,10.706917832883931],[0.3675799902453889,10.19121287682718],[0.46119184734212126,8.677222601756014],[0.7120292496868785,8.31246450442383],[0.4909574723422451,7.411744289576475],[0.5703841487748491,6.914358628767189],[1.0601216976049272,5.928837388528876],[-1.9647065901675944,4.710462144383371],[-2.856125047202397,4.994475816259509],[-2.8107014632178395,5.38905121502411],[-3.244370083011262,6.250471503113502],[-2.9835849674503265,7.379704901555513],[-2.562189500326241,8.219627793811483],[-2.9638962467471117,10.395334784380083],[-2.9404093082704605,10.962690334512558],[-0.7615758935481834,10.936929633015055],[-0.43870154458858224,11.098340969278722],[0.023802524423700785,11.018681748900804]]]}},{"name":"C\u00f4te d'Ivoire","geometry":{"type":"Polygon","coordinates":[[[-8.229337124046822,10.1290202905639],[-7.899589809592372,10.297382106970828],[-7.622759161804809,10.147236232946796],[-6.8505065576350574,10.138993841996239],[-6.666460944027548,10.430810655148449],[-6.205222947606431,10.524060777219134],[-6.050452032892267,10.096360785355444],[-5.404341599946974,10.370736802609146],[-4.954653286143099,10.152713934769736],[-4.7798835921319665,9.821984768101743],[-4.3302469547603835,9.610834865757141],[-3.9804491845766847,9.8623440617217],[-3.511898972986273,9.90032623945622],[-2.8274963037127065,9.642460842319778],[-2.562189500326241,8.219627793811483],[-2.9835849674503265,7.379704901555513],[-3.244370083011262,6.250471503113502],[-2.8107014632178395,5.38905121502411],[-2.856125047202397,4.994475816259509],[-3.3110843571000714,4.984295559098015],[-4.008819545904942,5.179813340674315],[-4.649917364917911,5.168263658057086],[-5.8344962223445265,4.993700669775137],[-7.5189412093304355,4.338288479017308],[-7.7121593896697505,4.364565944837722],[-7.635368211284031,5.188159084489456],[-7.539715135111763,5.313345241716519],[-7.570152553731688,5.707352199725904],[-7.993692592795881,6.126189683451543],[-8.311347622094019,6.193033148621083],[-8.60288021486862,6.4675641951716605],[-8.385451626000574,6.911800645368743],[-8.48544552248535,7.39520783124307],[-8.439298468448698,7.686042792181738],[-8.280703497744938,7.687179673692157],[-8.221792364932199,8.123328762235573],[-8.299048631208564,8.316443589710303],[-8.20349890790088,8.455453192575447],[-7.832100389019188,8.575704250518626],[-8.30961646161225,9.789531968622441],[-8.229337124046822,10.1290202905639]]]}},{"name":"Guinea","geometry":{"type":"Polygon","coordinates":[[[-13.700476040084325,12.586182969610194],[-13.217818162478238,12.575873521367967],[-12.499050665730564,12.332089952031057],[-12.27859900557344,12.354440008997287],[-12.203564825885634,12.465647691289405],[-11.51394283695059,12.442987575729418],[-11.456168585648271,12.076834214725338],[-11.03655595543826,12.211244615116515],[-10.593223842806282,11.92397532800598],[-10.165213792348837,11.844083563682744],[-9.327616339546012,12.334286200403454],[-9.127473517279583,12.308060411015333],[-8.376304897484914,11.393645941610629],[-8.581305304386774,11.136245632364805],[-8.620321010767128,10.810890814655183],[-8.407310756860028,10.909256903522762],[-8.282357143578281,10.792597357623846],[-8.33537716310974,10.494811916541934],[-8.029943610048619,10.206534939001713],[-8.229337124046822,10.1290202905639],[-8.30961646161225,9.789531968622441],[-7.832100389019188,8.575704250518626],[-8.20349890790088,8.455453192575447],[-8.299048631208564,8.316443589710303],[-8.221792364932199,8.123328762235573],[-8.280703497744938,7.687179673692157],[-8.722123582382125,7.71167430259851],[-8.926064622422004,7.309037380396376],[-9.208786383490846,7.313920803247953],[-9.40334815106975,7.526905218938907],[-9.337279832384581,7.9285344507113535],[-9.755342169625834,8.541055202666925],[-10.505477260774668,8.348896389189605],[-10.622395188835041,9.267910061068278],[-11.11748124840733,10.045872911006285],[-11.917277390988659,10.046983954300558],[-12.150338100625005,9.858571682164381],[-12.425928514037565,9.835834051955956],[-12.71195756677308,9.342711696810767],[-13.246550258832515,8.903048610871508],[-14.074044969122282,9.886166897008252],[-14.579698859098258,10.214467271358515],[-14.839553798877944,10.87657156009814],[-15.130311245168173,11.040411688679526],[-14.685687221728898,11.527823798056488],[-14.382191534878729,11.509271958863692],[-13.743160773157413,11.811269029177412],[-13.828271857142125,12.142644151249044],[-13.718743658899513,12.24718557377551],[-13.700476040084325,12.586182969610194]]]}},{"name":"Guinea-Bissau","geometry":{"type":"Polygon","coordinates":[[[-16.677451951554573,12.384851589401052],[-15.54847693527401,12.628170070847347],[-13.700476040084325,12.586182969610194],[-13.718743658899513,12.24718557377551],[-13.828271857142125,12.142644151249044],[-13.743160773157413,11.811269029177412],[-14.382191534878729,11.509271958863692],[-14.685687221728898,11.527823798056488],[-15.130311245168173,11.040411688679526],[-15.664180467175527,11.458474025920795],[-16.085214199273565,11.52459402103824],[-16.677451951554573,12.384851589401052]]]}},{"name":"Liberia","geometry":{"type":"Polygon","coordinates":[[[-8.439298468448698,7.686042792181738],[-8.385451626000574,6.911800645368743],[-8.60288021486862,6.4675641951716605],[-8.311347622094019,6.193033148621083],[-7.993692592795881,6.126189683451543],[-7.570152553731688,5.707352199725904],[-7.539715135111763,5.313345241716519],[-7.635368211284031,5.188159084489456],[-7.7121593896697505,4.364565944837722],[-7.974107224957251,4.355755113131963],[-9.004793667018674,4.8324185245922],[-10.765383876986645,6.140710760925558],[-11.438779466182055,6.7859168563057475],[-11.19980180504828,7.1058456486247366],[-11.146704270868383,7.396706447779536],[-10.23009355309128,8.406205552601293],[-9.755342169625834,8.541055202666925],[-9.337279832384581,7.9285344507113535],[-9.40334815106975,7.526905218938907],[-9.208786383490846,7.313920803247953],[-8.926064622422004,7.309037380396376],[-8.722123582382125,7.71167430259851],[-8.439298468448698,7.686042792181738]]]}},{"name":"Sierra Leone","geometry":{"type":"Polygon","coordinates":[[[-13.246550258832515,8.903048610871508],[-12.71195756677308,9.342711696810767],[-12.425928514037565,9.835834051955956],[-12.150338100625005,9.858571682164381],[-11.917277390988659,10.046983954300558],[-11.11748124840733,10.045872911006285],[-10.622395188835041,9.267910061068278],[-10.505477260774668,8.348896389189605],[-10.23009355309128,8.406205552601293],[-11.146704270868383,7.396706447779536],[-11.19980180504828,7.1058456486247366],[-11.438779466182055,6.7859168563057475],[-12.428098924193819,7.26294200279203],[-12.949049038128194,7.798645738145738],[-13.124025437868482,8.163946438016978],[-13.246550258832515,8.903048610871508]]]}},{"name":"Burkina Faso","geometry":{"type":"Polygon","coordinates":[[[-5.404341599946974,10.370736802609146],[-5.470564947929006,10.951269842976048],[-5.1978425765086484,11.37514577885014],[-5.220941941743121,11.713858954307227],[-4.427166103523803,12.542645575404295],[-4.28040503581488,13.228443508349741],[-4.006390753587226,13.472485459848116],[-3.522802700199861,13.337661647998615],[-3.1037068343127596,13.541266791228594],[-2.9676944645205765,13.79815033615151],[-2.1918245100903846,14.246417548067356],[-2.001035122068771,14.559008287000893],[-1.0663634912056636,14.973815009007765],[-0.5158544580003479,15.116157741755728],[-0.2662572900305804,14.924308986872148],[0.3748922054146817,14.92890818934613],[0.29564639649510127,14.444234930880654],[0.429927605805517,13.988733018443924],[0.9930456884900708,13.335749620003824],[1.0241032242974768,12.851825669806574],[2.177107781593776,12.625017808477535],[2.1544735042499212,11.940150051313339],[1.9359855485198807,11.641150214072553],[1.4471781754710662,11.547719224488858],[1.2434696793764886,11.110510769083461],[0.8995630224740694,10.99733938236426],[-0.43870154458858224,11.098340969278722],[-0.7615758935481834,10.936929633015055],[-2.9404093082704605,10.962690334512558],[-2.9638962467471117,10.395334784380083],[-2.8274963037127065,9.642460842319778],[-3.511898972986273,9.90032623945622],[-3.9804491845766847,9.8623440617217],[-4.3302469547603835,9.610834865757141],[-4.7798835921319665,9.821984768101743],[-4.954653286143099,10.152713934769736],[-5.404341599946974,10.370736802609146]]]}},{"name":"Central African Rep.","geometry":{"type":"Polygon","coordinates":[[[27.37422610851749,5.233944403500061],[27.04406538260471,5.127852688004836],[25.650455356557472,5.256087754737123],[25.278798455514305,5.170408229997192],[25.12883344900328,4.92724477784779],[24.805028924262416,4.89724660890235],[24.410531040146253,5.10878408448913],[23.29721398285014,4.609693101414223],[22.841479526468106,4.710126247573484],[22.70412356943629,4.633050848810157],[22.405123732195538,4.029160061047321],[20.927591180106276,4.322785549329737],[19.46778364429315,5.03152781821278],[18.93231245288476,4.709506130385975],[18.54298221199778,4.201785183118318],[18.45306521980993,3.5043858911233485],[17.133042433346304,3.728196519379452],[16.537058139724138,3.198254706226279],[16.012852410555354,2.267639675298085],[15.862732374747482,3.0135372989989833],[15.405395948964383,3.33530060466434],[15.036219516671252,3.8513672957471243],[14.950953403389661,4.210389309094921],[14.47837243008047,4.732605495620447],[14.558935988023507,5.03059764243153],[14.459407179429348,5.4517605656103],[14.536560092841114,6.2269587264206905],[14.776545444404576,6.408498033062045],[15.279460483469109,7.421924546737969],[16.106231723706742,7.497087917506462],[16.290561557691888,7.754307359239419],[16.705988396886255,7.5083275415299795],[17.964929640380888,7.890914008002994],[18.911021762780507,8.630894680206353],[18.812009718509273,8.982914536978598],[19.09400800952602,9.07484691002584],[20.05968549976427,9.012706000194854],[21.000868361096167,9.475985215691509],[21.723821648859456,10.567055568885976],[22.23112918466876,10.97188873946061],[22.864165480244225,11.142395127807546],[22.97754357269261,10.71446259199854],[23.554304233502194,10.089255275915308],[23.55724979014283,9.681218166538684],[23.394779087017184,9.265067857292223],[23.459012892355986,8.954285793488893],[25.11493248871679,7.825104071479174],[25.124130893664727,7.500085150579437],[26.213418409945117,6.546603298362072],[26.465909458123235,5.9467174341018705],[27.21340905122517,5.5509534773945575],[27.37422610851749,5.233944403500061]]]}},{"name":"Congo","geometry":{"type":"Polygon","coordinates":[[[18.45306521980993,3.5043858911233485],[18.393792351971143,2.90044342692822],[17.898835483479587,1.7418319767282782],[17.774191928791566,0.8556586775710854],[17.826540154703252,0.28892324462610475],[17.638644646889986,-0.4248316381892465],[17.523716261472856,-0.743830254726987],[16.865306837642123,-1.2258163387132868],[16.407091912510054,-1.7409270157986825],[15.972803175529151,-2.7123922664536124],[16.0062895036543,-3.535132744972529],[14.582603794013181,-4.97023894615014],[14.209034864975223,-4.793092136253598],[14.144956088933299,-4.510008640158716],[13.600234816144678,-4.50013844159097],[13.258240187237048,-4.882957452009165],[12.620759718484493,-4.438023369976136],[11.91496300624209,-5.037986748884791],[11.093772820691925,-3.978826592630547],[11.855121697648116,-3.4268706193210505],[11.478038771214303,-2.7656189917142413],[11.820963575903193,-2.514161472181982],[12.495702752338161,-2.391688327650243],[12.575284458067642,-1.948511244315135],[13.109618767965628,-2.4287403296035137],[13.99240726080771,-2.4708049454890997],[14.299210239324566,-1.998275648612214],[14.425455763413595,-1.333406670744971],[14.316418491277744,-0.5526274552470483],[13.843320753645656,0.038757635901149],[14.276265903386957,1.1969298364266194],[14.026668735417218,1.3956773950211527],[13.282631463278818,1.3141836612968805],[13.003113641012078,1.8308963077833198],[13.075822381246752,2.2670970727590145],[14.33781253424658,2.2278746606494906],[15.940918816805066,1.7276726342802957],[16.012852410555354,2.267639675298085],[16.537058139724138,3.198254706226279],[17.133042433346304,3.728196519379452],[18.45306521980993,3.5043858911233485]]]}},{"name":"Gabon","geometry":{"type":"Polygon","coordinates":[[[11.276449008843713,2.261050930180872],[11.75166548019979,2.3267575138399934],[12.359380323952221,2.19281220133945],[12.951333855855609,2.32161570882694],[13.075822381246752,2.2670970727590145],[13.003113641012078,1.8308963077833198],[13.282631463278818,1.3141836612968805],[14.026668735417218,1.3956773950211527],[14.276265903386957,1.1969298364266194],[13.843320753645656,0.038757635901149],[14.316418491277744,-0.5526274552470483],[14.425455763413595,-1.333406670744971],[14.299210239324566,-1.998275648612214],[13.99240726080771,-2.4708049454890997],[13.109618767965628,-2.4287403296035137],[12.575284458067642,-1.948511244315135],[12.495702752338161,-2.391688327650243],[11.820963575903193,-2.514161472181982],[11.478038771214303,-2.7656189917142413],[11.855121697648116,-3.4268706193210505],[11.093772820691925,-3.978826592630547],[10.06613528813574,-2.9694825171056816],[9.40524539555497,-2.144313246269043],[8.79799563969317,-1.111301364754496],[8.830086704146424,-0.7790735815500369],[9.048419630579588,-0.45935149496021666],[9.492888624721985,1.010119533691494],[11.285078973036462,1.0576618514000131],[11.276449008843713,2.261050930180872]]]}},{"name":"Eq. Guinea","geometry":{"type":"Polygon","coordinates":[[[9.649158155972628,2.2838660750377358],[11.276449008843713,2.261050930180872],[11.285078973036462,1.0576618514000131],[9.492888624721985,1.010119533691494],[9.305613234096256,1.1609113631191832],[9.649158155972628,2.2838660750377358]]]}},{"name":"Zambia","geometry":{"type":"Polygon","coordinates":[[[30.346086053190817,-8.238256524288218],[32.75937544122132,-9.23059905358906],[33.2313879737753,-9.6767216935648],[33.48568769708359,-10.525558770391115],[33.315310499817286,-10.796549981329697],[33.114289178201915,-11.607198174692314],[33.306422153463075,-12.435778090060218],[32.991764357237884,-12.783870537978274],[32.68816531752313,-13.712857761289277],[33.214024692525214,-13.971860039936153],[30.17948123548183,-14.796099134991529],[30.27425581230511,-15.507786960515213],[29.516834344203147,-15.644677829656388],[28.947463413211267,-16.04305144619444],[28.8258687680285,-16.389748630440614],[28.467906121542683,-16.468400160388846],[27.044427117630732,-17.938026218337434],[25.264225701608012,-17.736539808831417],[24.682349074001507,-17.353410739819473],[24.033861525170778,-17.295843194246324],[23.215048455506064,-17.523116143465984],[21.887842644953874,-16.08031015387688],[21.933886346125917,-12.898437188369359],[24.016136508894675,-12.911046237848574],[23.930922072045377,-12.565847670138856],[24.079905226342845,-12.191296888887365],[23.904153680118185,-11.722281589406322],[24.01789350759259,-11.23729827234709],[23.912215203555718,-10.926826267137514],[24.25715538910399,-10.951992689663657],[24.31451622894795,-11.26282642989927],[25.418118116973204,-11.330935967659961],[25.752309604604733,-11.784965101776358],[26.553087599399618,-11.924439792532127],[27.164419793412463,-11.608748467661075],[27.388798862423783,-12.132747491100666],[28.155108676879987,-12.272480564017897],[28.934285922976837,-13.248958428605135],[29.69961388521949,-13.257226657771831],[29.61600141777123,-12.178894545137311],[29.34154788586909,-12.360743910372413],[28.372253045370428,-11.793646742401393],[28.67368167492893,-9.605924981324932],[28.449871046672826,-9.164918308146085],[28.734866570762502,-8.526559340044578],[29.00291222506047,-8.407031752153472],[30.346086053190817,-8.238256524288218]]]}},{"name":"Malawi","geometry":{"type":"Polygon","coordinates":[[[32.75937544122132,-9.23059905358906],[33.73972000000009,-9.417149999999992],[34.27999999999997,-10.160000000000025],[34.55998904799935,-11.520020033415925],[34.28000613784198,-12.280025323132506],[34.55998904799935,-13.579997653866876],[34.907151320136165,-13.565424899960568],[35.26795617039801,-13.887834161029566],[35.68684533055594,-14.611045830954332],[35.77190473810836,-15.896858819240727],[35.339062941231646,-16.10744028083011],[35.033810255683534,-16.801299737213093],[34.38129194513405,-16.183559665596043],[34.307291294092096,-15.478641452702597],[34.51766604995231,-15.013708591372612],[34.45963341648854,-14.613009535381423],[34.064825473778626,-14.35995004644812],[33.789700148256685,-14.45183074306307],[33.214024692525214,-13.971860039936153],[32.68816531752313,-13.712857761289277],[32.991764357237884,-12.783870537978274],[33.306422153463075,-12.435778090060218],[33.114289178201915,-11.607198174692314],[33.315310499817286,-10.796549981329697],[33.48568769708359,-10.525558770391115],[33.2313879737753,-9.6767216935648],[32.75937544122132,-9.23059905358906]]]}},{"name":"Mozambique","geometry":{"type":"Polygon","coordinates":[[[34.55998904799935,-11.520020033415925],[35.31239790216904,-11.439146416879147],[36.51408165868426,-11.720938002166735],[36.775150994622805,-11.594537448780805],[37.471289999999954,-11.568759999999997],[37.827639999999974,-11.26878999999991],[38.42755659358775,-11.285202325081656],[39.52099999999996,-10.89688000000001],[40.31658857601719,-10.317096042525698],[40.47838748552303,-10.765440769089993],[40.437253045418686,-11.761710707245015],[40.59962039567975,-14.201975192931862],[40.775475294768995,-14.691764418194241],[40.08926395036522,-16.10077402106446],[39.45255862809705,-16.72089120856694],[37.41113284683888,-17.586368096591237],[36.28127933120936,-18.65968759529345],[35.89649661636406,-18.842260430580637],[35.198399692533144,-19.552811374593894],[34.78638349787005,-19.784011732667736],[34.70189253107284,-20.49704314543101],[35.176127150215365,-21.25436126066841],[35.385848253705404,-22.14],[35.562545536369086,-22.090000000000003],[35.533934767404304,-23.070787855727758],[35.37177412287238,-23.5353589820317],[35.60747033055563,-23.706563002214683],[35.45874555841962,-24.12260995859655],[35.04073489761066,-24.478350518493805],[33.01321007663901,-25.357573337507738],[32.574632195777866,-25.727318210556092],[32.66036339695009,-26.148584486599447],[32.91595503106569,-26.215867201443466],[32.830120477028885,-26.742191664336197],[32.07166548028107,-26.73382008230491],[31.75240848158188,-25.484283949487413],[31.930588820124253,-24.36941659922254],[31.19140913262129,-22.2515096981724],[32.244988234188014,-21.116488539313693],[32.50869306817344,-20.395292250248307],[32.65974327976258,-20.304290052982317],[32.772707960752626,-19.715592136313298],[32.61199425632489,-19.419382826416275],[32.65488569512715,-18.672089939043495],[32.84986087416439,-17.97905730557718],[32.847638787575846,-16.713398125884616],[32.32823896661023,-16.392074069893752],[31.8520406430406,-16.319417006091378],[31.636498243951195,-16.071990248277885],[31.17306399915768,-15.860943698797874],[30.338954705534544,-15.880839125230246],[30.17948123548183,-14.796099134991529],[33.214024692525214,-13.971860039936153],[33.789700148256685,-14.45183074306307],[34.064825473778626,-14.35995004644812],[34.45963341648854,-14.613009535381423],[34.51766604995231,-15.013708591372612],[34.307291294092096,-15.478641452702597],[34.38129194513405,-16.183559665596043],[35.033810255683534,-16.801299737213093],[35.339062941231646,-16.10744028083011],[35.77190473810836,-15.896858819240727],[35.68684533055594,-14.611045830954332],[35.26795617039801,-13.887834161029566],[34.907151320136165,-13.565424899960568],[34.55998904799935,-13.579997653866876],[34.28000613784198,-12.280025323132506],[34.55998904799935,-11.520020033415925]]]}},{"name":"eSwatini","geometry":{"type":"Polygon","coordinates":[[[32.07166548028107,-26.73382008230491],[31.86806033705108,-27.177927341421277],[31.28277306491333,-27.285879408478998],[30.68596194837448,-26.743845310169533],[30.67660851412964,-26.398078301704608],[31.04407962415715,-25.731452325139443],[31.333157586397903,-25.66019052500895],[31.83777794772806,-25.84333180105135],[32.07166548028107,-26.73382008230491]]]}},{"name":"Angola","geometry":{"type":"MultiPolygon","coordinates":[[[[12.995517205465177,-4.781103203961884],[12.63161176926579,-4.991271254092936],[12.468004184629736,-5.248361504745005],[12.436688266660868,-5.6843038875592455],[12.182336866920252,-5.789930515163839],[11.91496300624209,-5.037986748884791],[12.620759718484493,-4.438023369976136],[12.995517205465177,-4.781103203961884]]],[[[12.32243167486351,-6.10009246177966],[13.375597364971895,-5.8642412247995495],[16.326528354567046,-5.877470391466268],[16.8601908708452,-7.2222978654299865],[17.472970004962235,-8.0685511206417],[18.464175652752687,-7.847014255406443],[19.01675174324967,-7.988245944860132],[19.41750247567316,-7.155428562044299],[20.037723016040218,-7.116361179231646],[20.091621534920648,-6.943090101756994],[20.6018229509383,-6.939317722199682],[20.5147481625265,-7.2996058081386295],[21.7281107927397,-7.290872491081302],[21.74645592620331,-7.920084730667149],[21.949130893652043,-8.305900974158277],[21.8018013851879,-8.90870655684298],[21.875181919042348,-9.523707777548566],[22.208753289486395,-9.894796237836509],[22.155268182064308,-11.084801120653772],[23.45679080576744,-10.867863457892483],[23.912215203555718,-10.926826267137514],[24.01789350759259,-11.23729827234709],[23.904153680118185,-11.722281589406322],[24.079905226342845,-12.191296888887365],[23.930922072045377,-12.565847670138856],[24.016136508894675,-12.911046237848574],[21.933886346125917,-12.898437188369359],[21.887842644953874,-16.08031015387688],[23.215048455506064,-17.523116143465984],[21.377176141045567,-17.930636488519696],[18.956186964603603,-17.789094740472258],[18.263309360434164,-17.309950860262006],[14.05850141770901,-17.423380629142663],[13.462362094789967,-16.971211846588773],[12.814081251688407,-16.94134286872407],[11.734198846085121,-17.301889336824473],[11.64009606288161,-16.67314218512925],[11.778537224991537,-15.793816013250735],[12.12358076340439,-14.878316338767904],[12.175618930722294,-14.449143568583892],[12.738478631245385,-13.137905775609902],[13.6337211442698,-12.03864470789717],[13.738727654686897,-11.297863050993165],[13.686379428775238,-10.73107594161589],[13.387327915102162,-10.373578383020714],[12.875369500386569,-9.166933689005468],[13.236432732809874,-8.562629489784307],[12.728298374083892,-6.927122084178805],[12.227347039446471,-6.294447523629394],[12.32243167486351,-6.10009246177966]]]]}},{"name":"Burundi","geometry":{"type":"Polygon","coordinates":[[[30.469673645761223,-2.41385475710134],[30.527660000000026,-2.807619999999986],[30.743010000000027,-3.034309999999948],[30.752240000000086,-3.3593099999999936],[29.753512404099865,-4.452389418153302],[29.339997592900346,-4.4999834122940925],[29.276383904749053,-3.293907159034063],[29.024926385216787,-2.8392579077301576],[29.632176141078588,-2.917857761246097],[29.93835900240794,-2.348486830254238],[30.469673645761223,-2.41385475710134]]]}},{"name":"Madagascar","geometry":{"type":"Polygon","coordinates":[[[49.54351891459575,-12.469832858940554],[50.056510857957164,-13.555761407121985],[50.21743126811407,-14.758788750876796],[50.47653689962553,-15.226512139550543],[50.377111443895956,-15.706069431219127],[50.20027469259318,-16.000263360256767],[49.86060550313868,-15.414252618066918],[49.67260664246086,-15.710203545802479],[49.863344354050156,-16.451036879138776],[49.77456424337271,-16.8750420060936],[49.49861209493412,-17.106035658438273],[49.435618523970305,-17.953064060134366],[47.095761346226595,-24.941629733990453],[46.282477654817086,-25.178462823184105],[45.40950768411045,-25.60143442149309],[44.03972049334976,-24.988345228782308],[43.76376834491117,-24.46067717864999],[43.697777540874455,-23.574116306250602],[43.345654331237625,-22.776903985283873],[43.254187046081,-22.057413018484123],[43.43329756040464,-21.33647511158019],[43.893682895692926,-21.16330738697013],[43.896370070172104,-20.830459486578174],[44.37432539243966,-20.07236622485639],[44.46439741392439,-19.435454196859048],[44.042976108584156,-18.33138722094317],[43.96308434426091,-17.409944756746782],[44.31246870298628,-16.850495700754955],[44.4465173683514,-16.216219170804507],[44.94493655780653,-16.1793738745804],[45.87299360533626,-15.793454278224687],[46.31224327981721,-15.780018405828798],[47.70512983581236,-14.594302666891764],[48.005214878131255,-14.091232598530375],[47.869047479042166,-13.663868503476586],[48.29382775248138,-13.784067884987486],[48.84506025573879,-13.089174899958664],[48.86350874206698,-12.48786793381042],[49.194651320193316,-12.04055673589197],[49.54351891459575,-12.469832858940554]]]}},{"name":"Gambia","geometry":{"type":"Polygon","coordinates":[[[-16.71372880702347,13.594958604379855],[-15.624596320039942,13.62358734786956],[-15.39877031092446,13.86036876063092],[-15.08173539881382,13.876491807505985],[-14.687030808968487,13.630356960499784],[-14.376713833055788,13.625680243377374],[-14.046992356817482,13.79406789800045],[-13.844963344772408,13.505041612192002],[-14.277701788784555,13.280585028532244],[-14.712197231494628,13.298206691943777],[-15.141163295949468,13.509511623585238],[-15.931295945692211,13.130284125211332],[-16.841524624081273,13.15139394780256],[-16.71372880702347,13.594958604379855]]]}},{"name":"Tunisia","geometry":{"type":"Polygon","coordinates":[[[9.482139926805274,30.307556057246188],[9.05560265466815,32.10269196220129],[8.439102817426118,32.50628489840082],[8.430472853233368,32.74833730725595],[7.6126416357821824,33.34411489514896],[7.524481642292244,34.09737641045146],[8.140981479534304,34.65514598239379],[8.376367628623768,35.479876003555944],[8.217824334352315,36.433176988260286],[8.420964389691676,36.94642731378316],[9.509993523810607,37.349994411766545],[10.210002475636317,37.230001735984814],[10.180650262094531,36.724037787415085],[11.02886722173335,37.09210317641396],[11.100025668999251,36.899996039368915],[10.600004510143094,36.410000108377375],[10.593286573945138,35.94744436293281],[10.939518670300687,35.698984076473494],[10.807847120821009,34.83350718844919],[10.149592726287125,34.33077301689771],[10.339658644256616,33.78574168551532],[10.856836378633687,33.76874013929128],[11.108500603895122,33.293342800422195],[11.488787469131012,33.13699575452324],[11.432253452203696,32.368903103152874],[9.950225050505082,31.376069647745258],[10.056575148161699,30.961831366493527],[9.970017124072854,30.53932485607524],[9.482139926805274,30.307556057246188]]]}},{"name":"Algeria","geometry":{"type":"Polygon","coordinates":[[[-8.684399786809053,27.395744126896005],[-8.674116176782974,28.84128896739658],[-7.059227667661958,29.5792284205246],[-6.060632290053774,29.731699734001694],[-5.242129278982787,30.00044302013559],[-4.859646165374471,30.501187649043846],[-3.6904410465547244,30.896951605751156],[-3.647497931320146,31.637294012980675],[-3.068980271812648,31.724497992473218],[-2.616604783529567,32.09434621838619],[-1.30789913573787,32.2628889023061],[-1.1245511539663084,32.65152151135713],[-1.388049282222596,32.86401500094138],[-1.7334545556614671,33.91971283623212],[-1.792985805661715,34.527918606091305],[-2.169913702798624,35.16839630791668],[-1.208602871089056,35.7148487411871],[-0.12745439289460592,35.888662421200806],[0.5038765804152092,36.30127289483528],[1.466918572606545,36.605647081034405],[4.81575809084913,36.86503693292346],[5.3201200700177935,36.71651886651662],[6.261819695672613,37.11065501560674],[7.330384962603971,37.11838064223437],[7.737078484741005,36.885707505840216],[8.420964389691676,36.94642731378316],[8.217824334352315,36.433176988260286],[8.376367628623768,35.479876003555944],[8.140981479534304,34.65514598239379],[7.524481642292244,34.09737641045146],[7.6126416357821824,33.34411489514896],[8.430472853233368,32.74833730725595],[8.439102817426118,32.50628489840082],[9.05560265466815,32.10269196220129],[9.482139926805274,30.307556057246188],[9.805634392952356,29.424638373323376],[9.859997999723447,28.959989732371014],[9.683884718472768,28.1441738957792],[9.756128370816782,27.688258571884205],[9.629056023811074,27.14095347748092],[9.716285841519664,26.512206325785655],[9.319410841518163,26.094324856057455],[9.910692579801776,25.365454616796796],[9.94826134607797,24.936953640232517],[10.303846876678362,24.379313259370917],[10.771363559622927,24.56253205006175],[11.560669386449005,24.097909247325518],[11.999505649471613,23.47166840259645],[8.572893100629784,21.565660712159143],[5.677565952180686,19.601206976799716],[4.267419467800039,19.155265204337],[3.158133172222705,19.057364203360038],[3.1466610042539003,19.693578599521445],[2.06099083823392,20.142233384679486],[1.8232275732590324,20.610809434486043],[-8.684399786809053,27.395744126896005]]]}},{"name":"Eritrea","geometry":{"type":"Polygon","coordinates":[[[36.42951000000005,14.422110000000032],[36.32321999999999,14.822490000000016],[36.852530000000115,16.956549999999993],[37.167470000000094,17.263140000000135],[37.90400000000011,17.427540000000022],[38.410089959473225,17.998307399970315],[38.990622999840014,16.840626125551694],[39.26611006038803,15.92272349696725],[41.17927493669765,14.491079616753211],[42.58957645037526,13.000421250861905],[43.08122602720016,12.699638576707116],[42.77964236834475,12.455415757695675],[42.35156000000012,12.542230000000131],[40.896600000000035,14.118640000000141],[40.02625000000012,14.519589999999994],[39.34061000000008,14.531549999999982],[39.0994,14.740640000000042],[38.512950000000046,14.50547000000006],[37.90607000000011,14.959430000000168],[37.59377000000006,14.213099999999997],[36.42951000000005,14.422110000000032]]]}},{"name":"Morocco","geometry":{"type":"Polygon","coordinates":[[[-2.169913702798624,35.16839630791668],[-1.792985805661715,34.527918606091305],[-1.7334545556614671,33.91971283623212],[-1.388049282222596,32.86401500094138],[-1.1245511539663084,32.65152151135713],[-1.30789913573787,32.2628889023061],[-2.616604783529567,32.09434621838619],[-3.068980271812648,31.724497992473218],[-3.647497931320146,31.637294012980675],[-3.6904410465547244,30.896951605751156],[-4.859646165374471,30.501187649043846],[-5.242129278982787,30.00044302013559],[-6.060632290053774,29.731699734001694],[-7.059227667661958,29.5792284205246],[-8.674116176782974,28.84128896739658],[-8.665589565454809,27.656425889592356],[-8.817828334986672,27.656425889592356],[-8.794883999049077,27.120696316022507],[-9.41303748212448,27.088476060488574],[-9.735343390328879,26.860944729107405],[-10.189424200877582,26.860944729107405],[-10.551262579785273,26.990807603456886],[-11.392554897497007,26.883423977154393],[-11.718219773800357,26.104091701760623],[-12.03075883630163,26.030866197203068],[-12.50096269372537,24.7701162785782],[-13.891110398809047,23.691009019459305],[-14.221167771857253,22.31016307218816],[-14.630832688851072,21.860939846274903],[-14.750954555713534,21.500600083903663],[-17.02042843267577,21.422310288981578],[-16.973247849993243,21.885744533774982],[-16.589136928767687,22.158234361250095],[-16.261921759495635,22.679339504481277],[-16.3264139469959,23.017768459560898],[-15.982610642958036,23.723358466074046],[-15.426003790742186,24.35913361256104],[-15.089331834360735,24.520260728447],[-14.824645148161665,25.103532619725343],[-14.800925665739726,25.63626496022232],[-14.439939947964831,26.254418443297652],[-13.773804897506466,26.618892320252314],[-13.13994177901435,27.640147813420526],[-12.618836635783111,28.03818553314869],[-11.688919236690765,28.148643907172527],[-10.900956997104402,28.83214223888092],[-10.399592251008642,29.09858592377782],[-9.564811163765683,29.93357371674989],[-9.814718390329176,31.17773550060906],[-9.300692918321886,32.564679266890664],[-8.657476365585012,33.240245266242425],[-6.912544114601417,34.110476386037476],[-5.92999426921989,35.75998810479399],[-5.193863491222032,35.75518219659085],[-4.591006232105144,35.330711981745594],[-3.640056525070065,35.399855048152006],[-2.169913702798624,35.16839630791668]]]}},{"name":"Egypt","geometry":{"type":"Polygon","coordinates":[[[36.86622999999997,22.0],[25.0,22.0],[25.0,29.23865452953346],[24.70007,30.044190000000004],[24.957620000000002,30.6616],[24.802869999999984,31.089290000000005],[25.16482,31.56915],[26.49533,31.58568],[28.913529999999998,30.87005],[30.09503,31.4734],[30.976930000000003,31.55586],[31.687960000000004,31.4296],[31.96041,30.933600000000002],[32.19247,31.26034],[32.99392,31.024070000000002],[33.7734,30.967460000000003],[34.265440000000005,31.219359999999998],[34.9226,29.50133],[34.64174,29.099420000000002],[34.15451,27.8233],[33.92136,27.6487],[33.13676,28.417650000000002],[32.423230000000004,29.851080000000003],[32.32046,29.76043],[32.73482,28.70523],[34.10455,26.14227],[34.79507,25.03375],[35.69241,23.92671],[35.49372,23.752370000000003],[35.52598,23.10244],[36.86622999999997,22.0]]]}},{"name":"Libya","geometry":{"type":"Polygon","coordinates":[[[25.0,29.23865452953346],[25.000000000000114,20.003040000000055],[23.850000000000136,20.000000000000057],[23.83766000000014,19.580470000000105],[15.860850000000084,23.409719999999993],[14.143870883855243,22.491288967371133],[13.581424594790462,23.04050608976928],[11.999505649471613,23.47166840259645],[11.560669386449005,24.097909247325518],[10.771363559622927,24.56253205006175],[10.303846876678362,24.379313259370917],[9.94826134607797,24.936953640232517],[9.910692579801776,25.365454616796796],[9.319410841518163,26.094324856057455],[9.716285841519664,26.512206325785655],[9.629056023811074,27.14095347748092],[9.756128370816782,27.688258571884205],[9.683884718472768,28.1441738957792],[9.859997999723447,28.959989732371014],[9.805634392952356,29.424638373323376],[9.482139926805274,30.307556057246188],[9.970017124072854,30.53932485607524],[10.056575148161699,30.961831366493527],[9.950225050505082,31.376069647745258],[11.432253452203696,32.368903103152874],[11.488787469131012,33.13699575452324],[12.663310000000024,32.79278000000005],[13.083260000000053,32.878820000000076],[13.918679999999995,32.71196000000009],[15.245630000000006,32.26508000000007],[15.713939999999923,31.376259999999945],[18.02108999999996,30.76356999999996],[19.08641,30.26639],[19.574040000000082,30.52582000000001],[20.053349999999966,30.985760000000028],[19.82033000000007,31.751790000000142],[20.13396999999992,32.238200000000006],[20.854520000000093,32.70679999999999],[21.54298,32.843200000000024],[22.895760000000053,32.63857999999999],[23.236800000000017,32.191490000000044],[24.921139999999923,31.89936],[25.16482,31.56915],[24.802869999999984,31.089290000000005],[24.957620000000002,30.6616],[24.70007,30.044190000000004],[25.0,29.23865452953346]]]}},{"name":"Ethiopia","geometry":{"type":"Polygon","coordinates":[[[47.78942,8.003],[44.96360000000001,5.00162],[43.66086999999999,4.957550000000083],[42.76967,4.25259],[42.128609999999995,4.23413],[41.85508309264397,3.918911920483727],[41.1718,3.9190899999999997],[40.76848,4.257020000000001],[39.85494,3.83879],[39.55938425876585,3.42206],[38.67114,3.6160700000000006],[38.120915,3.598605],[36.85509323800812,4.447864127672769],[36.159078632855646,4.447864127672769],[35.817447662353516,4.7769656634618896],[35.817447662353516,5.338232082790797],[35.29800711823298,5.506],[34.70702,6.594220000000121],[34.250320000000045,6.8260700000000725],[34.07510000000002,7.2259500000000685],[33.568290000000104,7.7133400000000165],[32.954180000000065,7.784970000000101],[33.29480000000012,8.354580000000055],[33.82550000000015,8.37916000000007],[33.97498000000007,8.68455999999992],[33.961620000000096,9.583580000000097],[34.25745000000006,10.630089999999996],[34.73115000000013,10.910170000000107],[34.83163000000013,11.318960000000118],[35.26049000000006,12.08286000000004],[35.86363,12.578280000000063],[36.27022000000005,13.563330000000121],[36.42951000000005,14.422110000000032],[37.59377000000006,14.213099999999997],[37.90607000000011,14.959430000000168],[38.512950000000046,14.50547000000006],[39.0994,14.740640000000042],[39.34061000000008,14.531549999999982],[40.02625000000012,14.519589999999994],[40.896600000000035,14.118640000000141],[41.15519999999998,13.773329999999987],[41.59856000000002,13.452090000000112],[42.35156000000012,12.542230000000131],[41.66176000000013,11.631199999999978],[41.755570000000205,11.050910000000101],[42.55493000000013,11.105110000000195],[42.77685184100096,10.92687856693442],[42.55875999999995,10.57258000000013],[43.29699000000011,9.540480000000173],[43.678750000000036,9.18358000000012],[46.94834000000009,7.99688000000009],[47.78942,8.003]]]}},{"name":"Djibouti","geometry":{"type":"Polygon","coordinates":[[[42.35156000000012,12.542230000000131],[42.77964236834475,12.455415757695675],[43.08122602720016,12.699638576707116],[43.31785241066467,12.390148423711025],[43.286381463398925,11.974928290245884],[42.715873650896526,11.735640570518342],[43.14530480324214,11.462039699748857],[42.77685184100096,10.92687856693442],[42.55493000000013,11.105110000000195],[41.755570000000205,11.050910000000101],[41.66176000000013,11.631199999999978],[42.35156000000012,12.542230000000131]]]}},{"name":"Somaliland","geometry":{"type":"Polygon","coordinates":[[[48.94820475850985,11.41061728169797],[48.93812951029645,9.451748968946617],[47.78942,8.003],[46.94834000000009,7.99688000000009],[43.678750000000036,9.18358000000012],[43.29699000000011,9.540480000000173],[42.55875999999995,10.57258000000013],[43.14530480324214,11.462039699748857],[43.470659620951665,11.277709865763882],[43.66666832863484,10.86416921634816],[44.11780358254282,10.445538438351605],[44.614259067570856,10.442205308468942],[45.55694054543915,10.698029486529776],[46.645401238803004,10.816549383991173],[48.37878380716927,11.375481675660126],[48.94820475850985,11.41061728169797]]]}},{"name":"Uganda","geometry":{"type":"Polygon","coordinates":[[[33.90371119710453,-0.9500000000000001],[30.769860000000108,-1.0145499999999856],[29.821518588996014,-1.4433224422297855],[29.579466180140884,-1.3413131648856265],[29.58783776217217,-0.587405694179381],[29.819503208136638,-0.2053101538133717],[29.875778842902434,0.5973798689763612],[30.46850752129029,1.5838054467797065],[31.174149204235817,2.204465236821264],[30.77334679538004,2.339883327642127],[30.833852421715427,3.5091716042224625],[31.24556000000007,3.7819000000000074],[31.881449999999973,3.558269999999993],[32.686420000000055,3.7923200000000747],[33.3900000000001,3.7899999999999636],[34.005,4.249884947362048],[34.47913,3.5556000000000836],[35.03599,1.90584],[34.6721,1.1769399999999999],[33.893568969666944,0.1098135378618963],[33.90371119710453,-0.9500000000000001]]]}},{"name":"Rwanda","geometry":{"type":"Polygon","coordinates":[[[30.419104852019245,-1.1346591121504161],[30.816134881317712,-1.6989140763453887],[30.75830895358311,-2.2872502579883687],[30.469673645761223,-2.41385475710134],[29.93835900240794,-2.348486830254238],[29.632176141078588,-2.917857761246097],[29.024926385216787,-2.8392579077301576],[29.117478875451553,-2.2922111954883846],[29.254834832483343,-2.2151099585089113],[29.291886834436614,-1.6200558406679872],[29.579466180140884,-1.3413131648856265],[29.821518588996014,-1.4433224422297855],[30.419104852019245,-1.1346591121504161]]]}},{"name":"S. Sudan","geometry":{"type":"Polygon","coordinates":[[[30.833852421715427,3.5091716042224625],[29.953500197069474,4.173699042167684],[29.71599531425602,4.600804755060153],[29.1590784034465,4.389267279473231],[28.696677687298802,4.455077215996937],[28.428993768026913,4.287154649264494],[27.97997724784281,4.408413397637375],[27.21340905122517,5.5509534773945575],[26.465909458123235,5.9467174341018705],[26.213418409945117,6.546603298362072],[25.124130893664727,7.500085150579437],[25.11493248871679,7.825104071479174],[23.886979580860668,8.619729712933065],[24.53741516360202,8.91753756573172],[24.794925745412684,9.810240916008695],[25.069603699343986,10.273759963267992],[25.790633328413946,10.411098940233728],[26.477328213242515,9.552730334198088],[26.752006167173818,9.466893473594496],[27.112520981708883,9.638567194801624],[27.833550610778786,9.60423245056029],[27.970889587744352,9.398223985111656],[28.966597170745786,9.398223985111656],[29.000931914987177,9.60423245056029],[29.515953078608618,9.793073543888056],[29.61895731133285,10.084918869940225],[29.996639497988554,10.290927335388687],[30.837840731903384,9.70723668328452],[31.35286189552488,9.810240916008695],[31.850715687025513,10.531270545078826],[32.400071594888345,11.080626452941488],[32.31423473428475,11.68148447716652],[32.073891524594785,11.973329803218519],[32.67474954881965,12.02483191958072],[32.743419037302544,12.248007757149992],[33.206938084561784,12.179338268667095],[33.086766479716744,11.441141267476496],[33.206938084561784,10.720111638406593],[33.72195924818311,10.325262079630193],[33.84213085302815,9.981914637215993],[33.82496348090751,9.484060845715362],[33.963392794971185,9.464285229420625],[33.97498000000007,8.68455999999992],[33.82550000000015,8.37916000000007],[33.29480000000012,8.354580000000055],[32.954180000000065,7.784970000000101],[33.568290000000104,7.7133400000000165],[34.07510000000002,7.2259500000000685],[34.250320000000045,6.8260700000000725],[34.70702,6.594220000000121],[35.29800711823298,5.506],[33.3900000000001,3.7899999999999636],[32.686420000000055,3.7923200000000747],[31.881449999999973,3.558269999999993],[31.24556000000007,3.7819000000000074],[30.833852421715427,3.5091716042224625]]]}}];
const locations=[['The Gambia',-16.15,13.45],['Senegal',-14.45,14.65],['Mauritania',-10.3,19.0],['Mali',-4.2,17.0],['Niger',8.0,17.0],['Burkina Faso',-1.6,12.3],['Guinea-Bissau',-15.1,12.0],['Guinea',-10.6,10.4],['Sierra Leone',-11.8,8.5],['Liberia',-9.4,6.5],['Côte d’Ivoire',-5.5,7.5],['Ghana',-1.2,7.9],['Nigeria',8.7,9.0]];
const descriptions={'The Gambia':'Our starting point for exploring energy generation, grid infrastructure and future regional partnerships. Select a country marker to explore the regional outlook.','Senegal':'Illustrative opportunities for cross-border coordination, energy infrastructure and future partnerships.','Mauritania':'Potential long-term regional collaboration in power infrastructure and renewable-energy development.','Mali':'Exploring the wider West African energy landscape and regional integration potential.','Niger':'Illustrative regional outlook for long-term energy infrastructure opportunities.','Burkina Faso':'Potential energy access and grid-infrastructure development opportunities.','Guinea-Bissau':'A neighboring market for exploring energy access, development and infrastructure cooperation.','Guinea':'Potential partnerships and future regional energy infrastructure development.','Sierra Leone':'Illustrative opportunities for regional power development and collaboration.','Liberia':'Exploring future grid and energy development opportunities across the region.','Côte d’Ivoire':'An important West African power market within the broader regional outlook.','Ghana':'Illustrative outlook for power infrastructure, investment and future regional collaboration.','Nigeria':'A major regional energy market included for geographic context and long-term outlook.'};
const aliases={'Côte d’Ivoire':'Côte d’Ivoire','Ivory Coast':'Côte d’Ivoire','Gambia':'The Gambia','The Gambia':'The Gambia'};
const lonMin=-44,lonMax=18,latMin=-2,latMax=31;
const xy=(lon,lat)=>[(lon-lonMin)/(lonMax-lonMin)*1200,(latMax-lat)/(latMax-latMin)*720];
function rings(g){if(g.type==='Polygon')return g.coordinates; if(g.type==='MultiPolygon')return g.coordinates.flat();return []}
function path(g){return rings(g).map(r=>r.map((c,i)=>{let [x,y]=xy(...c);return(i?'L':'M')+x.toFixed(1)+','+y.toFixed(1)}).join('')+'Z').join('')}
const svgNS='http://www.w3.org/2000/svg';const make=(tag,attrs,par)=>{let e=document.createElementNS(svgNS,tag);for(let k in attrs)e.setAttribute(k,attrs[k]);par.appendChild(e);return e};
const terrain=document.getElementById('terrain'),routes=document.getElementById('paths'),nodes=document.getElementById('nodes');
for(let c of countries){let p=make('path',{d:path(c.geometry),class:'country'+(c.name==='Gambia'?' gambia':''),'data-country':c.name},terrain);p.addEventListener('click',()=>select(aliases[c.name]||c.name));}
let hub=xy(-16.15,13.45),routeEls=[],nodeEls=[];
locations.slice(1).forEach((a,i)=>{let p=xy(a[1],a[2]);let dx=p[0]-hub[0],lift=Math.min(120,Math.abs(dx)*.20+18);let d=`M ${hub[0]} ${hub[1]} Q ${(hub[0]+p[0])/2} ${(hub[1]+p[1])/2-lift} ${p[0]} ${p[1]}`;let r=make('path',{d,class:'route '+(i%2?'teal':'gold')},routes);r.addEventListener('click',()=>select(a[0]));routeEls.push({name:a[0],el:r});});
locations.forEach((a,i)=>{let p=xy(a[1],a[2]),g=make('g',{class:'node','tabindex':'0','role':'button','aria-label':'View '+a[0]},nodes);make('circle',{cx:p[0],cy:p[1],r:i===0?9:5.8,class:i===0?'hub':''},g);if(i===0){make('rect',{x:p[0]-127,y:p[1]-38,width:115,height:30,rx:5,fill:'#041a2b',stroke:'#f6b727'},g);let t=make('text',{x:p[0]-119,y:p[1]-18,'font-size':14},g);t.textContent='THE GAMBIA';}else{let t=make('text',{x:p[0]+(a[0]==='Senegal'?-15:12),y:p[1]-12,'text-anchor':a[0]==='Senegal'?'end':'start'},g);t.textContent=a[0].toUpperCase();}g.addEventListener('click',()=>select(a[0]));g.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();select(a[0])}});nodeEls.push({name:a[0],el:g});});
function select(name){document.getElementById('info').style.display='block';document.getElementById('countryName').textContent=name;document.getElementById('countryDesc').textContent=descriptions[name]||'Part of the wider West African energy landscape.';routeEls.forEach(r=>{r.el.classList.toggle('muted',name!=='The Gambia'&&r.name!==name);r.el.classList.toggle('active',r.name===name)});nodeEls.forEach(n=>n.el.classList.toggle('muted',name!=='The Gambia'&&n.name!==name&&n.name!=='The Gambia'));document.querySelectorAll('.country').forEach(c=>c.classList.toggle('selected',c.dataset.country===name||c.dataset.country==='Ivory Coast'&&name==='Côte d’Ivoire'));}
document.getElementById('regional').onclick=()=>{select('The Gambia');document.getElementById('regional').classList.add('active');document.getElementById('focus').classList.remove('active')};document.getElementById('focus').onclick=()=>{select('The Gambia');routeEls.forEach(r=>r.el.classList.add('muted'));document.getElementById('focus').classList.add('active');document.getElementById('regional').classList.remove('active')};let paused=false;document.getElementById('pause').onclick=e=>{paused=!paused;routeEls.forEach(r=>r.el.style.animationPlayState=paused?'paused':'running');e.target.textContent=paused?'Resume animation ▶':'Pause animation Ⅱ'};document.getElementById('close').onclick=()=>document.getElementById('info').style.display='none';
```

---

## Asset Manifest (binary files - copy from soliaris-next/public/)

These cannot be embedded in a text file. Copy them from `C:\Users\Shema Dylan Owen\Downloads\soliaris website\soliaris-next\public\` into your `public/` folder:

| Path | Size (bytes) | Used for |
|---|---|---|
| public/images/about-hero.jpg | 214706 | About hero |
| public/images/banjul-aerial.jpg | 344176 | News card 1 / Opportunities hero poster |
| public/images/contact-hq.jpg | 372271 | Contact page figure |
| public/images/dev-priorities.jpg | 411187 | Home Development Priorities card |
| public/images/epc-steel.jpg | 371148 | WWD row 04 |
| public/images/home-hero-sunset.jpg | 400244 | Home hero background |
| public/images/impact-child.jpg | 153222 | Impact hero |
| public/images/impact-commitment.jpg | 335991 | Impact commitment figure |
| public/images/impact-composite.png | 2933584 | Home impact figure (sun symbol) |
| public/images/investment-building.jpg | 136425 | WWD row 06 |
| public/images/panel-grid.jpg | 282981 | Home energy panel 3 |
| public/images/panel-power.jpg | 186580 | Home energy panel 2 |
| public/images/panel-solar-wind.jpg | 294637 | Home energy panel 1 |
| public/images/partner-eng.jpg | 49126 | Partnerships engineering tile |
| public/images/partner-industrial.jpg | 345503 | Home Partner With Us card / WWD row 02 |
| public/images/partnership-goldenhour.jpg | 182740 | Partnerships hero + investors tile / News card 3 |
| public/images/power-plant.jpg | 90096 | Opportunities card |
| public/images/purpose-city.jpg | 325532 | Home purpose triptych 3 / Opportunities card / Partnerships tile |
| public/images/purpose-pylons.jpg | 143567 | Home purpose triptych 1 / WWD row 03 |
| public/images/purpose-solar.jpg | 157965 | Home purpose triptych 2 |
| public/images/regmap-base.jpg | 92651 | Interactive map satellite base |
| public/images/river-sunset.jpg | 449517 | CTA band poster (Home, WWD, Opportunities) |
| public/images/smart-infra.jpg | 140883 | WWD row 05 |
| public/images/solar-farm.jpg | 1323660 | WWD row 01 / Opportunities card |
| public/images/solar-park-aerial.jpg | 384976 | About story / News card 2 |
| public/images/soliaris-logo.png | 669321 | Logo (header + footer, all pages) |
| public/images/substation.jpg | 89313 | Opportunities card / Partnerships tile |
| public/images/wwd-hero-poster.jpg | 257391 | What We Do hero poster |
| public/videos/banjul-flyover.mp4 | 7924690 | Opportunities hero video |
| public/videos/river-flyover.mp4 | 8158611 | Opportunities CTA video |
| public/videos/solar-farm-aerial.mp4 | 6256056 | What We Do hero video |
