import { useCallback, useState } from "react";
import { Link } from "react-router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AutoVideo from "@/components/AutoVideo";
import DetailView from "@/components/DetailView";
import usePageMeta from "@/usePageMeta";

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

type Card = {
  tag: Sector;
  src: string;
  alt: string;
  title: string;
  copy: string;
  overview: string;
  focus: { title: string; copy: string }[];
};

const CARDS: Card[] = [
  {
    tag: "renewable",
    src: "/images/solar-farm.webp",
    alt: "Aerial view of a solar farm",
    title: "Renewable Energy Development",
    copy: "Utility-scale and distributed solar and wind opportunities.",
    overview:
      "We are exploring renewable generation that can diversify supply, reduce reliance on imported fuel and bring cleaner power to homes and businesses across The Gambia and the wider region.",
    focus: [
      { title: "Utility-scale solar & wind", copy: "Grid-connected solar PV and wind generation." },
      { title: "Distributed solar", copy: "Rooftop and on-site systems for commercial and industrial users." },
      { title: "Hybrid & storage", copy: "Hybrid systems with battery storage for a more resilient supply." },
    ],
  },
  {
    tag: "power",
    src: "/images/power-plant.webp",
    alt: "Industrial power generation plant",
    title: "Power Generation Infrastructure",
    copy: "New generation capacity and hybrid energy solutions.",
    overview:
      "Growing economies need dependable power. We are looking at generation capacity and hybrid solutions that can support rising demand and a more reliable supply.",
    focus: [
      { title: "New capacity", copy: "Generation capacity to meet growing demand." },
      { title: "Hybrid plants", copy: "Combining conventional and renewable sources." },
      { title: "Reliability upgrades", copy: "Improvements that strengthen existing supply." },
    ],
  },
  {
    tag: "grid",
    src: "/images/substation.webp",
    alt: "Electrical substation",
    title: "Transmission & Substation Projects",
    copy: "Grid strengthening and interconnection opportunities.",
    overview:
      "Generation only matters if power reaches people. We are exploring network, substation and interconnection work for stronger, more reliable systems.",
    focus: [
      { title: "Transmission & distribution", copy: "Network expansion and reinforcement." },
      { title: "Substations", copy: "New and upgraded substations." },
      { title: "Interconnection", copy: "Linking grids across the region." },
    ],
  },
  {
    tag: "public",
    src: "/images/purpose-city.webp",
    alt: "Aerial view of a growing African city",
    title: "Public Infrastructure Initiatives",
    copy: "Energy-efficient lighting and smart public infrastructure.",
    overview:
      "Efficient public infrastructure lowers costs and improves daily life. We are exploring lighting, metering and digital solutions for modern, energy-efficient cities.",
    focus: [
      { title: "Efficient lighting", copy: "Energy-efficient and solar street lighting." },
      { title: "Smart metering", copy: "Metering, monitoring and digital energy solutions." },
      { title: "Public facilities", copy: "Efficiency improvements for public buildings." },
    ],
  },
];

const SECTOR_LABEL = Object.fromEntries(PILLS.map((p) => [p.key, p.label])) as Record<Sector, string>;

export default function OpportunitiesPage() {
  usePageMeta(
    "Development Opportunities",
    "SOLIARIS AFRICA LTD is actively exploring and developing energy infrastructure opportunities in The Gambia and the wider West African region."
  );
  const [filter, setFilter] = useState<Sector>("all");
  const [openTag, setOpenTag] = useState<Sector | null>(null);
  const openIndex = CARDS.findIndex((c) => c.tag === openTag);
  const closeView = useCallback(() => setOpenTag(null), []);
  const stepView = useCallback(
    (dir: 1 | -1) =>
      setOpenTag((t) => {
        const i = CARDS.findIndex((c) => c.tag === t);
        return CARDS[(i + dir + CARDS.length) % CARDS.length].tag;
      }),
    []
  );

  return (
    <div id="top" className="bg-white">
      <Header active="/opportunities" />

      {/* ============ HERO · BANJUL FLYOVER ============ */}
      <section aria-label="Development opportunities" className="relative h-[620px] overflow-hidden bg-deep">
        <div className="absolute right-0 top-0 h-full w-full lg:w-[66%]">
          <img
            src="/images/banjul-aerial.webp"
            alt="Aerial view of Banjul, The Gambia, stretching toward the Atlantic coast"
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <AutoVideo
            src="/videos/banjul-flyover.mp4"
            poster="/images/banjul-aerial.webp"
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
                  <img className="zoom-img h-full w-full object-cover" src={c.src} alt={c.alt} />
                </figure>
                <div className="p-6 pb-[26px]">
                  <h2 className="m-0 mb-2.5 font-heading text-[17px] font-extrabold leading-[1.3] text-navy">{c.title}</h2>
                  <p className="m-0 mb-4 text-[13.5px] leading-[1.65] text-inkSoft">{c.copy}</p>
                  <button
                    type="button"
                    className="learnmore cursor-pointer border-0 bg-transparent p-0"
                    aria-haspopup="dialog"
                    onClick={() => setOpenTag(c.tag)}
                  >
                    EXPLORE
                    <Arrow size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ BOTTOM CTA · RIVER FLYOVER ============ */}
      <section id="cta-opp" aria-label="Partner with us" className="relative flex min-h-[420px] items-center overflow-hidden">
        <img src="/images/river-sunset.webp" alt="River winding through dark grassland at sunset" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        <AutoVideo
          src="/videos/river-flyover.mp4"
          poster="/images/river-sunset.webp"
          className="absolute inset-0 h-full w-full object-cover"
          lazy
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg,rgba(3,27,51,.88) 0%,rgba(3,27,51,.6) 55%,rgba(3,27,51,.78) 100%)" }} aria-hidden="true" />
        <div className="relative mx-auto flex w-full max-w-content flex-wrap items-center justify-between gap-12 px-6 py-20 lg:px-10">
          <h2 className="m-0 font-heading text-[36px] font-extrabold leading-[1.1] tracking-[-0.012em] text-white lg:text-[50px]">
            PARTNER WITH US<br />TO DEVELOP <span className="text-gold">AFRICA&apos;S<br />NEXT ENERGY PROJECTS</span>
          </h2>
          <Link to="/contact" className="btn-gold">
            GET IN TOUCH
            <Arrow size={15} />
          </Link>
        </div>
      </section>

      <Footer active="/opportunities" />

      {openIndex >= 0 && (
        <DetailView
          item={{ ...CARDS[openIndex], eyebrow: SECTOR_LABEL[CARDS[openIndex].tag] }}
          index={openIndex}
          total={CARDS.length}
          note="An area of focus for development and partnership, not a confirmed project. We welcome conversations with partners interested in this sector."
          ctaLabel="DISCUSS THIS OPPORTUNITY"
          onClose={closeView}
          onStep={stepView}
        />
      )}
    </div>
  );
}
