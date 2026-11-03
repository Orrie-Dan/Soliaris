import { useCallback, useState } from "react";
import { Link } from "react-router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollTabs from "@/components/ScrollTabs";
import AutoVideo from "@/components/AutoVideo";
import DetailView, { type DetailItem } from "@/components/DetailView";
import usePageMeta from "@/usePageMeta";

const Arrow = ({ size = 14, width = 2.4 }: { size?: number; width?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={width} aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const SOLUTIONS: (DetailItem & { id: string; num: string })[] = [
  {
    id: "renewable",
    num: "01",
    eyebrow: "01 · RENEWABLE ENERGY",
    title: <>RENEWABLE ENERGY</>,
    copy: "Solar PV, wind energy, hybrid systems and battery storage solutions for a more resilient energy supply.",
    src: "/images/solar-farm.webp",
    alt: "Aerial view of a large solar farm at golden hour",
    overview:
      "Renewable generation can diversify supply, reduce reliance on imported fuel and bring cleaner power to homes and businesses. We develop solar, wind and hybrid solutions sized to local demand and grid conditions.",
    focus: [
      { title: "Solar PV", copy: "Utility-scale and distributed solar for grid and on-site supply." },
      { title: "Wind energy", copy: "Wind generation where resource and site conditions allow." },
      { title: "Hybrid & battery storage", copy: "Combined systems and storage for a steadier, more resilient supply." },
    ],
  },
  {
    id: "power",
    num: "02",
    eyebrow: "02 · POWER GENERATION",
    title: <>POWER GENERATION &amp; DEVELOPMENT</>,
    copy: "Independent power producer projects, power plant development and energy generation capacity for growing demand.",
    src: "/images/partner-industrial.webp",
    alt: "Industrial power generation machinery",
    overview:
      "Growing economies need dependable power. We take generation projects from concept through development, working towards capacity that meets rising demand.",
    focus: [
      { title: "Independent power projects", copy: "Developing IPP projects alongside utilities and partners." },
      { title: "Power plant development", copy: "Site, technical and commercial development of new plants." },
      { title: "Generation capacity", copy: "Adding capacity to support growing demand." },
    ],
  },
  {
    id: "grid",
    num: "03",
    eyebrow: "03 · GRID INFRASTRUCTURE",
    title: <>GRID &amp; ELECTRICAL INFRASTRUCTURE</>,
    copy: "Transmission and distribution networks, substations and grid interconnection for stronger, more reliable systems.",
    src: "/images/purpose-pylons.webp",
    alt: "High-voltage transmission towers at dusk",
    overview:
      "Generation only matters if power reaches people. We work on the networks, substations and interconnections that make energy systems stronger and more reliable.",
    focus: [
      { title: "Transmission & distribution", copy: "Expanding and reinforcing networks." },
      { title: "Substations", copy: "New and upgraded substations." },
      { title: "Grid interconnection", copy: "Linking generation and grids across the region." },
    ],
  },
  {
    id: "epc",
    num: "04",
    eyebrow: "04 · EPC",
    title: <>ENGINEERING, PROCUREMENT &amp; CONSTRUCTION</>,
    copy: "Project engineering, equipment procurement, construction coordination and commissioning.",
    src: "/images/epc-steel.webp",
    alt: "Steel framework and crane at an infrastructure construction site",
    pos: "center 45%",
    overview:
      "Delivery turns plans into working infrastructure. We coordinate engineering, procurement and construction so projects move from design to commissioning.",
    focus: [
      { title: "Project engineering", copy: "Design and technical planning." },
      { title: "Equipment procurement", copy: "Sourcing equipment from qualified suppliers." },
      { title: "Construction & commissioning", copy: "Coordinating build-out through to commissioning." },
    ],
  },
  {
    id: "smart",
    num: "05",
    eyebrow: "05 · SMART ENERGY",
    title: <>SMART ENERGY SOLUTIONS</>,
    copy: "Smart metering, energy efficiency, monitoring and digital solutions for modern energy systems.",
    src: "/images/smart-infra.webp",
    alt: "Engineer working on electrical control and automation panels",
    overview:
      "Modern energy systems run on data. We bring metering, monitoring and efficiency solutions that help utilities and users understand and reduce consumption.",
    focus: [
      { title: "Smart metering", copy: "Accurate, connected metering for utilities and users." },
      { title: "Energy efficiency", copy: "Reducing consumption and cost." },
      { title: "Monitoring & digital", copy: "Visibility and control over energy systems." },
    ],
  },
  {
    id: "investment",
    num: "06",
    eyebrow: "06 · INVESTMENT",
    title: <>INVESTMENT &amp; PARTNERSHIPS</>,
    copy: "Co-development, investment structuring and strategic partnerships that bring energy projects to life.",
    src: "/images/investment-building.webp",
    alt: "Modern teal glass commercial buildings",
    overview:
      "Energy projects succeed through the right partners and capital. We work with investors, utilities and technology providers to structure and co-develop projects.",
    focus: [
      { title: "Co-development", copy: "Developing projects together with partners." },
      { title: "Investment structuring", copy: "Shaping projects for investment." },
      { title: "Strategic partnerships", copy: "Long-term collaboration across the value chain." },
    ],
  },
];

export default function WhatWeDoPage() {
  usePageMeta(
    "What We Do",
    "From renewable generation to grid infrastructure, SOLIARIS AFRICA LTD develops and delivers energy projects that create lasting value."
  );
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const closeView = useCallback(() => setOpenIndex(null), []);
  const stepView = useCallback(
    (dir: 1 | -1) => setOpenIndex((i) => (i === null ? i : (i + dir + SOLUTIONS.length) % SOLUTIONS.length)),
    []
  );

  return (
    <div id="top" className="bg-white">
      <Header active="/what-we-do" />

      {/* ============ HERO ============ */}
      <section aria-label="What we do" className="relative h-[560px] overflow-hidden bg-deep">
        <img
          src="/images/wwd-hero-poster.webp"
          alt="Soliaris engineer in a branded safety vest and white helmet facing an electrical substation at sunset"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <AutoVideo
          src="/videos/solar-farm-aerial.mp4"
          poster="/images/wwd-hero-poster.webp"
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
              <figure className="srfig m-0 h-[280px] min-w-[min(300px,100%)] flex-[0_1_480px] overflow-hidden rounded-md">
                <img
                  className="srimg h-full w-full object-cover"
                  src={s.src}
                  alt={s.alt}
                  style={s.pos ? { objectPosition: s.pos } : undefined}
                />
              </figure>
              <div className="srcontent min-w-[min(300px,100%)] flex-[1_1_380px]">
                <p className="rownum">{s.num}</p>
                <h2 className="m-0 mb-3 font-heading text-[26px] font-extrabold leading-[1.2] tracking-[0.01em] text-navy">{s.title}</h2>
                <p className="m-0 mb-[18px] max-w-[460px] text-[15px] leading-[1.7] text-ink">{s.copy}</p>
                <button
                  type="button"
                  className="learnmore cursor-pointer border-0 bg-transparent p-0 !text-[13px]"
                  aria-haspopup="dialog"
                  onClick={() => setOpenIndex(i)}
                >
                  LEARN MORE
                  <Arrow />
                </button>
              </div>
              <span className="srarrow hidden h-[50px] xl:flex w-[50px] shrink-0 items-center justify-center rounded-full border-[1.5px] border-[#b9c6d2] text-navy" aria-hidden="true">
                <Arrow size={17} width={2.2} />
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ============ CTA BAND ============ */}
      <section id="cta-foot" aria-label="Work with us" className="relative flex min-h-[300px] items-center overflow-hidden bg-deep">
        <img src="/images/river-sunset.webp" alt="River winding through dark grassland at sunset" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg,rgba(3,27,51,.9) 0%,rgba(3,27,51,.7) 60%,rgba(3,27,51,.82) 100%)" }} aria-hidden="true" />
        <div className="relative mx-auto flex w-full max-w-content flex-wrap items-center justify-between gap-10 px-6 py-16 lg:px-10">
          <h2 className="m-0 font-heading text-[32px] font-extrabold leading-[1.1] tracking-[-0.01em] text-white lg:text-[40px]">
            READY TO DEVELOP<br /><span className="text-gold">ENERGY SOLUTIONS TOGETHER?</span>
          </h2>
          <Link to="/contact" className="btn-gold">
            GET IN TOUCH
            <Arrow size={15} />
          </Link>
        </div>
      </section>

      <Footer active="/what-we-do" />

      {openIndex !== null && (
        <DetailView
          item={SOLUTIONS[openIndex]}
          index={openIndex}
          total={SOLUTIONS.length}
          ctaLabel="DISCUSS THIS SOLUTION"
          onClose={closeView}
          onStep={stepView}
        />
      )}
    </div>
  );
}
