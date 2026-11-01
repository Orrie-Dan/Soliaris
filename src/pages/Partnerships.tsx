import { Link } from "react-router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PartnerTimeline from "@/components/PartnerTimeline";
import usePageMeta from "@/usePageMeta";

const Arrow = ({ size = 15, width = 2.4 }: { size?: number; width?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={width} aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const PARTNER_CATEGORIES = [
  {
    href: "/",
    src: "/images/purpose-city.webp",
    alt: "Aerial view of a growing African city",
    pos: undefined as string | undefined,
    title: <>Governments &amp;<br />Public Institutions</>,
    copy: "Supporting national energy goals and public development priorities.",
  },
  {
    href: "/what-we-do",
    src: "/images/substation.webp",
    alt: "Electrical substation infrastructure",
    pos: undefined,
    title: <>Utilities &amp;<br />Energy Companies</>,
    copy: "Collaborating on generation, grid and energy service opportunities.",
  },
  {
    href: "/opportunities",
    src: "/images/partnership-goldenhour.webp",
    alt: "Handshake between partners in front of golden industrial infrastructure",
    pos: "center 40%",
    title: <>Investors &amp;<br />Financial Institutions</>,
    copy: "Exploring bankable energy development opportunities together.",
  },
  {
    href: "/what-we-do",
    src: "/images/partner-eng.webp",
    alt: "Engineers in safety helmets reviewing plans",
    pos: undefined,
    title: <>Engineering &amp;<br />Technology Partners</>,
    copy: "Bringing proven technology and delivery capability to projects.",
  },
];

export default function PartnershipsPage() {
  usePageMeta(
    "Partnerships",
    "SOLIARIS AFRICA LTD works with governments, utilities, investors, technology providers, and engineering partners to explore energy infrastructure opportunities across Africa."
  );

  return (
    <div id="top" className="bg-white">
      <Header active="/partnerships" />

      {/* ============ HERO ============ */}
      <section aria-label="Partnerships" className="relative h-[560px] overflow-hidden bg-deep">
        <img
          src="/images/partnership-goldenhour.webp"
          alt="Close-up handshake between two partners in front of golden industrial infrastructure"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
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
            <Link to="/opportunities" className="btn-gold heroFade d4">
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
              <Link key={i} to={c.href} className="pcat">
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
          <Link to="/contact" className="btn-gold">
            GET IN TOUCH
            <Arrow />
          </Link>
        </div>
      </section>

      <Footer active="/partnerships" />
    </div>
  );
}
